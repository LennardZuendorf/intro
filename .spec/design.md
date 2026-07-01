---
type: entrypoint
scope: design
design_format: google-labs-code/design.md-compatible
children:
  - features/neon-landing/design.md
  - features/neon-nav/design.md
  - features/neon-effects/design.md
updated: 2026-06-29
# --- google-labs-code/design.md canonical token groups ---
name: intro-zuendorf.me
version: alpha
description: >-
  Neobrutalist, dark-first personal portfolio. Heavy display type, hard offset
  shadows, pill-and-card silhouettes, one electric accent, orthogonal mode and
  accent theming axes.
# Flat color tokens (canonical: token-name -> valid CSS color). `-dark`/`-light`
# suffixes encode the two modes; `accent*` are the four user-switchable swatches.
colors:
  bg-dark: "#0B0B0B"
  ink-dark: "#F4F4EC"
  muted-dark: "#8C8C84"
  card-dark: "#161616"
  dot-dark: "rgba(244,244,236,0.05)"
  dotbase-dark: "#242424"
  bg-light: "#FAF9F4"
  ink-light: "#0B0B0B"
  muted-light: "#6B675E"
  card-light: "#FFFFFF"
  dot-light: "rgba(11,11,11,0.07)"
  dotbase-light: "#D9D4C2"
  accent: "#C6FF2E"          # lime (default)
  accent-pink: "#FF2E9A"
  accent-cyan: "#21E6E0"
  accent-orange: "#FF6A1A"
  accent-foreground: "#0B0B0B" # text/icon on accent fills (dark for all 4 swatches)
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "Space Mono, monospace"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  card: 14px      # default card/panel radius
  card-lg: 18px   # larger panels (e.g. command palette)
  pill: 999px     # badges, dock, buttons, fact chips
spacing:
  section: 56px   # vertical rhythm between sections (44–96px)
  container: 1180px
  gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.card}"
---

<!--
  Root design language for intro-zuendorf.me. Source of truth: the v4 design
  (claude.ai/design "Neobrutalist portfolio landing page", file "Lennard v4.dc.html").
  Tokens here are fixed by that design. Feature-scoped interaction detail lives in
  features/neon-landing|neon-nav|neon-effects/design.md.
-->

# intro-zuendorf.me — Design

Cross-cutting design language. Neobrutalism with a dark-first, editorial-zine
personality: heavy display type, hard offset shadows, pill-and-card silhouettes,
a single electric accent, and playful but restrained motion.

**Product:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)

---

## Overview

A personal site that reads like a designer's desk, not a corporate portfolio. The
feel is **confident, tactile, slightly irreverent**: oversized `Archivo Black`
headlines set against an almost-black canvas, monospace labels acting as captions
on a print layout, and chunky 2px-bordered cards that cast hard, un-blurred
shadows. One electric accent (lime by default) carries all emphasis.

Two independent theming axes the design must preserve:
1. **Mode** — dark (default) ↔ light. Inverts bg/ink/card/muted.
2. **Accent** — user picks from 4 fixed swatches; recolors every accent surface
   live. Mode and accent are orthogonal and both persist across visits.

What agents must preserve: 2px borders + hard offset shadows (never soft blur),
the three-font hierarchy, the accent-as-only-emphasis rule, and the
"floating dock + command palette" navigation model over a traditional navbar.

## Colors

Three roles per mode plus the orthogonal accent. See frontmatter tokens for
canonical hex.

| Role | Meaning | Dark | Light |
|---|---|---|---|
| `bg` | Page canvas | near-black | warm off-white |
| `ink` | Foreground / borders / shadows | bone | near-black |
| `muted` | Captions, metadata, secondary text | grey | warm grey |
| `card` | Raised surface fill | dark grey | white |
| `accent` | All emphasis (one at a time) | swatch | swatch |

Rules:
- **Borders and shadows are always `ink`**, in both modes — not a grey. This is
  what makes the neobrutalism read.
- **Accent is the only emphasis color.** No secondary brand hues. Hover states,
  active chips, palette selection, scroll progress, and the dot-field cursor halo
  all use `accent`. Text/icons sitting on an accent fill use `accent-foreground`
  (`#0B0B0B`), which stays dark for all four swatches.
- `::selection` is `accent` on `accent-foreground`.

## Typography

Three fonts, three jobs — never blur the roles.

| Font | Role | Where |
|---|---|---|
| `Archivo Black` | Display | Hero name, project titles, section numerals. UPPERCASE, `line-height 0.84`, tight tracking. `clamp()` for fluid size. |
| `Space Grotesk` | Body / UI | Paragraphs, bio, link labels, fact chips. 400–700. |
| `Space Mono` | Mono | Eyebrow labels (`// about`), metadata, `kbd`, handles, corner tags. UPPERCASE with wide tracking (`0.06em–0.14em`). |

