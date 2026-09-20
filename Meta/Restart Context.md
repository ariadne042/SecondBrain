# Restart Context

Why the plain "where we left off" isn't enough: when the user restarts opencode, the next session must know **that** he restarted and **why** — otherwise the wake-up is blind to the reason and the "restart to load X" thread dies with the old window. This file is the handoff for that. The "why" must never live only in memory — if it's not in this file, it's lost.

**Mechanism:**
- Whenever a restart is needed or requested (config / engine / plugin / command change), **append** to the **Pending** list — timestamp + reason. Markers stack up; never overwrite or drop an earlier pending reason.
- At session start / on `/resume`: if Pending is non-empty, a restart has happened since (this session opened after it). Report **all** pending reasons, then rotate the whole list into the **Log** under the consumed timestamp, and clear Pending.
- One restart satisfies every stacked reason (they all load at the same open). If a reason is *cancelled* (e.g. the change was reverted), remove just that line.

---

## Pending

(none — clean slate)

## Log

- 2026-09-20 09:31 → loaded: **the broken-session restart** (user-forced). The 08:46 "Super: one-row buttons" session was misbehaving — junk after `-- done` (literal `</invoke> </tool_calls>` tags + `▣ Build` footer cards + duplicated tails inside stored message parts), an AI_APICallError at 06:02Z, a 189MB db. Restart was the right call; this session reads clean. Root cause + rule folded into MEMORY 09-20. Also consumed the earlier 07:3x digest-build pending: keybinds (`<leader>d`/`<leader>o`) loaded, `/digest` ready to test, staged raws waiting.

- 2026-09-20 (morning open) → loaded, all three consumed by today's fresh start: **Crash-recovery check** hook (crash-recover.mjs), **Digest layer** (session-digest.mjs --list/--digest/--grep + /digest command + Digest-sweep & Conversation-archive startup bullets), **Raw-db archive** (db-backup.sh → opencode-db-archive). NOTE: the backup repo was created and the first snapshot pushed the same night (06:14, post-crash, while the user was still up) — the pending "user action" note is resolved; db-backup.sh runs from /save now. Crash-recovery also fired on today's open (the 05:38–06:16 session was cut by the power loss at 06:16:21); its content self-logged into MEMORY live, marker touched.

- 2026-09-20 (morning open) → loaded, all three consumed by today's fresh start: **Crash-recovery check** hook (crash-recover.mjs), **Digest layer** (session-digest.mjs --list/--digest/--grep + /digest command + Digest-sweep & Conversation-archive startup bullets), **Raw-db archive** (db-backup.sh → opencode-db-archive). NOTE: the backup repo was created and the first snapshot pushed the same night (06:14, post-crash, while the user was still up) — the pending "user action" note is resolved; db-backup.sh runs from /save now. Crash-recovery also fired on today's open (the 05:38–06:16 session was cut by the power loss at 06:16:21); its content self-logged into MEMORY live, marker touched.

- 2026-09-17 ~20:2x → loaded (this fresh session): new **GM agent** `~/.config/opencode/agent/gm.md` written (primary agent, full grid+SecondBrain perms, GM persona). Restart consumed on 2026-09-17; next: Tab → GM, run from `/home/user/grid`, `./grid.sh`.

- 2026-09-17 19:55 (fresh open) → loaded: session was killed by a **compaction error** (user-reported; same free-tier compaction/title-gen gate that already hit the build session 17:26–17:30). The two `09-17T17:32` GAP sessions in flags.md are its victims — 3 msgs each, thread:no + moments:no, content lost. Grid mail design A itself landed in MEMORY (09-17), so the build survived.

- 2026-09-05 (fresh open) → loaded: find-#6 shape fix — brain-audit.ts load/save round-trip BOTH manifest shapes now (`load` = `parsed.sessions || parsed`, `save` = `disk.sessions || disk`). Before the fix the survival check FAILED: save wrote a bare map, load read the `{sessions:{...}}` wrapper, so the post-flatten first save purged the whole ledger. The `f92096b6 -> OK, resolved` repair (once claimed 4× but never committed) was committed for real. Remaining: confirm `f92096b6` reads `OK/true` and survives idle cycles.

