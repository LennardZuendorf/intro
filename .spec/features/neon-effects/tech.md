---
type: feature-tech
feature: neon-effects
sibling: product.md
parent: ../../tech.md
updated: 2026-06-29
---

# Feature: neon-effects — Architecture

**Status: DEFERRED.** Client islands implementing the v4 enhancement motion. Logic
ports almost directly from the v4 reference: `initDotField`, `startCursor`,
`initParallax`, and the `floaty` keyframe. Each is lazy-mounted, pointer-gated, and
reduced-motion-gated.

**Reference source (pin before pickup):** these four routines live ONLY in the
design-tool HTML `Lennard v4.dc.html` — the claude.ai/design project "Neobrutalist
portfolio landing page" (DesignSync `get_file`). They are **not** in the repo.
Before this feature is picked up, export those routines into
`.spec/features/neon-effects/reference/v4-effects.js` (or fetch the file) so the
math is recoverable; "keep the v4 reference logic" is otherwise not actionable.

**Parent:** [../../tech.md](../../tech.md)
**Requirements:** [product.md](product.md)
**Design:** [design.md](design.md)
**Plan:** [plan.md](plan.md)

---

## Files

```
src/components/effects/dot-field.tsx     # NEW canvas island (ports initDotField)     ~90 LOC
src/components/effects/cursor.tsx         # NEW lerped ring cursor (ports startCursor)  ~50 LOC
src/components/effects/parallax.tsx       # NEW hero pointer parallax wrapper           ~30 LOC
src/components/effects/use-enabled.ts      # NEW pointer + reduced-motion gate hook      ~20 LOC
src/app/globals.css                       # floaty keyframe (note bob)                  ~edit
```

**Mount slots (seam into neon-landing).** This feature mounts via composition, not
by editing landing internals. The contract neon-landing must expose:
- `hero.tsx` accepts a `backdrop` slot (or `children`) where `<DotField/>` renders
  behind the title, and a wrappable title node for `<Parallax/>`.
- `notes.tsx` cards accept a `floaty` boolean/className flag.
If those seams don't exist when this is picked up, they are small additions to the
landing components (noted there as soft requirements). Effects own no landing content.

---

## Contract / API

```typescript
// src/components/effects/use-enabled.ts
// MUST return false on the server / first client render (stable SSR value),
// then re-evaluate matchMedia('(pointer:fine)') + '(prefers-reduced-motion:reduce)'
// in useEffect, with change listeners. This avoids a hydration mismatch and
// guarantees no-MOUNT (not just no-animate) when disabled.
function useEffectsEnabled(): boolean;

// dot-field reads the live accent via --accent and the dot tokens --dot/--dotbase
// (all emitted as runtime CSS vars by neon-foundation), so swatch + mode changes
// recolor the field with no prop wiring. These vars MUST exist at runtime — confirm
// neon-foundation emits --dot/--dotbase (not only design.md values).
```

---

## Implementation Detail

Port the four routines from the v4 reference, adapted to React refs + effect
cleanup (the reference already uses `requestAnimationFrame` loops with teardown):

- **DotField** — canvas grid, dots ease toward displaced targets near the mouse,
  size+color ramp to accent within radius `R`; DPR-aware resize. Reads `--accent`
  and the mode-appropriate `--dotbase` CSS var (emitted by neon-foundation).
- **Cursor** — fixed ring, position lerped toward pointer, `mix-blend-mode:
  difference`.
- **Parallax** — translate hero title by a fraction of pointer offset.
- **Floaty** — CSS keyframe bob on note cards, staggered delay.

All four mount only when `useEffectsEnabled()` is true; each returns its cleanup.
**Keep the v4 reference logic** — do not rewrite from scratch; it is the spec for
the math.

## Performance Budget

- Target 60fps / ≤16ms per rAF frame on a mid-tier laptop.
- Dot-field: single canvas, one rAF loop, ≤ ~2 DPR; cap dot count (floor the grid
  `gap`, e.g. ≥34px) so density stays bounded; pause the rAF when the hero is
  off-screen (IntersectionObserver).
- No effect may cause layout thrash or block the main thread on scroll.

## Open Questions

1. **Off-screen pause** — IntersectionObserver to stop the dot-field rAF when the
   hero scrolls away. Recommendation: yes, to save battery.
