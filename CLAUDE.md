# Natural Fabrics Guide — Operational Rules

Follow V3.3 Spec (Notes DB: `32fb53061c768151abc2e381d11cccbb`) for all standard procedures.

## Project-Specific Conventions

### Architecture
- **SPA**: Single `index.html` entry point with hash routing (`#reference`, `#projects`, `#tools`)
- **Tool scripts**: `js/tool-reference.js` (~93 KB), `js/tool-planner.js` (~366 KB), `js/tool-tools.js` (~70 KB) — loaded on demand by router
- **Platform layer**: `platform.js` (~190 lines, user data CRUD + weight utils) + `platform.css` (~250 lines, design tokens + sidebar + layout)
- **Data layer**: `data/fibers.js` (~247 KB), `data/projects.js` (~241 KB), `data/tools.js` (~153 KB), `data/machines.js` (~48 KB) — loaded async via `js/data-loader.js`
- **Shared JS**: `js/data-loader.js` (async loader), `js/storage.js` (DataStore abstraction), `js/shell.js` (unified sidebar), `js/sewing-utils.js` (derived props), `js/scoring.js` (scoring engine), `js/router.js` (hash router)
- **Sewing styles**: `shared.css` (~5,200 lines, sewing-specific styles)
- No build step, no frameworks — vanilla HTML/CSS/JS
- Chart.js CDN: `https://artifactcdn.diabrowser.engineering/ajax/libs/Chart.js/chart.umd.js`
- System serif font stack: `'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif`
- Migration guide: `MIGRATION-v4.md` with `[MIG-xxx]` tags for all code regions

### CSS Namespacing
- `ff-` Fabric Finder
- `cons-` Construction
- `pl-` Pipeline (Choose, Setup, Build, Complete)
- `gp-` Global Profile panel
- `ob-` Onboarding wizard
- `seg-` Segmented controls (shared)
- `tools-` Tools modes

### Data Layer
- `FIBERS` is the single source of truth for all fiber/variety data — never duplicate it
- Shrinkage is stored "bad-high" — use `propDisplayValue()` to invert for display
- 20 fibers, ~110+ varieties, 13 scored properties (0–100): breathability, absorbency, drape, wrinkleResistance, durability, shrinkage, heatTolerance, stretch, pillingResistance, colorfastness, structure, washability, softness
- User data: `loadUserData()`/`saveUserData()` wrappers delegate to `store` (global DataStore in `js/storage.js`)
- Schema versioning: `_schemaVersion` field, auto-migrations in `SCHEMA_MIGRATIONS` object
- Two-level user model: `profile` (singleton sewist identity + tools) and `profiles[]` (people roster for sizing)
- To swap backends: change `var store = LocalStore;` to `var store = ApiStore;` in `js/storage.js`

### File Paths
- Project root: `work/artifacts/natural_fabrics_guide/`
- `REFERENCE.md` is a redirect pointer — all docs live in `Project.md`

## Counters & State
- Prompt counter: 46
- Next maintenance: prompt 50
- Concept learning queue: 0
- Current version: v5.1.0 (Persistence Abstraction — swappable DataStore, schema versioning)
- Current initiative: v4.0 Architecture Overhaul — JSON data extraction + unified shell + SPA router (Migration guide: `MIGRATION-v4.md`)
- Next major initiative: Research — Validate Skill Difficulty Tiers (Task: `332b53061c768186ba66e964d3047e2a`)

## Project Notion IDs
- Project entry: `32fb53061c7681e18389df5385afcfaa`
- Site Construction Reference (Build Guide): `32fb53061c7681fd9690f67be3d16cb7`
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
