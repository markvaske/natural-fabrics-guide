# Natural Fabrics Guide — Design Rules

Rules for all new CSS and HTML. Existing code that violates these should be migrated when touched, not left as-is.

---

## Token Reference (platform.css)

### Colors
| Token | Value | Use |
|-------|-------|-----|
| `--cream` | `#FAF6F0` | Page background |
| `--warm-white` | `#FFFDF9` | Card / panel backgrounds |
| `--ink` | `#2A2520` | Primary text |
| `--ink-light` | `#5C554D` | Secondary / muted text |
| `--ink-faint` | `#9B9389` | Placeholder, disabled |
| `--accent` | `#5B8C6B` | Interactive elements, links |
| `--accent-soft` | `rgba(91,140,107,0.1)` | Accent hover backgrounds |
| `--red` | `#C83C3C` | Destructive actions |
| `--green` | `#5B8C6B` | Success states |
| `--green-bg` | `rgba(91,140,107,0.06)` | Success background tints |
| `--amber` | `#B8860B` | Warnings |
| `--amber-bg` | `rgba(184,134,11,0.06)` | Warning background tints |
| `--rose` | `#C17B7B` | Errors, danger |
| `--rose-bg` | `rgba(193,123,123,0.08)` | Error background tints |
| `--border` | `rgba(0,0,0,0.06)` | Standard borders |
| `--border-light` | `rgba(0,0,0,0.04)` | Subtle dividers |

### Shape & Layout
| Token | Value | Use |
|-------|-------|-----|
| `--tab-radius` | `12px` | Tab / pill controls |
| `--card-radius` | `14px` | Cards, modals |
| `--section-bg` | `rgba(255,255,255,0.5)` | Section container background |
| `--section-radius` | `10px` | Section container radius |
| `--section-padding` | `18px 22px` | Section container padding |
| `--section-gap` | `32px` | Gap between sections |

### Typography
| Token | Use |
|-------|-----|
| `--heading-size` / `--heading-spacing` | Section headings (0.82rem / 0.1em) |
| `--sublabel-size` / `--sublabel-spacing` | Sub-labels, captions (0.72rem / 0.08em) |
| `--body-size` / `--body-line-height` | Body copy (0.88rem / 1.6) |

Font stack (defined on `body`): `'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif`

---

## Rules

**1. Colors from tokens only.**
No hex literals or `rgb()` values in new CSS. If the color you need isn't in the token table above, add it to `platform.css` first, then use the token.

**2. No `style=` for static values.**
Static colors, spacing, radii, and font sizes belong in CSS. Inline style is only for values computed at runtime (e.g., a dynamic width percentage, a JS-driven transform).

**3. Use CSS namespace prefixes — always.**
Every new class must carry the prefix for its tool or scope:
| Prefix | Scope |
|--------|-------|
| `ff-` | Fabric Finder (reference tool) |
| `cons-` | Construction tab |
| `pl-` | Pipeline stages (Choose, Setup, Build, Complete) |
| `gp-` | Global Profile panel |
| `ob-` | Onboarding wizard |
| `seg-` | Segmented controls (shared across tools) |
| `tools-` | Tools modes (machines, cutting, etc.) |

Don't introduce a new prefix without updating CLAUDE.md and this table.

**4. `shared.css` is legacy — don't grow it.**
Search `shared.css` before adding anything; the rule probably already exists. When editing a block, migrate its values to tokens. Don't add new sections or namespace regions to `shared.css`.

**5. `platform.css` is the token source.**
New design tokens (colors, radii, spacing) go in `platform.css` only. Tool files and `shared.css` consume tokens; they never define them.

**6. Sidebar and global layout are owned by `platform.css` + `js/shell.js`.**
Don't add sidebar dimensions, z-index, or layout rules to tool-specific CSS files. Changes to the sidebar go through `platform.css` and `js/shell.js` only.

**7. Future: `@layer components` migration.**
The goal is a `design-system.css` that uses `@layer components` to isolate new components from `shared.css` specificity. Until that migration runs, keep new components in the correct namespace section of `shared.css`, fully token-compliant, so they migrate cleanly.
