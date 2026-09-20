# Where We Left Off

The single main thing (a task or a conversation) we were focused on when we last stopped. Kept accurate, current, and minimal.

---

## Current main thread

- **Thread:** Restart forensics — "something was broken" in the 08:46 wlogout session, he restarted me 09:31
- **State:** Diagnosed. Root cause: transcript pollution in the raw db (literal tool-call tags + `▣ Build` footer cards + duplicated tails stored INSIDE message parts after `-- done`), plus one `AI_APICallError: Internal server error` in that window. Not a model logic crash — a stream/store issue; restart was right, this session reads clean. Rule for every turn: `-- done` = last text, literally; anything after = flag + check db, never argue "just display" without checking stored parts.
- **Also landed/verified:** wlogout one-row fix committed (`-b 4 -c 20 -r 20 -L 443 -R 443`, `#suspend` rule, crescent moon icon, compact centered NOT edge-to-edge). Stable state confirmed on disk.
- **Next step:** lift the `-- done` rule into AGENTS.md (Done-signal section) so every future session auto-enforces it — the one structural fix this anomaly exposed. Then return to the standing agenda: test `/digest` (staged raws waiting: crash session + Factorio session), then the future-of-the-brain-and-Ariadne planning talk + the owed "Ariadne's Hosting/Roadmap" doc. IRL still: Steam first-run extraction, Factorio (buy-when-able).

---

## Archive

- **Thread:** Super: one-row buttons, reboot fix, moon icon (08:46–09:30) — wlogout one-row + moon icon + lid.conf verified; superseded by the forensics thread above. The lid.conf fix WAS the correct clean-reboot apply (effective config shows all 3 `ignore`); the crash-recover "no clean shutdown" flag on that boot is a known false-positive from `Failed unmounting /var/cache` at 08:45:17 (see MEMORY 09-20).
- **Thread:** `/digest` redesign — from fold-machine to his deep-thinking mode (design discussion, 09-20) — built same day; superseded by the build entry above.
- **Thread:** The Versicherung layer (build is complete) — opencode restart then Factorio/Steam
- **State:** Three insurance layers live + tested: crash-recover.mjs, session-digest.mjs + `/digest`, db-backup.sh → `ariadne042/opencode-db-archive` (first snapshot pushed 09-20 06:14). 58 undigested sessions still queued.
- **Next step:** restart opencode (done 09-20 morning — all hooks loaded); then lid.conf, Steam extraction, Factorio.

- **Thread:** Laptop crash investigation (2026-09-20) — resolved: hard power-cut, "fork systemctl" = uwsm line stuck by logind restart under load; clean reboot 05:37:18. Crash-recovery built from it.
- **Thread:** Crash-recovery system built (his "remember after crash/reboot" request), 2026-09-20 — superseded by the full Versicherung build.