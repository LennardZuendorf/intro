---
type: feature-product
feature: neon-effects
sibling: tech.md
parent: ../../product.md
updated: 2026-06-29
---

# Feature: neon-effects — Product

**Status: DEFERRED.** The enhancement-tier motion from the v4 design: the hero
canvas dot-field, the custom lerped cursor, hero pointer-parallax, and floaty idle
animation on note cards. Pure polish on top of a fully working page — gated behind
desktop pointer + `prefers-reduced-motion`, and shipped only after neon-landing.

**Parent:** [../../product.md](../../product.md)
**Architecture:** [tech.md](tech.md)
**Design:** [design.md](design.md)
**Plan:** [plan.md](plan.md)

---

## Scope

| | |
|---|---|
| **Owns** | Canvas dot-field; custom cursor; hero parallax; floaty note animation; their reduced-motion / pointer gating. |
| **Does not own** | Core motion (reveal/hover/scroll-progress — those ship with landing/foundation); any content or nav. |

---

## Requirements

### Requirement: Graceful enhancement

Every effect MUST be additive — the page is fully usable and correct with all
effects off — and MUST be disabled under `prefers-reduced-motion` and on
non-pointer (touch) devices.

#### Scenario: Reduced motion

- **Given** a visitor with `prefers-reduced-motion: reduce`
- **When** the page loads
- **Then** no canvas element is mounted and no window/pointer listeners are attached (no-mount, not merely no-animate), and the page is otherwise unchanged

### Requirement: Hero dot-field

When enabled, the hero SHALL render an animated dot grid whose dots flee the
cursor and recolor toward the active accent.

#### Scenario: Cursor over hero

- **Given** effects enabled on a pointer device
- **When** the cursor moves across the hero
- **Then** nearby dots displace and tint to the current accent

### Requirement: Custom cursor & parallax

When enabled, the site SHALL show a lerped accent ring cursor and drift the hero
title slightly with pointer movement.

#### Scenario: Pointer move

- **Given** effects enabled
- **When** the pointer moves
- **Then** the ring follows with easing and the hero title parallaxes subtly

---

## User Experience

Identical to the v4 design preview: a living dot field behind the hero name, a
trailing accent ring instead of (or with) the OS cursor, the big title drifting
with the mouse, and note cards bobbing gently. On touch / reduced-motion, none of
this appears and the page looks like the static neon-landing result.

---

## Non-Goals

- No scroll-jacking or heavy parallax beyond the subtle hero drift.
- No effect that changes layout or harms legibility.
- No mobile-specific motion — effects are desktop-pointer only.

---

## Open Questions

_None blocking._ (Cursor augmentation vs replacement is decided: **augment** — keep
the native cursor; ring layers over it. See [design.md](design.md) "Don't hide the
native cursor.")
