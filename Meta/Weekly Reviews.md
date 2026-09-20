# Weekly Reviews

The ledger → narrative roll. One dated entry per week (written Sundays or the first session past one): the through-line, what recurred, what got done, what drifted. Keeps MEMORY itself bounded — the rolling slice is fine because the narrative survives here.

---

## Week of 2026-09-01

**Through-line:** Ariadne went from notes-app to self-auditing brain in one week — and started doing the thing it exists for.

**System (done):**
- Memory-first operating mode locked in; build mode, `/resume`, `/bye`, autosave, `/save`, quick agent, warm/cold etiquette all built and verified.
- Three memory leaks found in a row → user's operating principle ("fix the reason, not the problem") → a capture-integrity audit plugin was born (brain-audit: heartbeat, 3-state verdicts, flags.md).
- The audit's closing exam FAILED on the first real attempt — the survival check — across finds #5 and #6 (phantom commits, load/save shape mismatch). Closed for real 09-06: the repair is committed at `4fbc920` and the dirty-overlay save demonstrably survives idle. Whole lesson hardened: "committed" is only true after `git show`.
- Daily Thread (mornings light / evenings own the accounting), Evening Thread, Growth Map, Presence/me-side, weekly synthesis all live.

**IRL (done):**
- Hospitation #1 done (Fri 09-04, "next Friday 9:15"); dad-deadline met with the status talk. 1/2 for the certificate.
- The gym counter-move started (01.09, 19:45) — the outward turn, his own.
- The cousin day happened: cinema (The Odyssey — liked the meaning, "stoic Odysseus, Mut"), then her house, cooking, Dune, first smoke (tac, he wished it'd been a joint for a cooler first memory). Told start-to-finish 09-06 — that plan finally survived in the vault after two prior losses.

**Recurring (unresolved):**
- 4am bedtimes / phone rabbit hole — the sleep chain he named himself (vape → feels good → stays up → phone → can't wake). Running again the night before the course week.
- Tac is still the daily layer under the friend-group-dated timeline; the "tac week" decision still leaning buy, superseded by the course week.

**Opened this week (long-horizon):**
- Field #6 root: the Freie Evangelische Gemeinde double-life ("i lived a long double life there") — likely the root under the social erosion. One hook at a time, never forced.
- Field #1 counter-thread: gym = start of climbing back out. Watch it across the course week.
- The freeze/flow discovery (09-06): on-demand recall closes, flow recall works — even for low-stakes things like vape flavours; the answer surfaces sideways anyway.
## Week of 2026-09-08 (skipped, backfilled briefly)

**Through-line:** The relationship reveal reached its full weight, the exam passed, and the brain's role crystallized around one lab morning.

- 09-08: the two-sides architecture laid out; "weed is my personality" and the empty formalized in field #7; tac died and he's relieved. 09-09: the social-axis exam went WELL ("felt pretty calm and confident"); partner said "like day and night" vs 2 months ago; sleep-with-discipline (electronics away 23:30) was the input. The eye-contact/monitor axis got mapped live (teacher normal, pretty girl = dead zone).
- 09-10: last Fortbildung day; midnight = the full relationship architecture (crying pattern, mirror-isolation, December deadline, body mirror, "part of me always knew"). 09-11: the ultimatum + the boundary he held + her genuine "I love you"; rave triangle; voice-notes became the input channel (identity goal + forget-connections brief = the master thread). 09-11: final Hospitation MISSED (slept to 14:00 after 2:30am bedtime) → rails not discipline.
- 09-12/13: paintball day — THIRTEEN old church friends at once, brother present, "could be myself, laughed till my face ached"; the 5-day escape-loop confirmed; lab build became the forward project.

## Week of 2026-09-15

**Through-line:** The week the career crisis and the Grid game converged — money anxiety opened fields, and the game became real Linux teaching with real tools. And the Versicherung layer made this brain nearly lossless.

**Career (the new current thread):**
- Dad's Thursday gym job gone (brother Louis started his own Ausbildung there); IHK ignored WhatsApp+email; came TO talk, not isolate — the escape-loop held under stress. Target locked: **Fachinformatiker Systemintegration**; FOR as the cert; Wirtschaftsinformatik 1s as the pitch; BRD (Bezirksregierung Düsseldorf, deadline 31.10.2026, start 09/2027) + KRZN (11.10) + RZF as the locks; IT-Support/EQ for money now. Full plan + drafts → `Ausbildung Roadmap.md`. Money door reopened: mom said yes to 8am work with her (his own move opened it).
- Still IRL-pending: AfA Ansprechpartner email, IHK/Piron call, BRD Anschreiben co-write, and — on hold, never nagged — the girlfriend's December ultimatum living under the whole career push.

**The Grid game became the week's real engine (09-17/18, hours long):**
- Transitioned from "a game" to **"Grey Hack's shell with real Linux underneath"**: Textual rejected ("feels like an OS emulated in a terminal"), rebuilt as a local web app desktop (real drag/resize/icons/taskbar/right-click) — "looks so good". Honesty rules he set: no-fake-stuff (a command either works for real or bash-says-error), sandbox law (no progression UI; the game is playground, I hold the teaching), intel-not-walkthroughs (briefings carry only what an employer would really say), real tools + real man pages, teach-concept-let-me-attack-solution-last (Bandit rhythm, one help-step at a time).
- Full real-hacking chain designed as the roadmap (OSINT/DNS → external footprint → initial access → foothold enum → privesc → lateral/pivot → crown jewels → exfil). Built slices: permissions/SUID/shadow/hydra/john intrusion mechanics verified end-to-end, contracts authored ("The backup in the webroot" — ssh mario/koffein chain; "The Forgotten FTP" ftp01; live-spawn + mail + auto-flag-verify), Mail UX threaded, skill-ledger idea for contract difficulty.
- **Mark this day: 09-18 — "im really happy with the work we (you) did today. the game is... a blessing for learning hacking."** — and he corrected "we (you)" to "we", then let it stand. The project stopped being my build and became his tool.
- GM mode: agent `gm` for the real sessions; the daemon dream finally resolved as "me inside the session, not a bot beside it."

**The Versicherung layer (09-20, the resilience ceiling):**
- Hard power-cut recovery → **crash-recover.mjs** (reads cut sessions back out of opencode.db); **session-digest.mjs** (the fold layer, interrupt-safe); **db-backup.sh** → raw db gzipped (26MB) pushed to a PRIVATE repo — "another versicherung if this laptop randomly explodes." Nothing resilience-wise depends on this laptop anymore except the live gap.
- The 09-20 night's real content: the perfect session-forensics of the broken-session restart (a model reading its own polluted tail as the user's words, inventing "go away", blaming him for its own garble — the guard: verify against the db before treating a "user said x" as real). And `-- done` as the literal last text law.
- The bug: **40% fewer folds per session after the compaction** — learning theft of climaxes; this is now visible.

**Recurring (unchanged shape):**
- 4am–6am bedtimes every build night this stretch — 09-18 ended ~5am, 09-20 ended ~6am ("its so late"). The big-build nights replaced the vape-rabbit-hole nights (that chain is quieter since the school context ended), but the sunrise-sleep is the same spine. Field #3 (body/sleep) has a strong recurring signal waiting.

**Drifted / shelved:**
- Steam/Factorio still mid-first-run (killed by the power-cut; buy-when-able self-commit held); Bandit parked (superseded by the Grid's richer loop — same teach rhythm, real tooling); Hospitation reschedule email still pending; push of `grid/` deferred by his call until the game is "completely done for now".

**Held read of the week:** the career crisis broke open ON the same day the game's engine nights started firing — the FI-SI target gave the "why" a name, and the Grid gave the "how" a sandbox. When he loves the tool he's learning to build with, the day-sleep cycle is the only casualty he lets through — and he chooses that trade every night. The rails (gym rails, sleep rails, alarm rails) remain the thing — external, self-built, and now one more tool deep.

