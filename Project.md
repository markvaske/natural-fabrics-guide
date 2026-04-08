# Natural Fabrics Guide — Project Build Guide

## Project Overview

An interactive sewist's reference tool for natural fabrics. Helps sewists choose the right fiber for a project, understand fabric properties and care, plan construction, and troubleshoot problems. Target users: home sewists (garment makers, quilters, hobbyists) from beginner to advanced. Core value: data-driven fabric guidance that connects fiber properties → project suitability → sewing technique in one place.

## Tech Stack & Dependencies

| Component | Technology | Version/Source |
|-----------|-----------|----------------|
| Language | Vanilla JavaScript (ES6+) | No build step |
| Markup | HTML5 | Semantic |
| Styles | CSS3 with custom properties | No preprocessor |
| Charts | Chart.js | CDN: `artifactcdn.diabrowser.engineering/ajax/libs/Chart.js/chart.umd.js` (swap to jsdelivr for production) |
| Fonts | System serif stack | `'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif` |
| Hosting (dev) | Dia browser sandbox | Artifact upload |
| Hosting (prod) | Any static host | Recommended: Cloudflare Pages |

No package manager, no build tools, no server-side code. Pure static site.

## Environment Setup

1. All source files live in a single directory — no nested structure, no `node_modules`.
2. Open `index.html` in any browser, or upload the folder as a Dia artifact.
3. For production: change Chart.js CDN URL from `artifactcdn.diabrowser.engineering` to `cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js`.
4. Cross-tool links (`reference.html?fiber=silk`) require a standard web server — they won't resolve inside the Dia sandbox.

No env vars. No API keys (unless adding AI chatbot — see Publishing Guide on Notion).

## Architecture

**Multi-file suite** — three standalone HTML tools sharing a common data layer (`fabric-data.js`) and common stylesheet (`shared.css`).

