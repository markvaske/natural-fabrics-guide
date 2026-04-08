# NFG v4.0 Migration Guide — Data Layer + Architecture Overhaul

This document is a step-by-step guide for an agent to execute the v4.0 migration outside the sandbox. Every code region that needs modification is tagged with `[MIG-xxx]` for easy search.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Phase 1: JSON Data Extraction](#phase-1-json-data-extraction)
3. [Phase 2: Data Loader + Script Extraction](#phase-2-data-loader--script-extraction)
4. [Phase 3: Unified Shell](#phase-3-unified-shell)
5. [Phase 4: SPA Router](#phase-4-spa-router)
6. [Phase 5: Persistence Abstraction](#phase-5-persistence-abstraction)
7. [Phase 6: Multi-Craft Module System](#phase-6-multi-craft-module-system)
8. [API Readiness Notes](#api-readiness-notes)
9. [Appendix: Data Object Inventory](#appendix-data-object-inventory)

---

## Architecture Overview

### Current State (v3.x)
```
platform.css ─┐
shared.css ───┤  (loaded by every HTML page)
platform.js ──┤
fabric-data.js┘   ← 704 KB monolith: 47 exports mixing data + logic

5 HTML files, each with:
  - Hardcoded sidebar HTML (inconsistent across pages)
  - Inline <script> with all page logic (100–7,200 lines)
  - No shared navigation JS
```

### Target State (v4.0)
```
data/
  fibers.json          ~380 KB  reference data
  projects.json        ~180 KB  project catalog + yardage tables
  tools.json           ~120 KB  needles, techniques, seams, glossary, etc.
  machines.json         ~25 KB  machine types, troubleshooting, maintenance

js/
  data-loader.js        ~40 lines  async loader with cache
  scoring.js            ~20 KB     computeScore, scoreFibersForProject, etc.
  sewing-utils.js       ~15 KB     propDisplayValue, estimateYardage, etc.
  platform.js           ~7 KB      user data model + persistence (unchanged initially)
  storage.js            ~3 KB      DataStore abstraction (Phase 5)
  shell.js              ~8 KB      sidebar + nav rendering (Phase 3)
  router.js             ~5 KB      SPA hash routing (Phase 4)

css/
  platform.css          ~7 KB      design tokens + layout
  shared.css           ~180 KB     sewing-specific styles

tools/                             (Phase 4: extracted page scripts)
  tool-reference.js
  tool-planner.js
  tool-tools.js
  tool-machines.js
  tool-comparator.js

index.html                         (Phase 4: single entry point)
```

---

## Phase 1: JSON Data Extraction

### Goal
Split `fabric-data.js` (704 KB, 47 exports) into JSON data files + JS logic files. No functional changes — the app works identically after this phase.

### Step 1.1: Create `data/` directory

```
mkdir data/
```

### Step 1.2: Extract `data/fibers.json`

**Source:** `fabric-data.js` lines 9–1340

[MIG-001] Extract the `FIBERS` object. Remove the `const FIBERS = ` prefix and trailing `;`. The result is a pure JSON object with 20 fiber keys, each containing: name, botanical, accent, bg, fiberType, intro, weightRange, season, priceTier, care, relatedFibers, properties (13 scored), sewingNotes, needle, thread, varieties[].

Also extract these fiber-adjacent constants into the same file as a wrapper object:

```json
{
  "fibers": { ... },                    // lines 9–1340
  "compareProps": [ ... ],               // line 1343
  "propLabels": { ... },                 // line 1344
  "propInverted": [ ... ],              // line 1349
  "propDisplayLabels": { ... },          // line 1352
  "propTooltips": { ... },               // line 1366
  "fiberProsCons": { ... },              // line 1380
  "filterTags": { ... },                // line 1463
  "fiberEnvAllergen": { ... },           // line 1476
  "blendNotes": { ... },                // line 2095
  "weightTechniques": { ... },           // line 1642
  "careExtended": { ... },              // line 3643
  "careSections": [ ... ]               // line 4914
}
```

**Consumers (which pages use this data):**
- `reference.html` — 32 refs to FIBERS
- `planner.html` — 46 refs to FIBERS
- `comparator.html` — 11 refs to FIBERS
- `legacy.html` — 40 refs (can be ignored, legacy)

[MIG-002] After extraction, each consumer needs this at the top of its `<script>`:
```javascript
// [MIG-002] Replace direct FIBERS access with loaded data
const fiberData = await DataLoader.load('fibers');
const FIBERS = fiberData.fibers;
const COMPARE_PROPS = fiberData.compareProps;
const PROP_LABELS = fiberData.propLabels;
const PROP_INVERTED = fiberData.propInverted;
const PROP_DISPLAY_LABELS = fiberData.propDisplayLabels;
const PROP_TOOLTIPS = fiberData.propTooltips;
const FIBER_PROS_CONS = fiberData.fiberProsCons;
const FILTER_TAGS = fiberData.filterTags;
const FIBER_ENV_ALLERGEN = fiberData.fiberEnvAllergen;
const BLEND_NOTES = fiberData.blendNotes;
const WEIGHT_TECHNIQUES = fiberData.weightTechniques;
const CARE_EXTENDED = fiberData.careExtended;
const CARE_SECTIONS = fiberData.careSections;
```

### Step 1.3: Extract `data/projects.json`

**Source:** `fabric-data.js`

[MIG-003] Extract these into a wrapper object:

```json
{
  "audiences": { ... },                 // line 5828 PROJECT_AUDIENCES
  "catalog": [ ... ],                   // line 5837 PROJECT_CATALOG (48 entries)
  "constructionDetails": { ... },       // line 7882 CONSTRUCTION_DETAILS
  "yardageData": { ... },               // line 3261 YARDAGE_DATA
  "yardageSizeMultipliers": { ... },     // line 3328
  "yardageHeightAdjust": { ... },        // line 3339
  "yardageWidthMultipliers": { ... },    // line 3347
  "yardageAddons": { ... },              // line 3355
  "measurementPresets": { ... },         // line 8354
  "measurementGroups": [ ... ],          // line 8374
  "allMeasKeys": [ ... ],               // line 8381
  "baseYardage": { ... }                // line 8387
}
```

**Consumers:**
- `planner.html` — 21 refs to PROJECT_CATALOG, 5 refs to YARDAGE_DATA
- `reference.html` — 2 refs to CONSTRUCTION_DETAILS

[MIG-004] Consumer destructuring:
```javascript
// [MIG-004] Replace direct project data access
const projData = await DataLoader.load('projects');
const PROJECT_AUDIENCES = projData.audiences;
const PROJECT_CATALOG = projData.catalog;
const CONSTRUCTION_DETAILS = projData.constructionDetails;
const YARDAGE_DATA = projData.yardageData;
const YARDAGE_SIZE_MULTIPLIERS = projData.yardageSizeMultipliers;
const YARDAGE_HEIGHT_ADJUST = projData.yardageHeightAdjust;
const YARDAGE_WIDTH_MULTIPLIERS = projData.yardageWidthMultipliers;
const YARDAGE_ADDONS = projData.yardageAddons;
const MEASUREMENT_PRESETS = projData.measurementPresets;
const MEASUREMENT_GROUPS = projData.measurementGroups;
const ALL_MEAS_KEYS = projData.allMeasKeys;
const BASE_YARDAGE = projData.baseYardage;
```

### Step 1.4: Extract `data/tools.json`

**Source:** `fabric-data.js`

[MIG-005] Extract:

```json
{
  "needleData": { ... },                // line 1663 NEEDLE_DATA
  "techniqueData": { ... },             // line 2248 TECHNIQUE_DATA
  "seamFinishes": [ ... ],              // line 2669 SEAM_FINISHES
  "interfacingTypes": [ ... ],          // line 2725 INTERFACING_TYPES
  "fiberInterfacingRecs": { ... },      // line 2794 FIBER_INTERFACING_RECS
  "glossaryData": [ ... ],              // line 2819 GLOSSARY_DATA
  "weaveData": { ... },                 // line 2871 WEAVE_DATA
  "troubleshootData": { ... }           // line 3365 TROUBLESHOOT_DATA
}
```

**Consumers:**
- `planner.html` — needle, technique, seam, interfacing, troubleshoot
- `reference.html` — needle, technique, glossary, weave
- `tools.html` — (uses data indirectly via mode rendering)
- `legacy.html` — (can be ignored)

[MIG-006] Consumer destructuring:
```javascript
// [MIG-006] Replace direct tools data access
const toolsData = await DataLoader.load('tools');
const NEEDLE_DATA = toolsData.needleData;
const TECHNIQUE_DATA = toolsData.techniqueData;
const SEAM_FINISHES = toolsData.seamFinishes;
const INTERFACING_TYPES = toolsData.interfacingTypes;
const FIBER_INTERFACING_RECS = toolsData.fiberInterfacingRecs;
const GLOSSARY_DATA = toolsData.glossaryData;
const WEAVE_DATA = toolsData.weaveData;
const TROUBLESHOOT_DATA = toolsData.troubleshootData;
```

### Step 1.5: Extract `data/machines.json`

**Source:** `fabric-data.js`

[MIG-007] Extract:

```json
{
  "machineTypes": { ... },              // line 4929 MACHINE_TYPES
  "toolInventoryLabels": { ... },       // line 4947 TOOL_INVENTORY_LABELS
  "machineTroubleshoot": { ... },       // line 4955 MACHINE_TROUBLESHOOT
  "machineMaintenance": { ... }         // line 5698 MACHINE_MAINTENANCE
}
```

**Consumers:**
- `machines.html` — troubleshoot, maintenance
- `tools.html` — troubleshoot, maintenance
- `planner.html` — 1 ref to MACHINE_TROUBLESHOOT (pipeline build tips)

[MIG-008] Consumer destructuring:
```javascript
// [MIG-008] Replace direct machine data access
const machData = await DataLoader.load('machines');
const MACHINE_TYPES = machData.machineTypes;
const TOOL_INVENTORY_LABELS = machData.toolInventoryLabels;
const MACHINE_TROUBLESHOOT = machData.machineTroubleshoot;
const MACHINE_MAINTENANCE = machData.machineMaintenance;
```

### Step 1.6: Create `js/sewing-utils.js`

[MIG-009] These are **functions** that stay as JS, not JSON:

```javascript
// js/sewing-utils.js
// Functions extracted from fabric-data.js that operate on loaded data

// [MIG-009] propDisplayValue — requires PROP_INVERTED from fibers.json
// Source: fabric-data.js line 1361
function propDisplayValue(propKey, rawValue) {
  return PROP_INVERTED.includes(propKey) ? 100 - rawValue : rawValue;
}

// [MIG-009] estimateYardage — requires BASE_YARDAGE, YARDAGE_* from projects.json
// Source: fabric-data.js line 8398
function estimateYardage(projectId, fabricWidth, size, directional, needsShrinkage) {
  // ... (copy entire function body from line 8398)
}
```

### Step 1.7: Create `js/scoring.js`

[MIG-010] Scoring engine functions — pure logic, no data:

```javascript
// js/scoring.js
// Scoring engine — requires FIBERS (from fibers.json) and
// PROJECT_CATALOG (from projects.json) to be loaded first

// [MIG-010] Finder prop configuration
const FINDER_PROPS = [ ... ];           // line 8420
const FINDER_PROP_LABELS = { ... };     // line 8421
const FINDER_PROP_SHORT = { ... };      // line 8422
const FINDER_PROP_INTERPS = { ... };    // line 8423

// [MIG-010] Validator — source line 8442
function validateScoringData() { ... }

// [MIG-010] Core scoring — source line 8538
function computeScore(fiberKey, requirements, context) { ... }

// [MIG-010] Convenience wrappers — source lines 8605, 8624
function scoreFibersForProject(projectId, context) { ... }
function scoreProjectsForFiber(fiberKey, context) { ... }
```

Note: `FINDER_PROPS`, `FINDER_PROP_LABELS`, `FINDER_PROP_SHORT`, `FINDER_PROP_INTERPS` are small config arrays (20 lines total), not large data. They stay in the JS file because they configure the scoring engine's behavior, not reference data.

### Step 1.8: Create `js/data-loader.js`

[MIG-011] The async data loader with caching:

```javascript
// js/data-loader.js

const DataLoader = {
  _cache: {},
  _baseUrl: './data/',

  async load(name) {
    if (this._cache[name]) return this._cache[name];
    try {
      const resp = await fetch(this._baseUrl + name + '.json');
      if (!resp.ok) throw new Error(`Failed to load ${name}: ${resp.status}`);
      this._cache[name] = await resp.json();
      return this._cache[name];
    } catch (err) {
      console.error(`DataLoader: failed to load ${name}`, err);
      throw err;
    }
  },

  // Preload multiple data files in parallel
  async preload(...names) {
    return Promise.all(names.map(n => this.load(n)));
  },

  // Check if data is already loaded (for conditional logic)
  has(name) {
    return !!this._cache[name];
  },

  // [MIG-011-API] Future: swap base URL for API endpoint
  // setBaseUrl(url) { this._baseUrl = url; }
  // When API is ready, uncomment and call:
  //   DataLoader.setBaseUrl('/api/data/');
  // The .json suffix won't matter — API routes ignore it or you
  // update load() to strip it when baseUrl is an API.
};
```

### Step 1.9: Update HTML `<script>` tags

[MIG-012] Every HTML file's `<head>` changes from:

```html
<!-- BEFORE -->
<script src="platform.js"></script>
<script src="fabric-data.js"></script>
```

To:

```html
<!-- AFTER [MIG-012] -->
<script src="js/data-loader.js"></script>
<script src="platform.js"></script>
<script src="js/sewing-utils.js"></script>
<script src="js/scoring.js"></script>
```

Note: `fabric-data.js` is **deleted** after all data is extracted.

### Step 1.10: Wrap page init in async

[MIG-013] Each HTML page's inline `<script>` must become async because data loading is no longer synchronous. The pattern:

```javascript
// [MIG-013] Wrap page initialization in async IIFE
(async function init() {
  // Load only what this page needs
  const [fiberData, projData] = await DataLoader.preload('fibers', 'projects');

  // Destructure into familiar constant names
  const FIBERS = fiberData.fibers;
  const PROJECT_CATALOG = projData.catalog;
  // ... etc

  // === REST OF PAGE SCRIPT (unchanged) ===
})();
```

**Per-page load requirements:**

| Page | JSON files needed |
|------|-------------------|
| `reference.html` | fibers, projects, tools |
| `planner.html` | fibers, projects, tools, machines |
| `tools.html` | fibers, tools, machines |
| `machines.html` | fibers, machines |
| `comparator.html` | fibers |

### Step 1.11: Validate

After all extractions:
1. Each JSON file must be valid JSON (run through `JSON.parse`)
2. Each page must load without errors
3. Run `validateScoringData()` in console — should produce 0 warnings
4. Test each tool's core flow:
   - Reference: fiber detail → care → glossary
   - Planner: Choose → Setup → Build → Print
   - Tools: needle lookup, seam finder
   - Machines: troubleshooter
   - Comparator: two-fiber comparison

---

## Phase 2: Data Loader + Script Extraction

### Goal
Extract inline `<script>` blocks from HTML files into separate `.js` files in `js/` or `tools/`.

### Step 2.1: Extract page scripts

[MIG-020] For each HTML file, extract the inline `<script>...</script>` block into a separate file:

| Source | Target | ~Lines |
|--------|--------|--------|
| `reference.html` inline script | `tools/tool-reference.js` | ~2,800 |
| `planner.html` inline script | `tools/tool-planner.js` | ~7,200 |
| `tools.html` inline script | `tools/tool-tools.js` | ~1,800 |
| `machines.html` inline script | `tools/tool-machines.js` | ~900 |
| `comparator.html` inline script | `tools/tool-comparator.js` | ~600 |

Each HTML file then loads its extracted script:
```html
<!-- [MIG-020] -->
<script src="tools/tool-reference.js"></script>
```

### Step 2.2: Identify shared inline patterns

[MIG-021] These patterns are duplicated across multiple page scripts and should be extracted into `js/shell.js` (Phase 3):

- Sidebar mode switching logic
- `showView()` / view toggling
- URL parameter parsing (`?mode=`, `?fiber=`)
- Sidebar bottom button handlers (People/Stash/Profile)
- `updateSidebarBottom()` active state management
- Site header rendering

---

## Phase 3: Unified Shell

### Goal
One sidebar, one nav, one source of truth for navigation. Eliminate the "different tools show different sidebars" problem.

### Step 3.1: Create `js/shell.js`

[MIG-030] Shell configuration and rendering:

```javascript
// js/shell.js
// Renders sidebar, tool switcher, and mode buttons from config

const SHELL_CONFIG = {
  tools: [
    { id: 'reference', label: 'Reference', href: 'reference.html', icon: 'book' },
    { id: 'planner', label: 'Projects', href: 'planner.html', icon: 'grid' },
    { id: 'tools', label: 'Tools', href: 'tools.html', icon: 'wrench' },
    { id: 'machines', label: 'Machines', href: 'machines.html', icon: 'gear' },
    { id: 'comparator', label: 'Compare', href: 'comparator.html', icon: 'chart' }
  ],
  // Sidebar bottom is CONSISTENT across all tools
  bottom: [
    { id: 'people', label: 'People', icon: 'user' },
    { id: 'stash', label: 'Stash', icon: 'box' },
    { id: 'profile', label: 'Profile', icon: 'settings' }
  ],
  // Per-tool sidebar modes (the middle section that changes)
  modes: {
    reference: [
      { id: 'overview', label: 'Overview', icon: '...' },
      { id: 'varieties', label: 'Varieties', icon: '...' },
      { id: 'construction', label: 'Construction', icon: '...' },
      { id: 'care', label: 'Care', icon: '...' },
      { id: 'glossary', label: 'Glossary', icon: '...' }
    ],
    planner: [
      { id: 'needle', label: 'Needle', icon: '...' },
      { id: 'seams', label: 'Seams', icon: '...' },
      { id: 'interfacing', label: 'Interfacing', icon: '...' },
      { id: 'yardage', label: 'Yardage', icon: '...' },
      { id: 'troubleshoot', label: 'Fix It', icon: '...' }
    ],
    tools: [ ... ],
    machines: [ ... ],
    comparator: [ ... ]  // comparator currently has NO sidebar — add one or leave minimal
  }
};

function initShell(activeToolId) {
  // 1. Render tool switcher (top section) — consistent everywhere
  // 2. Render mode buttons (middle section) — from SHELL_CONFIG.modes[activeToolId]
  // 3. Render bottom buttons — consistent everywhere
  // 4. Attach event listeners for mode switching
  // 5. Mark active tool + active mode
}
```

### Step 3.2: Remove hardcoded sidebar HTML from all pages

[MIG-031] Delete the `<nav class="sidebar">...</nav>` block from:
- `reference.html` (lines ~16–70)
- `planner.html` (lines ~14–70)
- `tools.html` (lines ~14–70)
- `machines.html` (lines ~14–50)

Replace with:
```html
<!-- [MIG-031] Shell renders sidebar dynamically -->
<nav class="sidebar" id="appSidebar"></nav>
```

And in the page script:
```javascript
initShell('reference'); // or 'planner', 'tools', etc.
```

### Step 3.3: Bring comparator into the sidebar system

[MIG-032] `comparator.html` currently uses a completely different top-bar nav. Delete:
```html
<!-- DELETE [MIG-032] -->
<div class="tool-switcher">
  <a href="reference.html">Reference</a>
  <a href="comparator.html" class="current">Comparator</a>
  ...
</div>
```

Add the same sidebar container and `initShell('comparator')`.

### Step 3.4: Sidebar bottom works from every page

[MIG-033] Currently, tools.html and machines.html redirect to planner.html for People/Stash/Profile:
```javascript
// CURRENT (tools.html line 57)
onclick="window.location='planner.html?bottom=people'"
```

After shell unification, People/Stash/Profile panels should work on every page. Either:
- **Option A:** Keep them as planner.html redirects (simpler, weaker)
- **Option B:** Extract People/Stash/Profile rendering into shared modules that any page can invoke (recommended for SPA, but can wait until Phase 4)

For Phase 3, Option A is fine — the shell at least renders the buttons consistently.

---

## Phase 4: SPA Router

### Goal
Single `index.html` entry point, JS-based routing, no full page reloads.

[MIG-040] Create `js/router.js`:

```javascript
// js/router.js
const Router = {
  routes: {},
  currentTool: null,

  register(toolId, { init, destroy, modes }) {
    this.routes[toolId] = { init, destroy, modes };
  },

  async navigate(path) {
    // path = '#/reference' or '#/tools/pressing'
    const [toolId, mode] = path.replace('#/', '').split('/');

    if (this.currentTool && this.currentTool !== toolId) {
      this.routes[this.currentTool]?.destroy?.();
    }

    // Lazy-load tool script if not yet loaded
    if (!this.routes[toolId]?._loaded) {
      await this.loadToolScript(toolId);
    }

    this.currentTool = toolId;
    this.routes[toolId].init(mode);
    initShell(toolId, mode);
  },

  async loadToolScript(toolId) {
    // [MIG-040-API] Dynamic script loading
    const script = document.createElement('script');
    script.src = `tools/tool-${toolId}.js`;
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    this.routes[toolId]._loaded = true;
  }
};

// Listen for hash changes
window.addEventListener('hashchange', () => Router.navigate(location.hash));
window.addEventListener('DOMContentLoaded', () => {
  Router.navigate(location.hash || '#/reference');
});
```

[MIG-041] Single `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Natural Fabrics Guide</title>
  <link rel="stylesheet" href="css/platform.css">
  <link rel="stylesheet" href="css/shared.css">
  <script src="js/data-loader.js"></script>
  <script src="platform.js"></script>
  <script src="js/sewing-utils.js"></script>
  <script src="js/scoring.js"></script>
  <script src="js/shell.js"></script>
  <script src="js/router.js"></script>
</head>
<body>
  <nav class="sidebar" id="appSidebar"></nav>
  <div class="main-content" id="appContent"></div>
</body>
</html>
```

---

## Phase 5: Persistence Abstraction

### Goal
Make storage swappable without touching feature code.

[MIG-050] Create `js/storage.js`:

```javascript
// js/storage.js
// Abstract data store interface

class DataStore {
  async load() { throw new Error('Not implemented'); }
  async save(data) { throw new Error('Not implemented'); }
  async export() { throw new Error('Not implemented'); }
  async import(file) { throw new Error('Not implemented'); }
}

class LocalStore extends DataStore {
  constructor(key = 'nfg_userData', defaults) {
    super();
    this.key = key;
    this.defaults = defaults;
    // [MIG-050] Schema version for migration
    this.schemaVersion = 2;
  }

  async load() {
    // [MIG-050] Same logic as current loadUserData()
    // Add: check data.schemaVersion, run migrations if needed
  }

  async save(data) {
    // [MIG-050] Same logic as current saveUserData()
    data.schemaVersion = this.schemaVersion;
  }

  async export() { /* same as current exportUserData() */ }
  async import(file) { /* same as current importUserData() */ }
}

// [MIG-050-API] Future: API-backed store
// class ApiStore extends DataStore {
//   constructor(baseUrl, authToken) {
//     super();
//     this.baseUrl = baseUrl;
//     this.authToken = authToken;
//   }
//   async load() {
//     const resp = await fetch(`${this.baseUrl}/user-data`, {
//       headers: { 'Authorization': `Bearer ${this.authToken}` }
//     });
//     return resp.json();
//   }
//   async save(data) {
//     await fetch(`${this.baseUrl}/user-data`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${this.authToken}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });
//   }
// }

// Global store instance — swap implementation here
const store = new LocalStore('nfg_userData', USER_DATA_DEFAULTS);
```

[MIG-051] Replace all `loadUserData()` / `saveUserData()` calls:
```javascript
// BEFORE
const data = loadUserData();
saveUserData(data);

// AFTER [MIG-051]
const data = await store.load();
await store.save(data);
```

This is a global find-and-replace across all tool scripts. The `await` is the only change at each call site — the data shapes are identical.

---

## Phase 6: Multi-Craft Module System

### Goal
Adding a new craft (dyeing, quilting) = adding files, not surgery.

[MIG-060] Directory structure:

```
crafts/
  sewing/
    data/
      fibers.json
      projects.json
      tools.json
      machines.json
    js/
      sewing-utils.js
      scoring.js
    css/
      sewing.css          (renamed from shared.css)
    tools/
      tool-reference.js
      tool-planner.js
      tool-tools.js
      tool-machines.js
      tool-comparator.js
    manifest.json         (declares tools, modes, data deps)
  dyeing/
    data/
      dye-recipes.json
      color-theory.json
    js/
      dyeing-utils.js
    css/
      dyeing.css
    tools/
      tool-dye-planner.js
    manifest.json
```

[MIG-061] Craft manifest format:
```json
{
  "id": "sewing",
  "name": "Sewing",
  "version": "4.0.0",
  "tools": [
    { "id": "reference", "label": "Reference", "script": "tools/tool-reference.js" },
    { "id": "planner", "label": "Projects", "script": "tools/tool-planner.js" }
  ],
  "data": ["fibers", "projects", "tools", "machines"],
  "css": "css/sewing.css",
  "sharedDeps": ["profiles", "stash"]
}
```

---

## API Readiness Notes

### What changes when you add a backend

[MIG-API-001] **DataLoader base URL swap:**
```javascript
// In data-loader.js, change:
DataLoader.setBaseUrl('/api/data/');
// All fetch('./data/fibers.json') calls become fetch('/api/data/fibers')
```

[MIG-API-002] **Storage backend swap:**
```javascript
// In storage.js, change the global instance:
const store = new ApiStore('https://api.example.com/v1', authToken);
// All store.load() / store.save() calls now hit the API
```

[MIG-API-003] **Auth flow (new file):**
```javascript
// js/auth.js
// - Login / signup / logout
// - Token storage (httpOnly cookies recommended)
// - Session refresh
// - Redirect to login on 401
```

[MIG-API-004] **Offline-first sync (future):**
```javascript
// js/sync.js
// - LocalStore as primary, ApiStore as secondary
// - Queue saves when offline
// - Merge on reconnect (last-write-wins or field-level merge)
// - Conflict UI for manual resolution
```

[MIG-API-005] **API endpoints needed:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | Email/password login |
| `/api/auth/signup` | POST | Create account |
| `/api/auth/session` | GET | Validate/refresh session |
| `/api/data/fibers` | GET | Fiber reference data (cacheable, public) |
| `/api/data/projects` | GET | Project catalog (cacheable, public) |
| `/api/data/tools` | GET | Tools reference data (cacheable, public) |
| `/api/data/machines` | GET | Machine reference data (cacheable, public) |
| `/api/user-data` | GET | User's profiles, stash, plans, pipeline state |
| `/api/user-data` | PUT | Save user data |
| `/api/user-data/export` | GET | Download full user data as JSON |
| `/api/user-data/import` | POST | Upload/merge user data from JSON |

Reference data endpoints are **public and cacheable** — they don't change per user. User data endpoints are **authenticated and private**.

---

## Appendix: Data Object Inventory

Complete mapping of every export in `fabric-data.js` with destination:

| Object | Lines | Dest File | Type |
|--------|-------|-----------|------|
| `FIBERS` | 9–1340 | `data/fibers.json` → `.fibers` | JSON |
| `COMPARE_PROPS` | 1343 | `data/fibers.json` → `.compareProps` | JSON |
| `PROP_LABELS` | 1344 | `data/fibers.json` → `.propLabels` | JSON |
| `PROP_INVERTED` | 1349 | `data/fibers.json` → `.propInverted` | JSON |
| `PROP_DISPLAY_LABELS` | 1352 | `data/fibers.json` → `.propDisplayLabels` | JSON |
| `propDisplayValue()` | 1361 | `js/sewing-utils.js` | JS function |
| `PROP_TOOLTIPS` | 1366 | `data/fibers.json` → `.propTooltips` | JSON |
| `FIBER_PROS_CONS` | 1380 | `data/fibers.json` → `.fiberProsCons` | JSON |
| `FILTER_TAGS` | 1463 | `data/fibers.json` → `.filterTags` | JSON |
| `FIBER_ENV_ALLERGEN` | 1476 | `data/fibers.json` → `.fiberEnvAllergen` | JSON |
| `WEIGHT_TECHNIQUES` | 1642 | `data/fibers.json` → `.weightTechniques` | JSON |
| `NEEDLE_DATA` | 1663 | `data/tools.json` → `.needleData` | JSON |
| `BLEND_NOTES` | 2095 | `data/fibers.json` → `.blendNotes` | JSON |
| `TECHNIQUE_DATA` | 2248 | `data/tools.json` → `.techniqueData` | JSON |
| `SEAM_FINISHES` | 2669 | `data/tools.json` → `.seamFinishes` | JSON |
| `INTERFACING_TYPES` | 2725 | `data/tools.json` → `.interfacingTypes` | JSON |
| `FIBER_INTERFACING_RECS` | 2794 | `data/tools.json` → `.fiberInterfacingRecs` | JSON |
| `GLOSSARY_DATA` | 2819 | `data/tools.json` → `.glossaryData` | JSON |
| `WEAVE_DATA` | 2871 | `data/tools.json` → `.weaveData` | JSON |
| `YARDAGE_DATA` | 3261 | `data/projects.json` → `.yardageData` | JSON |
| `YARDAGE_SIZE_MULTIPLIERS` | 3328 | `data/projects.json` → `.yardageSizeMultipliers` | JSON |
| `YARDAGE_HEIGHT_ADJUST` | 3339 | `data/projects.json` → `.yardageHeightAdjust` | JSON |
| `YARDAGE_WIDTH_MULTIPLIERS` | 3347 | `data/projects.json` → `.yardageWidthMultipliers` | JSON |
| `YARDAGE_ADDONS` | 3355 | `data/projects.json` → `.yardageAddons` | JSON |
| `TROUBLESHOOT_DATA` | 3365 | `data/tools.json` → `.troubleshootData` | JSON |
| `CARE_EXTENDED` | 3643 | `data/fibers.json` → `.careExtended` | JSON |
| `CARE_SECTIONS` | 4914 | `data/fibers.json` → `.careSections` | JSON |
| `MACHINE_TYPES` | 4929 | `data/machines.json` → `.machineTypes` | JSON |
| `TOOL_INVENTORY_LABELS` | 4947 | `data/machines.json` → `.toolInventoryLabels` | JSON |
| `MACHINE_TROUBLESHOOT` | 4955 | `data/machines.json` → `.machineTroubleshoot` | JSON |
| `MACHINE_MAINTENANCE` | 5698 | `data/machines.json` → `.machineMaintenance` | JSON |
| `PROJECT_AUDIENCES` | 5828 | `data/projects.json` → `.audiences` | JSON |
| `PROJECT_CATALOG` | 5837 | `data/projects.json` → `.catalog` | JSON |
| `CONSTRUCTION_DETAILS` | 7882 | `data/projects.json` → `.constructionDetails` | JSON |
| `MEASUREMENT_PRESETS` | 8354 | `data/projects.json` → `.measurementPresets` | JSON |
| `MEASUREMENT_GROUPS` | 8374 | `data/projects.json` → `.measurementGroups` | JSON |
| `ALL_MEAS_KEYS` | 8381 | `data/projects.json` → `.allMeasKeys` | JSON |
| `BASE_YARDAGE` | 8387 | `data/projects.json` → `.baseYardage` | JSON |
| `estimateYardage()` | 8398 | `js/sewing-utils.js` | JS function |
| `FINDER_PROPS` | 8420 | `js/scoring.js` | JS config |
| `FINDER_PROP_LABELS` | 8421 | `js/scoring.js` | JS config |
| `FINDER_PROP_SHORT` | 8422 | `js/scoring.js` | JS config |
| `FINDER_PROP_INTERPS` | 8423 | `js/scoring.js` | JS config |
| `validateScoringData()` | 8442 | `js/scoring.js` | JS function |
| `computeScore()` | 8538 | `js/scoring.js` | JS function |
| `scoreFibersForProject()` | 8605 | `js/scoring.js` | JS function |
| `scoreProjectsForFiber()` | 8624 | `js/scoring.js` | JS function |

### platform.js (unchanged in Phase 1, refactored in Phase 5)

| Object | Lines | Phase 5 Dest | Type |
|--------|-------|--------------|------|
| `USER_DATA_DEFAULTS` | 9–50 | `js/storage.js` (bundled with LocalStore) | JS config |
| `WEIGHT_CATEGORIES` | 54–61 | stays in `platform.js` | JS config |
| `ozToGsm()` | 64 | stays in `platform.js` | JS function |
| `gsmToOz()` | 65 | stays in `platform.js` | JS function |
| `getWeightCategory()` | 67 | stays in `platform.js` | JS function |
| `loadUserData()` | 74–103 | `js/storage.js` → `LocalStore.load()` | JS function |
| `saveUserData()` | 105–108 | `js/storage.js` → `LocalStore.save()` | JS function |
| `exportUserData()` | 110–126 | `js/storage.js` → `LocalStore.export()` | JS function |
| `importUserData()` | 128–142 | `js/storage.js` → `LocalStore.import()` | JS function |
| `getProfile()` | 146 | stays in `platform.js` | JS function |
| `addProfile()` | 150 | stays in `platform.js` | JS function |
| `updateProfile()` | 158 | stays in `platform.js` | JS function |
| `addStashEntry()` | 168 | stays in `platform.js` | JS function |
| `updateStashEntry()` | 175 | stays in `platform.js` | JS function |
| `removeStashEntry()` | 183 | stays in `platform.js` | JS function |
| `getStashGroups()` | 188 | stays in `platform.js` | JS function |
| `getStashFibers()` | 204 | stays in `platform.js` | JS function |
| `savePipelineState()` | 217 | `js/storage.js` → `LocalStore.savePipeline()` | JS function |
| `clearPipelineState()` | 222 | `js/storage.js` → `LocalStore.clearPipeline()` | JS function |

---

## Tag Index

Quick reference for all `[MIG-xxx]` tags:

| Tag | Phase | Description |
|-----|-------|-------------|
| `MIG-001` | 1 | Extract FIBERS + fiber-adjacent data to fibers.json |
| `MIG-002` | 1 | Consumer destructuring for fiber data |
| `MIG-003` | 1 | Extract PROJECT_CATALOG + yardage data to projects.json |
| `MIG-004` | 1 | Consumer destructuring for project data |
| `MIG-005` | 1 | Extract needle/technique/seam/glossary to tools.json |
| `MIG-006` | 1 | Consumer destructuring for tools data |
| `MIG-007` | 1 | Extract machine data to machines.json |
| `MIG-008` | 1 | Consumer destructuring for machine data |
| `MIG-009` | 1 | Extract sewing utility functions to sewing-utils.js |
| `MIG-010` | 1 | Extract scoring engine to scoring.js |
| `MIG-011` | 1 | Create data-loader.js with caching |
| `MIG-012` | 1 | Update HTML script tags |
| `MIG-013` | 1 | Wrap page init in async |
| `MIG-020` | 2 | Extract inline scripts to tool-*.js files |
| `MIG-021` | 2 | Identify shared patterns for shell extraction |
| `MIG-030` | 3 | Create shell.js with nav config |
| `MIG-031` | 3 | Remove hardcoded sidebar HTML |
| `MIG-032` | 3 | Bring comparator into sidebar system |
| `MIG-033` | 3 | Sidebar bottom consistency |
| `MIG-040` | 4 | Create router.js |
| `MIG-041` | 4 | Single index.html entry point |
| `MIG-050` | 5 | Create storage.js with DataStore abstraction |
| `MIG-051` | 5 | Replace load/saveUserData calls with store.* |
| `MIG-060` | 6 | Multi-craft directory structure |
| `MIG-061` | 6 | Craft manifest format |
| `MIG-011-API` | API | DataLoader base URL for API |
| `MIG-050-API` | API | ApiStore implementation |
| `MIG-API-001` | API | DataLoader URL swap |
| `MIG-API-002` | API | Storage backend swap |
| `MIG-API-003` | API | Auth flow |
| `MIG-API-004` | API | Offline-first sync |
| `MIG-API-005` | API | API endpoint inventory |
