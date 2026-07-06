---
type: entrypoint
scope: design
design_format: google-labs-code/design.md-compatible
children:
  - features/neon-landing/design.md
  - features/neon-nav/design.md
  - features/neon-effects/design.md
  - features/component-unification/design.md
updated: 2026-07-05
version: alpha
name: intro-zuendorf.me
description: >-
  Neobrutalist personal portfolio. Archivo Black display, hard offset shadows,
  RetroUI primitives on Base UI, one switchable accent (four swatches), orthogonal
  light/dark mode.
colors:
  primary: "#4E9E96"
  primary-foreground: "#F4F4EC"
  primary-hover: "#458F88"
  primary-light: "#8BC4BE"
  secondary: "#000000"
  secondary-foreground: "#FFFFFF"
  secondary-hover: "#333333"
  tertiary: "#E63946"
  neutral: "#FAF9F4"
  accent: "#4E9E96"
  accent-foreground: "#F4F4EC"
  accent-light: "#8BC4BE"
  accent-dark: "#458F88"
  accent-teal: "#4E9E96"
  accent-rose: "#B07A8A"
  accent-slate: "#7A8FA8"
  accent-ochre: "#A89060"
  destructive: "#E63946"
  destructive-foreground: "#FFFFFF"
  shadow-color: "#0B0B0B"
  background-light: "#FAF9F4"
  foreground-light: "#0B0B0B"
  card-light: "#FFFFFF"
  card-foreground-light: "#0B0B0B"
  muted-light: "#AEAEAE"
  muted-foreground-light: "#6B675E"
  border-light: "#0B0B0B"
  input-light: "#FFFFFF"
  ring-light: "#0B0B0B"
  popover-light: "#FFFFFF"
  popover-foreground-light: "#0B0B0B"
  secondary-light: "#000000"
  secondary-hover-light: "#333333"
  secondary-foreground-light: "#FFFFFF"
  grid-light: "#00000012"
  dotbase-light: "#D9D4C2"
  dot-light: "rgba(11, 11, 11, 0.07)"
  background-dark: "#1A1A1A"
  foreground-dark: "#E8E8E0"
  card-dark: "#111111"
  card-foreground-dark: "#F4F4EC"
  muted-dark: "#3F3F46"
  muted-foreground-dark: "#6E6E68"
  border-dark: "#2A2A2A"
  input-dark: "#2A2A2A"
  ring-dark: "#2A2A2A"
  popover-dark: "#161616"
  popover-foreground-dark: "#F4F4EC"
  secondary-dark: "#141414"
  secondary-hover-dark: "#1E1E1E"
  secondary-foreground-dark: "#F4F4EC"
  grid-dark: "#ffffff18"
  dotbase-dark: "#242424"
  dot-dark: "rgba(244, 244, 236, 0.05)"
typography:
  display-hero:
    fontFamily: "Archivo Black, sans-serif"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "-0.02em"
  display-h1:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline-h2:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline-h3:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-sm:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  label-md:
    fontFamily: "Space Mono, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.1em
  label-sm:
    fontFamily: "Space Mono, monospace"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.08em
  label-caps:
    fontFamily: "Space Mono, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.14em
  code-inline:
    fontFamily: "Space Mono, monospace"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 8px
  base: 8px
  lg: 14px
  xl: 18px
  full: 9999px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  section-y: 56px
  section-y-lg: 96px
  container: 1180px
  gutter: 24px
  dock-gap: 8px
  card-padding: 16px
  shadow-offset-xs: 1px
  shadow-offset-sm: 2px
  shadow-offset-md: 4px
  shadow-offset-lg: 6px
  shadow-offset-xl: 10px
  shadow-offset-2xl: 16px
  translate-hover: 1px
  translate-active-x: 2px
  translate-active-y: 2px
  translate-box-shadow-x: 4px
  translate-box-shadow-y: 4px
