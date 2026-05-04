# Natural Fabrics Guide — Agent Fast-Start

## Session Bootstrap Order

Read in this order before writing any code:
1. `AGENTS.md` (this file) — gotchas, working style, preview server
2. `work/current-state.md` — what's actually built right now
3. `CLAUDE.md` — architecture, current initiative, Definition of Done
4. `work/design-rules.md` — CSS/HTML governance and token reference
5. `work/memory.md` — durable collaboration preferences
6. `work/work-log.md` — last few entries for recent context

Don't trust summaries from prior sessions. Verify claims against source files.

---

## Known Gotchas

**Shrinkage is stored inverted.**
Raw value is "bad-high" (100 = no shrinkage, 0 = max shrinkage). Always call `propDisplayValue('shrinkage', rawValue)` from `js/sewing-utils.js` before displaying. Displaying the raw value silently produces wrong results — no error, just wrong numbers.

**Data globals are async.**
`FIBERS`, `PROJECT_CATALOG`, `TOOL_DATA`, `MACHINE_DATA` are loaded on demand by `js/data-loader.js`. They're not available at page load. Code that runs before a tool is navigated to will see undefined globals. Always check inside a tool's init callback, not at module level.

**FIBERS is the single source of truth.**
All fiber and variety data lives in `data/fibers.js` only. Never duplicate fiber properties in tool scripts or local variables.

**Two user model levels — don't conflate them.**
- `profile` — singleton sewist identity (skill, tools, preferences)
- `profiles[]` — roster of people with their measurements (for sizing)
`loadUserData()` returns both; they're stored and accessed differently.

**shared.css is 5,200 lines — search before adding.**
Whatever you need probably already exists. Use browser search or grep before writing new rules. Add to the correct namespace section; don't append to the bottom.

**`[MIG-xxx]` tags mark migration targets.**
These appear in the code and correspond to entries in `MIGRATION-v4.md`. Don't remove a tag without understanding what migration phase it belongs to.

**Hash routing only.**
Navigation is `window.location.hash = '#reference'` (or `#projects`, `#tools`). There are no other routes. `js/router.js` handles lazy-loading the tool script on first visit.

---

## Working Style
- One initiative at a time. Read `work/memory.md` for the full expectations.
- Read the relevant file section before editing it.
- After any JS change: reload, check console, walk the changed path.
- After any CSS change: check both narrow (~375px) and wide (~1200px) viewports.
- Flag scope-creep as a future task rather than fixing inline.
- Update `work/current-state.md` and append to `work/work-log.md` when an initiative ships.

---

## Preview Server
```bash
cd ~/Documents/Projects/NFG && python3 -m http.server 8080
# or: npx serve . --listen 8080
```
Open `http://localhost:8080`. No build step — changes are live on reload.
