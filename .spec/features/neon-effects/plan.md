---
type: feature-plan
feature: neon-effects
sibling: tech.md
parent: ../../plan.md
updated: 2026-06-29
---

# Feature: neon-effects — Implementation Plan

**Status: DEFERRED.** Layers enhancement motion onto the finished page. Order: the
gating hook first (everything depends on it), then the dot-field, then
cursor + parallax + floaty. A closed box: when DONE, effects match the v4 preview
and disappear under reduced-motion / touch.

**Parent:** [../../plan.md](../../plan.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)
**Design:** [design.md](design.md)

**Feature gate:** Deferred. Starts (if picked up) when **neon-landing** is `DONE` (root [plan.md](../../plan.md) Feature Sequence). The v4 reference code is kept, not deleted, as the source of the math.

---

## Problem Frame

These effects are pure polish, so they ship last and must never be load-bearing.
The reduced-motion / pointer gate is the shared precondition for all of them, so it
comes first; the dot-field is the largest piece; cursor, parallax, and floaty are
small ports that share the gate.

---

## Requirements Trace

| ID | Requirement | Units |
|---|---|---|
| R1 | [Graceful enhancement](product.md#requirement-graceful-enhancement) | neon-effects/1, neon-effects/2, neon-effects/3 |
| R2 | [Hero dot-field](product.md#requirement-hero-dot-field) | neon-effects/2 |
| R3 | [Custom cursor & parallax](product.md#requirement-custom-cursor--parallax) | neon-effects/3 |

---

## Key Technical Decisions

1. **Shared gate hook.** `useEffectsEnabled()` (pointer + reduced-motion) guards
   every effect; one place to reason about "off".
2. **Port, don't reinvent.** Reuse the v4 reference math for dot-field/cursor/parallax.
3. **Read accent from CSS var.** Effects pick up swatch changes for free.

---

### neon-effects/1 — Gate hook

**Goal:** `useEffectsEnabled()` returns false on touch / reduced-motion.

**Requirements:** R1

**Dependencies:** —

**Files:**

```
src/components/effects/use-enabled.ts
```

**Test scenarios:**

- Returns false when `prefers-reduced-motion: reduce`.
- Returns false on a non-pointer device.

**Verification:** `pnpm test` (hook with mocked matchMedia).

---

### neon-effects/2 — Dot-field

**Goal:** Hero canvas dot-field, accent-aware, off when gated; pauses off-screen.

**Requirements:** R2

**Dependencies:** neon-effects/1

**Files:**

```
src/components/effects/dot-field.tsx
```

**Test scenarios:**

- Dots displace near cursor and tint to accent.
- No canvas mounts under reduced-motion.

**Verification:** Manual pointer check; `pnpm build`; verify no mount when gated.

---

### neon-effects/3 — Cursor, parallax, floaty

**Goal:** Lerped ring cursor, hero parallax, floaty note bob — all gated.

**Requirements:** R3

**Dependencies:** neon-effects/1

**Files:**

```
src/components/effects/cursor.tsx
src/components/effects/parallax.tsx
src/app/globals.css            # floaty keyframe
```

**Test scenarios:**

- Ring trails pointer; title drifts; notes bob — none under reduced-motion.

**Verification:** Manual check in both modes; reduced-motion off-check.

---

## Progress

| Unit | Status |
|---|---|
| neon-effects/1 | NOT STARTED (deferred) |
| neon-effects/2 | NOT STARTED (deferred) |
| neon-effects/3 | NOT STARTED (deferred) |
