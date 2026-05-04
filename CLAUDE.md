# Natural Fabrics Guide — Operational Rules

Follow V3.3 Spec (Notes DB: `32fb53061c768151abc2e381d11cccbb`) for all standard procedures.

**Start here:** Read `AGENTS.md` first each session, then `work/current-state.md`, then this file.

---

## Architecture

- **SPA**: Single `index.html`, hash routing (`#reference`, `#projects`, `#tools`)
- **Tool scripts**: `js/tool-reference.js` (~93 KB), `js/tool-planner.js` (~366 KB), `js/tool-tools.js` (~70 KB) — lazy-loaded by `js/router.js`
- **Platform layer**: `platform.js` (user data CRUD + weight utils) + `platform.css` (design tokens + sidebar)
- **Data layer**: `data/fibers.js`, `data/projects.js`, `data/tools.js`, `data/machines.js` — loaded async via `js/data-loader.js`
- **Shared JS**: `js/shell.js` (sidebar), `js/storage.js` (DataStore), `js/sewing-utils.js` (derived props), `js/scoring.js` (scoring engine)
- **Styles**: `shared.css` (~5,200 lines, sewing-specific — legacy, do not grow)
- No build step, no frameworks — vanilla HTML/CSS/JS
- Chart.js CDN: `https://artifactcdn.diabrowser.engineering/ajax/libs/Chart.js/chart.umd.js`
- Font: `'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif`

Full file inventory and feature status → `work/current-state.md`
CSS token table and enforcement rules → `work/design-rules.md`

## CSS Namespacing
- `ff-` Fabric Finder · `cons-` Construction · `pl-` Pipeline · `gp-` Global Profile
- `ob-` Onboarding · `seg-` Segmented controls · `tools-` Tools modes

## Data Layer
- `FIBERS` is the single source of truth — never duplicate fiber data
- Shrinkage stored bad-high — use `propDisplayValue()` from `js/sewing-utils.js` to invert for display
- 20 fibers, ~110+ varieties, 13 scored properties (0–100)
- Two-level user model: `profile` (singleton sewist identity) and `profiles[]` (people roster)
- Schema versioning: `_schemaVersion` + `SCHEMA_MIGRATIONS` in `js/storage.js`
- Backend swap: change `var store = LocalStore` → `var store = ApiStore` in `js/storage.js`

## Definition of Done

Before marking any initiative complete:
1. Feature reachable from prod UI without dev flags or URL hacks
2. Replaced legacy code fully removed — not commented out, not `if (el)` guarded
3. `work/current-state.md` updated if architecture or file inventory changed
4. New CSS follows `work/design-rules.md` (tokens, namespace prefix, no inline style)
5. Browser console clean — no errors or warnings from changed code

## Counters & State
- Prompt counter: 50
- Next maintenance: prompt 55
- Concept learning queue: 0
- Current version: v5.3.0 (Groups + Stash Workshop + People redesign)
- Current initiative: UI Redesign — Profile card grid + group project workspace + two-way links. Spec: `33cb53061c7681b6a5e0f6a00d4345e2`
- Next major initiative: Dyeing tool integration

## Git / Sync
- **Local stable repo**: `~/Documents/Projects/NFG`
- **GitHub remote**: `https://github.com/markvaske/natural-fabrics-guide.git`
- `nfgpull` — Dia artifact → NFG · `nfgpush` — NFG → Dia artifact · `nfgsave "msg"` — commit + push
- **Synced**: `index.html`, `platform.js`, `platform.css`, `shared.css`, `AGENTS.md`, `Project.md`, `MIGRATION-v4.md`, `REFERENCE.md`, `CLAUDE.md`, `js/`, `data/`, `work/`
- **Not synced**: `sync.sh`, `context/`, `.git/`

## Project Notion IDs
- Project entry: `32fb53061c7681e18389df5385afcfaa`
- Build Guide: `32fb53061c7681fd9690f67be3d16cb7`
- Technical Decisions: `32fb53061c76817aa4a9cb1d19494c61`
- Design Guide: `32fb53061c7681ad8625cdba83aab24f`
- Publishing Guide: `32fb53061c768127816def6fccf462f4`
- Platform Evolution: `32fb53061c76813a93f3f7717e761932`
- Feature Concepts & Design Ideas: `32fb53061c7681ee93baddc871578f72`
- Changelog V1: `32fb53061c7681f3a6c4c2c14c4f5010`
- Feature Highlights: `32fb53061c76819b97f7f66bc529a5cf`
- Completed Work (Archive): `32fb53061c76810980f9ca7adbdc1c5c`
- V2.0 Prompt Spec: `32fb53061c76814ca39bdd6a6ecbb795`
- Legacy Project Hub: `32bb53061c7681a9b9b0e3c6c8224463`
- Skill Progression Design Spec: `332b53061c7681b1bf84d9e0a9a98ed9`
- Stash Integration Spec: `334b53061c7681fc8823e9eab145b283`
- Tool Platform Architecture Spec: `334b53061c768140bfb3fec7581b04b3`
