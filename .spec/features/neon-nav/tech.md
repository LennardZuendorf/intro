---
type: feature-tech
feature: neon-nav
sibling: product.md
parent: ../../tech.md
updated: 2026-06-29
---

# Feature: neon-nav — Architecture

A client island: a floating dock component and a command palette built on the
existing RetroUI `Command` (cmdk). A shared section registry drives both; a global
keydown listener opens the palette on `/` / `⌘K`; jumps are smooth scrolls to
section ids defined by neon-landing.

**Parent:** [../../tech.md](../../tech.md)
**Requirements:** [product.md](product.md)
**Design:** [design.md](design.md)
**Plan:** [plan.md](plan.md)

---

## Files

```
src/components/nav/dock.tsx              # NEW floating dock shell (hosts controls)   ~70 LOC
src/components/nav/command-palette.tsx    # NEW cmdk palette + keydown + jump          ~90 LOC
src/components/nav/sections.ts            # NEW section registry (id/label/blurb)       ~20 LOC
src/components/ui/retroui/Command.tsx     # EXTEND: re-export cmdk `CommandDialog` (wrapper lacks a Dialog/overlay)
src/app/page.tsx                          # MOUNT <Dock/> into landing's rewritten page; REMOVE <Nav> mount  ~edit
```

The dock embeds the neon-foundation controls (`theme-select`, `accent-swatches`)
and the palette trigger — it does not own their logic. `accent-swatches.tsx` is
produced by **neon-foundation**; the dock imports it (hard dependency on the whole
foundation feature, per the gate).

**Do NOT delete `src/components/navbar.tsx`.** The existing `<Nav>` is also consumed
by `src/app/legal/[lang]/page.tsx` (with `backHref`). This feature only removes the
`<Nav>` mount + fixed wrapper from the landing `page.tsx`; `navbar.tsx` stays for
the legal route. (Whether legal also adopts the dock is a separate, out-of-scope
decision.)

---

## Contract / API

```typescript
// src/components/nav/sections.ts
interface NavSection { id: string; label: string; blurb: string; n: string; }
export const NAV_SECTIONS: NavSection[]; // about, work, notes, contact (hero = scroll-top)

// command-palette.tsx
// scrollIntoView takes no pixel offset; use scroll-margin-top on section wrappers
// (set by neon-landing) + native anchor/scrollIntoView, OR measure and scrollTo:
function jumpTo(id: string): void; // el = getElementById(id); el.scrollIntoView({behavior:"smooth"})
```

Keyboard contract: `/` or `⌘K`/`Ctrl+K` opens (ignored while typing in an input);
inside palette: ↑/↓ move selection, Enter jumps, Esc closes.

---

## Implementation Detail

The palette is a controlled cmdk dialog. State (`open`, `query`, `selected`) lives
in the palette client component; a `useEffect` registers the global `keydown`
listener with the in-field guard from the v4 reference. `jumpTo` resolves the
section element by id and `scrollIntoView`s with a top offset so the dock doesn't
cover the heading.

`NAV_SECTIONS` is the single source for both the palette list and any JUMP
shortcuts; its ids MUST match the section ids neon-landing renders
(`about/work/notes/contact`). Hero is reached via scroll-to-top.

Palette shell: the RetroUI `Command` wrapper exports only `Empty/Group/Input/Item/
List/Separator/Shortcut` — it has **no Dialog/overlay/portal**. The design needs a
backdrop + centered popped panel, so use cmdk's `Dialog as CommandDialog` (re-export
it from `Command.tsx`) for the controlled-open modal shell, with `open`/`onOpenChange`
owned by `command-palette.tsx`. Use the wrapper's list/input/item for contents;
style the shell with v4 tokens (card bg, 2px ink border, `shadow-xl`, `rounded` per
design). The dock is a `fixed` top-center pill using `shadow-md`.

Mount: the landing `page.tsx` (Server Component) renders a single `<Dock/>` client
island; the palette is rendered by the dock so one keydown listener exists. Since
landing rewrites `page.tsx`, coordinate: nav adds the `<Dock/>` mount and removes
the `<Nav>` import + fixed wrapper in the same edit (sequence nav after landing
where end-to-end jump verification is needed).

Pre-existing: `scroll-arrow.tsx` hardcodes a 64px navbar offset for its own
smooth-scroll; once the dock replaces the navbar, reconcile or remove that
assumption.

## Open Questions

1. **Scroll offset mechanism** — `scroll-margin-top` on section wrappers (owned by
   neon-landing; native anchors + JS jumps agree) vs JS `scrollTo(offsetTop - h)`
   inside `jumpTo` (stays in nav's scope). Recommendation: `scroll-mt` on sections,
   noted as a small landing-side change.
