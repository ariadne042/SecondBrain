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
| **WiFi NIC** | Intel Wireless 7260 (rev 83), iwlwifi; supports monitor mode + packet injection (2.4 & 5 GHz bands listed), but flaky on some 5 GHz channels → attacks run on 2.4 GHz. wlan0mon via airmon-ng |

## Software

| | |
|---|---|
| **OS** | CachyOS (Arch-based, rolling) |
| **Kernel** | Linux 7.2.2-1-cachyos (x86_64) |
| **Shell** | fish |
| **Timezone** | Europe/Berlin (CEST / +0200) |

## Network / security tooling

| | |
|---|---|
| **Home WiFi** | FRITZ!Box 7530 DW (2.4 GHz BSSID 34:E1:A9:41:51:73 ch6; DW_EXT = 5 GHz). 20-digit numerical WiFi password, WPS = push-button only (no PIN method in Fritz!Box firmware) → effectively not crackable/WPS-attackable. User's own router = a hardening lesson, not an attack win. |
| **Attack drill target** | Hotspot `ye` (weak pw `fortnite123`) created off the laptop for practice. Pipeline proven end-to-end (09-11): monitor mode → capture → convert to `22000` hash. One real crack left (wordlist) — see MEMORY "WiFi-hardening" thread. |
| **Aircrack-ng suite** | aircrack-ng, airmon-ng, airodump-ng, aireplay-ng, reaver 1.6.6, bully — installed. |
| **Responder** | v3.2.2 + python-impacket 0.13.1 (installed 09-07). Bin `/usr/bin/responder`. **Two gotchas:** (1) port-53 always errors — systemd-resolved holds DNS; harmless, only the SMB/NBT/mDNS parts matter. (2) a second live instance fails to bind 445/135/80 with a wall of "check permissions or other servers running" — always `sudo pkill -9 -f Responder.py` before rerunning (`ss -tuln` confirms). |
| **hcxtools / hashcat** | hcxdumptool 7.1.2 + hcxpcapngtool 7.1.2 installed. IMPORTANT: hcxdumptool **v7 changed flags** — output is `-w <file>` (was `-o`), AP filter flags (`--filterlist_ap`/`--filtermode`) removed → band-aware channels (must suffix band: `6a` for 2.4 GHz) and BPF filtering. hashcat install: see fix log below. |
| **Interfaces** | wlan0 (Intel 7260), enp0s25 (ethernet, 28:d2:44:50:51:4f) — ethernet was used to stay online while wlan0 sat in monitor mode. |
| **Desktop target (home lab)** | DESKTOP-8B562CK @ 192.168.178.23, wired into RE650 (.22) single port, transparent bridge (gw still .1, same 178.x subnet). Hostname `rewasdengine` → reWASD controller-remapper runs there. Firewall: 65533 filtered; only 246 holes → **27036** Valve Steam In-Home Streaming (TLS PSK, client-bound, not attackable blind) and **35474** Kestrel httpd exposing only `/version` → `{"Version":"v2.6"}` (no auth surface, all else 404). UDP alive: 5353 mDNS (rewasdengine.local resolves), 1900 UPnP, 3702 WS-Discovery (script is `wsdd-discover`, not `wsdiscovery`); 137/138 LLMNR 5355 silent. Responder poisoning worked, hash never arrived (modern Win10 SMB signing). 09-07 left the flip/revert as the next lesson. |
| **Hacklab** | `~/hacklab/` — the self-hosted lab (09-08). `ntlmv2_crack.py` = pure-Python MD4 (RFC 1320, from scratch, verified against all official test vectors) + NTLMv2 hash cracker. Caught the Fortbildung SMB handshake, cracked `test` end-to-end in own code. Hash format gotcha: `user::domain:...` → domain sits AFTER the two colons (naive `split(":")` misparses WORKGROUP as junk); round-3 rotations are 3/9/11/15 (not 3/5/9/13). `share/` = the SMB capture staging. |
| **TLP (fan noise fix 09-08)** | Fan was ~4100 RPM @ ~54°C, pwm1_enable=2 auto, thinkpad fan_control=N. Applied to `/etc/tlp.conf`: `CPU_SCALING_GOVERNOR_ON_BAT=powersave`, `CPU_MAX_PERF_ON_BAT=70` (was 80). ⚠️ PENDING: `sudo systemctl enable tlp.service` — TLP warns it will not apply on boot while disabled (checked 09-08: disabled). Optional: uncomment `TLP_PROFILE_BAT=SAV` for the aggressive battery profile. |

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
| wlogout not rendering icons | Fixed 09-03 (was "blank buttons"): (1) the dotfiles (`43PR/dotfiles`) hardcoded icon paths to `/home/rp34/...` — replaced with crisp white-transparent PNGs generated from Nerd Font glyphs via ImageMagick (65535/40{,40,50} paths); (2) the `-L/R 1700 -T/B 325` margins were tuned for a huge monitor → wlogout surface was 3522×1020 on 1366×768 (buttons off-screen) — fixed margins to 1366×768 size; (3) layout = 3 buttons (shutdown ``/reboot ``/logout ``), PNG icons center perfectly (glyph text reads offset-low due to Nerd Font em-box whitespace). Command lives in keybinds.lua (SUPER+`/code:49) and waybar power module. |
| Super+` logout keybind (de layout) | On German QWERTZ the top-left key types `^`, not `` ` `` — symbolic `GRAVE` never fires. Bound by **keycode 49** (`hl.bind("SUPER, code:49")`) so the physical key works regardless of symbol. |
| `hl.dsp.*` sway errors | Harmless — leftover Intel audio pulse module entries in sway config; can be ignored. |
| de keybind conflicts | German keyboard layout causes some sway bindsym keysyms to shift; explicit xkbmap de set in sway config. |
| Permission matcher (autosave) | `ariadne-autosave.ts` plugin needed explicit file-write permission; added to opencode permission rules. |
| Autosave guard not persisting | `lastSavedThread` was in-memory only — fixed by persisting to `.last-saved-thread` on disk. |
| WWAN -110 (nmcli) | `nmcli` returns -110 when no WWAN modem is present; harmless, logged and ignored. |
| fprint at login (greetd) | `auth sufficient pam_fprintd.so` was added to `/etc/pam.d/greetd`; commented out 09-14 → login is password-only, fprint still installed as backup. |
| Dosidicus (AI-life sim) | In `~/Downloads/Dosidicus/` (from `Dosidicus_3.0_Linux.zip`, setup 09-14). Rust non-GUI-launcher needs its bundled PyQt5/numpy — those were deleted, only the Python source path works: `cd ~/Downloads/Dosidicus && ./venv/bin/python -m src.main` (venv = python3.13 + PyQt5 + numpy, python313 installed for it). 77 bundled-3.11 `.so` files quarantined in `_runtime_binary_takeout/`. Not finished exploring. |
| logind restart needed | After certain config changes, `systemctl restart --user systemd-logind` required to pick up session changes. |
| opencode v1.18.31 leader | Leader key = `ctrl+x` (grey input dim = leader armed, NOT an error). Chords: `<leader>d` = toggle tool-details cards, `<leader>o` = toggle generic tool output. Both confirmed working 09-20; no "always off" switch exists — the `<leader>d` bind is the lever. |
| Media inbox (`~/brain-inbox/`) | Built 09-10 (user asked me to see/hear). `voice/` → `transcribe.sh` (whisper-cpp, ggml-small, offline) → appends to `Inbox/Voice Notes.md`; `images/` → `describe.sh` (ollama moondream vision + tesseract OCR) → `Inbox/Image Notes.md`; originals move to `done/`. For HIS workflow, not the gf. Pipeline fully tested 09-10. |
| sudo 30s stall (09-08 "enter sometimes doesn't work") | `/etc/pam.d/sudo` had `pam_fprintd.so` twice → every sudo tried the broken VFS5011 fingerprint sensor ~30s before password fallback. Removed the fprintd lines → sudo instant. The "correct password sometimes didn't work" was the sensor eating attempts, not him. |
| Lock-screen bind (Super+Tab) | Was `SUPER+Tab` → held Tab auto-repated into the hyprlock password field → rejected password. Changed to `SUPER+Escape` + swallow (keybinds.lua), and fixed hyprlock.conf layout label from `$LAYOUT[en,ru]` to `[de]`. |
| Fingerprint (VFS5011) — closed as broken | 09-08: enrolled right-index via `sudo fprintd-enroll user`, but `verify` = "no match" / "transfer timed out". Autosuspend fix (power/control=on) helped briefly, udev rule never landed. Verdict 09-08: VFS5011 is a known Linux dud, gave it a real shot, "fuck the print i think its broken." Later commented out of greetd (09-14, see fprint row above) → password-only |
| Hyprland login dropdown (greetd) | 09-07 asked: dropdown shows "hyprland" vs "hyprland uwsr managed" — never answered in-session (session cut at 2 lines). Both boot Hyprland; "uwsr" = the udev/systemd session variant. Left on greeter default; not revisited. |
| Battery 1-2 hour life | Haswell-era battery degraded; likely needs replacement. Not a software fix. |
| Minimize active window (Hyprland) | No native minimize dispatcher in Hyprland 0.56 Lua build. Solution (09-11): park on hidden `special:minimized` tray. `~/.config/hypr/scripts/minimize.sh` (SUPER+M) moves active window with `silent=true` to the tray; `minimized-picker.sh` (SUPER+SHIFT+M) is a rofi picker of parked windows → restores to current workspace. Both live in `~/.config/hypr/keybinds.lua`. |
| hcxdumptool v7 `-o` flag | v7 renamed output flag `-o` → `-w` and removed `--filterlist_ap`/`--filtermode`; channel needs band suffix (`6a`). hashcat not yet the blocker — wordlist is (rockyou lacks "fortnite"; build `crunch` list or fetch real one). |
| LTS kernel `module not found` wall (09-01) | CachyOS uses **Limine**, NOT GRUB (`grub-mkconfig` doesn't exist; tool is `limine-update`). New LTS kernel (6.18.48) had no `modules.dep`/`modules.alias` tree → mkinitcpio failed for it ("module not found 'vboxsf'/'xfs'", etc.). Fix: new pacman dropped `--force`, use `--overwrite`: `sudo pacman -S --overwrite='*' linux-cachyos-lts linux-cachyos-lts-headers` then rebuild `sudo limine-update`. Both kernels build clean after; 7.2.2 stays the daily-driver, LTS 6.18.48 = fallback boot entry. |
