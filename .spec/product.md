---
type: entrypoint
scope: product
children:
  - features/neon-foundation/product.md
  - features/neon-landing/product.md
  - features/neon-nav/product.md
  - features/neon-effects/product.md
  - features/component-unification/product.md
updated: 2026-07-05
---

# intro-zuendorf.me — Product

Personal portfolio site for Lennard Zündorf — a fullstack product leader and
builder. Not a corporate résumé; a single-page "designer's desk" that mixes
professional work and side projects, written in a neobrutalist, dark-first voice.

**One-liner:** A one-page neobrutalist portfolio that reads like my desk, not a CV.

---

## Story

The current site is a competent neobrutalist landing built on RetroUI + Fumadocs,
but it reads like a generic template. The **v4 redesign** ("Lennard v4.dc.html")
gives it a distinct point of view: oversized `Archivo Black` headlines on an
almost-black canvas, hard offset shadows, one electric accent the visitor can
recolor, and command-palette navigation instead of a navbar. When it ships, the
site is a single scrollable page that feels personal, fast, and a little
irreverent — and the visitor controls both light/dark mode and the accent color.

---

## Requirements

At a project level the site must:

1. **Be a single landing page.** One scrollable page (`/`) carries the whole
   story — hero, about, work, notes, contact. `/legal` is the only other route.
2. **Mix professional and side work.** The Work list interleaves roles
   (DIB Travel, Check24, Hypoport) and side projects (indexed, obsidian-task-ui,
   shards-agent) in one ranked list.
3. **Stay content-driven.** All copy comes from Fumadocs MDX collections, not
   hardcoded JSX. Adding a project or note is a content edit.
4. **Offer two persistent theming axes.** Visitors switch light/dark mode and
   pick one of four accent swatches; both choices persist across visits.
5. **Navigate by command palette.** A floating dock + `/` / `⌘K` palette replaces
   the navbar for section jumps.
6. **Honor the design language.** Tokens, type hierarchy, and motion tiers in
   [design.md](design.md) are binding. Reuse RetroUI primitives and the existing
   offset-shadow scale; no ad-hoc visuals.
7. **One primitive layer.** Interactive UI comes from the `@retroui/*` registry
   (Base UI underneath). No parallel Radix forks of the same component — see
   [features/component-unification/](features/component-unification/product.md).

---

## Design Principles

1. **Content is data.** Sections render from MDX; the layout never hardcodes a
   project, role, or note. This keeps the page a living document.
2. **One accent, two axes.** Emphasis is a single switchable color; mode and
   accent are orthogonal and both belong to the visitor, not the build.
3. **Reuse before reinvention.** Extend RetroUI components, the `--shadow-*`
   scale, and `Section` patterns. New primitives only when none fits.
4. **Motion is tiered and optional.** Core motion is always on; enhancement
   effects (canvas, cursor, parallax) degrade gracefully and respect
   `prefers-reduced-motion`.

---

## Target User

Hiring managers, collaborators, and fellow builders who land on the site from a
link (CV, social bio, talk). They skim on desktop or mobile, want to grasp who
Lennard is and what he's shipped in under a minute, and may poke at the
theme/palette for fun. Secondary: Lennard himself, editing content via MDX.

---

## Features

| Feature | Covers |
|---|---|
| **[features/neon-foundation/](features/neon-foundation/product.md)** | Design-system plumbing: lime accent + 4 swatches, Space Mono, dual mode/accent theming with persistence. |
| **[features/neon-landing/](features/neon-landing/product.md)** | The one-page content: hero, about, merged work list, notes, contact, footer; route cleanup; notes content collection. |
| **[features/neon-nav/](features/neon-nav/product.md)** | Floating dock + command palette navigation. |
| **[features/neon-effects/](features/neon-effects/product.md)** | Enhancement motion (dot-field, custom cursor, parallax, floaty). **Deferred.** |
| **[features/component-unification/](features/component-unification/product.md)** | RetroUI registry adoption + Base UI migration; shared wrappers; Radix cleanup. |

Feature-level UX and requirements live in `features/<name>/product.md` — not here.

## Implementation Phases

| Phase | Goal | Exit Criteria |
|---|---|---|
| **1: Foundation** | Tokens, fonts, theming axes in place | Lime accent + swatch switch + mode toggle work and persist; Space Mono loaded |
| **2: Landing** | One-page content renders from MDX | Hero/about/work/notes/contact render; old routes dropped; `/legal` intact |
| **3: Nav** | Palette navigation | Dock + `/`/`⌘K` palette jump to every section |
| **4: Effects (deferred)** | Enhancement motion | Effects toggle on without regressing core; reduced-motion respected |

---

## Non-Goals

- No CMS/admin UI — content stays in MDX files in the repo.
- No multi-page restructure beyond `/` and `/legal`.
- No per-project detail pages in v1 (old `/projects/[slug]` routes are dropped).
- No analytics/auth/i18n changes — out of scope for the redesign.

---

## Open Questions

1. **Notes source format** — new `content/notes/*.mdx` collection vs a single
   `notes.mdx` with a list. Recommendation: a `notes` collection, one file per
   idea, mirroring `projects`. Confirm in [features/neon-landing](features/neon-landing/product.md).
2. **Work list ordering** — chronological, curated rank, or grouped
   prof/side. Decision: single curated list, mixed. Tie-break rule TBD in feature.