components:
  surface-page-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.foreground-light}"
  surface-page-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  button-default-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.base}"
  button-flat:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  button-flat-secondary:
    backgroundColor: "{colors.secondary-dark}"
    textColor: "{colors.secondary-foreground-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  button-secondary:
    backgroundColor: "{colors.secondary-dark}"
    textColor: "{colors.secondary-foreground-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 0px
  button-icon:
    backgroundColor: "{colors.secondary-dark}"
    textColor: "{colors.secondary-foreground-dark}"
    rounded: "{rounded.base}"
    size: 36px
  card-surface:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.card-foreground-dark}"
    rounded: "{rounded.base}"
    padding: 16px
  card-surface-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.card-foreground-light}"
    rounded: "{rounded.base}"
    padding: 16px
  neo-badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.base}"
    padding: 6px
  neo-badge-hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 8px
  neo-badge-outline:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.base}"
    padding: 4px
  dock-chrome:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.base}"
    padding: 6px
  command-palette:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.card-foreground-dark}"
    rounded: "{rounded.xl}"
    padding: 0px
  tooltip-content:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.muted-foreground-dark}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.base}"
    padding: 6px
  kbd-chip:
    backgroundColor: "{colors.muted-dark}"
    textColor: "{colors.muted-foreground-dark}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.xs}"
    padding: 4px
  work-row:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.card-foreground-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 16px
  work-row-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.base}"
  note-card:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.card-foreground-dark}"
    rounded: "{rounded.base}"
    padding: 16px
  contact-row:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-dark}"
    typography: "{typography.body-md}"
    padding: 20px
  contact-row-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    padding: 20px
  scroll-progress:
    backgroundColor: "{colors.accent}"
    height: 3px
  accent-swatch-teal:
    backgroundColor: "{colors.accent-teal}"
    rounded: "{rounded.base}"
    size: 20px
  accent-swatch-rose:
    backgroundColor: "{colors.accent-rose}"
    rounded: "{rounded.base}"
    size: 20px
  accent-swatch-slate:
    backgroundColor: "{colors.accent-slate}"
    rounded: "{rounded.base}"
    size: 20px
  accent-swatch-ochre:
    backgroundColor: "{colors.accent-ochre}"
    rounded: "{rounded.base}"
    size: 20px
  alert-surface:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.card-foreground-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 12px
  hover-card-surface:
    backgroundColor: "{colors.popover-dark}"
    textColor: "{colors.popover-foreground-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.base}"
    padding: 16px
  destructive-button:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  dot-field-base:
    backgroundColor: "{colors.dotbase-dark}"
  dot-field-dot:
    backgroundColor: "{colors.dot-dark}"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover-dark}"
    textColor: "{colors.secondary-foreground-dark}"
    rounded: "{rounded.base}"
  neo-badge-light:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.base}"
    padding: 6px
  neo-badge-dark-variant:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.base}"
    padding: 6px
  input-field-dark:
    backgroundColor: "{colors.input-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.base}"
    padding: 8px
  input-field-light:
    backgroundColor: "{colors.input-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.base}"
    padding: 8px
  popover-surface-light:
    backgroundColor: "{colors.popover-light}"
    textColor: "{colors.popover-foreground-light}"
    rounded: "{rounded.base}"
    padding: 16px
  muted-caption-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.muted-foreground-light}"
    typography: "{typography.label-md}"
  muted-caption-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.muted-foreground-dark}"
    typography: "{typography.label-md}"
  muted-fill-chip:
    backgroundColor: "{colors.muted-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.base}"
    padding: 4px
  secondary-button-light:
    backgroundColor: "{colors.secondary-light}"
    textColor: "{colors.secondary-foreground-light}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 6px
  secondary-button-light-hover:
    backgroundColor: "{colors.secondary-hover-light}"
    textColor: "{colors.secondary-foreground-light}"
    rounded: "{rounded.base}"
  grid-backdrop-light:
    backgroundColor: "{colors.grid-light}"
  grid-backdrop-dark:
    backgroundColor: "{colors.grid-dark}"
  dot-base-light:
    backgroundColor: "{colors.dotbase-light}"
  dot-base-dark:
    backgroundColor: "{colors.dotbase-dark}"
  dot-particle-light:
    backgroundColor: "{colors.dot-light}"
  ring-focus:
    backgroundColor: "{colors.ring-dark}"
    size: 2px
  border-chrome-dark:
    backgroundColor: "{colors.border-dark}"
    height: 2px
  border-chrome-light:
    backgroundColor: "{colors.border-light}"
    height: 2px
  surface-neutral:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.foreground-light}"
  shadow-ink:
    backgroundColor: "{colors.shadow-color}"
    height: 4px
  accent-light-chip:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.base}"
    padding: 4px
  ring-focus-light:
    backgroundColor: "{colors.ring-light}"
    size: 2px
  secondary-token-surface:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.base}"
  secondary-hover-token:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.base}"
