---
type: feature-product
feature: component-unification
parent: ../../product.md
siblings:
  - tech.md
  - design.md
  - plan.md
updated: 2026-07-05
---

# Component Unification & Base UI Migration — Product

**Parent:** [product.md](../../product.md)  
**Tech:** [tech.md](tech.md) · **Design:** [design.md](design.md) · **Plan:** [plan.md](plan.md)

Adopt the `@retroui/*` registry as the single source of interactive UI primitives. Because retroUI is built on **Base UI** (`@base-ui/react`), this feature is the project's Base UI migration — not a parallel effort. Eliminate Radix forks of the same primitive, centralize repeated composition patterns, and align styling with the neobrutalist token system in [design.md](../../design.md).

---

## Scope

| | |
|---|---|
| **Owns** | Interactive primitive migration (Button, tooltip, hover-card, dropdown-menu, kbd, separator, alert); shared composition wrappers; dead-file removal; Radix dependency reduction; shortcut copy accuracy |
| **Does not own** | Typography/section layout system; cmdk command palette behavior; effects layer; footer vs dock ThemeSelect placement; optional deferred dialog/progress/toggle-group |

---

## Requirements

### R1 — Single headless primitive layer

The system **SHALL** use `@base-ui/react` primitives via installed `@retroui/*` registry components for every interactive UI concern migrated in this feature. The system **MUST NOT** maintain parallel Radix implementations of the same primitive (e.g. Radix hover-card alongside `@retroui/hover-card`).

**Scenario:** Given a developer adds a new tooltip to the dock, when they import the tooltip primitive, then it comes from the synced `@retroui/tooltip` component backed by `@base-ui/react/tooltip`.

### R2 — Site token fidelity

Migrated components **MUST** preserve neobrutalist tokens defined in [design.md](../../design.md): `rounded-base`, `border-2`, `border-border`, `shadow-shadow`, `font-head`, and explicit `focus-visible` rings on interactive controls.

**Scenario:** Given the Button is migrated to `@retroui/button`, when a user tabs to it, then a visible focus ring appears and hover/active shadow translation matches pre-migration behavior.

### R3 — Typography and section unchanged

The system **MUST NOT** replace [`src/components/ui/typography.tsx`](../../../src/components/ui/typography.tsx) or [`src/components/ui/section.tsx`](../../../src/components/ui/section.tsx) with `@retroui/text`. New typography variants (`eyebrow`, `display`) **MAY** be added to the existing system instead of overriding responsive scales at call sites.

### R4 — Shared composition wrappers

Duplicated UI patterns **SHALL** be extracted into reusable site components that compose retroUI primitives:

- Section eyebrows (`// about`, etc.)
- MDX hover-card inline triggers
- Dock vertical dividers
- Theme/accent icon menu shells

**Scenario:** Given all four content sections, when eyebrows render, then they use one `SectionEyebrow` component with identical token styling.

### R5 — NeoBadge design continuity

Hero and editorial badge surfaces **SHALL** retain rotation and hard-shadow character via a thin `NeoBadge` wrapper over `@retroui/badge`, not a parallel badge implementation.

### R6 — Allowed Radix exceptions

After migration, `@radix-ui/react-slot` (composition `asChild`) and cmdk's transitive Radix Dialog **MAY** remain. All other `@radix-ui/react-*` packages listed in [tech.md](tech.md) **MUST** be removed once imports reach zero.

### R7 — Incremental delivery with verification gates

Migration **SHALL** proceed in phases A→D with `pnpm check`, `pnpm build`, and `pnpm test` passing at each phase boundary. No big-bang rewrite.

### R8 — Shortcut honesty

Keyboard shortcut hints in tooltips, aria-labels, and command palette footer **MUST** match actual key handlers (e.g. if `/` opens the palette without Shift, copy must not claim "shift + /").

---

## Non-goals

- Replacing cmdk with a Base UI command implementation
- Migrating typography `Slot` to Base UI `useRender`
- `@retroui/dialog` for command palette shell (defer)
- `@retroui/progress` for scroll bar (defer)
- Reviving inline `AccentSwatches` toggle group (defer unless product asks)

---

## Dependencies

- Assumes v4 redesign features ([neon-foundation](../../features/neon-foundation/product.md), [neon-nav](../../features/neon-nav/product.md)) are implemented or in progress on `neon-building`
- Registry config in [`components.json`](../../../components.json): `@retroui` → `https://retroui.dev/r/{name}.json`
