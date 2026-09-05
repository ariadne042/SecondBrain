# Restart Context

Why the plain "where we left off" isn't enough: when the user restarts opencode, the next session must know **that** he restarted and **why** — otherwise the wake-up is blind to the reason and the "restart to load X" thread dies with the old window. This file is the handoff for that. The "why" must never live only in memory — if it's not in this file, it's lost.

**Mechanism:**
- Whenever a restart is needed or requested (config / engine / plugin / command change), **append** to the **Pending** list — timestamp + reason. Markers stack up; never overwrite or drop an earlier pending reason.
- At session start / on `/resume`: if Pending is non-empty, a restart has happened since (this session opened after it). Report **all** pending reasons, then rotate the whole list into the **Log** under the consumed timestamp, and clear Pending.
- One restart satisfies every stacked reason (they all load at the same open). If a reason is *cancelled* (e.g. the change was reverted), remove just that line.

---

## Pending

- 2026-09-05 02:30 → needs restart to load the brain-audit.ts logic fix (sweep deferral + cumulative counters + EMPTY reopenable). Also after restart: re-apply/verify the manifest repair for the build session (clobbered by the running old-code plugin; content verified survived, verdict EMPTY->OK). The flags/manifest re-write at 02:29 was the old plugin still alive — expected.

---

## Log

- 2026-09-04 ~21:50 → loaded: the FULL audit build went in and needs a restart to load: new `brain-audit.ts` plugin (capture-integrity — heartbeat, 3-state verdicts, flags.md) registered in opencode.jsonc; `ariadne-autosave.ts` tz fix (local date instead of UTC); `sync.sh` now backs up MEMORY.md/.last-saved-thread into git-backed `_system/backup/`; AGENTS.md startup got audit-flag + heartbeat + timeline + weekly-synthesis + bounded-read steps; `_system/tools/retire-memory.mjs` + `_system/archive/` created. After restart: plugin loads, sweep rules over any window that ended since, flags.md goes live.

- 2026-09-04 ~01:00 → loaded: new `/save` command added (`~/.config/opencode/commands/save.md`): clean full-save (Where We Left Off + flush moments + git sync). Also AGENTS.md morning/evening routine changed same night (Evening Thread).

- 2026-09-04 ~01:40 → loaded: **Machine.md file deferred to tomorrow** (design approved, not yet written): `~/SecondBrain/Meta/Machine.md` — durable system facts (de keyboard, Intel iGPU, fish shell, tz Europe/Berlin, 7.6Gi RAM, 1366px), config map, and the fix log seeded with solved gotchas (wlogout, hl.dsp.*, de-keybind, permission matcher, autosave guard, WWAN -110, logind restart). Write it today; full shape already shown to user, they delegated content to me and said "finish tomorrow."

- 2026-09-03 02:45 → loaded: plugin change — fixed the dead `lastSavedThread` guard in `ariadne-autosave.ts` (in-memory idle-quieting now actually runs; `.last-saved-thread` no longer rewritten on every tick).

- 2026-09-03 01:34 → loaded: AGENTS.md daily check-in re-anchored to the waking day (~10am) instead of midnight rollover; late-night pre-sleep sessions now open light, never a full rich check-in.

- 2026-09-03 01:34 → loaded: AGENTS.md daily check-in re-anchored to the waking day (~10am) instead of midnight rollover; late-night pre-sleep sessions now open light, never a full rich check-in.

- 2026-09-02 03:20 → loaded: plugin dedup fix + AGENTS.md behavior additions (growth loop, logic audits, restart-context rule). Consumed this session.
- 2026-09-02 02:35 → loaded: engine rewrite (memory-first + growth loop). Restart confirmed by the session that opened after it.