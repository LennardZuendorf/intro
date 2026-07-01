---
type: feature-plan
feature: neon-nav
sibling: tech.md
parent: ../../plan.md
updated: 2026-06-29
---

# Feature: neon-nav — Implementation Plan

Adds the dock + command palette. Order: section registry → palette (cmdk + keyboard
+ jump) → dock shell hosting the controls. A closed box: when DONE, the visitor
navigates the page entirely via dock + palette.

**Parent:** [../../plan.md](../../plan.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)
**Design:** [design.md](design.md)

**Feature gate:** Starts when **neon-foundation** is `DONE` (root [plan.md](../../plan.md) Feature Sequence). Section ids it targets come from neon-landing; if landing is not yet merged, target the agreed id set (`about/work/notes/contact`).

---

## Problem Frame

The palette needs a list of sections, so the registry comes first. The palette is
the core interaction (keyboard + jump). The dock is mostly a shell that hosts the
foundation's controls plus the palette trigger, so it lands last. One global
keydown listener must live in one place (the palette) to avoid double-binding.

---

## Requirements Trace

| ID | Requirement | Units |
|---|---|---|
| R1 | [Floating dock](product.md#requirement-floating-dock) | neon-nav/3 |
| R2 | [Command palette](product.md#requirement-command-palette) | neon-nav/2 |
| R3 | [Section registry](product.md#requirement-section-registry) | neon-nav/1 |

---

## Key Technical Decisions

1. **Single section registry.** `NAV_SECTIONS` drives palette + JUMP; ids match
   neon-landing's section ids.
2. **Reuse RetroUI `Command` (cmdk).** Don't hand-roll a palette.
3. **One keydown listener in the palette.** Dock triggers via the same handler.

---

### neon-nav/1 — Section registry

**Goal:** `NAV_SECTIONS` exists with id/label/blurb/n for about/work/notes/contact.

**Requirements:** R3

**Dependencies:** —

**Files:**

```
src/components/nav/sections.ts
```

**Test scenarios:**

- Registry entries' ids match the section ids rendered on `/`.

**Verification:** `pnpm test` (registry/id match if landing present); type-check.

---

### neon-nav/2 — Command palette

**Goal:** `/`/`⌘K` opens a cmdk palette that filters and jumps with full keyboard support.

**Requirements:** R2

**Dependencies:** neon-nav/1

**Files:**

```
src/components/nav/command-palette.tsx
```

**Test scenarios:**

- `/` and `⌘K` open the palette; `/` ignored while typing in an input.
- Type "work" + Enter scrolls to Work; ↑↓ move selection; Esc closes.

**Verification:** `pnpm test` (palette open/filter/jump); manual keyboard run.

---

### neon-nav/3 — Floating dock

**Goal:** Top-center dock renders JUMP + mode toggle + accent swatches and opens the palette.

**Requirements:** R1

**Dependencies:** neon-nav/2; **requires neon-foundation's `accent-swatches.tsx` + dock-styled `theme-select.tsx`** (whole-feature gate). The dock imports them — it cannot build before foundation produces them.

**Files:**

```
src/components/nav/dock.tsx
src/app/page.tsx          # mount <Dock/>; remove <Nav> import + fixed wrapper (coordinate with landing's page rewrite)
```

**Test scenarios:**

- Dock visible at all scroll positions; JUMP opens palette; hosted mode/accent controls work.
- `<Nav>` no longer mounts on `/`; `navbar.tsx` still present for legal route.

**Verification:** `pnpm build`; manual visual + interaction check per [design.md](design.md). End-to-end jump verification requires neon-landing's section ids present; if landing isn't merged, scope to "jumps resolve when targets exist, graceful no-op otherwise."

---

## Progress

| Unit | Status |
|---|---|
| neon-nav/1 | NOT STARTED |
| neon-nav/2 | NOT STARTED |
| neon-nav/3 | NOT STARTED |
