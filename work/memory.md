# Durable Collaboration Preferences

Update when preferences change. Read at session start before working.

---

## Working Rhythm
- One initiative at a time. No automatic rollover to the next.
- After each initiative: summarize what shipped, list manual test steps, wait for explicit confirmation before starting the next.
- Moderate autonomy: one main work stream. Parallelism only for genuinely disjoint tasks (e.g., two unrelated files).

## Edit Style
- Small targeted edits over broad refactors.
- Read the relevant section of a file before editing it.
- Don't clean up surrounding code while fixing a bug unless the mess directly causes the bug.
- No half-finished implementations. If scope is too large, scope down and finish what you start.
- Don't add error handling or validation for scenarios that can't happen in practice.

## Communication
- Terse responses. No trailing summaries of what was just done — the diff speaks for itself.
- When referencing code, include `file:line` so the user can navigate directly.
- Flag out-of-scope issues rather than fixing them inline.
- Push back when a request would create token-heavy docs that rot (e.g., copying architecture that's readable from source).

## Documentation
- Keep docs single-purpose: `current-state.md` = truth now, `work-log.md` = history, `AGENTS.md` = fast-start, `memory.md` = these preferences.
- If a lesson should persist, capture it as a prevention (a rule in design-rules, a guard in code, a gotcha in AGENTS.md) — not just as a prose note.
- Update `work/current-state.md` in the same commit as any feature that changes the architecture or file inventory.
- Append to `work/work-log.md` when an initiative ships. Never edit past entries.
