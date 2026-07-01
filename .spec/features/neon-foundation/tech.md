---
type: feature-tech
feature: neon-foundation
sibling: product.md
parent: ../../tech.md
updated: 2026-06-29
---

# Feature: neon-foundation — Architecture

Migrates `globals.css` to the v4 token values, adds Space Mono, and introduces an
**accent axis** alongside the existing `next-themes` mode axis. Mode stays on the
`.dark` class and is owned entirely by `next-themes` (it already injects its own
no-flash script — we do not touch mode). Accent is a *separate* CSS variable
driven by its own provider + `localStorage` key, restored pre-paint by an
**accent-only** inline script to avoid FOUC.

**Parent:** [../../tech.md](../../tech.md)
**Requirements:** [product.md](product.md)
**Plan:** [plan.md](plan.md)

---

## Files

```
src/app/globals.css            # v4 tokens for :root/.dark, --font-mono, --dot/--dotbase, derived accent vars   ~edit
src/app/layout.tsx             # add Space_Mono; append mono.variable to <html> cn(); mount AccentProvider + accent script ~edit
src/components/theme/accent-provider.tsx   # NEW client provider: accent state + localStorage  ~60 LOC
src/components/theme/accent-script.tsx      # NEW inline pre-paint script (ACCENT ONLY)         ~20 LOC
src/components/theme/accent-swatches.tsx    # NEW 4-swatch picker (mounted-guarded indicator)   ~45 LOC
src/components/theme/theme-select.tsx       # EXTEND existing mode control to dock styling      ~edit
```

**Components live under `src/components/ui/retroui/`** (the older `src/components/retroui/` is deleted on this branch) — target that path.

---

## Contract / API

```typescript
// src/components/theme/accent-provider.tsx
type Accent = "#C6FF2E" | "#FF2E9A" | "#21E6E0" | "#FF6A1A";

interface AccentContext {
  accent: Accent;
  setAccent: (a: Accent) => void;
  options: readonly Accent[]; // the 4 swatches
}
// Writes localStorage["lz_accent"]; sets ONLY --primary on document.documentElement.style.
```

CSS variable surface (in `globals.css`): the picker sets a single var, `--primary`,
on `<html>`. **All other accent-derived vars cascade from it.** Today consumers
also read `--primary-hover`, `--primary-light`, `--accent`, `--accent-light`,
`--accent-dark` (e.g. `Button.tsx` `hover:bg-primary-hover`, `neoBadge.tsx`
`bg-primary-hover`/`primary-light`, `icon-link.tsx` `hover:bg-accent-dark`). For
"override `--primary` and everything recolors" to hold, redefine those derived
vars in `globals.css` in terms of `--primary` using `color-mix`, e.g.:

```css
--accent:        var(--primary);
--primary-hover: color-mix(in srgb, var(--primary) 88%, black);
--primary-light: color-mix(in srgb, var(--primary) 70%, white);
--accent-dark:   color-mix(in srgb, var(--primary) 82%, black);
--accent-light:  var(--primary-light);
```

Then setting `--primary` alone recolors every consumer. (The four swatches define
only a base hex — there are no per-swatch hover/light palettes, so derivation is
required, not optional.)

---

## Implementation Detail

<!-- merge -->
**Two orthogonal theme axes.** `next-themes` owns light/dark (`attribute="class"`,
`.dark`) **including its own pre-paint mode script** — we add nothing for mode.
Accent is a *separate* axis: a small `AccentProvider` keeps the current swatch in
React state, mirrors it to `localStorage["lz_accent"]`, and sets `--primary` on
`<html>`. The two never couple. Our inline script restores **accent only** (reads
`lz_accent`, sets `--primary` on `documentElement`); it must NOT touch the `.dark`
class — doing so races next-themes' script.
<!-- /merge -->

Token migration in `globals.css`: replace the current yellow brand (`#ffdb33`) and
neutral grays with the v4 values from [../../design.md](../../design.md). Borders
and shadows always use `ink`. Concretely, in dark
`--background:#0B0B0B; --foreground:#F4F4EC; --card:#161616; --muted-foreground:#8C8C84; --border:#F4F4EC`,
and in light `--background:#FAF9F4; --foreground:#0B0B0B; --card:#FFFFFF; --muted-foreground:#6B675E; --border:#0B0B0B`.
`--primary` defaults to lime `#C6FF2E`, `--primary-foreground:#0B0B0B`, with the
derived accent vars (above) defined from `--primary`. Light `:root` is not a 1:1
swap — it gains warm off-white values and the new dot tokens. The existing
`--shadow-*` offset scale is kept as-is (already correct neobrutalism); note
`--color-shadow: var(--border)`, so inverting border to ink also makes shadows
bone in dark — the intended read.

Dot tokens: emit `--dot` and `--dotbase` as real CSS vars on `:root`/`.dark`
(dark `--dotbase:#242424; --dot:rgba(244,244,236,0.05)`, light
`--dotbase:#D9D4C2; --dot:rgba(11,11,11,0.07)`). neon-effects' dot-field reads
these, so they must exist at runtime, not only in design.md. Decide whether the
existing `--grid` token (consumed by `background-grid.tsx`) is renamed to `--dot`
or kept alongside.

Space Mono: add `Space_Mono` from `next/font/google` with `variable: --font-mono`,
weights 400/700; expose `--font-mono` in the `@theme` block **and append
`mono.variable` to the `<html>` `cn(...)` in `layout.tsx`** (currently
`cn(sans.variable, head.variable)`) — otherwise `var(--font-mono)` is undefined
and existing `font-mono` consumers (typography kbd, Sonner, footer) break.

Hydration: the accent-swatches *active indicator* is state-driven and would
mismatch on first render. Gate the rendered indicator behind a `mounted` flag,
exactly as the existing `theme-select.tsx` does. Mount `AccentProvider` alongside
`Providers` in `layout.tsx` so it wraps wherever the dock (neon-nav) renders.

## Open Questions

1. **`--grid` vs `--dot`** — keep `--grid` (still used by `background-grid.tsx`)
   or fold it into the new `--dot`. Recommendation: keep both for now; revisit when
   neon-effects lands.
