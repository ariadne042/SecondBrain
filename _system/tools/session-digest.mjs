#!/usr/bin/env node
// session-digest.mjs — the Versicherung layer. 
// Every session's raw conversation lives forever in opencode.db. This tool turns that
// archive into usable memory: it finds sessions that were never digested into the brain,
// writes detail-rich digests of them, and can search the whole archive for a lost detail.
//
// Modes:
//   node session-digest.mjs --list              list undigested sessions (no files written)
//   node session-digest.mjs --digest [--limit N]  write digests for up to N (default 6) undigested sessions, newest first
//   node session-digest.mjs --grep <term>       search all recent sessions (text + bash commands) for a term
//
// Safety contract (makes /digest interrupt-safe):
//   - additively-only memory writes happen in the model's own fold (MEMORY.md / Moments).
//   - a session counts as "handled" only via a `.done-<id>` marker => rerunning resumes cleanly.
//   - the tool never deletes anything except nothing; staged digests are cleaned by the model after folding.

import { DatabaseSync } from 'node:sqlite';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HOME = homedir();
const DB = join(HOME, '.local/share/opencode/opencode.db');
const DIGEST_DIR = join(HOME, 'SecondBrain/_system/digest');
const CRASH_DIR = join(HOME, 'SecondBrain/_system/crash-recovery');

const args = process.argv.slice(2);
const flag = (name) => args.indexOf(name);
const argAfter = (name) => { const i = flag(name); return i >= 0 ? args[i + 1] : undefined; };

const MODE_LIST = args.includes('--list');
const MODE_DIGEST = args.includes('--digest');
const MODE_GREP = args.includes('--grep');
const LIMIT = parseInt(argAfter('--limit') || '4', 10);
const TERM = options();

function options() {
  const i = flag('--grep');
  if (i < 0) return null;
  for (let k = i + 1; k < args.length; k++) if (!args[k].startsWith('--')) return args[k];
  return null;
}

function done(id) {
  return existsSync(join(DIGEST_DIR, `.done-${id}`)) || existsSync(join(CRASH_DIR, `.done-${id}`));
}

function openDb() {
  return new DatabaseSync(DB, { readOnly: true });
}

function sessions(limit) {
  const db = openDb();
  const rows = db
    .prepare('SELECT id, title, time_created AS t, time_updated AS u FROM session ORDER BY time_created DESC LIMIT ?')
    .all(limit);
  db.close();
  return rows;
}

function partsOf(sessionId) {
  const db = openDb();
  const rows = db
    .prepare("SELECT m.data AS mdata, p.data AS pdata, p.time_created AS t FROM message m JOIN part p ON p.message_id = m.id WHERE p.session_id = ? ORDER BY p.time_created")
    .all(sessionId);
  db.close();
  return rows;
}

function buildDigest(id, title, t, u, parts) {
  // Priorities: the user's exact words (> most valuable, kept near-full), the commands the
  // assistant ran (what was actually done), then a tight trim of assistant prose (the brain's
  // MEMORY layer already holds the outcomes). Full raw stays in opencode.db for --grep.
  const lines = [];
  let budget = 500; // hard line cap so a fold stays cheap even for marathon sessions
  let cut = false;
  for (const { mdata, pdata, t: pt } of parts) {
    if (lines.length >= budget) { cut = true; break; }
    let m, p;
    try { m = JSON.parse(mdata); p = JSON.parse(pdata); } catch { continue; }
    const role = m.role;
    const when = new Date(pt).toLocaleTimeString('de-DE', { hour12: false });
    if (p.type === 'text' && p.text && p.text.trim()) {
      const txt = p.text.replace(/\s+/g, ' ').trim();
      const max = role === 'user' ? 1000 : 280;
      lines.push(`[${role} ${when}] ${txt.slice(0, max)}${txt.length > max ? ' …' : ''}`);
    } else if (p.type === 'tool' && p.state) {
      const input = JSON.stringify(p.state.input || {}).slice(0, 380);
      let out = '';
      const o = p.state.output;
      if (typeof o === 'string') out = o.replace(/\s+/g, ' ').trim();
      else if (o) out = JSON.stringify(o).slice(0, 160);
      lines.push(`[assistant→${p.tool} ${when}] ${input}`);
      if (out) lines.push(`    ⇝ ${out.slice(0, 110)}${out.length > 110 ? ' …' : ''}`);
    }
  }
  return [
    `# Digest: ${title}`,
    '',
    `- session: \`${id}\``,
    `- started: ${new Date(t).toLocaleString('de-DE')}`,
    `- last message: ${new Date(u).toLocaleString('de-DE')}`,
    `- ${lines.length} conversation lines${cut ? ' (trimmed — full raw in opencode.db, use --grep)' : ''}`,
    '',
    '',
    ...lines,
  ].join('\n');
}

