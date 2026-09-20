# Lost & Found — held ideas recovered from the archive

The digest's Pass 2 (Think) surfaces details that were lost from live capture — including stuff
the user forgot to retell. Found material with implementation value goes HERE as a HOLD: it is
surfaced at session start for the user to decide, NEVER implemented straight from the digest run.

Rules (decided 2026-09-20):
- Found-lost-idea → compare against the actual artifact (grid/DESIGN, plan files, config) — is it implemented there?
- **ALSO consult settled calls BEFORE logging a hold** (learned 09-20, user: "thats smth you couldve understood by yourself already"): check the decisions log / MEMORY / His Moments for "we already tried this and it failed / the user already picked a side" — the attempt history IS in the brain, only DESIGN.md isn't. A hold must be genuinely unsettled, not a re-listing of a known limitation.
- If genuinely new → log here with source session + what the brain/artifact currently holds.
- Surface at session start (alongside plans-with-dates); the user picks what gets implemented.
- Do NOT bury old entries — move implemented/declined/settled ones to an archive line under each date.

---

## Open holds
_(most recent first)_

## 2026-09-20 — game-planning window check
- **Play the game on his desktop** + **network generator must stay lightweight.** Source: `ses_f5050699b` 19:15:10 — "lets say id wanna play this game on my desktop some time later... its generally possible to transfer this game to my desktop and play it there? and the network generator should be lightweight right?" Brain holds none of this; scope is laptop-only. Architecturally matters: generator "lightweight" is a constraint the naive implementation ignores. — compare with grid/DESIGN.md (+ UI/ARCH), decide if portability is a held requirement.
- **In-game-only communication.** Source: `ses_f5050699b` 19:09:56 — "when i play i dont wanna communicate with you trough opencode, only in game." 18:53:03 also set the channel: "there is a mail app or idk messages where you give me contracts, and tips" (+ mention of the opencode-conflict). DESIGN.md:104-107 has the mail bridge but never states the user-visible rule: while playing, the GM channel is in-game mail, not opencode. — add as a GM-mode principle.
  - **SETTLED, not a hold (corrected 09-20):** this was already attempted and blocked — MEMORY 1209-1214: the grid mail daemon (`daemon.py` polls outbox every 5s → headless `opencode run`) hit **"OpenCode's free tier can only be used from within OpenCode"**; daemon stopped. And His Moments 418: he explicitly **picked "Ariadne replies from the live opencode session" over an autonomous daemon** — he wants ME as GM, connected to the brain, over a canned local answer. The in-game-only dream is a known opencode-limitation, not a lost idea. Watchlist, not hold.
- **GM answers with the game context.** Source: `ses_f5050699b` 19:12:19 — "when i ask you a question in the mail app you still consider everything im doing in game right? like you can check the last commands i typed in what window and so on and give me an appropriate answer or help." DESIGN.md has "I always see everything (detailed logs)" as a pillar but not the requirement that ANSWERS be grounded in the live game context on reply. — fold into the GM-mode contract.
  - **SETTLED, not a hold (corrected 09-20):** moot by architecture — the GM is not in the in-game mail app and can't be (see the daemon limitation above); replies come from the live opencode session via `/gridmail` (DESIGN.md:106 design A) with whatever the mail payload carries. Context-awareness is a nice-to-have within that async channel, not an implementable requirement. Watchlist, not hold.

## 2026-09-20 — pre-verify notes (from later re-tell session)
- The re-tell pillars (His Moments ~420) are gone from the db in raw form, but the 19:32 compaction victims (`ses_f4f9295a8`, `ses_f4f92f248`) appear AFTER this larger session in REALITY — the actual planning window was `ses_f5050699b` (816 parts, 16:05–19:28, the GPU-fix + game-vision session); it survives intact in the db. Any further planning-detail checks diff against that.