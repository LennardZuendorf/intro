---
type: feature-plan
feature: component-unification
parent: ../../plan.md
siblings:
  - product.md
  - tech.md
  - design.md
updated: 2026-07-05
---

# Component Unification & Base UI Migration — Plan

**Parent:** [plan.md](../../plan.md)  
**Product:** [product.md](product.md) · **Tech:** [tech.md](tech.md) · **Design:** [design.md](design.md)

**Problem:** The codebase mixes Radix and Base UI primitives with custom forks, causing token drift (`rounded-md` vs `rounded-base`, missing Button a11y) and duplicated markup (eyebrows, hover triggers, menu shells).

**Gate:** Feature complete when Phase D exit criteria pass and root [tech.md](../../tech.md) documents the component layer.

---

## Requirements trace

| Unit | Requirements |
|---|---|
| component-unification/1 | R1, R2, R7, R8 |
| component-unification/2 | R1, R2, R7 |
| component-unification/3 | R4, R7 |
| component-unification/4 | R4, R5, R7 |
| component-unification/5 | R6, R7 |

---

## Units

### component-unification/1 — Phase A: Button + small primitives

**Work:**
1. `pnpm exec shadcn add @retroui/button` — migrate [`Button.tsx`](../../../src/components/ui/retroui/Button.tsx) to `@base-ui/react/button`; preserve `flat`, `flatSecondary`, `ghost` site variants in CVA
2. `pnpm exec shadcn add @retroui/kbd @retroui/separator`
3. Replace hand-rolled kbd in [`hint-tooltip.tsx`](../../../src/components/nav/hint-tooltip.tsx) and [`nav-cmd.tsx`](../../../src/components/nav/nav-cmd.tsx)
4. Fix shortcut copy/handler alignment (R8)
5. Token fixes: `shadow-black` → `shadow-shadow`; `z-9999` → `z-[9999]`; `font-body` → `font-sans`; `text-md` → `text-base`; `text-mono` → `font-mono` on Muted

**Verify:** `pnpm check && pnpm build && pnpm test`; tab-focus dock buttons; kbd visible in JUMP tooltip and palette footer

---

### component-unification/2 — Phase B: Headless primitive swap

**Work:**
1. `pnpm exec shadcn add @retroui/tooltip` — reskin per [design.md](design.md); update [`providers.tsx`](../../../src/components/providers.tsx), dock, scroll-arrow
2. `pnpm exec shadcn add @retroui/hover-card` — replace [`hover-card.tsx`](../../../src/components/ui/hover-card.tsx); update three MDX hover-card files
3. `pnpm exec shadcn add @retroui/dropdown-menu` — replace [`Menu.tsx`](../../../src/components/ui/retroui/Menu.tsx); migrate theme/accent selects to radio groups
4. `pnpm exec shadcn add @retroui/alert` — replace callout; adapt [`mdx-blocks.tsx`](../../../src/components/shared/richtext/mdx-blocks.tsx)

**Verify:** `rg '@radix-ui/react-hover-card|react-dropdown-menu' src/` → zero hits; manual MDX hover cards + dock menus

---

### component-unification/3 — Phase B: Shared wrappers

**Work:**
1. Create `SectionEyebrow` — refactor about, work, notes, contact sections
2. Create `HoverCardInlineTrigger` — refactor link/project/experience hover cards
3. Create `DockDivider` — refactor [`dock.tsx`](../../../src/components/nav/dock.tsx)

**Verify:** No duplicated eyebrow class strings in section files; grep `underline! decoration-1` only in wrapper file

---

### component-unification/4 — Phase C: Composition + dead code

**Work:**
1. Extract `IconMenuSelect`; collapse `ThemeSelect` + `AccentSelect`; remove `noButtonShadow`
2. Wrap `NeoBadge` around `@retroui/badge`
3. Refactor [`work.tsx`](../../../src/components/sections/work.tsx) rows to compose `Card`
4. Delete Tier 5 files per [tech.md](tech.md)

**Verify:** `pnpm build`; no imports of deleted modules; theme/accent persistence unchanged

---

### component-unification/5 — Phase D: Dependency cleanup

**Work:**
1. `pnpm remove @radix-ui/react-hover-card @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-navigation-menu`
2. Confirm `@radix-ui/react-slot` still required
3. Promote component-layer section to root [tech.md](../../tech.md)
4. Mark feature DONE in root [plan.md](../../plan.md)

**Verify:** `package.json` audit; full check/build/test; smoke: ⌘K, `/`, tooltips, focus rings, hover cards

---

## Per-phase verification (all units)

```bash
pnpm check && pnpm build && pnpm test
```

Manual: dock tooltips · theme/accent menus · MDX hover cards · command palette · keyboard focus on buttons

---

## Deferred (not in gate)

- `@retroui/dialog` for command palette shell
- `@retroui/progress` for scroll-progress bar
- `@retroui/toggle-group` for inline accent swatches
- Typography `Slot` → Base UI `useRender`
