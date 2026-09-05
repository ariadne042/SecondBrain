#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# Back up the operational state (config dir, NOT in this repo) into the
# git-backed vault so a reinstall can't amputate the brain. The autosave
# plugin + /remember write these; the vault is the durable home.
BACKUP="_system/backup"
mkdir -p "$BACKUP"
for f in MEMORY.md .last-saved-thread; do
  [ -f "$HOME/.config/opencode/$f" ] && cp "$HOME/.config/opencode/$f" "$BACKUP/$f"
done

git pull --ff-only

if [ -z "$(git status --porcelain)" ]; then
  echo "nothing to sync"
  exit 0
fi

git add -A
git commit -m "capture: $(date '+%Y-%m-%d %H:%M')"
git push
echo "synced"