---

<!--
  Root design language for intro-zuendorf.me.
  Machine tokens: YAML frontmatter (validated via `npx @google/design.md lint .spec/design.md`).
  Implementation source of truth for CSS values: src/app/globals.css + src/components/theme/accents.ts.
  RetroUI registry: components.json → @retroui (retroui.dev).
-->

# intro-zuendorf.me — Design

Cross-cutting design language. Neobrutalism with a dark-first, editorial-zine
personality: heavy display type, hard offset shadows, pill-and-card silhouettes,
one switchable accent, and playful but restrained motion.

**Product:** [product.md](product.md)  
**Architecture:** [tech.md](tech.md)  
**Component migration:** [features/component-unification/design.md](features/component-unification/design.md)

**Validate tokens:** `npx @google/design.md lint .spec/design.md`

---

## Overview

A personal site that reads like a designer's desk, not a corporate portfolio. The
feel is **confident, tactile, slightly irreverent**: oversized `Archivo Black`
headlines, monospace captions on a print layout, and chunky 2px-bordered surfaces
with hard, un-blurred shadows. One accent color (Teal by default) carries all
emphasis; the visitor picks from four swatches.

Two independent theming axes:

1. **Mode** — dark ↔ light. Inverts `background`, `foreground`, `card`, `muted`.
2. **Accent** — Teal, Rose, Slate, or Ochre. Sets `--primary` on `<html>`;
   derived `--primary-hover`, `--primary-light`, `--accent-*` via `color-mix`.

Preserve: 2px borders, hard offset shadows (never blur), three-font hierarchy,
accent-as-only-emphasis, dock + command palette navigation (no navbar).

### RetroUI component system

Interactive primitives from the **RetroUI** registry (`@retroui` in
[`components.json`](../components.json)):

```bash
pnpm exec shadcn add @retroui/<name>
```

Built on **Base UI** (`@base-ui/react`). Reskin with tokens in this file.
Typography (`src/components/ui/typography.tsx`) and `Section` stay custom.

---

## Colors

Semantic roles map to CSS variables in `globals.css`.

| Role | CSS var | Light | Dark |
|---|---|---|---|
| Canvas | `--background` | `#FAF9F4` | `#1A1A1A` |
| Ink | `--foreground` | `#0B0B0B` | `#E8E8E0` |
| Card | `--card` | `#FFFFFF` | `#111111` |
| Card text | `--card-foreground` | `#0B0B0B` | `#F4F4EC` |
| Muted fill | `--muted` | `#AEAEAE` | `#3F3F46` |
| Muted text | `--muted-foreground` | `#6B675E` | `#6E6E68` |
| Border / ring | `--border`, `--ring` | `#0B0B0B` | `#2A2A2A` |
| Secondary | `--secondary` | `#000` | `#141414` |
| Popover | `--popover` | `#FFFFFF` | `#161616` |
| Destructive | `--destructive` | `#E63946` | `#E63946` |
| Shadow ink | `--shadow-color` | `#0B0B0B` | `#0B0B0B` |
| Dot field | `--dotbase`, `--dot` | see tokens | see tokens |
| Grid | `--grid` | `#00000012` | `#ffffff18` |

