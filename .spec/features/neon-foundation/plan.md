---
type: feature-plan
feature: neon-foundation
sibling: tech.md
parent: ../../plan.md
updated: 2026-06-29
---

# Feature: neon-foundation — Implementation Plan

Lays the v4 token + theming base. Three units: migrate tokens & font, build the
accent axis, wire no-flash persistence. A closed, testable box — when DONE, every
downstream feature renders in the correct colors/fonts and the visitor controls
mode + accent.

**Parent:** [../../plan.md](../../plan.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)

**Feature gate:** First feature — starts immediately (root [plan.md](../../plan.md) Feature Sequence order 1).

---

## Problem Frame

The repo already has neobrutalist offset shadows and `next-themes` mode, but the
wrong palette (yellow) and no accent axis or Space Mono. We migrate tokens first
(everything visually depends on it), then add the accent provider, then make both
axes no-flash. Order is forced: persistence (unit 3) needs the provider (unit 2),
which needs the tokens (unit 1).

---

## Requirements Trace

| ID | Requirement | Units |
|---|---|---|
| R1 | [v4 token system](product.md#requirement-v4-token-system) | neon-foundation/1 |
| R2 | [Mode axis](product.md#requirement-mode-axis) | neon-foundation/1, neon-foundation/3 |
| R3 | [Accent axis](product.md#requirement-accent-axis) | neon-foundation/2 |
| R4 | [No theme flash](product.md#requirement-no-theme-flash) | neon-foundation/3 |

---

## Key Technical Decisions

1. **Accent is a separate CSS-var axis, not a next-themes theme.** Avoids
   exploding theme combinations (2 modes × 4 accents) and keeps mode/accent
   orthogonal. See [tech.md](tech.md).
2. **Override `--primary` for accent.** RetroUI reads `--primary`, so recoloring
   it recolors all components without touching each one.
3. **Keep the existing `--shadow-*` scale.** Already correct neobrutalism; do not
   reinvent.

---

### neon-foundation/1 — Migrate tokens + Space Mono

**Goal:** `globals.css` and `layout.tsx` carry the v4 palette, lime accent default, and Space Mono.

**Requirements:** R1, R2

**Dependencies:** —

**Files:**

```
src/app/globals.css        # v4 :root/.dark values, --primary lime + color-mix derived vars, --dot/--dotbase, --font-mono
src/app/layout.tsx         # add Space_Mono; append mono.variable to <html> cn()
```

**Test scenarios:**

- Dark load shows near-black bg, bone text, lime accents; borders/shadows are bone.
- Light load shows warm off-white bg (`#FAF9F4`), near-black text.
- Mono labels render in Space Mono (existing `font-mono` consumers unbroken).
- Derived vars (`--primary-hover`, `--accent-dark`) resolve, not undefined.

**Verification:** `pnpm build` succeeds; manual: inspect computed `--background`/`--primary` in both modes.

---

### neon-foundation/2 — Accent axis

**Goal:** Visitor picks one of four swatches; accent applies live everywhere.

**Requirements:** R3

**Dependencies:** neon-foundation/1

**Files:**

```
src/components/theme/accent-provider.tsx    # context + localStorage + sets --primary on html
src/components/theme/accent-swatches.tsx     # 4-dot picker (mounted-guarded indicator)
```

**Test scenarios:**

- `setAccent(hex)` sets `--primary` on `documentElement`; derived vars follow.
- Clicking a swatch recolors an existing accent consumer (RetroUI `Button` hover / `neoBadge`) instantly — not unbuilt landing surfaces.
- Active swatch is visibly selected; indicator does not hydration-mismatch (mounted guard).

**Verification:** `pnpm test` (provider unit test for setAccent → `--primary`); manual swatch click against a RetroUI sample.

---

### neon-foundation/3 — No-flash accent persistence

**Goal:** Stored accent applied before first paint. (Mode no-flash is already handled by next-themes — do not re-implement it.)

**Requirements:** R2, R4

**Dependencies:** neon-foundation/2

**Files:**

```
src/components/theme/accent-script.tsx   # inline ACCENT-ONLY pre-paint script (sets --primary)
src/app/layout.tsx                       # inject accent script in <head>; next-themes keeps its mode script
```

**Test scenarios:**

- Reload with cyan stored → first frame already cyan; no lime-then-cyan flash.
- Reload with light+cyan stored → light (next-themes) + cyan (our script), no flash.
- Accent script does not touch the `.dark` class.

**Verification:** Manual reload check in both modes; confirm no FOUC; `pnpm build`.

---

## Progress

| Unit | Status |
|---|---|
| neon-foundation/1 | NOT STARTED |
| neon-foundation/2 | NOT STARTED |
| neon-foundation/3 | NOT STARTED |
