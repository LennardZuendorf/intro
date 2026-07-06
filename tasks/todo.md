# Merge navbar + dock

- [x] Plan
- [x] Extend `sections.ts` with legal nav item
- [x] Update `nav-cmd.tsx` for href + cross-page section jumps
- [x] Merge navbar features into `dock.tsx` (backHref, all socials)
- [x] Switch legal page to `Dock`, remove `navbar.tsx`
- [x] Verify: `pnpm check`, `pnpm build`, `pnpm test`

## Review

**Shipped:** Single `Dock` component (dock pill design) used on `/` and `/legal/[lang]`. Navbar removed. Legal added to command palette (`/legal`). Cross-page jumps from legal → home sections via `/#section`. Optional `backHref` shows back arrow on legal.

**Also fixed:** `Cursor` restored to use `useEffectsEnabled()` internally (unblocked build).

**Follow-ups:** Footer still has a separate `legal` link — could remove if palette is the only entry point, but left as-is.

---

# Component unification (spec authored 2026-07-05)

**Spec:** [`.spec/features/component-unification/plan.md`](../.spec/features/component-unification/plan.md)

- [x] Root `.spec/design.md` — Google design.md format, 56 components, full token sync
- [x] `pnpm design:lint` — 0 errors (15 WCAG warnings documented as intentional)
- [ ] component-unification/1 — Phase A: Button + kbd + separator + token fixes
- [ ] component-unification/2 — Phase B: tooltip, hover-card, dropdown-menu, alert
- [ ] component-unification/3 — Phase B: SectionEyebrow, HoverCardInlineTrigger, DockDivider
- [ ] component-unification/4 — Phase C: IconMenuSelect, NeoBadge, work→Card, delete dead files
- [ ] component-unification/5 — Phase D: remove Radix packages, promote to root tech.md

## Review (spec + design.md — 2026-07-05)

**Shipped:** Feature spec folder (product, tech, design, plan), root spec updates
(product R7, tech Base UI philosophy, plan step 4), `AGENTS.md` spec workflow,
root `design.md` rewritten for `@google/design.md` lint (54 colors, 11 typography
scales, 9 rounding levels, 23 spacing tokens, 56 components), `pnpm design:lint`
script.

**Skipped:** Phase A–D code migration (implementation units 1–5 remain).

**Follow-ups:** Run unit 1 when ready to merge `@retroui/button` a11y and token cleanup.