**Accent axis** (mode-independent; default Teal):

| Swatch | Hex | Label |
|---|---|---|
| Teal (default) | `#4E9E96` | `accent-teal` |
| Rose | `#B07A8A` | `accent-rose` |
| Slate | `#7A8FA8` | `accent-slate` |
| Ochre | `#A89060` | `accent-ochre` |

Derived at runtime: `--primary-hover` (88% primary + black), `--primary-light`
(70% primary + white), `--accent-dark` (82% primary + black).

Rules:

- Borders use `--border` (semantic ink). Dark mode borders are `#2A2A2A`, not grey wash.
- **Accent is the only emphasis hue** for interactive fills, scroll progress, dot-field tint.
- Text on accent fills uses `--primary-foreground` (`#F4F4EC`). Note: teal + bone is
  below WCAG AA for small text — acceptable for display badges; use sufficient size/weight.
- `::selection`: accent background, accent-foreground text.

---

## Typography

Three fonts via `next/font` in `layout.tsx` → `--font-head`, `--font-sans`, `--font-mono`.

| Token | Font | Use |
|---|---|---|
| `display-hero` | Archivo Black | Hero name (`clamp` fluid size in code) |
| `display-h1` | Archivo Black | Card titles, section display |
| `headline-h2` / `h3` | Archivo Black | Subheadings (responsive scale in `typography.tsx`) |
| `body-lg` / `body-md` / `body-sm` | Space Grotesk | Paragraphs, UI labels, links |
| `label-md` / `label-sm` / `label-caps` | Space Mono | Eyebrows `// section`, metadata, kbd |
| `code-inline` | Space Mono | Inline code |

**Rules:**

- Never use raw `<p>`, `<h1>`, etc. — use `@/components/ui/typography` exports.
- Never override responsive typography at call sites — add variants to typography instead.
- Mono is for labels and metadata, not body paragraphs.
- Section eyebrows: `// name` in mono, muted, uppercase/wide tracking.

---

## Layout

| Token | Value | Use |
|---|---|---|
| `container` | 1180px max | Section column (`max-w-3xl` ≈ 768px content; full bleed where noted) |
| `gutter` | 24px | Horizontal padding (`px-6`) |
| `section-y` | 56px | Default section vertical padding |
| `section-y-lg` | 96px | Contact / large sections at `2xl` |

Structure:

- Hero: `min-h-svh`, centered column.
- Work: single-column full-width rows.
- Notes: `grid-cols-1 lg:grid-cols-3`.
- Contact: stacked full-width link rows.
- Fixed chrome: scroll-progress (3px), dock (top-center), optional dot-field backdrop.

---

## Elevation & Depth

Hard offset shadows only — `var(--shadow-color)` with **no blur**:

| CSS utility | Offset | Typical use |
|---|---|---|
| `shadow-xs` | 1px | micro lift |
| `shadow-sm` | 2px | kbd, small chips |
| `shadow` | 3px | work rows at rest |
| `shadow-md` | 4px | dock, cards, buttons |
| `shadow-lg` | 6px | work row hover |
| `shadow-xl` | 10px | command palette |
| `shadow-2xl` | 16px | note card hover |

Tailwind alias: `shadow-shadow` → `--color-shadow` → `--shadow-color`.

**Interaction physics:**

- Hover: `translate(-1px, -1px)` + shadow step up.
- Active (buttons): `translate(2px, 2px)` + shadow removed.
- RetroUI button default: `translateY(1px)` on hover, `translate(1px, 2px)` on active.

---

## Shapes

| Token | Value | Use |
|---|---|---|
| `rounded.base` | 8px (`--radius` 0.5rem) | Buttons, cards, dock, menus, tooltips — **default** |
| `rounded.lg` | 14px | Editorial card emphasis |
| `rounded.xl` | 18px | Command palette panel |
| `rounded.pill` | 999px | Legacy pill chips where needed |
| `rounded.xs` | 2px | Kbd inner radius |

