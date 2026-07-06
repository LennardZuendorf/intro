---
type: entrypoint
scope: implementation
covers: feature sequence, build order, validation criteria, open decisions
children:
  - features/neon-foundation/plan.md
  - features/neon-landing/plan.md
  - features/neon-nav/plan.md
  - features/neon-effects/plan.md
  - features/component-unification/plan.md
updated: 2026-07-05
---

# intro-zuendorf.me — Implementation Plan

Delivering the **v4 redesign** on the `neon-building` branch. Work composes as
four features: `neon-foundation` lays the token/font/theming base everything else
paints on; `neon-landing` rewrites the page from MDX; `neon-nav` adds the dock +
palette; `neon-effects` (deferred) layers enhancement motion. Foundation is the
single hard gate — landing and nav both depend on it.

**Parent specs:** [product.md](product.md), [tech.md](tech.md), [design.md](design.md)

**Feature plans (unit-level detail lives there, not duplicated below):**

| Feature | Product | Plan | Status |
|---|---|---|---|
| [neon-foundation](features/neon-foundation/product.md) | root + feature | [plan.md](features/neon-foundation/plan.md) | planned |
| [neon-landing](features/neon-landing/product.md) | root + feature | [plan.md](features/neon-landing/plan.md) | planned |
| [neon-nav](features/neon-nav/product.md) | root + feature | [plan.md](features/neon-nav/plan.md) | planned |
| [neon-effects](features/neon-effects/product.md) | root + feature | [plan.md](features/neon-effects/plan.md) | deferred |
| [component-unification](features/component-unification/product.md) | root + feature | [plan.md](features/component-unification/plan.md) | NOT STARTED |

---

## Feature Boundaries

```
neon-foundation ── owns ──> globals.css tokens (+ derived accent vars, --dot/--dotbase), Space Mono, mode+accent theming + persistence, control components
neon-landing    ── owns ──> page.tsx, section components, notes collection, content/schema backfill, CORE chrome (scroll-progress + scroll-reveal)
neon-nav        ── owns ──> floating dock, command palette, section registry, removing the <Nav> mount
neon-effects    ── owns ──> dot-field, custom cursor, parallax, floaty (ENHANCEMENT motion, client islands)
component-unification ── owns ──> @retroui/* primitive adoption, Base UI migration, shared UI wrappers, Radix cleanup
```

| Layer | Owns | Does not own |
|---|---|---|
| **neon-foundation** | `globals.css`, font wiring in `layout.tsx`, theme/accent providers + control components | Page content, section layout, nav, where controls mount (dock = nav) |
| **neon-landing** | `page.tsx`, `components/sections/*`, scroll-progress + reveal (core chrome), `content/notes/*` + `notes` schema, content/schema backfill | Tokens, theming internals, dock/palette, the shared project/experience loaders |
| **neon-nav** | `components/nav/*` (dock + palette), section id registry, keyboard handling, `<Nav>`-mount removal | Token system, section content, `navbar.tsx` (kept for legal) |
| **neon-effects** | `components/effects/*`, reduced-motion/pointer gating (enhancement only) | Content, tokens, nav, core chrome (scroll-progress/reveal) |
| **component-unification** | `ui/*` retroUI/Base UI primitives, shared wrappers (`SectionEyebrow`, `IconMenuSelect`, etc.), `package.json` Radix trim | Page content, MDX sources, effects, typography/section systems |

**Cross-feature seams (resolved):** (a) foundation builds the mode/accent controls
but they mount in nav's dock — foundation verifies them programmatically, not via
visible UI. (b) `page.tsx` is touched by both landing (rewrite) and nav (mount
Dock + remove `<Nav>`); nav sequences after landing and does both in one edit.
(c) effects reads foundation's `--dot`/`--dotbase` runtime vars and seams into
landing's hero/notes slots.

---

## Feature Sequence

Whole-feature delivery order with **binary** gates — a downstream feature starts
only when its upstream is `DONE`. Units (`feature/n`) live in feature plans.

| Order | Feature | Deliverable | Test | Status | Starts when |
|---:|---|---|---|---|---|
| 1 | neon-foundation | v4 tokens, Space Mono, mode toggle + 4-swatch accent, persistent + no-flash | `pnpm build` + theme/accent persistence check | NOT STARTED | — |
| 2 | neon-landing | One-page `/` from MDX (hero/about/merged-work/notes/contact/footer) + core chrome; content/schema backfill; route surface asserted `/`+`/legal` | `pnpm build` + `pnpm test`; manual section render | NOT STARTED | neon-foundation DONE |
| 3 | neon-nav | Floating dock + `/`/`⌘K` palette jumping to every section | `pnpm test` palette/jump; keyboard manual check | NOT STARTED | neon-foundation DONE |
| — | neon-effects | Dot-field, cursor, parallax, floaty; reduced-motion gated | manual + reduced-motion check | DEFERRED | neon-landing DONE |
| 4 | component-unification | Single Base UI headless layer; retroUI primitives; shared wrappers; Radix trimmed to Slot+cmdk | `pnpm check/build/test` + manual smoke matrix | NOT STARTED | neon-nav DONE |

Cross-feature order is **only** here. Feature plans declare same-feature unit deps only.

---

## Spec vs Implementation

| Gap | Feature / unit | Notes |
|---|---|---|
| Whole redesign unbuilt — spec ahead of code | all | Specs written; implementation pending on `neon-building`. |
| v4 effect code exists only in the design HTML | neon-effects | Port reference logic from `Lennard v4.dc.html` when the feature is picked up. |
| Radix + Base UI hybrid primitives | component-unification | Tracked in [features/component-unification/plan.md](features/component-unification/plan.md); phases A–D. |

---

## Current Focus

v4 redesign features (neon-foundation → neon-landing → neon-nav) take precedence.
When nav ships, begin **component-unification** at
[features/component-unification/plan.md](features/component-unification/plan.md)
unit `component-unification/1` (Button + kbd + separator + token fixes).
`neon-effects` stays deferred.
