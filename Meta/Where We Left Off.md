# Where We Left Off

The single main thing (a task or a conversation) we were focused on when we last stopped. Kept accurate, current, and minimal.

---

## Current main thread

- **Thread:** Crash-recovery system built (his "remember after crash/reboot" request) — then back to Factorio/Steam setup
- **State:** `crash-recover.mjs` detects a crash-cut session via journal boot-end + reconstructs it from opencode.db → digest in `_system/crash-recovery/`; AGENTS.md startup hook added (loads next opencode restart). Live-tested against the 05:04 Factorio session; the important details were recovered and folded (pirate-Factorio-now → buy-on-Steam plan; Steam extraction unfinished at crash; SteamRIP links dead).
- **Next step:** (1) opencode restart to load the AGENTS.md hook (already pending), (2) fix `/etc/systemd/logind.conf.d/lid.conf` — write real content + apply via reboot, NOT a live logind restart, (3) re-run Steam to finish first-run extraction, (4) get Factorio: hunt a live SteamRIP mirror or take the official demo (saves convert to paid).

---

## Archive

- **Thread:** Laptop crash investigation (2026-09-20) — resolved: hard power-cut, "fork systemctl" = uwsm line stuck by logind restart under load; clean reboot 05:37:18.