---
type: feature-tech
feature: component-unification
parent: ../../tech.md
siblings:
  - product.md
  - design.md
  - plan.md
updated: 2026-07-05
---

# Component Unification & Base UI Migration — Technical

**Parent:** [tech.md](../../tech.md)  
**Product:** [product.md](product.md) · **Design:** [design.md](design.md) · **Plan:** [plan.md](plan.md)

---

## Architecture

```
@base-ui/react          ← single headless layer (interactive primitives)
       ↓
@retroui/* (registry)   ← shadcn add @retroui/<name>
       ↓
src/components/ui/*     ← reskinned with site tokens (rounded-base, shadow-shadow)
       ↓
site wrappers           ← SectionEyebrow, HoverCardInlineTrigger, IconMenuSelect, DockDivider
       ↓
page / section consumers
```

**Stays custom (no Base UI swap):** `typography.tsx`, `section.tsx`, `retroui/Command.tsx` + cmdk, `retroui/Card.tsx`, `retroui/Sonner.tsx`, effects layer.

---

## Migration rule

> When touching an interactive primitive, run `pnpm exec shadcn add @retroui/<name>`, reskin to site tokens, update imports, grep until old Radix import count is zero, then run verification.

---

## Radix → Base UI inventory

| Site file | Today | Target | Base UI primitive | Phase |
|---|---|---|---|---|
| [`src/components/ui/retroui/Button.tsx`](../../../src/components/ui/retroui/Button.tsx) | `<button>` + Radix `Slot` | `@retroui/button` | `@base-ui/react/button` | A |
| [`src/components/ui/tooltip.tsx`](../../../src/components/ui/tooltip.tsx) | Custom Base UI fork | `@retroui/tooltip` | `@base-ui/react/tooltip` | B |
| [`src/components/ui/hover-card.tsx`](../../../src/components/ui/hover-card.tsx) | `@radix-ui/react-hover-card` | `@retroui/hover-card` | `@base-ui/react/preview-card` | B |
| [`src/components/ui/retroui/Menu.tsx`](../../../src/components/ui/retroui/Menu.tsx) | `@radix-ui/react-dropdown-menu` | `@retroui/dropdown-menu` | `@base-ui/react/menu` | B |
| [`src/components/shared/richtext/callout.tsx`](../../../src/components/shared/richtext/callout.tsx) | Custom div compound | `@retroui/alert` | markup only | B |
| Hand-rolled `<kbd>` | ad hoc | `@retroui/kbd` | markup only | A |
| Dock divider `<span>` | ad hoc | `@retroui/separator` | `@base-ui/react/separator` | A |
| [`src/components/ui/typography.tsx`](../../../src/components/ui/typography.tsx) | Radix `Slot` | **Keep** | — | — |
| [`src/components/ui/retroui/Command.tsx`](../../../src/components/ui/retroui/Command.tsx) | cmdk | **Keep**; diff vs `@retroui/command` | — | — |

---

## Consumer map

| Primitive | Import sites |
|---|---|
| Button | `dock.tsx`, `scroll-arrow.tsx`, `social-buttons.tsx`, `theme-select.tsx`, `accent-select.tsx`, `experience-hover-card.tsx`, `navigation-menu.tsx` |
| Tooltip | `dock.tsx`, `scroll-arrow.tsx`, `providers.tsx` |
| Hover card | `link-hover-card.tsx`, `project-hover-card.tsx`, `experience-hover-card.tsx` |
| Dropdown menu | `theme-select.tsx`, `accent-select.tsx` (replaces `Menu`) |
| Kbd | `hint-tooltip.tsx`, `nav-cmd.tsx` |
| Separator | `dock.tsx` |
| Alert | `mdx-blocks.tsx` (via Callout adapter) |

---

## New shared components

| Component | Path (proposed) | Composes |
|---|---|---|
| `SectionEyebrow` | `src/components/ui/section-eyebrow.tsx` | `Muted` or `S` |
| `HoverCardInlineTrigger` | `src/components/shared/richtext/hover-card-inline-trigger.tsx` | `HoverCardTrigger` + `Typography Link` |
| `IconMenuSelect` | `src/components/theme/icon-menu-select.tsx` | `DropdownMenu` + `Button` |
| `DockDivider` | `src/components/nav/dock-divider.tsx` | `Separator` vertical |

---

## API differences (Radix → Base UI)

| Concern | Radix | Base UI / retroUI |
|---|---|---|
| Trigger composition | `asChild` on Trigger | `render={<Button />}` on Trigger/Close |
| Theme/accent pickers | `Menu.Item` + `onSelect` | `DropdownMenuRadioGroup` + `DropdownMenuRadioItem` |
| Tooltip offset | site uses `8` | registry default `4` — re-apply `8` for dock if needed |
| Focus | often implicit | `focus-visible:outline-2 outline-primary` on Button — do not strip |

---

## Install + reskin workflow

1. `pnpm exec shadcn add @retroui/<name>`
2. Diff against [`src/app/globals.css`](../../../src/app/globals.css): `--radius`, `--shadow-*`, semantic colors
3. Apply site classes: `rounded-base`, `border-2 border-border`, `shadow-md shadow-shadow`, `font-head` where appropriate
4. Update all import paths
5. `pnpm check && pnpm build && pnpm test`
6. `rg '@radix-ui/react-hover-card|dropdown-menu'` — must be zero before Phase D

---

## Phase exit criteria

| Phase | Exit |
|---|---|
| **A** | Button on `@base-ui/react/button`; kbd + separator in dock/palette; token fixes applied |
| **B** | tooltip, hover-card, dropdown-menu, alert migrated; wrappers extracted; zero Radix hover-card/dropdown imports |
| **C** | `IconMenuSelect`; NeoBadge wraps `@retroui/badge`; work rows use `Card`; Tier 5 files deleted |
| **D** | Four Radix packages removed from `package.json`; only `Slot` (+ cmdk) remains |

---

## Delete list (Tier 5)

- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/background-grid.tsx`
- `src/components/effects/cursor.tsx`
- `src/components/theme/accent-swatches.tsx`
- `src/components/ui/retroui/Popover.tsx`
- `src/components/ui/retroui/Text.tsx`
- `src/components/ui/icon-link.tsx`
- `src/components/ui/retroui/Menu.tsx` (after dropdown-menu migration)

---

## Risks

| Risk | Mitigation |
|---|---|
| Token drift during reskin (`rounded-md` vs `rounded-base`) | Checklist in [design.md](design.md); grep for hardcoded `shadow-black`, `border-black` |
| Base UI `render` prop breaks `asChild` call sites | Migrate trigger sites one file at a time; keep Button `asChild` via Slot until audited |
| Theme menu behavior change | Use radio group; test persistence + selected state |
| NeoBadge visual regression | Snapshot hero/about before/after wrapper migration |

<!-- merge:component-layer -->
When promoting to root `tech.md`, merge the Architecture + Allowed Radix exceptions sections.
<!-- /merge -->
