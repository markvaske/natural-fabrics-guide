# Current State — Natural Fabrics Guide

Authoritative snapshot of what's actually built. No aspirational content.
Update in the same commit as any change to architecture or file inventory.

**Version:** v5.3.0 — Groups + Stash Workshop + People redesign
**Date:** 2026-05-03

---

## Entry Point & Routing

Single SPA: `index.html`. Hash routing via `js/router.js`.

| Hash | Tool | Lazy-loaded script |
|------|------|--------------------|
| `#reference` | Fabric Finder | `js/tool-reference.js` |
| `#projects` | Projects / Pipeline | `js/tool-planner.js` |
| `#tools` | Tools & Machines | `js/tool-tools.js` |

Default route on load: `#reference`.

---

## File Inventory

### Root
| File | Size | Purpose |
|------|------|---------|
| `index.html` | — | SPA shell, sidebar, tool containers |
| `platform.js` | ~190 lines | User data CRUD, weight utils, shared helpers |
| `platform.css` | ~250 lines | Design tokens, reset, sidebar, layout |
| `shared.css` | ~5,200 lines | All sewing-specific styles |
| `AGENTS.md` | — | Agent fast-start (read first) |
| `CLAUDE.md` | — | Architecture rules, Definition of Done, operational state |
| `Project.md` | — | Feature overview, user goals (partially stale — see note) |
| `MIGRATION-v4.md` | — | v4 migration plan with [MIG-xxx] code tags |

> **Note on Project.md:** The architecture section of Project.md still references a multi-page structure (`reference.html`, `planner.html`, `tools.html`) from before the SPA migration. The feature inventory is broadly accurate; the technical architecture is not. Trust this file (`current-state.md`) over Project.md for architecture.

### `js/` — Shared JavaScript
| File | Purpose |
|------|---------|
| `router.js` | Hash router, lazy tool loading, global data assignment |
| `shell.js` | Sidebar config (icons, tool list, modes, bottom buttons), `shellRegisterTool()` |
| `data-loader.js` | Async loader for data files; exposes globals after load |
| `storage.js` | DataStore abstraction (LocalStore + ApiStore skeleton); `loadUserData()`, `saveUserData()` |
| `sewing-utils.js` | Derived property helpers, `propDisplayValue()` for inverted shrinkage display |
| `scoring.js` | Fiber scoring engine (13-property 0–100 scale) |

### `js/` — Tool Scripts (lazy-loaded)
| File | Size | Tool |
|------|------|------|
| `tool-reference.js` | ~93 KB | Fabric Finder — fiber browse, compare, blend |
| `tool-planner.js` | ~366 KB | Projects / Pipeline — catalog, 4-stage pipeline |
| `tool-tools.js` | ~70 KB | Tools — machines, cutting, measuring, pressing, needles |

> **Unverified:** Feature-level detail inside these three files has not been read in this session. The feature status table below is derived from CLAUDE.md and Project.md, not from source.

### `data/` — Static Data (loaded async)
| File | Size | Contents |
|------|------|---------|
| `fibers.js` | ~247 KB | `FIBERS` — 20 fibers, ~110+ varieties, 13 properties each |
| `projects.js` | ~241 KB | `PROJECT_CATALOG` — project definitions |
| `tools.js` | ~153 KB | `TOOL_DATA` — tool reference data |
| `machines.js` | ~48 KB | `MACHINE_DATA` — machine data |

---

## Data Layer

**FIBERS** (`data/fibers.js`) is the single source of truth for all fiber and variety data. Never duplicate.

**13 scored properties** (0–100 scale): breathability, absorbency, drape, wrinkleResistance, durability, shrinkage, heatTolerance, stretch, pillingResistance, colorfastness, structure, washability, softness

**Shrinkage convention:** stored bad-high (100 = no shrinkage, 0 = maximum shrinkage). Always use `propDisplayValue('shrinkage', v)` from `js/sewing-utils.js` to invert before display.

---

## Storage & User Data

**Backend:** `js/storage.js` — `var store = LocalStore` (swappable to `ApiStore`).

**Schema version:** 2 (auto-migrated on load via `SCHEMA_MIGRATIONS` in `storage.js`).

**User data shape (v2):**
```js
{
  _schemaVersion: 2,
  profile: {
    // Singleton sewist identity: skill level, preferred tools, preferences
  },
  profiles: [
    // Array of people with measurements (for sizing)
  ],
  favoriteProjects: []   // added in v1→v2 migration
}
```

**Two-level user model:**
- `profile` — singleton identity (the logged-in sewist)
- `profiles[]` — people roster (named individuals with body measurements)

---

## CSS Architecture

Load order (all unlayered; specificity battles resolved by source order):
1. `platform.css` — tokens, reset, sidebar, layout
2. `shared.css` — all sewing-specific component styles (~5,200 lines)

Token source: `platform.css` only. See `work/design-rules.md` for the full token table and enforcement rules.

**Future:** `design-system.css` with `@layer components` (not yet created — flagged as a future initiative in `work/work-log.md`).

---

## Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Fabric Finder (browse, compare, blend) | Shipped | `tool-reference.js` |
| Weaves & Knits reference | Shipped | — |
| Techniques reference | Shipped | — |
| Construction reference | Shipped | — |
| Projects catalog | Shipped | `tool-planner.js` |
| Pipeline (Choose → Setup → Build → Complete) | Shipped | `tool-planner.js` |
| Tools & Machines | Shipped | `tool-tools.js` |
| Global Profile panel | Shipped | `gp-` namespace |
| People view (redesigned sidebar/detail) | Shipped v5.3 | — |
| Groups | Shipped v5.3 | — |
| Stash / Workshop | Shipped v5.3 | — |
| Profile card grid | **Pending** | Current initiative |
| Group project workspace | **Pending** | Current initiative |
| Two-way links (people ↔ projects) | **Pending** | Current initiative |
| Dyeing tool | **Not started** | Next major initiative |

---

## What Needs a Verification Pass

The following sections need to be read from source before being filled in here:

- [ ] `index.html` — shell structure, container IDs, sidebar markup
- [ ] `tool-reference.js` — Fabric Finder feature inventory and component map
- [ ] `tool-planner.js` — Pipeline stages, project home, People/Stash implementation
- [ ] `tool-tools.js` — Tools feature inventory
- [ ] `js/shell.js` full read — sidebar init, mode switching implementation
- [ ] `shared.css` section map — which namespace sections exist and what they cover