Borders: **always `border-2`** via `border-border`. No `border-4` on new surfaces
(legacy callouts migrating to `@retroui/alert`).

---

## Components

### RetroUI / site variant matrix

**Button** (`buttonVariants` in `retroui/Button.tsx`):

| Variant | Background | Shadow | Use |
|---|---|---|---|
| `default` | `primary` | md + lift | Primary CTAs |
| `flat` | `primary` | none | Accent dock control |
| `secondary` | `secondary` | md + lift | Secondary actions |
| `flatSecondary` | `secondary` | none | Dock socials, scroll-arrow |
| `outline` | transparent | md + lift | Bordered actions |
| `ghost` | transparent | none | Footer theme, JUMP-adjacent |
| `link` | transparent | none | Text links styled as buttons |

Sizes: `sm`, `md` (default), `lg`, `icon` (36×36).

**NeoBadge** (`neoBadgeVariants`):

| Axis | Values |
|---|---|
| `variant` | `default`, `dark`, `light`, `outline` |
| `rotation` | `none`, `slight` (-1°), `negative` (+1°), `medium` (-2°), `negativeMedium` (+2°) |
| `shadow` | `none`, `sm`, `md`, `lg` |
| `size` | `sm`, `md`, `lg` |
| `interactive` | `none`, `lift`, `grow`, `bounce`, `wiggle` |

Hero role badge: `rotation="medium"`, `shadow="md"`, `size="md"`.

**Callout → Alert** (migrating): types `info`, `check`, `warning`, `danger`, `note`;
variants `default`, `outline`, `accent`; `borderStyle` `default`, `accent`, `none`.

**Section patterns:** `SectionEyebrow`, work `rowBase`, note `Card` + rotation,
contact row hover fill, dock segments, command palette footer kbd hints.

---

## Motion

Respect `prefers-reduced-motion`. Enhancement tier gates on `pointer: fine`.

| Effect | Tier | Gating |
|---|---|---|
| `data-reveal` scroll fade-rise | core | `.js` + IntersectionObserver |
| Hover lift / button press | core | always |
| Scroll progress bar | core | always |
| Dot field canvas | enhancement | fine pointer, not reduced-motion |
| Custom cursor ring | enhancement | `useEffectsEnabled()` |
| Hero parallax | enhancement | fine pointer |
| Note `floaty` idle bob | enhancement | CSS `.floaty` + staggered delay |

Animations in `@theme`: `float`, `wiggle`, `shimmer`, `pulse`, `floaty` keyframes.

---

## Do's and Don'ts

- Do install interactive primitives from `@retroui/*` — do not fork Radix equivalents.
- Do use `rounded-base`, `border-2`, `shadow-shadow` on all neobrutalist surfaces.
- Do use typography components; add variants instead of inline `text-sm` overrides.
- Do keep accent as the only emphasis color; one swatch active at a time.
- Do gate enhancement motion behind pointer + reduced-motion checks.
- Don't add a traditional navbar — dock + command palette only.
- Don't use `shadow-black`, `font-body`, `z-9999`, or hardcoded `text-black`/`border-black`.
- Don't put prose body copy in Archivo Black.
- Don't use blur shadows or opacity-only depth.

### WCAG contrast notes (lint warnings)

`npx @google/design.md lint` may warn on accent-filled surfaces (teal + `#F4F4EC`
≈ 2.85:1) and muted tooltip/kbd pairs. These match **implemented** values in
`globals.css` and are intentional neobrutalist brand choices for display-sized
labels and badges — not body copy. If accessibility hardening is required later,
darken `--primary-foreground` on accent fills or bump muted text to
`foreground` for tooltips only.

---

## Feature Design Index

| Feature | Design Detail |
|---|---|
| neon-landing | [features/neon-landing/design.md](features/neon-landing/design.md) |
| neon-nav | [features/neon-nav/design.md](features/neon-nav/design.md) |
| neon-effects | [features/neon-effects/design.md](features/neon-effects/design.md) |
| component-unification | [features/component-unification/design.md](features/component-unification/design.md) |
