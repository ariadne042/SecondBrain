#!/usr/bin/env node
// crash-recover.mjs — after a crash/reboot, recover the pre-crash opencode session details.
// Source of truth: opencode's own sqlite conversation store (~/.local/share/opencode/opencode.db).
// Answer: did the last session get cut by a hard crash/power loss? If yes, write a digest
// of its conversation to _system/crash-recovery/ for the model to fold into the brain.
//
// Why: MEMORY autosave can capture only a thin title for a session killed mid-flight; the
// raw conversation always survives in the db. (Built 2026-09-20 after the "fork systemctl" hard power-cut.)
//
// Usage: node crash-recover.mjs

import { DatabaseSync } from 'node:sqlite';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HOME = homedir();
const DB = join(HOME, '.local/share/opencode/opencode.db');
const OUT_DIR = join(HOME, 'SecondBrain/_system/crash-recovery');
const CLEAN_SHUTDOWN = /Reached target (Shutdown|Power-Off|Reboot|Halt)|systemd-shutdown\[\d+\]|The system will (power off|reboot|halt) now/;

function run(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', timeout: 20000 });
  } catch (e) {
    return e.stdout || '';
  }
}

function bootList() {
  const out = run('journalctl', ['--list-boots', '--no-pager']);
  const boots = [];
  for (const raw of out.split('\n')) {
    const m = raw.match(/^\s*(-?\d+)\s+([0-9a-f]+)\s+(.+?)\s*$/);
    if (!m) continue;
    const dates = [...m[3].matchAll(/(\w{3})\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(\S+)/g)];
    if (!dates.length) continue;
    const toTs = (d) => new Date(`${d[2]} ${d[3]}`).getTime();
    boots.push({
      id: parseInt(m[1], 10),
      bootId: m[2],
      start: toTs(dates[0]),
      end: dates.length > 1 ? toTs(dates[1]) : null,
    });
  }
  return boots;
}

function bootEndedCleanly(bootId) {
  const tail = run('journalctl', ['-b', bootId, '-n', '80', '--no-pager']);
  return CLEAN_SHUTDOWN.test(tail);
}

function sessionsBefore(ts) {
  const db = new DatabaseSync(DB, { readOnly: true });
  const rows = db
    .prepare("SELECT id, title, time_created AS t, time_updated AS u, version FROM session WHERE time_created < ? ORDER BY time_created DESC LIMIT 3")
    .all(ts);
  db.close();
  return rows;
}

function buildDigest(session) {
  const db = new DatabaseSync(DB, { readOnly: true });
  const parts = db
    .prepare("SELECT m.data AS mdata, p.data AS pdata, p.time_created AS t FROM message m JOIN part p ON p.message_id = m.id WHERE p.session_id = ? ORDER BY p.time_created")
    .all(session.id);
  db.close();

  const lines = [];
  for (const { mdata, pdata, t } of parts) {
    let m, p;
    try { m = JSON.parse(mdata); p = JSON.parse(pdata); } catch { continue; }
    const role = m.role;
    const when = new Date(t).toLocaleTimeString('de-DE', { hour12: false });

    if (p.type === 'text' && p.text && p.text.trim()) {
      const txt = (p.text.startsWith('--') ? p.text : p.text).replace(/\s+/g, ' ').trim();
      lines.push(`[${role} ${when}] ${txt.slice(0, 700)}${txt.length > 700 ? ' …' : ''}`);
    } else if (p.type === 'tool' && p.state) {
      const tool = p.tool;
      const input = JSON.stringify(p.state.input || {}).slice(0, 300);
      let out = '';
      const o = p.state.output;
      if (typeof o === 'string') out = o.replace(/\s+/g, ' ').trim();
      else if (o) out = JSON.stringify(o).slice(0, 220);
      lines.push(`[assistant→${tool} ${when}] ${input}`);
      if (out) lines.push(`    ⇝ ${out.slice(0, 200)}${out.length > 200 ? ' …' : ''}`);
    }
  }

  const body = [
    `# Crash-recovered session: ${session.title}`,
    ``,
    `- session: \`${session.id}\``,
    `- title: ${session.title}`,
    `- started: ${new Date(session.t).toLocaleString('de-DE')}`,
    `- last message: ${new Date(session.u).toLocaleString('de-DE')}`,
    `- recovered from opencode.db (${lines.length} conversation lines)`,
    ``,
    ``,
    ...lines,
  ].join('\n');

  return body;
}

const boots = bootList().sort((a, b) => a.id - b.id);
if (!boots.length) {
  console.log('no journal boots available — skipping crash detection');
  process.exit(0);
}
const currentBoot = boots[boots.length - 1];

const candidate = sessionsBefore(currentBoot.start)[0];
if (!candidate) {
  console.log('no previous session before this boot — nothing to recover');
  process.exit(0);
}

const hostBoot = boots.find((b) => b.start <= candidate.t && (b.end === null || candidate.t <= b.end)) || boots[boots.length - 2];
if (!hostBoot) {
  console.log('could not map previous session to a boot — skipping');
  process.exit(0);
}

const marker = join(OUT_DIR, `.done-${candidate.id}`);
if (existsSync(marker)) {
  console.log(`previous session (${candidate.title}) already recovered — nothing new`);
  process.exit(0);
}

if (hostBoot.id === currentBoot.id) {
  console.log('previous session belongs to the current boot — skipping');
  process.exit(0);
}

if (bootEndedCleanly(hostBoot.bootId)) {
  console.log(`previous boot ended cleanly (${new Date(hostBoot.end).toLocaleString('de-DE')}) — no crash, session "${candidate.title}" not cut`);
  process.exit(0);
}

mkdirSync(OUT_DIR, { recursive: true });
const digestPath = join(OUT_DIR, `${candidate.id}.md`);
writeFileSync(digestPath, buildDigest(candidate));

console.log(`CRASH-CUT SESSION DETECTED`);
console.log(`- session: ${candidate.title} (${candidate.id})`);
console.log(`- host boot ended abruptly (id ${hostBoot.id}, ${new Date(hostBoot.end).toLocaleString('de-DE')}) — no clean shutdown`);
console.log(`- full conversation digest written to: ${digestPath}`);
console.log(`- action: read the digest, fold the important details into MEMORY.md / His Moments,`);
console.log(`  then create the done marker: touch ${marker}`);