**Platform extraction (in progress):** Call-site map complete. 19 symbols (user data CRUD, persistence, utilities) move to `platform.js` (~300 lines). ~45 symbols (fiber data, scoring, catalogs) stay in `data-sewing.js` (~8,400 lines). CSS splits along namespace prefixes — `:root` tokens, sidebar, layout grid → `platform.css`; all `pl-*/ff-*/gp-*/ob-*/cons-*/tools-*` prefixed rules stay in `shared.css`. No circular dependencies found. Sandbox can handle the extraction (cp, mv, Write, Edit all work). See [Tool Platform Architecture Spec](https://www.notion.so/334b53061c768140bfb3fec7581b04b3) for full call-site map tables.

```
index.html ─── Landing page
├── reference.html ─── Fabric Reference (Fibers [Browse·Compare·Blend], Weaves, Techniques, Construction, Glossary)
├── planner.html ───── Projects (Needle & Thread, Seams, Interfacing, Yardage, Fix It) + Pipeline (Choose, Setup, Build, Complete) + Project Home + Global Profile (Profile, Tools, Ready)
└── tools.html ─────── Tools (Machines [Threading·Fix It·Maintenance·Settings], Cutting, Measuring, Pressing, Marking, Needles)

fabric-data.js ──── Shared data layer (all tools import this)
shared.css ──────── Shared stylesheet (all tools import this)
```

Each tool is self-contained HTML with inline `<script>` that reads from global `const` objects declared in `fabric-data.js`. No inter-tool runtime communication — tools link to each other via URL query parameters (e.g. `planner.html?fiber=silk&weight=lightweight`).

### File Inventory

| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Landing page linking to all three tools | Built |
| `reference.html` | Fabric Reference tool (5 nav modes; Fibers has Browse/Compare/Blend segmented control) | Built |
| `planner.html` | Projects tool (48 projects, 5 sidebar modes + 4-stage pipeline + project home + People/Stash standalone editors + global profile view) | Built |
| `machines.html` | Archived (renamed to tools.html) | Archived |
| `tools.html` | Tools (6 modes: Machines, Cutting, Measuring, Pressing, Marking, Needles) | Built |
| `platform.css` | Platform design system (~250 lines) — design tokens, reset, sidebar, layout, seg-control, responsive | Built |
| `platform.js` | Platform user data layer (~190 lines) — USER_DATA_DEFAULTS, WEIGHT_CATEGORIES, weight utils, CRUD for profiles/stash/pipeline state, localStorage persistence, JSON import/export | Built |
| `fabric-data.js` | Sewing-specific data layer — ~28 data objects + scoring engine (~8,600 lines). Requires platform.js | Built |
| `shared.css` | Sewing-specific styles (~5,200 lines) — pipeline, guided build, contextual intelligence, rich tools, notes, match polish, interface polish, project home. Requires platform.css | Built |
| `Project.md` | This build guide | Current |
| `CLAUDE.md` | Operational rules for AI assistants | Current |
| `REFERENCE.md` | Pointer → Project.md (legacy path) | Redirect |

## Data Structures & Models

All sewing data lives in `fabric-data.js` as global `const` objects. Shared platform functions (user data CRUD, weight utilities) live in `platform.js`. Every tool loads both via `<script src="platform.js">` then `<script src="fabric-data.js">`.

### `FIBERS` — Central Fiber Database (20 fibers)

Object keyed by fiber slug (`cotton`, `linen`, `silk`, etc.). Each entry:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name |
| `botanical` | string | Species/Latin name |
| `accent` | hex | Brand color for bars, fills, card accents |
| `bg` | hex | Light background for panels and cards |
| `fiberType` | `"cellulose"` / `"protein"` / `"bast"` / `"regenerated"` | Category |
| `intro` | string | Descriptive paragraph |
| `weightRange` | `{ min, max, unit, display }` | Numeric GSM range |
| `season` | `"warm-weather"` / `"cool-weather"` / `"all-season"` | Season suitability |
| `priceTier` | `"budget"` / `"moderate"` / `"luxury"` | Relative cost |
| `care` | object | 7 care fields (washTemp, drying, ironing, storage, preTreatment, shrinkagePercent, specialNotes) |
| `properties` | object | 13 scored properties (0–100): breathability, absorbency, drape, wrinkleResistance, durability, shrinkage, heatTolerance, stretch, pillingResistance, colorfastness, structure, washability, softness. Each: `{ value, label, interp }`. Note: shrinkage is stored as "bad-high" — use `propDisplayValue()` to invert for display. |
| `sewingNotes` | string[] | Sewing tips |
| `needle` | `{ type, sizeRange }` | Quick needle reference |
| `thread` | `{ weight, material }` | Quick thread reference |
| `varieties` | `[{ name, weight, gsm, desc, props?, isKnit? }]` | Fabric varieties. `props` has 13 scored properties (0–100), `isKnit` flags knit construction. |
| `weaves` | `[{ name, structure, character }]` | Thread/weave structures |
| `commercialNames` | string[] | Trade/retail names |
| `tags` | string[] | Filter tags |
| `relatedFibers` | string[] | Cross-navigation keys |

**20 fibers:** Cotton; Linen, Hemp, Ramie, Jute; Silk, Wool, Alpaca, Mohair, Angora, Cashmere, Camel Hair; Bamboo, Tencel/Lyocell, Viscose/Rayon, Modal, Cupro; Piña, Kapok, Nettle.

### `PROJECT_CATALOG` — Projects (48 projects)

Flat array with multi-parent audience tagging. Each project:

```javascript
{
  id: 'aLineSkirt',        // unique slug
  name: 'A-Line Skirt',
  audiences: ['women'],    // multi-tag: project appears in all listed categories
  skill: 'beginner',       // beginner | intermediate | advanced
  time: 'few-hours',       // few-hours | weekend | multi-day
  timeLabel: 'Few hours',
  overview: '...',
  whyItWorks: '...',
  fabricAdvice: '...',
  fabricWarning: '...',
  requirements: { structure: { min: 45, weight: 1.2 }, durability: { min: 55 } },  // scoring engine input
  construction: [{ step: '...', detail: '...' }],
  techniques: ['darts', 'doubleHem'],
  mistakes: [{ mistake: '...', why: '...' }],
  variations: ['...'],
  supplies: [{ item: 'Fabric', qty: '1.5–2 yards', essential: true, note: '...' }],
  relatedProjects: ['wrapSkirt', 'pencilSkirt']
}
```

**Audience distribution:** women: 20, men: 10, kids: 9, home: 3, accessories: 2, bags: 2 (counts include multi-tagged projects).

### `PROJECT_AUDIENCES` — 6 Categories

```javascript
[
  { key: 'women', label: "Women's Clothing", icon: 'dress', desc: '...' },
  { key: 'men', label: "Men's Clothing", icon: 'shirt', desc: '...' },
  { key: 'kids', label: "Children's & Baby", icon: 'onesie', desc: '...' },
  { key: 'home', label: "Home & Living", icon: 'pillow', desc: '...' },
  { key: 'accessories', label: "Accessories", icon: 'scarf', desc: '...' },
  { key: 'bags', label: "Bags & Pouches", icon: 'bag', desc: '...' }
]
```

### Other Data Objects (27 total + user data model)

| Object | Description |
|--------|-------------|
| `COMPARE_PROPS` | 10 property keys for radar chart |
| `PROP_LABELS` | camelCase → Title Case mapping |
| `FILTER_TAGS` | Preference filter chips for recommender |
| `FIBER_ENV_ALLERGEN` | Environmental/sustainability/allergen data (20 fibers) |
| `WEIGHT_TECHNIQUES` | Weight → matching technique refs |
| `NEEDLE_DATA` | Per-fiber needle/thread/machine settings (20 fibers) |
| `BLEND_NOTES` | 21 curated blend pairings with availability |
| `TECHNIQUE_DATA` | 6 categories (Shaping, Fullness, Hems, Seams, Edge Finishes, Hand Stitching), 28 techniques with SVG and steps |
| `CONSTRUCTION_DETAILS` | 4 categories (Collars, Waistbands, Cuffs, Closures), 11 items, 23 variations with SVGs, steps, cross-links |
| `SEAM_FINISHES` | 8 seam finish types with scoring |
| `INTERFACING_TYPES` | 6 interfacing types |
| `FIBER_INTERFACING_RECS` | Per-fiber interfacing recommendations |
| `GLOSSARY_DATA` | ~46 sewing terms |
| `WEAVE_DATA` | Wovens (5), knits (4), grain (3) with SVGs |
| `YARDAGE_DATA` | 6 garment categories with base yardage |
| `YARDAGE_SIZE_MULTIPLIERS` | XS–3XL multipliers |
| `YARDAGE_HEIGHT_ADJUST` | Petite/average/tall adjustments |
| `YARDAGE_WIDTH_MULTIPLIERS` | 36"/45"/54"/60" width multipliers |
| `YARDAGE_ADDONS` | Pattern matching, nap, lining percentages |
| `USER_DATA_DEFAULTS` | Default structure for user data (profile, profiles, stash, pipeline state). Two-level model: `profile` (singleton sewist identity with sewistTypes, preferredFit, tailorMode, ownedTools, onboarded, savedPlans, favoriteProjects) + `profiles[]` (people roster). Planned additions: `autoAdvance`, `lastSuggestedLevel`, `practicedTechniques`, `practicedFibers` for skill progression system. |
| `WEIGHT_CATEGORIES` | 6 weight categories: sheer, light, light-medium, medium, medium-heavy, heavy |
| `BASE_YARDAGE` | Per-project × width × size yardage lookup for pipeline estimator |

**User data functions (in `fabric-data.js`):**
`loadUserData()`, `saveUserData()`, `exportUserData()`, `importUserData()`, `getProfile()`, `addProfile()`, `updateProfile()`, `addStashEntry()`, `updateStashEntry()`, `removeStashEntry()`, `getStashGroups()`, `getStashFibers()`, `savePipelineState()`, `clearPipelineState()`, `estimateYardage()`, `getWeightCategory()`

**Scoring engine functions (in `fabric-data.js`):**
- `validateScoringData(opts)` — runtime integrity check: validates fiber props (13 per fiber), variety props, FINDER reference arrays, and PROJECT_CATALOG requirements completeness. Runs on load in dev mode.
- `computeScore(fiberKey, requirements, context)` — core scoring function. Layer 1: threshold gate (fibers below any `min` eliminated). Layer 2: weighted ranking (surplus × weight, normalized 40–95 for passing, 5–35 for failing). Layer 3: context modifiers (favorite +15%, sensitivity −20). Shrinkage inverted for scoring (`100 - value`). Returns `{ score, passed, details, failedProps }`.
- `scoreFibersForProject(projectId, context)` — scores all 20 fibers against a project's requirements. Returns array sorted by passed-first, then score descending.
- `scoreProjectsForFiber(fiberKey, context)` — scores all 48 projects against a fiber's properties. Returns only passing projects, sorted by score descending.
| `YARDAGE_ADDONS` | Pattern matching, nap, lining percentages |
| `TROUBLESHOOT_DATA` | 5 categories, 12 sewing problems |
| `CARE_EXTENDED` | Deep per-fiber care data (7 sections) |
| `CARE_SECTIONS` | 7 section definitions for care accordion |
| `MACHINE_TYPES` | 3 machine types (sewing, serger, coverstitch) |
| `TOOL_INVENTORY_LABELS` | 5 tool categories × 3–5 items each — key-to-display-name mapping for owned tools inventory |
| `TECHNIQUE_TIERS` | (Planned) Difficulty tier mapping for all sewing techniques — Foundational/Intermediate/Advanced/Expert. Required for skill progression system. Blocked by research validation task. |
| `MACHINE_TROUBLESHOOT` | Per-machine symptom → problem cards |
| `MACHINE_MAINTENANCE` | Per-machine schedules (3 tiers) + "never do this" |

### Per-Tool Data (not in shared layer)

- `MODE_INFO` — maps mode keys to `{ title, desc, view }` (different per tool)
- `ALL_VIEW_IDS` — derived from MODE_INFO
- `COMMERCIAL_GLOSSARY` — computed at runtime from `FIBERS[*].commercialNames`
- `MACHINE_SETTINGS_DATA` — inline in tools.html, per-machine per-fabric settings

## Feature Inventory

### Fabric Reference (`reference.html`)

- **Fibers Browse** — Card grid (20 fibers, 5 categories) with segmented control (Browse | Compare | Blend). Click → detail panel with 4 tabs:
  - *Overview:* Quick Facts strip, Best For badges, commercial names, property bars with interpretations, sewing notes, environmental/sustainability, allergen info
  - *Care:* 7-section accordion (washing, drying, ironing, color care, shrinkage, stain removal, long-term)
  - *Varieties:* Expandable cards with weight-specific needle settings, matching projects, techniques, weave chips
  - *Explore:* Cross-mode navigation to Compare, Blend, Projects, Needle settings (internal navigation)
- **Compare** (Fibers segmented control) — Toggle to Compare mode, tap 2–4 fiber cards to select. Radar chart (Chart.js) and stacked bar property breakdown render inline below grid. Links back to fiber details.
- **Blends** (Fibers segmented control) — Toggle to Blend mode, tap exactly 2 fiber cards. Ratio slider + estimated blended properties, sewing settings, curated blend notes for 21 pairings. Availability badges (widely available / specialty / rare). Results inline below grid.
- **Weaves & Knits** — Woven structures (5), knit structures (4), grain & layout (3) with inline SVG diagrams, trait pills, beginner tips
- **Techniques** — 28 techniques across 6 categories (Shaping, Fullness, Hems, Seams, Edge Finishes, Hand Stitching) with step-by-step instructions, SVGs, fabric notes. Cross-reference pills in existing tabs link to related hand stitches. Hand Stitching has 13 stitches in 3 groups (Basting, Construction, Finishing).
- **Construction** — 11 component assemblies across 4 categories (Collars, Waistbands, Cuffs, Closures) with 23 variations. Each item has difficulty badges, best-fabric tags, numbered steps, when-to-use guidance, fabric notes, tools list, and cross-links to techniques and projects. Variations expand inline with their own SVGs, descriptions, use-case badges, and difficulty indicators. Deep-linkable via `?construction=collars` and `?detail=standCollar`.
- **Glossary** — ~46 terms with search, A-Z navigation, cross-references, deep-linking (dotted-underline terms)
- **Print Reference Cards** — Per-fiber printable cards with page breaks

### Project Planner (`planner.html`)

- **Projects Catalog** — Three-level navigation: 6 audience categories → project cards (filterable) → detail panel. 48 projects with construction roadmaps, supply lists, technique links, common mistakes. Fiber dots on cards and "Top fibers" chips on detail panels are computed live by the scoring engine.
- **Needle & Thread** — Per-fiber needle types/sizes, thread recs, machine settings by weight
- **Seam Finder** — Interactive: fiber × weight × project type → ranked seam finishes
- **Interfacing Guide** — 6 types with per-fiber recommendations
- **Yardage Estimator** — Garment × size × width × add-ons → calculated yardage
- **Fix It** — 5 categories, 12 sewing problems with causes, fixes, cross-links
- **Pipeline** (activated via Start New or resume from Project Home) — 4-stage guided workflow:
  - *Choose:* Person picker + 3 sub-tabs — By Project (scored grid with stash match badges, favorite boosts, contextual intelligence, expandable "Why?" score explanations with per-property breakdown bars, and "Tune weights" slider panel for advanced requirement weight adjustment), By Fabric (fiber pill selector with stash count badges → expansion panel with "In Your Stash" mini bolt rows matching stash card pattern, simple variety chips with GSM badges, buying guide prompt for unowned varieties, and compatible projects grouped by audience type with SVG icons and skill badges), By Properties (full Fabric Finder with property threshold sliders, scoring engine, sort pills, ranked results with "Use This" buttons). Convergence panel shows machine/construction settings when both project and fabric are selected; includes buying guide callout when fabric needs purchasing. Auto-scrolls to convergence on selection.
  - *Setup:* Inline person picker (change who it's for with dynamic recalculation), fabric context card with "Change" button back to Choose. Width selector, directional toggle, pre-shrinkage radio pills, size select, skill pills. Live yardage estimation with stash remainder calculation. State persists across refreshes.
  - *Build Walkthrough:* 3–4 phases depending on fabric source. When using generic (non-stash) fabric, prepends ⓪ Procure phase with shopping list and inline stash entry form to log purchased fabric. Standard phases: Prepare/Build/Finish with checkable steps and substeps, progress bar, expandable step details. Project notes textarea persists free-form notes with pipeline state. Print button generates a comprehensive phase-structured printout via hidden overlay + `window.print()` — covers all 4 phases: Procure (shopping list with tool ownership), Prepare (supplies, machine setup with troubleshooting, fabric prep steps, cutting/pressing guides, yardage check), Build (construction steps with skill tips, tool tips, pressing tool recs, per-step mistakes, resource links, step notes), Finish (care instructions, variations, alternative fiber suggestions). Includes sensitivity warnings, project notes, and build progress. All pipeline state persisted to localStorage.
  - *Complete:* Project summary, build journal (step notes + project notes), stash yardage decrement, project history update, start-new-project flow. Print button also available here.
- **Project Home** (default landing view) — Shows current pipeline state card, saved/completed plans, Browse Projects catalog grid, and Start New Project button.
- **Global Profile** (activated via sidebar bottom gear button) — Full-page view with 3-segment selector:
  - *Profile:* Name, sewist types (Quilter/Hobbyist/Tailor/Seamstress/Embroiderer multi-select), skill level pills, preferred fit pills (Fitted/Standard/Relaxed), tailor mode toggle, data export/import.
  - *Tools:* 5 tool categories (Machines, Cutting, Measuring, Pressing, Marking) with checkbox pills for owned tools inventory.
  - *Plans:* Saved plans list with All/In Progress/Complete filter pills. Plan detail view with status toggle, build details, PDF/image pattern upload (base64, 5 MB), notes. Favorite projects section with remove chips. Coming-soon placeholders (Machine Details, Sewing Stats).
- **Onboarding Wizard** — 5-step first-run flow (Welcome → About You → Experience → Tools → Done). Auto-triggers when `profile.onboarded` is false. Renders inside Profile segment with seg control hidden. Saves data incrementally per step. CSS namespace `ob-`.
- **People Editor** (activated via sidebar bottom People button) — Standalone full-page view for managing people profiles. Uses the same `renderProfileCards()` function as the pipeline's hidden profile target. Horizontal person chip row with detail panel for editing measurements, preferences, sensitivities, and favorites.
- **Stash Editor** (activated via sidebar bottom Stash button) — Standalone full-page view for managing fabric stash inventory. Uses the same `renderStashView()` function. Summary stats, filter controls, grouped bolt cards with add/edit/delete forms.

### Tools (`tools.html`)

- **Machines** — Machine type chip selector (sewing/serger/coverstitch), then sub-section tabs: Threading, Fix It, Maintenance, Settings. All original machine content preserved, restructured from 4 sidebar modes to sub-sections within a single Machines mode.
- **Cutting** — 5 cutting tools (fabric shears, rotary cutter, pinking shears, thread snips, cutting mat) with tips and fabric suitability
- **Measuring** — 4 measuring tools (tape measure, acrylic ruler, seam gauge, French/hip curve) with tips
- **Pressing** — Heat settings table by fabric type + 4 pressing tools (steam iron, pressing ham, sleeve board, clapper/point presser)
- **Marking** — 4 marking tools (tailor's chalk, disappearing ink pens, tracing wheel, pins/clips) with fabric-specific recommendations
- **Needles** — 5 hand-sewing needle types (sharps, betweens, embroidery, tapestry, ballpoint) with sizes and fabric guidance

### Cross-Tool Features

- **URL parameter linking** — `?fiber=silk`, `?compare=silk,wool`, `?blend=cotton,linen`, `?construction=collars`, `?detail=standCollar`, `?project=aLineSkirt`, `?audience=women`, etc.
- **Sidebar navigation** — Fixed 80px left sidebar with tool switcher (`<a>` links between pages), mode buttons (`<button>` for same-page navigation), and bottom section (3 buttons: People → standalone People editor, Stash → standalone Stash editor, Profile gear → full-page profile view). Icons + labels beneath. Site header ("Natural Fabrics Guide") sits at top of main content area.
- **Glossary deep-linking** — Dotted-underline terms link to glossary entries
- **Responsive layout** — Sidebar shrinks to 56px at ≤680px, grids collapse to single column
- **Print stylesheet** — Hides sidebar, shows reference cards with page breaks

## Styling & UI

### Design System

| Token | Value | Use |
|-------|-------|-----|
| `--cream` | `#FAF6F0` | Body background |
| `--warm-white` | `#FFFDF9` | Card backgrounds |
| `--ink` | `#2A2520` | Primary text |
| `--ink-light` | `#5C554D` | Secondary text |
| `--ink-faint` | `#9B9389` | Tertiary text |
| `--tab-radius` | `12px` | Tab button corners |
| `--card-radius` | `14px` | Card corners |

### Typography

System serif stack: `'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif`. No web fonts loaded.

### Layout Conventions

- Fixed 80px left sidebar with tool switcher (top) and mode buttons (below divider). Icons with labels beneath.
- Site header in main content area: "Natural Fabrics Guide" title + tagline
- Sub-tabs for mode subsections (e.g. Woven/Knit/Grain, Browse/Compare/Blends)
- Card-based content with consistent padding, radius, shadow
- Accordion pattern for expandable sections (care, troubleshooting)
- Category grid → card grid → detail panel (three-level drill-down)

### Responsive Breakpoint

`@media (max-width: 680px)`: sidebar shrinks to 56px, labels shrink, grids collapse to single column, cards reduce padding.

## Build & Deploy

### Development
No build step. Edit files directly and upload folder as Dia artifact, or open `index.html` in a browser.

### Production Deployment
1. Copy all `.html` files, `data/`, `js/`, `platform.js`, `platform.css`, `shared.css` to a static host
2. Change Chart.js CDN URL: `artifactcdn.diabrowser.engineering` → `cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js`
3. Deploy (e.g. Cloudflare Pages drag-and-drop)

See [Publishing Guide on Notion](https://www.notion.so/32bb53061c7681eeb0a7ed2ce397fd1c) for full instructions including AI chatbot integration.

### Known Limitations
- Cross-tool links show blank page inside Dia sandbox (sandbox limitation, not a code bug — works on any standard web server)

## Changelog

**Consolidated changelog** — Full version history is maintained in the shared Changelog DB on Notion. Three major version entries contain the complete record:

| Entry | Notion ID | Scope |
|-------|-----------|-------|
| 0.x — Foundation Monolith | `331b53061c76813b99aac551356f6718` | Mar 16–22, foundation cycle. Single-file monolith, 12 releases (0.1.0–0.11.0). 14 features shipped. |
| 1.x — Three-Tool Architecture | `331b53061c76818cb29cca2dc0d881e5` | Mar 22–25, cycle-1 + cycle-2. Monolith decomposition, 17 releases (1.0.0–1.9.8). 11 features shipped. |
| 2.x — Unified Pipeline | `331b53061c7681faa0f1f1896ed95054` | Mar 26–31, cycle-3. Standardized rendering pipeline + profile/people split + onboarding + saved plans/favorites + state persistence + bolt picker + procurement phase + convergence panel + build step progress + guided build walkthrough + contextual intelligence + rich tools integration + notes system + match polish + interface polish, releases 2.0.0–2.11.0. 21 tasks linked. |
| 3.x — Pipeline Architecture Redesign | `334b53061c768104b5a0e029416b7424` | Mar 31, cycle-3. Pipeline 5→4 tabs, Planner→Projects rename, project home landing, Finder integrated into By Properties, Setup flexibility with inline person picker, convergence auto-scroll, releases 3.0.0–3.0.1. |

All detail is now in the Notion entries — each major version page contains per-minor sections with metadata lines and per-patch bullets with full descriptions including function names, CSS classes, data objects, and implementation specifics.

To trash the 37 archived entries: open the Changelog database, filter by title "contains" `[archived]`, select all → Move to Trash.
