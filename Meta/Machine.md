# Machine

Durable facts about this laptop — the system Ariadne lives on. Updated when something changes.

---

## Hardware

| | |
|---|---|
| **CPU** | Intel Core i7-4600U @ 2.10GHz (Haswell-ULT, 2C/4T) |
| **GPU** | Intel Haswell-ULT Integrated Graphics |
| **RAM** | 7.6 GiB |
| **Disk** | 235G total, ~15G used (/dev/sda2) |
| **Display** | 1366×768 (laptop panel) |
| **Keyboard** | German (de) — LC_ALL uses de_DE.UTF-8 |

## Software

| | |
|---|---|
| **OS** | CachyOS (Arch-based, rolling) |
| **Kernel** | Linux 7.2.2-1-cachyos (x86_64) |
| **Shell** | fish |
| **Timezone** | Europe/Berlin (CEST / +0200) |

## Config map

Where things live:

| Thing | Path / location |
|---|---|
| opencode config | `~/.config/opencode/` |
| AGENTS.md | `~/.config/opencode/AGENTS.md` |
| Ariadne autosave plugin | `~/.config/opencode/plugin/ariadne-autosave.ts` |
| Ariadne audit plugin | `~/.config/opencode/plugin/brain-audit.ts` (+ `_system/capture-manifest.json`, heartbeat, flags.md) |
| Plugin registry | `~/.config/opencode/opencode.jsonc` → `"plugin"` array |
| SecondBrain system state | `~/SecondBrain/_system/` — `capture-manifest.json` (verdicts), `heartbeat`, `flags.md` (startup read), `archive/` (retired MEMORY), `tools/` (`retire-memory.mjs`), `backup/` (MEMORY.md mirror from sync.sh) |
| Global sync script | `~/SecondBrain/sync.sh` (pull --ff-only, backup config state, commit, push) |
| SecondBrain vault | `~/SecondBrain/` |
| Memory | `~/.config/opencode/MEMORY.md` |
| Commands | `~/.config/opencode/commands/` |
| Fish config | `~/.config/fish/` |
| Sway config | `~/.config/sway/` |
| Waybar config | `~/.config/waybar/` |
| Kitty terminal | `~/.config/kitty/` |
| Wofi launcher | `~/.config/wofi/` |
| wlogout | `~/.config/wlogout/` |

## Fix log

Solved gotchas — if the same thing breaks again, check here first.

| Issue | Fix |
|---|---|
| wlogout not rendering icons | wlogout needs `wlogout-icons` or manually placed SVGs in `~/.config/wlogout/`; themed with Cachy palette. |
| `hl.dsp.*` sway errors | Harmless — leftover Intel audio pulse module entries in sway config; can be ignored. |
| de keybind conflicts | German keyboard layout causes some sway bindsym keysyms to shift; explicit xkbmap de set in sway config. |
| Permission matcher (autosave) | `ariadne-autosave.ts` plugin needed explicit file-write permission; added to opencode permission rules. |
| Autosave guard not persisting | `lastSavedThread` was in-memory only — fixed by persisting to `.last-saved-thread` on disk. |
| WWAN -110 (nmcli) | `nmcli` returns -110 when no WWAN modem is present; harmless, logged and ignored. |
| logind restart needed | After certain config changes, `systemctl restart --user systemd-logind` required to pick up session changes. |
| Battery 1-2 hour life | Haswell-era battery degraded; likely needs replacement. Not a software fix. |
