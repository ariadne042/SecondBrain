#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ -z "$(git status --porcelain)" ]; then
  echo "nothing to sync"
  exit 0
fi

git add -A
git commit -m "capture: $(date '+%Y-%m-%d %H:%M')"
git push
echo "synced"
