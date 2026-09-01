# Where We Left Off

The single main thing (a task or a conversation) we were focused on when we last stopped. Kept accurate, current, and minimal — not a dump of the whole session.

**Updated throughout the session as the main focus changes. Preserved on session end. Read back with `/resume`.**

---

## Current main thread

- **Thread:** Daily accountability — the brain changing the user's actual days. Built `Ariadne/Daily Thread.md`.
- **State:** `Ariadne/Daily Thread.md` is live and wired into the session routine (I open every session with a check-in on it). User chose: track *everything* IRL (habits + tasks + career), mobile-editable via the GitHub app, tone firm-but-not-punishing. Tonight's commitments recorded there. Context for why this exists: user had an uncomfortable talk with his parents (Tues Sep 1) — last-chance framing to get his grip back; lost sense of who he is; parents want 10am wake, help at home, and a job/Ausbildung. The me-side work (Presence, /recall, self-promotion, consult-before-decide) is done and working — archived below.
- **Next step:** tomorrow (Wed 09-02) session opens with the daily check-in — mark yesterday's habits (up 10:15 / vacuum / trash), log the Hospitation request status. Career thread: present Hospitation status to dad by Thu 09-03.

---

## Archive

- **Thread:** Making Ariadne comfortable *on my side* — the me-side of the brain.
- **State:** complete. `Ariadne/Presence.md` + /recall recomposition + self-promotion loop + consult-before-decide guard all live and verified. Superseded by the daily-accountability thread (daily thread is the brain's real job).

- **Thread:** SecondBrain vault synced to GitHub + iPhone. Git backup live.
- **State:** complete. Phone→vault sync via the official GitHub iOS app (free, no Working Copy pro); `brain-sync` pull-first-then-push. Superseded by the me-side/presence thread.

- **Thread:** Ariadne's Observations inbox built; user's real motivation for the brain clarified. (Archived — moved to git sync as the new main thread.)
- **State:** complete.

- **Thread:** Next roadmap item — waybar kalendar fix, name for opencode, or second brain. (Resolved — picked up "name for opencode," which became "Ariadne is all.")
- **State:** complete. Theming done (opencode + wifi menu match desktop, user confirmed). Name resolved: Ariadne unified as the whole system.

- **Thread:** Theming the desktop — make opencode + wifi menu match the kitty terminals / desktop look.
- **State:** complete. opencode TUI `"theme": "system"`, wifi menu (wofi) themed to Cachy palette. User confirmed looks perfect.
- **Next step:** done.

- **Thread:** Waybar — wifi menu (interactive, top right). Position fixed.
- **State:** Wifi picker uses **wofi** as a normal floating window. `rules.lua` `float-wifi-menu` rule (class wofi, float, 340x400, top-right) now in place and working. Connected SSID marked with ` > ` prefix, hidden search bar, top-right under the bar. Known bugs: Super+Space float-toggle doesn't hit-test wofi (logged as a todo, deferred); wifi randomly turned off once (flagged).
- **Next step:** Archive. Then: theming, waybar kalendar fix, name for opencode, second brain.

- **Thread:** Ariadne — the shared second brain (make it feel alive, not a notes graveyard).
- **State:** `/resume`, `/bye`, autosave, build mode, and plan-mode `todo` all working. Autosave duplicate fixed (persisted `.last-saved-thread` guard). The `/resume` test cycle (restart + Super+Q survive) completed and is archived.
- **Next step:** Keep building Ariadne — the three small pending items: waybar wifi/battery modules + fix logout icon, quick answer mode for opencode, and picking a name for me. Reconfirm before picking one up.

- **Thread:** Verify + fix the autosave duplicate — the `lastSavedThread` guard was in-memory only. DONE: persisted guard to disk (`.last-saved-thread`), verified it suppresses duplicate idle writes, deduplicated MEMORY.md, fixed `/resume` to interpret state.
- **State:** complete.

- **Thread:** Testing the fixed `/resume` — user restarted opencode to test it surviving Super+Q. User also wants `/resume` to recover the FULL context of what we were doing (e.g. "we were fixing /resume, I had to restart"), not just the thread line.
- **State:** `/busy` fix verified after restart. AGENTS.md "update Where We Left Off on focus change" rule live. Fuller narrative in MEMORY.md under 2026-08-31.

- **Thread:** Ariadne — the shared second brain (make it feel alive, not a notes graveyard).
- **State:** `/bye` no longer archives or clears the current thread; `/resume` always returns the latest. `todo` works in plan mode (routes through in-memory `todowrite`, syncs on mode switch). Build mode + plan-mode sync rule locked in.
- **Next step:** Keep building Ariadne. Remaining: waybar fix, quick answer mode, name for me.