Section eyebrows follow the `// section-name` convention in mono, muted, uppercase.
Hero headline uses `mix-blend-mode: difference` so it reads over the animated
dot field in either mode.

## Layout

- Centered single column, `max-width 1180px`, `24px` gutters.
- Vertical rhythm: section padding `44–96px` top/bottom; hero is full `100vh`
  (`min-height 600px`).
- Work list = single column of full-width rows. Scratchpad = 3-column grid
  (collapses on small screens). Contact = stacked full-width rows.
- Fixed chrome: scroll-progress bar (top, 3px), floating dock (top-center),
  custom cursor. Background dot-grid is fixed, `pointer-events:none`, behind content.

## Elevation & Depth

Hard offset shadows only — the existing Tailwind `--shadow-*` scale already
encodes this (`Npx Npx 0 0 var(--border)`), so reuse it; do not introduce blur.

| Token | Offset | Use |
|---|---|---|
| `shadow-sm` | 2px | small buttons, kbd |
| `shadow` | 3px | chips, links, work rows (rest) |
| `shadow-md` | 4px | dock, hero badge |
| `shadow-lg` | 6px | work row hover |
| `shadow-xl` | 10px | command palette |
| `shadow-2xl` | 16px | note hover, deepest lift |

Depth comes from border + offset shadow + the dot-grid backdrop, never from
opacity gradients or soft drop shadows. Hover = translate toward the shadow
(`translate(-1px,-1px)`) while the shadow grows; active = press into it
(`translate(2px,2px)`, shadow shrinks to 0).

## Shapes

- **Pills** (`999px`): dock, JUMP button, badges, fact chips, accent swatches,
  mode toggle, corner labels. The dominant silhouette.
- **Cards** (`14px`, up to `18px` for large panels like the command palette): work
  rows, scratchpad notes, contact rows.
- Borders uniformly `2px solid ink`. Swatches are circular pills.

## Components

| Pattern | Use When | Notes |
|---|---|---|
| Floating dock | Persistent nav | Top-center pill: JUMP (opens palette) · mode toggle · accent swatches. Replaces navbar. |
| Command palette | Section jump | `/` or `⌘K` to open; fuzzy filter; ↑↓ navigate, ↵ jump, esc close. Built on cmdk/RetroUI `Command`. |
| Eyebrow label | Section header | Mono, muted, uppercase, `// name`. |
| Hero badge | Role tag | Accent-filled pill, rotated `-2deg`, hard shadow. |
| Fact chip | Inline metadata | Pill, card fill, accent dot, mono text. |
| Work row | List item w/ hover | Grid `numeral / title / kind+year`; hover fills accent + grows shadow. |
| Note card | Scratchpad idea | Rotated card, `floaty` animation, accent tag, lifts on hover. |
| Contact row | External link | Full-width row; hover fills accent; handle + `↗` in mono. |

## Motion

Tasteful, never gratuitous. Respect `prefers-reduced-motion` (disable canvas,
cursor, parallax, floaty; keep instant reveals).

| Effect | Behavior | Tier |
|---|---|---|
| Scroll reveal | `data-reveal` fades + rises into view (IntersectionObserver) | core |
| Hover lift / press | translate + shadow change | core |
| Scroll progress | top bar width tracks scroll | core |
| Dot field | Canvas grid; dots flee cursor and recolor to accent | enhancement |
| Custom cursor | Lerped accent ring, `mix-blend difference` | enhancement |
| Hero parallax | Title drifts with pointer | enhancement |
| Floaty notes | Slow idle bob on scratchpad cards | enhancement |

Enhancement-tier effects degrade gracefully — desktop pointer only, off under
reduced-motion, no effect on content legibility.

## Do's and Don'ts

- Do keep borders/shadows in `ink`; never soften shadows with blur.
- Do use accent as the *only* emphasis color; one accent active at a time.
- Do keep the three-font role split crisp; mono is for labels, never paragraphs.
- Do gate enhancement motion behind pointer + reduced-motion checks.
- Don't add a traditional navbar — navigation is dock + palette.
- Don't invent new radii, shadow offsets, or accent hues outside the tokens.
- Don't put real prose in `Archivo Black` — it's display only (UPPERCASE, short).

## Feature Design Index

| Feature | Design Detail |
|---|---|
| neon-landing | [features/neon-landing/design.md](features/neon-landing/design.md) |
| neon-nav | [features/neon-nav/design.md](features/neon-nav/design.md) |
| neon-effects | [features/neon-effects/design.md](features/neon-effects/design.md) |

Feature-level interaction and copy live in `features/<name>/design.md` — not here.
