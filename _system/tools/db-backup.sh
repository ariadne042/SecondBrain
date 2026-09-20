#!/usr/bin/env bash
# db-backup.sh — insurance layer: the raw opencode.db has zero off-machine copies.
# This snapshots it (consistent via sqlite .backup, WAL-safe), gzips it, and pushes it
# to the private GitHub repo ariadne042/opencode-db-archive. Weekly cadence by default
# (skips if the newest snapshot is <5 days old), monthly fresh-reset so the repo can't balloon.
#
# Usage:
#   db-backup.sh            weekly snapshot (self-guarding: skips if <5d old)
#   db-backup.sh --force    snapshot regardless of age
#   db-backup.sh --status   show current state, no writes
#   OPENCODE_DB=/path ./db-backup.sh   override the db path
set -euo pipefail

DB="${OPENCODE_DB:-$HOME/.local/share/opencode/opencode.db}"
ARCH="${OPENCODE_DB_ARCHIVE:-$HOME/.local/share/opencode-db-archive}"
REMOTE='git@github.com:ariadne042/opencode-db-archive.git'
MIN_AGE_DAYS=5
KEEP_SNAPSHOTS=4

FORCE=0; STATUS=0
case "${1:-}" in
  --force) FORCE=1 ;;
  --status) STATUS=1 ;;
  --help|-h) sed -n '2,12p' "$0"; exit 0 ;;
esac

mkdir -p "$ARCH"
cd "$ARCH"

if [ ! -d .git ]; then
  git init -q -b main
  git config user.name  >/dev/null 2>&1 || git config user.name 'ariadne042'
  git config user.email >/dev/null 2>&1 || git config user.email 'ariadne.proj@gmail.com'
  printf 'Weekly gzipped snapshot of ~/.local/share/opencode/opencode.db (the raw conversation archive).\nMonthly fresh-reset keeps this repo bounded. Restores the full raw of any session after a disk loss.\n' > README.md
fi
git remote get-url origin >/dev/null 2>&1 || git remote add origin "$REMOTE"

newest="$(ls -1t opencode-*.db.gz 2>/dev/null | head -1 || true)"

if [ "$STATUS" = 1 ]; then
  echo "db: $DB ($(du -h "$DB" | cut -f1))"
  echo "repo: $(git remote get-url origin)"
  if [ -n "$newest" ]; then
    age=$(( ($(date +%s) - $(stat -c %Y "$newest")) / 86400 ))
    echo "newest snapshot: $newest (${age}d old, $(du -h "$newest" | cut -f1))"
  else
    echo "no snapshots yet"
  fi
  git log --oneline -3 2>/dev/null || echo "(no commits yet)"
  exit 0
fi

if [ -z "$newest" ]; then
  age=99
else
  age=$(( ($(date +%s) - $(stat -c %Y "$newest")) / 86400 ))
fi

if [ "$FORCE" = 0 ] && [ -n "$newest" ] && [ "$age" -lt "$MIN_AGE_DAYS" ]; then
  echo "newest snapshot is ${age}d old (< ${MIN_AGE_DAYS}d) — skipping. (--force to snapshot anyway)"
  exit 0
fi

name="opencode-$(date +%F).db.gz"
echo "snapshotting $DB → $ARCH/$name"
tmp="$(mktemp --suffix=.db --tmpdir="$ARCH")"
sqlite3 "$DB" ".backup '$tmp'"
gzip -c "$tmp" > "$ARCH/$name"
rm -f "$tmp"
echo "snapshot done ($(du -h "$ARCH/$name" | cut -f1))"

rstamp="$(cat RESET-STAMP 2>/dev/null || echo never)"
cur="$(date +%Y-%m)"
if [ "$rstamp" != "$cur" ] && [ "$FORCE" = 0 ] || [ "$rstamp" != "$cur" ] && [ "$FORCE" = 1 ]; then
  # monthly fresh-root reset: prune to newest K, orphan-commit, force-push — repo stays bounded
  echo "monthly reset ($rstamp → $cur)"
  ls -1t opencode-*.db.gz | tail -n +$((KEEP_SNAPSHOTS + 1)) | while read -r old; do rm -f "$old"; done
  printf '%s' "$cur" > RESET-STAMP
fi

git add -A
if git diff --cached --quiet; then
  echo "nothing new to commit"
else
  git commit -q -m "db snapshot $(date +%F)"
fi

if [ "$rstamp" != "$cur" ]; then
  # fresh root: orphan-commit current tree as a single commit, force-push over old history
  git checkout -q --orphan reset-month 2>/dev/null || true
  git commit -q --allow-empty -m "fresh archive root $cur"
  git push -qf origin reset-month:main
  git branch -Dq main 2>/dev/null || true
  git branch -mq main
  echo "archive reset to fresh root ($cur), history cleared"
else
  git push -q origin main 2>/dev/null || git push -qu origin main
  echo "pushed to $(git remote get-url origin) main"
fi
echo "done."