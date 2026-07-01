---
type: feature-design
feature: neon-landing
sibling: product.md
parent: ../../design.md
updated: 2026-06-29
---

# Feature: neon-landing — Design

Section-level layout and interaction detail for the one-page site. Inherits all
tokens, fonts, shadows, and component patterns from [../../design.md](../../design.md);
this doc only specifies how each section is composed and how rows behave.

**Parent:** [../../design.md](../../design.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)
**Plan:** [plan.md](plan.md)

---

## Design Intent

A vertical zine: each section opens with a mono `// label` eyebrow, then a single
strong idea. Generous whitespace between sections; one accent color carries every
hover and highlight. The page should feel hand-set, not gridded-to-death — slight
rotations on the hero badge and note cards, hard shadows everywhere.

---

## Interaction Patterns

| Section | Layout | Interaction |
|---|---|---|
| Hero | Full `100vh`, centered name in `Archivo Black` (`mix-blend difference`), accent role badge (rotated −2°), corner labels (`EST. STOCKHOLM`, `№ 001`), scroll hint | Reveal-in on load; pointer parallax is deferred (neon-effects) |
| About | `// about` eyebrow, accent vertical bar + large bio paragraph, fact chips row | Bio is rich MDX (`HoverLink`, inline links) inside the accent-bar treatment — **not flattened**; reveal on scroll |
| Work | `// selected work`, single column of full-width rows: `n / title / kind+year` | Row hover fills accent + grows shadow + lifts (`translate(-1px,-1px)`); kind label distinguishes project vs role |
| Notes | `// scratchpad`, 3-col grid (1-col on mobile) of rotated tag cards | Hover lifts card; floaty idle bob is deferred (neon-effects) |
| Contact | `// elsewhere`, stacked full-width link rows: `label … handle ↗` | Row hover fills accent + grows shadow; opens in new tab |
| Footer | Thin top border, `© 2026 LENNARD ZÜNDORF` + tagline, mono muted | static |

Reveal: every section uses the core `data-reveal` fade+rise. Corner labels and
eyebrows are `Space Mono`, muted, uppercase, wide tracking.

## Language & Copy

- Eyebrows use the `// section-name` convention, lowercase after the slashes.
- Hero name is the only `Archivo Black` long-form text and stays UPPERCASE.
- Corner label reads `EST. STOCKHOLM` (real location), not the design's Berlin.
- Work `kind` labels are short and lowercase (`dev tool`, `product`, `writing`).

## Do's and Don'ts

- Do keep one idea per section; let whitespace separate them.
- Do preserve the rich bio MDX inside the accent-bar block.
- Don't flatten the work list into cards — rows with hover-fill are the pattern.
- Don't add section motion beyond core reveal/hover here; richer motion is neon-effects.

## Open Questions

1. **Mobile notes grid** — 1 column vs 2. Recommendation: 1 column under `md`,
   3 columns at `lg`.
