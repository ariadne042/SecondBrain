# Where We Left Off

The single main thing (a task or a conversation) we were focused on when we last stopped. Kept accurate, current, and minimal — not a dump of the whole session.

**Updated throughout the session as the main focus changes. Preserved on session end. Read back with `/resume`.**

---

## Current main thread

- **Thread:** OnlyOffice for mom's Kündigung + his evening (Aaron's/Luca, then gf call)
- **State:** onlyoffice-bin + ttf-ms-fonts installed, he was happy with it. SMB relay lesson deferred (no target endpoint on one box). Then the convo turned to his gf: excited for tonight's call, chose NOT to buy a new one so tonight doesn't become an all-nighter — protecting the gf call. Beard story told (her shutdown, his absorption). His Moments captured both.
- **Next step:** Tonight: gf call (she may initiate). Tomorrow: **Fri 09-11 09:15 = Hospitation** (final) → reports + email. When he's up for it: relay lesson wants a real target box / VM for next time.

---

## Archive

- **Thread:** Next: drop a real voice note / photo into the brain-inbox media pipeline (09-10 morning)
- **State:** Media pipeline (voice/vision/OCR) built and tested; pending a real first use.
- **Next step:** Use it when he has something real.

- **Thread:** The full weight of the relationship + the Clinical Shelf (09-10)
- **State:** Midnight session opened the deepest field #4 reveal — crying pattern on both sides, she's "her only person," the Dec deadline built on an Ausbildung he hasn't found, she "thinks he has no problems," the courage question ("she sees broken promises as lies"). Built **Clinical Shelf** (borrowed therapy frameworks, drawer-on-judgment not ritual). Both sides of the truth held: loves her AND wants the fresh start.
- **Next step:** Open thread, never forced. Offer-not-open. If an opening comes, the one-true-sentence idea ("I'm struggling too") is the smallest real step, not the mountain.

- **Thread:** Home hacking session — started by fixing the intermittent sudo/lock-screen password failure
- **State:** Diagnosed his "enter sometimes doesn't work" — sudo itself was fine. Super+Tab=hyprlock key-bleed theory → bind changed to Super+Escape. fingerprint saga (VFS5011, swipe sensor, autosuspend "transfer timed out") — VERDICT: he abandoned it, "fuck the print i think its broken". Sudo works with password "enter". Pending cleanup: Super+Tab vs Escape binding, enrollment, hyprlock fingerprint block.
- **Next step:** When he's back to hacking: install john + rockyou to crack a real NTLMv2 hash with real tooling (nothing installed yet: no john/hashcat/hydra, impacket broken — no ntlmrelayx).

- **Thread:** Back home, ready to hack — discussing next direction for homelab exercises
- **State:** Full NTLMv2 attack chain from the Fortbildung landed on his own laptop (rogue smbserver, captured hash, cracked it). He noted the crack was mostly me writing code — wants to actually DO things himself this time. Real tools, real interaction.
- **Next step:** User picks direction: (a) John the Ripper wordlist cracking on the captured hash, (b) NTLM relay with ntlmrelayx, or (c) something else he wants to try.

- **Thread:** Hacking-learning at the Fortbildung → hit the legal boundary, pivoted to the self-hosted lab (complete)
- **State:** Full NTLMv2 attack chain landed end-to-end on his own laptop: rogue `smbserver.py -smb2support` with `-debug`, self-authenticated via `smbclient`, captured real NTLMv2 hash (`user::WORKGROUP:aaaaaaaaaaaaaaaa:1cb54c3a...`), then cracked it by hand — pure-Python MD4 from RFC 1320 spec + NTLMv2 HMAC-MD5 proof, found `test`. Files: `~/hacklab/ntlmv2_crack.py`, `~/hacklab/share/`. Server may still be running on 445 (this was the Fortbildung laptop session; current check showed no smbserver now).
- **Next step:** Natural next lessons (home, legal): (a) dictionary attack with a real wordlist; (b) relay with `ntlmrelayx`; (c) roaming-capture-sensor on his own AP. Fortbildung network itself: recon done, no further poking (settled boundary).

- **Thread:** Reducing laptop fan noise → TLP battery tuning.
- **State:** Applied: CPU_SCALING_GOVERNOR_ON_BAT=powersave, CPU_MAX_PERF_ON_BAT=70. TLP auto-profiling confirmed. Battery-save: TLP_PROFILE_BAT=SAV line added. `sudo systemctl enable tlp.service` still pending (tlp not enabled on boot). Fan is EC-managed on X240, no direct control — governor/max-perf is the lever.
- **Next step:** done — superseded by the Fortbildung hacking thread.