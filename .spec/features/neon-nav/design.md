---
type: feature-design
feature: neon-nav
sibling: product.md
parent: ../../design.md
updated: 2026-06-29
---

# Feature: neon-nav — Design

Interaction detail for the dock and command palette. Inherits all tokens and the
"floating dock + command palette" component patterns from
[../../design.md](../../design.md); this doc specifies the palette flow and dock
behavior.

**Parent:** [../../design.md](../../design.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)
**Plan:** [plan.md](plan.md)

---

## Design Intent

Navigation should feel like a keyboard-first power tool bolted onto a playful page.
The dock is a single confident pill floating over the content; the palette is fast,
monospace-labeled, and accent-highlighted. No chrome competes with the content —
the dock is the only persistent UI.

---

## Interaction Patterns

| Pattern | Behavior |
|---|---|
| Dock | Fixed top-center pill, `card` bg, 2px ink border, `shadow-md`. Segments: JUMP button (accent fill) · divider · mode toggle (☾/☀) · divider · 4 accent swatches. |
| JUMP button | Accent-filled pill with a `/` kbd hint; press → opens palette. Hover lifts, active presses in. |
| Palette open | `/` or `⌘K`; dim+blur backdrop; panel pops (scale/translate) at ~15vh. Mono `/` glyph + text input, `ESC` kbd. |
| Palette item | Row: mono index · label (bold) · mono blurb · `↵` on the selected row. Selected row = accent fill + left ink bar. |
| Keyboard | ↑/↓ move (wrap), Enter jumps, Esc closes. `/` ignored while typing in a field. |
| Empty state | "no match — try 'work' or 'contact'" in mono muted. |
| Footer hint | Mono row: `↑↓ navigate · ↵ jump · esc close`, accent on the keys. |

## Language & Copy

- Section labels are Title Case (`About`, `Work`, `Notes`, `Contact`).
- Blurbs are short lowercase fragments (`things i shipped`, `where to find me`).
- Input placeholder: `Jump to a section…`.

## Do's and Don'ts

- Do keep the palette keyboard-first; mouse hover mirrors selection.
- Do recolor selection/keys with the live accent.
- Don't add a navbar or duplicate nav links elsewhere.
- Don't trap focus poorly — Esc and backdrop click both close.

## Open Questions

1. **Dock on mobile** — condensed (JUMP + mode), swatches moved into the palette
   or a small sheet. Recommendation: condensed.
