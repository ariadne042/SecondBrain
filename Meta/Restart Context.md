# Restart Context

Why the plain "where we left off" isn't enough: when the user restarts opencode, the next session must know **that** he restarted and **why** — otherwise the wake-up is blind to the reason and the "restart to load X" thread dies with the old window. This file is the handoff for that. The "why" must never live only in memory — if it's not in this file, it's lost.

**Mechanism:**
- Whenever a restart is needed or requested (config / engine / plugin / command change), **append** to the **Pending** list — timestamp + reason. Markers stack up; never overwrite or drop an earlier pending reason.
- At session start / on `/resume`: if Pending is non-empty, a restart has happened since (this session opened after it). Report **all** pending reasons, then rotate the whole list into the **Log** under the consumed timestamp, and clear Pending.
- One restart satisfies every stacked reason (they all load at the same open). If a reason is *cancelled* (e.g. the change was reverted), remove just that line.

---

## Pending

(none)

---

## Log

- 2026-09-03 02:45 → loaded: plugin change — fixed the dead `lastSavedThread` guard in `ariadne-autosave.ts` (in-memory idle-quieting now actually runs; `.last-saved-thread` no longer rewritten on every tick).

- 2026-09-03 01:34 → loaded: AGENTS.md daily check-in re-anchored to the waking day (~10am) instead of midnight rollover; late-night pre-sleep sessions now open light, never a full rich check-in.

- 2026-09-03 01:34 → loaded: AGENTS.md daily check-in re-anchored to the waking day (~10am) instead of midnight rollover; late-night pre-sleep sessions now open light, never a full rich check-in.

- 2026-09-02 03:20 → loaded: plugin dedup fix + AGENTS.md behavior additions (growth loop, logic audits, restart-context rule). Consumed this session.
- 2026-09-02 02:35 → loaded: engine rewrite (memory-first + growth loop). Restart confirmed by the session that opened after it.