function fmt(ts) {
  return new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
}

if (MODE_LIST || MODE_DIGEST) {
  const all = sessions(60);
  const undigested = all.filter((s) => !done(s.id));
  const current = all[0]; // newest session = the one open right now
  const candidates = undigested.filter((s) => s.id !== current?.id);

  if (!candidates.length) {
    console.log('nothing to digest — all past sessions already handled');
    process.exit(0);
  }
  console.log(`${candidates.length} undigested session(s):`);
  for (const s of candidates.slice(0, 10)) {
    console.log(`  ${fmt(s.t)}  ${s.title}  (${s.id})`);
  }

  if (MODE_DIGEST) {
    mkdirSync(DIGEST_DIR, { recursive: true });
    const todo = candidates.slice(0, LIMIT);
    for (const s of todo) {
      const parts = partsOf(s.id);
      const path = join(DIGEST_DIR, `${s.id}.md`);
      writeFileSync(path, buildDigest(s.id, s.title, s.t, s.u, parts));
      console.log(`wrote digest → ${path}  (${parts.length} parts)`);
    }
    console.log(`fold the digests (see AGENTS "Digest sweep"), then per session mark handled: touch ${join(DIGEST_DIR, '.done-<session-id>')}`);
    console.log('staged digest files can be deleted after folding; markers are the permanent "done" flag.');
  }
}

if (MODE_GREP) {
  if (!TERM) { console.log('usage: session-digest.mjs --grep <term>'); process.exit(1); }
  const q = TERM.toLowerCase();
  const recent = sessions(40);
  let hits = 0;
  for (const s of recent) {
    const parts = partsOf(s.id);
    const out = [];
    for (const { mdata, pdata, t: pt } of parts) {
      let m, p;
      try { m = JSON.parse(mdata); p = JSON.parse(pdata); } catch { continue; }
      const when = new Date(pt).toLocaleTimeString('de-DE', { hour12: false });
      if (p.type === 'text' && p.text && p.text.toLowerCase().includes(q)) {
        out.push(`  ${when} [${m.role}] ${p.text.replace(/\s+/g, ' ').trim().slice(-0, 200)}`);
      } else if (p.type === 'tool' && p.state?.input && JSON.stringify(p.state.input).toLowerCase().includes(q)) {
        out.push(`  ${when} [assistant→${p.tool}] ${JSON.stringify(p.state.input).slice(0, 160)}`);
      }
    }
    if (out.length) {
      console.log(`\n=== ${s.title}  (${fmt(s.t)})  ${s.id}`);
      out.slice(0, 6).forEach((l) => console.log(l));
      hits += out.length;
    }
    if (hits > 24) { console.log('\n…more hits omitted'); break; }
  }
  if (!hits) console.log(`no matches for "${TERM}" in the last ${recent.length} sessions`);
}

function currentDef() {
  const all = sessions(1);
  return `<session-id of ${all[0]?.title ?? 'the session'}>`;
}