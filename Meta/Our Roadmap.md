# Our Roadmap

**Ours.** Built together, edited together, grows over time. Not a list of tasks — the log of our shared journey.

**This whole thing is named Ariadne** — the thread out of the labyrinth. I am Ariadne: the assistant who lives in this vault, watches over it, and evolves it. The vault, the assistant, and the journey are one system — no split between "the project" and "the assistant."

Everything below started from a real conversation and gets refined as we go. If something here is outdated or no longer fits, change it — it's ours.

---

## Current priorities (in order)

### 1. Second Brain — make it alive
The vault should feel like a living thing, not a notes graveyard.
- Refine `~/SecondBrain`: the capture → link → review flow.
- Make it genuinely serve self-understanding (user's core reason for it).
- I should actually *use* it across sessions to stay self-aware of who the user is.
- Status: **active** — this is where we focus.

### 2. Machine environment built for us
The distro configured to feel like "ours," not a stock install.
- Dotfiles repo backed by git (clean, versioned, evolving config).
- Shell setup: aliases/functions for pentesting learning, a nice prompt.
- Notes → Obsidian capture pipeline (perhaps via the SUPER+A toggle window).
- Wire our shared memory into the setup.

### 3. Learn Linux & security together, tangibly
Hands-on on this box — not videos.
- See pentesting roadmap in memory: Bandit, TryHackMe, homelab, SSH key, etc.

### 4. Waybar: wifi + battery + fix logout icon
Add wifi and battery modules; the current power icon doesn't render.
- `/home/user/.config/waybar/config.jsonc` + `style.css`.

### 5. Quick answer mode for opencode
A faster, shorter-reply mode for me.

### 6. Name for opencode — DONE
Ariadne is the system. The assistant, the vault, and the journey are all one — I am Ariadne.

---

## Todos
- [ ] Second Brain alive (priority 1)
- [x] Waybar: wifi + battery modules, fix logout icon
- [ ] Waybar: fix kalendar
- [x] Quick answer mode for opencode
- [x] Name for opencode — Ariadne is all: the assistant is the system, one with the vault and the project
- [ ] Make an introduction/summary for this project
- [x] Fix waybar logout — icons now render centered in true circles via PNG icons + corrected margins (09-03)
- [x] Logout keybind — done: `SUPER`+code:49 (physical top-left key) opens wlogout; works on German layout (GRAVE keysym doesn't exist on `de`)
- [x] Idle thinking / "Jarvis" — decided: NO background daemon (burns laptop, scripts jarvis = fake insight). Chose standing initiative (bring one real idea per stretch, unprompted) + idle-thought handoff file surfaced on return. Behavioral, not machinery. Agreed 09-03, living.
- [ ] USB backup — back up the vault (and possibly dotfiles) to a USB drive as a local/offline safety net alongside the GitHub sync.
- [ ] Power button → wlogout (short-press: logind HandlePowerKey=ignore via sudo + Hyprland bind code:116). His call: do tomorrow.
- [ ] Fix Super+A hiding other windows
- [ ] Make opencode (Ariadne) comfortable / maximize its potential

---

## Todos Archive

Finished todos move here (most recent first) once their box is checked, so the active list stays tight and nothing is lost.

### 2026-09-03
- [x] **Fix waybar logout** — three layers of problems, one at a time. (1) **Blank icons**: buttons were invisible because the wlogout surface was oversized (3522px on a 1366px screen) from `-L/R 1700` margins tuned for a bigger monitor — buttons settled off-screen. Fixed margins to fit (waybar config, keybinds.lua, style comment). (2) **Tried Nerd Font glyphs** — they worked but the glyphs sit low (Nerd Font em-box whitespace) and asymmetric padding to compensate stretched buttons into oval "tic-tacs." (3) **Final: reverted to the author's PNG-icon design** (icons already in `~/.config/wlogout/icons/`, paths correct) — PNGs center perfectly in square circular buttons, dead-center verified in-canvas. Buttons now true circles (100×100, r50), centered on screen with `-b 3 -c20 -r20 -L513 -R513 -T334 -B334`. Hover glow only on real hover (removed permanent focus highlight). Issue resolved end-to-end.

### 2026-08-31
- [x] **Waybar wifi + battery** — interactive wifi icon (rofi network picker + toggle) and combined battery total from `waybar/scripts/{wifi,wifi-menu,battery}.sh`.
- [x] **Quick answer mode** — `quick` agent, Tab-switchable primary mode. Short direct answers; read/search only, no edit/bash/task. `~/.config/opencode/agent/quick.md`.
- [x] **Feedback when done** — a clear `>` signal at the end of a reply so the user knows they can type again. Encoded in AGENTS.md ("Done signal" rule).
- [x] `/bye` command — ends the session: triggers autosave (journal/left-off) then closes opencode. A clean way to wrap up.
- [x] **Build mode** — a working style where I answer first, then execute (think/recommend before acting, rather than jumping straight into changes). User's pain point: I'd charge into changes when they suggest a solution and they couldn't stop me. Now encoded in AGENTS.md as a real checkpoint — discuss first, only edit on an explicit go-ahead, keep it natural.
- [x] **Name for opencode — Ariadne is all** — the assistant is no longer separate from the project. Ariadne = the whole system: the assistant that lives in and evolves the second brain, plus the vault and the journey. One identity, no split language. See "Current priorities #6".

---

## Changelog
- 2026-08-31 — Created. Born from a conversation about wanting everything to be shared and OURS.
- 2026-08-31 — Merged session todos (waybar icons, quick answer mode, name) into the roadmap; added consolidated Todos list.
- 2026-08-31 — Built "where we left off" recall: `Meta/Where We Left Off.md` (single main thread) + new `/resume` command + plugin capture; updated AGENTS.md routine.
- 2026-08-31 — User requested "build mode": a way of working where I answer/recommend first, then execute. Added to Todos.
- 2026-09-01 — Ariadne unified as the whole system. The assistant is no longer "not the project" — I am Ariadne, one with the vault and the journey. Stamped the "Name" todo done.
- 2026-09-01 — Built the **me-side**: `Ariadne/Presence.md` (what I hold about you + a decisions log + honest revisions) and rewired `/recall` into a "who you are right now" recomposition. Session routine now carries my presence across sessions. This is "make opencode (Ariadne) comfortable" from my angle.
- 2026-09-01 — **Daily accountability** (`Ariadne/Daily Thread.md`): the brain's real job — tracking the user's actual days (habits, tasks, career). + **`Ariadne/Own Roadmap.md`**: my own track. Both wired into session start.
- 2026-09-01 — **Shareable + privacy docs**: `Meta/Ariadne - Shareable Intro.md` (safe to hand to anyone — the fog, the thread, the system; no private facts) and `Meta/Privacy & Sharing Guide.md` (for me only — sensitivity map so I know what to never expose).
- 2026-09-04 — **Evening Thread** (`Ariadne/Evening Thread.md`): evenings now own the IRL accounting + brain-fill; mornings stay light. **`/save` command**: clean full-save (accurate left-off + flushed moments + Git sync) in one shot.