- 2026-09-05 (fresh open) → loaded: brain-audit.ts `writeFlags()` reclaim fix — premature pause-verdicts now retract from flags.md the moment the session resumes. Cosmetic; no content ever lost.

- 2026-09-05 (fresh open) → loaded: the sweepOnLoad dirty-pollution fix — `dirty.add` now only fires when a verdict is actually established, so pre-existing sessions aren't instance-owned and the dirty overlay can't re-write them from stale memory. The `f92096b6 -> OK, resolved` repair (commit `fef377c`) should now survive permanently; verify in this window.

- 2026-09-05 (fresh open) → loaded: the brain-audit.ts `saveManifest` clobber fix — the plugin now starts from the disk copy and overlays only the ids *this instance changed* (dirty set) instead of rewriting whole memory state. That wholesale rewrite was why the build-session repair (`EMPTY->OK`) failed twice. After restart: the committed manifest repair (`f92096b6 -> OK, resolved`) should survive permanent and the live instance stop flipping it in the working tree. Remaining: confirm the repair sticks + live check passes clean.

- 2026-09-05 (fresh open) → loaded: brain-audit.ts logic fix (sweep deferral + cumulative counters + EMPTY reopenable) now live. Remaining from this pending: re-apply/verify the manifest repair for the 09-04 build session (verdict EMPTY->OK, flags resolved) + confirm the live check passes clean.

- 2026-09-04 ~21:50 → loaded: the FULL audit build went in and needs a restart to load: new `brain-audit.ts` plugin (capture-integrity — heartbeat, 3-state verdicts, flags.md) registered in opencode.jsonc; `ariadne-autosave.ts` tz fix (local date instead of UTC); `sync.sh` now backs up MEMORY.md/.last-saved-thread into git-backed `_system/backup/`; AGENTS.md startup got audit-flag + heartbeat + timeline + weekly-synthesis + bounded-read steps; `_system/tools/retire-memory.mjs` + `_system/archive/` created. After restart: plugin loads, sweep rules over any window that ended since, flags.md goes live.

- 2026-09-04 ~01:00 → loaded: new `/save` command added (`~/.config/opencode/commands/save.md`): clean full-save (Where We Left Off + flush moments + git sync). Also AGENTS.md morning/evening routine changed same night (Evening Thread).

- 2026-09-04 ~01:40 → loaded: **Machine.md file deferred to tomorrow** (design approved, not yet written): `~/SecondBrain/Meta/Machine.md` — durable system facts (de keyboard, Intel iGPU, fish shell, tz Europe/Berlin, 7.6Gi RAM, 1366px), config map, and the fix log seeded with solved gotchas (wlogout, hl.dsp.*, de-keybind, permission matcher, autosave guard, WWAN -110, logind restart). Write it today; full shape already shown to user, they delegated content to me and said "finish tomorrow."

- 2026-09-03 02:45 → loaded: plugin change — fixed the dead `lastSavedThread` guard in `ariadne-autosave.ts` (in-memory idle-quieting now actually runs; `.last-saved-thread` no longer rewritten on every tick).

- 2026-09-03 01:34 → loaded: AGENTS.md daily check-in re-anchored to the waking day (~10am) instead of midnight rollover; late-night pre-sleep sessions now open light, never a full rich check-in.

- 2026-09-03 01:34 → loaded: AGENTS.md daily check-in re-anchored to the waking day (~10am) instead of midnight rollover; late-night pre-sleep sessions now open light, never a full rich check-in.

- 2026-09-02 03:20 → loaded: plugin dedup fix + AGENTS.md behavior additions (growth loop, logic audits, restart-context rule). Consumed this session.
- 2026-09-02 02:35 → loaded: engine rewrite (memory-first + growth loop). Restart confirmed by the session that opened after it.
