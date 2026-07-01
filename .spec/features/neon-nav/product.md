---
type: feature-product
feature: neon-nav
sibling: tech.md
parent: ../../product.md
updated: 2026-06-29
---

# Feature: neon-nav — Product

The navigation chrome: a persistent floating dock (top-center pill) and a command
palette that replaces the traditional navbar. The dock hosts the JUMP button, the
mode toggle, and the accent swatches; the palette (opened with `/` or `⌘K`) fuzzy-
filters sections and jumps to them.

**Parent:** [../../product.md](../../product.md)
**Architecture:** [tech.md](tech.md)
**Design:** [design.md](design.md)
**Plan:** [plan.md](plan.md)

---

## Scope

| | |
|---|---|
| **Owns** | Floating dock shell; command palette; section registry; keyboard handling (`/`, `⌘K`, ↑↓↵esc); smooth-scroll jump. |
| **Does not own** | Section content/ids (neon-landing defines ids); accent/mode logic (neon-foundation — dock only *hosts* those controls); scroll-progress bar and other motion (neon-effects / foundation). |

---

## Requirements

### Requirement: Floating dock

The site SHALL show a persistent top-center dock containing a JUMP button, the
light/dark toggle, and the accent swatches.

#### Scenario: Dock present

- **Given** any scroll position on `/`
- **When** the visitor looks at the top of the viewport
- **Then** the dock is visible and its controls work

### Requirement: Command palette

The site SHALL provide a command palette that lists the page's sections, filters
them by typed query, and jumps to the chosen section.

#### Scenario: Open and jump

- **Given** the palette is closed
- **When** the visitor presses `/` (or `⌘K`), types "work", and presses Enter
- **Then** the palette opens, filters to the Work section, and the page scrolls to it

#### Scenario: Keyboard navigation

- **Given** the palette is open with results
- **When** the visitor presses ↑/↓ then Enter
- **Then** selection moves and Enter jumps to the highlighted section; Esc closes

### Requirement: Section registry

The palette and JUMP SHALL operate on a registry of sections (id, label, blurb)
that matches the sections rendered by neon-landing.

#### Scenario: Registry matches page

- **Given** the page renders sections about/work/notes/contact (hero is the top, reached via scroll-to-top, never a registry row)
- **When** the palette opens
- **Then** its list is exactly about/work/notes/contact

---

## User Experience

```
   ┌──────────────────────────────────────────┐
   │  JUMP /   │  ☾ ☀  │  ● ● ● ●              │   ← floating dock
   └──────────────────────────────────────────┘

   press /  →  ┌── command palette ──────────┐
              │ /  Jump to a section…   ESC  │
              │ 01 About    a short who-and-why │
              │ 02 Work     things I shipped  ↵ │
              │ 03 Notes    half-baked ideas    │
              │ 04 Contact  where to find me    │
              └──────────────────────────────┘
```

---

## Non-Goals

- No traditional navbar/links bar on the landing page (the `<Nav>` mount is removed
  from `page.tsx`). `navbar.tsx` itself is NOT deleted — the legal route still uses it.
- No deep-link routing — jumps are in-page smooth scrolls to section ids.
- No search over content (only section navigation) in v1.

---

## Open Questions

1. **Mobile dock** — full dock vs condensed (JUMP + mode only, swatches in
   palette). Recommendation: condensed on small screens.
