---
type: feature-product
feature: neon-landing
sibling: tech.md
parent: ../../product.md
updated: 2026-06-29
---

# Feature: neon-landing — Product

The one-page site itself: a single scrollable `/` composed of hero, about, a
**merged** work list (professional roles + side projects interleaved), a notes
scratchpad, contact links, and footer — all rendered from Fumadocs MDX. Also
prunes the route tree to just `/` and `/legal`, and adds a `notes` content
collection.

**Parent:** [../../product.md](../../product.md)
**Architecture:** [tech.md](tech.md)
**Design:** [design.md](design.md)
**Plan:** [plan.md](plan.md)

---

## Scope

| | |
|---|---|
| **Owns** | `page.tsx` composition; `components/sections/*` (hero, about, work, notes, contact, footer); **core page chrome**: scroll-progress bar + `data-reveal` scroll-reveal; `content/notes/*` + `notes` collection + `notesSource`; schema/content backfill (projects `year`+`kind`, experience `kind`, Hypoport file, socials X/Bluesky/Email, `facts` on home); route-surface assertion. |
| **Does not own** | Tokens/fonts/theming (neon-foundation); dock + command palette (neon-nav); **enhancement** motion — dot-field/cursor/parallax/floaty (neon-effects); the `projectSource`/`experienceSource` loaders (kept, shared with mdx-blocks). |

---

## Requirements

### Requirement: One-page composition

The site SHALL present hero, about, work, notes, contact, and footer as sections
of a single scrollable `/` page, each with a stable section id for navigation.

#### Scenario: Scroll the page

- **Given** a visitor on `/`
- **When** they scroll top to bottom
- **Then** they pass hero → about → work → notes → contact → footer in order

### Requirement: Content-driven sections

Every section SHALL render from Fumadocs MDX sources; no project, role, note, or
bio is hardcoded in JSX.

#### Scenario: Add a project

- **Given** a new `content/projects/<slug>.mdx`
- **When** the site rebuilds
- **Then** the project appears in the work list without code changes

### Requirement: Merged work list

The work list SHALL interleave professional experience and side projects in one
ranked list, each row showing index, title, kind, and year.

#### Scenario: Mixed list

- **Given** experience entries and project entries
- **When** the work section renders
- **Then** both kinds appear in one list, visually distinguishable by their kind label

### Requirement: Notes scratchpad

The site SHALL render a notes section as a grid of idea cards from a `notes`
collection, each card showing a tag and short text.

#### Scenario: Notes render

- **Given** `content/notes/*.mdx` entries
- **When** the notes section renders
- **Then** each note shows as a tagged card in the grid

### Requirement: Route surface

The site MUST expose only `/` and `/legal`. The `projects` and `experience`
content collections MUST feed the work list rather than standalone routes.

#### Scenario: Route surface

- **Given** the built site
- **When** routes are enumerated
- **Then** only `/` and `/legal` resolve, and project/experience content appears in the `/` work list

---

## User Experience

```
[ hero ]      full-screen LENNARD ZÜNDORF, role badge, corner labels, scroll hint
[ about ]     // about — accent bar + big bio paragraph + fact chips
[ work ]      // selected work — ranked rows: 01 INDEXED · dev tool · 2024
                                              02 DIB TRAVEL · product · 2024 …
[ notes ]     // scratchpad — 3-col grid of tagged idea cards
[ contact ]   // elsewhere — GitHub / X / LinkedIn / Bluesky / Email rows
[ footer ]    © 2026 Lennard Zündorf
```

Real content: bio mentions Stockholm; projects = indexed, obsidian-task-ui,
shards-agent; experience = DIB Travel, Check24, Hypoport; links = real socials.

---

## Non-Goals

- No per-project detail pages (dropped with the old routes).
- No pagination/filtering on the work list — it's a short curated set.
- No dock/palette here (neon-nav owns navigation chrome).

---

## Open Questions

1. **Notes collection shape** — one `.mdx` per note (tag in frontmatter, text in
   body) mirroring `projects`. Recommendation: yes, `content/notes/<slug>.mdx`.
2. **Work list fields** — `projects` has no date/`kind` and `experience` has no
   `kind` today. Recommendation: backfill `year`+`kind` on projects and `kind` on
   experience (year from `startDate`). See [tech.md](tech.md).
3. **Work list ordering** — curated single list; tie-break by year desc then
   manual. Confirm the exact merge key.
4. **Contact links** — design shows 5 (GitHub/X/LinkedIn/Bluesky/Email) but
   `socials.ts` has only GitHub+LinkedIn. Recommendation: backfill the 3 missing
   (each needs an author-trusted icon SVG per the file's trust note), else amend
   the design to the real 2.
5. **Hypoport** — named in About/Work copy but only exists as a bio link, not an
   `experience` entry. Recommendation: add `content/experience/hypoport.mdx`, else
   drop it from work copy.
6. **Fact chips** — render from a new `facts: string[]` on `home/index.mdx`
   (keeps R2 content-driven), not hardcoded JSX.
