---
type: feature-design
feature: neon-effects
sibling: product.md
parent: ../../design.md
updated: 2026-06-29
---

# Feature: neon-effects — Design

**Status: DEFERRED.** Feel and behavior of the enhancement motion. Inherits the
motion tiers from [../../design.md](../../design.md); this doc fixes the character
of each effect so a later implementer matches the v4 preview.

**Parent:** [../../design.md](../../design.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)
**Plan:** [plan.md](plan.md)

---

## Design Intent

Motion is alive but calm — ambient, never attention-grabbing. Effects should feel
like the page is breathing around the content, and must vanish completely when the
visitor signals they don't want motion. Nothing here is load-bearing.

---

## Interaction Patterns

| Effect | Feel |
|---|---|
| Dot-field | Slow idle shimmer; dots flee the cursor within a soft radius and tint to the live accent, then ease back. |
| Custom cursor | A small accent ring that trails the pointer with easing; `mix-blend difference` so it reads on any background. |
| Hero parallax | The title drifts a few pixels with pointer offset — subtle, not seasick. |
| Floaty notes | Note cards bob gently on staggered timers; lift on hover (hover is core, bob is enhancement). |

All effects are desktop-pointer only and off under reduced-motion.

## Do's and Don'ts

- Do keep amplitude small — drift in pixels, not tens of pixels.
- Do recolor the dot-field and cursor with the live accent.
- Don't hide the native cursor (augment the ring over it).
- Don't let any effect change layout, block scroll, or reduce text contrast.

## Open Questions

1. **Dot density / radius** — tune `gap` and influence radius `R` to match the v4
   preview on common viewports.
