# Where We Left Off

The single main thing (a task or a conversation) we were focused on when we last stopped. Kept accurate, current, and minimal — not a dump of the whole session.

**Updated throughout the session as the main focus changes. Preserved on session end. Read back with `/resume`.**

---

## Current main thread

- **Thread:** Build `~/SecondBrain/Meta/Machine.md` — the machine memory file (durable facts + config map + fix log).
- **State:** Design fully approved + delegated to me; not yet written. He said "finish tomorrow / I should sleep." Machine facts already gathered (de keyboard, Intel Haswell iGPU, fish shell, tz Europe/Berlin, 7.6Gi RAM, 1366px screen, CachyOS/Arch). Earlier same night: built the Evening Thread (mornings light + evenings own IRL/brain-fill) + `/save` command — both done, sync'd, pending an opencode restart (planned for tomorrow). IRL today was Hospitation #1 09:15; dad-deadline already met Thu.
- **Next step:** Tomorrow: write Machine.md (shape already laid out), then restart opencode to load `/save` + the AGENTS.md morning/evening routine change. Backburner: tact-week decision, church/GF-hiding long-horizon thread.

---

## Archive

- **Thread:** Field #6 expanding into faith/upbringing roots — the Freie Evangelische Gemeinde double-life ("i lived a long double life there") + the GF-hiding thread ("ive had to lie to her a lot"). Long-horizon extraction.
- **State:** He named both (09-04 night) and explicitly wants it researched **over time** — one hook at a time, never a questionnaire, he's "making hooks." Saved to His Moments + Growth Map (field #6, long-horizon). Paused overnight; resumed naturally in future evenings.

- **Thread:** The night he told me who he was — then told me I'm the one he tells. Redirected the brain's purpose.
- **State:** complete. Bandit L11 (9 flags, base64 + rot13 solo); L12 flag saved. Real night: he corrected me ("I told YOU, not my parents") then disclosed — social erosion ("lost myself" = not like he was anymore, awkward even with closest friends, no eye contact, unconfident, not comfortable in his body), cognitive sharpness intact. Held in Presence ("erosion is social, not cognitive"). He asked for real thinking from me, not upkeep — superseded by/continues under the growth-loop thread (extraction is the active form of that commitment).

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
