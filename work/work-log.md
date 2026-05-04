# Work Log — Natural Fabrics Guide

Append-only. One entry per shipped initiative. Never edit past entries.

---

## v5.3.0 — Groups + Stash Workshop + People Redesign
*Shipped before 2026-05-03*

People view redesigned with sidebar/detail layout. Groups implemented with group membership model. Stash Workshop added. Profile card grid, group project workspace, and two-way links (people ↔ projects) remain.

**Remaining (current initiative):** Profile card grid + group project workspace + two-way links. Spec: `33cb53061c7681b6a5e0f6a00d4345e2`

---

## Doc Structure Setup
*2026-05-03*

Added `AGENTS.md` at project root and `work/` directory with four docs: `current-state.md`, `design-rules.md`, `memory.md`, `work-log.md`. Modeled after Diamond Keeper project structure. Added Definition of Done and AGENTS.md pointer to `CLAUDE.md`. Updated `sync.sh` to include `work/` and `AGENTS.md` in both pull and push. Set up two-way sync with local stable repo at `~/Documents/Projects/NFG`.

**Skipped this session:** `design-system.css` with `@layer components` (flagged in design-rules.md as a future initiative). `current-state.md` is a verified skeleton — feature-level detail requires a dedicated read of the three large tool scripts.
