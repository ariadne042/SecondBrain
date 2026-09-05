#!/usr/bin/env node
// retire-memory.mjs — bounds MEMORY.md so startup reads stay cheap.
//
// MEMORY.md grows forever. Startup reads it wholesale; that's the carrying-
// capacity clock: past a point memory stops being *read* before it stops being
// *stored*, and the brain forgets things the user never forgot. This moves
// dated blocks older than `daysBack` into git-backed vault archive, keeping a
// bounded "live" ledger.
//
// Usage: node retire-memory.mjs [daysBack]
//   daysBack = how many days of history to KEEP in MEMORY.md (default 14).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const MEMORY = join(homedir(), ".config", "opencode", "MEMORY.md");
const ARCHIVE = join(homedir(), "SecondBrain", "_system", "archive");

const keepDays = parseInt(process.argv[2] || "14", 10);
const cutoff = new Date(Date.now() - keepDays * 86400_000);

const raw = readFileSync(MEMORY, "utf8");
const header = raw.split("\n## ")[0];

// Split into blocks; each block starts at a "## " heading line.
const blocks = raw.slice(header.length).split(/^(?=## )/m).filter((b) => b.trim());

const retired = [];
const keptBlocks = [];
for (const block of blocks) {
    const m = /^## (\d{4}-\d{2}-\d{2})/.exec(block);
    if (m && new Date(m[1] + "T12:00:00Z") < cutoff) retired.push(block);
    else keptBlocks.push(block);
}

if (!retired.length) {
    console.log(`MEMORY.md is all within ${keepDays} days — nothing to retire.`);
    process.exit(0);
}

// Archive: one file per retired date, appending new blocks only.
const dates = [...new Set(retired.map((b) => /^## (\d{4}-\d{2}-\d{2})/.exec(b)?.[1]).filter(Boolean))];
mkdirSync(ARCHIVE, { recursive: true });
for (const d of dates) {
    const archiveFile = join(ARCHIVE, `MEMORY-${d}.md`);
    const existing = existsSync(archiveFile) ? readFileSync(archiveFile, "utf8") : "";
    const blocksForDate = retired.filter((b) => (b.match(/^## (\d{4}-\d{2}-\d{2})/)?.[1]) === d);
    const fresh = blocksForDate.filter((b) => !existing.includes(b.trim().slice(0, 80)));
    if (fresh.length) writeFileSync(archiveFile, existing.trimEnd() + "\n" + fresh.join(""));
}

const kept = header + keptBlocks.join("");
writeFileSync(MEMORY, kept.trimEnd() + "\n");

console.log(`Retired ${retired.length} block(s) across ${dates.join(", ")} -> ${ARCHIVE}`);
console.log(`MEMORY.md now: ${kept.trim().split("\n").length} lines.`);