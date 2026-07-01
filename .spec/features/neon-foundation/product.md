---
type: feature-product
feature: neon-foundation
sibling: tech.md
parent: ../../product.md
updated: 2026-06-29
---

# Feature: neon-foundation — Product

The design-system base every other v4 feature paints on: the v4 color tokens
(lime default accent + 4 swatches), the Space Mono font, and two independent,
persistent theming axes — light/dark mode and accent color. Visitors control both;
both survive reload without a flash of the wrong theme.

**Parent:** [../../product.md](../../product.md)
**Architecture:** [tech.md](tech.md)
**Plan:** [plan.md](plan.md)

---

## Scope

| | |
|---|---|
| **Owns** | v4 tokens in `globals.css`; Space Mono wiring in `layout.tsx`; mode toggle + 4-swatch accent control; mode/accent persistence + no-flash pre-paint. |
| **Does not own** | Page content/sections (neon-landing); dock/palette UI that *hosts* the controls (neon-nav consumes them); motion effects (neon-effects). |

---

## Requirements

### Requirement: v4 token system

The system SHALL express the v4 design tokens from [../../design.md](../../design.md)
as the project's CSS variables, with borders and shadows always rendered in the
`ink` color and the default accent set to lime `#C6FF2E`.

#### Scenario: Default load

- **Given** a first-time visitor on a system set to dark
- **When** the page loads
- **Then** the canvas is near-black, text is bone, and accent surfaces are lime

### Requirement: Mode axis

The system SHALL let the visitor switch light/dark mode, and MUST persist the
choice across visits.

#### Scenario: Toggle and reload

- **Given** a visitor in dark mode
- **When** they switch to light and reload
- **Then** the page loads in light mode with no flash of dark

### Requirement: Accent axis

The system SHALL let the visitor pick one of four accent swatches (lime, pink,
cyan, orange), MUST apply it live to every accent surface, and MUST persist it
independently of mode.

#### Scenario: Pick accent, switch mode

- **Given** a visitor who picked pink
- **When** they then toggle to light mode and reload
- **Then** the accent stays pink in light mode

### Requirement: No theme flash

The system MUST apply both the stored mode and the stored accent before first
paint, so no wrong-theme frame is shown.

#### Scenario: Reload with stored prefs

- **Given** stored prefs of light mode + cyan accent
- **When** the page reloads
- **Then** the first painted frame is already light + cyan

---

## User Experience

A small control cluster (hosted in the dock — see neon-nav) shows a sun/moon mode
toggle and four colored swatch dots. The active swatch is visibly selected
(scaled + hard shadow). Changing either updates the whole page instantly. Both
choices are remembered next visit.

**Mount note:** the dock that hosts these controls belongs to neon-nav (sequence
step 3). Between this feature and the dock, the controls are verified
programmatically (provider + persistence) rather than via a visible UI; this
feature's exit criteria do not require the dock. The components are built here;
their placement is wired by neon-nav.

---

## Non-Goals

- No additional accent colors beyond the four swatches.
- No per-section or per-component theme overrides.
- No system-driven accent (accent is user-only; mode may follow system until set).

---

## Open Questions

1. **Mode default** — follow system (`next-themes` `defaultTheme: system`) until
   the user sets it, or hard default to dark? Recommendation: keep system default
   (matches current behavior), dark as the design's intended look.
