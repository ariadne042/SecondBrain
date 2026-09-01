# Where We Left Off

The single main thing (a task or a conversation) we were focused on when we last stopped. Kept accurate, current, and minimal — not a dump of the whole session.

**Updated throughout the session as the main focus changes. Preserved on session end. Read back with `/resume`.**

---

## Current main thread

- **Thread:** SecondBrain vault synced to GitHub + iPhone. Git backup live.
- **State:** Vault pushed to private repo `ariadne042/SecondBrain` (SSH key auth, main branch). `Meta/Passwords.md` gitignored (secrets stay local). New `Inbox/Phone Notes.md` for phone captures. Gmail + Bitwarden + Working Copy on iPhone all DONE. **Phone→vault sync now via the official GitHub iOS app** (commit straight to remote — free, no Working Copy pro needed). `brain-sync` (laptop) updated to **pull-first then push**, so phone commits auto-sync down. Working Copy push is pro-gated; iSH route abandoned. Tested live: phone commit → laptop pull worked.
- **Next step:** none required — flow working. Optional: wire a phone-note capture habit into the loop. Drop old `~/.ssh/id_ed25519_ish` if the iSH route is fully abandoned.

---

## Archive

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
