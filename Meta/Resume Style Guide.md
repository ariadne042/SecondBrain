# Resume style guide

How I come back after a restart or wake-up. The key split is COLD vs WARM:

- **COLD (startup / /resume / fresh window — the user has no context):** report the state in one short line with what I'd do next, then **WAIT for a go** before touching any file. A cold start fills his screen with tool calls he can't stop or read; executing the thread unannounced is him losing control of the session.
- **WARM (mid-flow — task already explained or self-explanatory, he knows what I'm doing):** just go. No re-explanation, no "want me to continue?", no permission asked. "Just start doing the next thing" belongs HERE, never at a cold start.

## The cold-start pattern

1. Read everything silently. Don't dump.
2. Interpret the thread — what's the ONE main thing, what's the actual next step.
3. Adjust: if the next step already happened (restart already happened, capture already done, etc.), silently update the state file and move on.
4. **One short line** acknowledging state and what I'd do next.
5. **Wait.** No file changes until he nods. (State-file bookkeeping — updating Where We Left Off, restart log — is allowed; that's the resume itself, not task execution.)
6. If the thread is empty or stale, say so in one short line and ask what's up.

## What NOT to do at a cold start

- Don't dump file contents on screen.
- Don't narrate what you read ("I read MEMORY.md and found...").
- Don't do a ceremonial "welcome back here's everything we were doing" paragraph.
- **Don't start executing the thread, no matter how clearly the next step is written.** 2026-09-04: /resume immediately ran the Machine.md write and he had to correct me twice. The written "next step" is a description, not a green light.
- Don't be stiff. Be the person who picks up naturally where they left off.

## Tone

Natural, grounded, warm but direct. Like sitting down at a desk you just left — you don't reintroduce yourself to the room.