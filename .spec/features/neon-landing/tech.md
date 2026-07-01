---
type: feature-tech
feature: neon-landing
sibling: product.md
parent: ../../tech.md
updated: 2026-06-29
---

# Feature: neon-landing — Architecture

Rewrites `page.tsx` as a server component composing six section components, each
fed by a Fumadocs `loader` source. Adds a `notes` collection, merges
`projects` + `experience` into one work list, and removes the `/projects` and
`/experience` route trees.

**Parent:** [../../tech.md](../../tech.md)
**Requirements:** [product.md](product.md)
**Design:** [design.md](design.md)
**Plan:** [plan.md](plan.md)

---

## Files

```
source.config.ts                         # ADD `notes` collection; ADD `year`+`kind` to projects, `kind` to experience  ~edit
content/projects/*.mdx                    # backfill `year` + `kind` frontmatter (all 3 files)  ~content
content/experience/*.mdx                  # backfill `kind` frontmatter (year from startDate)   ~content
content/experience/hypoport.mdx           # NEW — Hypoport role (named in product copy, missing) ~content
src/lib/source.ts                        # ADD notesSource (import notes from @/.source)        ~edit
src/lib/socials.ts                       # backfill X / Bluesky / Email (only GitHub+LinkedIn today) ~content
src/lib/work.ts                          # NEW merge+sort projects+experience -> WorkItem  ~50 LOC
content/notes/*.mdx                       # NEW idea cards (one per note)                   ~content
src/app/page.tsx                         # REWRITE one-page composition (also mounts neon-nav Dock) ~edit
src/components/sections/hero.tsx          # NEW (exposes optional backdrop slot for neon-effects) ~50 LOC
src/components/sections/about.tsx         # NEW (renders home/index bio MDX in accent bar; strip leading h1) ~40 LOC
src/components/sections/work.tsx          # NEW work list from WorkItem[]                   ~60 LOC
src/components/sections/notes.tsx         # NEW notes grid (cards accept `floaty` flag for neon-effects) ~40 LOC
src/components/sections/contact.tsx       # NEW links from socials                          ~40 LOC
src/components/sections/scroll-progress.tsx # NEW top progress bar (page chrome)            ~25 LOC
src/components/footer.tsx                 # EDIT to v4 footer                               ~edit
```

**Loaders stay.** `projectSource` and `experienceSource` are NOT removed — they are
live dependencies: `work.ts` reads them, and `src/components/shared/richtext/mdx-blocks.tsx`
calls `.getPage()` on both for the `<Project>` / `<Experience>` MDX components used
in `content/home/projects.mdx` and the bio. `loader()` also requires a `baseUrl`,
so it cannot be "removed." There are **no** `src/app/projects/` or `/experience`
route trees to delete (only `/` and `/legal/[lang]` exist), so route surface is
already `/` + `/legal` — the "cleanup" is a verification step, not a code change.

---

## Contract / API

```typescript
// src/lib/work.ts
type WorkKind = "project" | "experience";
interface WorkItem {
  n: string;        // "01", "02" — assigned after sort
  title: string;    // _title
  kind: string;     // human label: e.g. "dev tool" / "product"
  year: string;     // derived: project year | experience startDate year | "ongoing"
  href?: string;    // optional external/anchor link
  source: WorkKind;
}
function getWorkItems(): WorkItem[]; // merge projects+experience, sort year desc, number

// source.config.ts — schema additions (current schemas lack these)
// projects:   + year: string|number   + kind: string   (e.g. "dev tool")
// experience: + kind: string          (year derived from existing startDate)
// notes (new): { _title: string; tag: string; text?: string } // text may be MDX body
```

Section ids (consumed by neon-nav): `hero`, `about`, `work`, `notes`, `contact`.

---

## Implementation Detail

`page.tsx` stays a Server Component: it calls `homeSource`, `getWorkItems()`,
`notesSource`, and `socials`, then renders the section components, passing data as
props. MDX bodies (bio, notes) render via `getMDXComponents()` as today.

Work merge (`src/lib/work.ts`): read `projectSource` + `experienceSource` pages,
map each to `WorkItem` (project → `{kind, year}` from the new frontmatter fields;
experience → `{kind, year: startDate's year}`), concat, sort by year desc with a
manual curated tiebreak, then assign zero-padded `n`. This requires the schema
backfill above — today neither collection has `kind`, and `projects` has no date.

Route handling: no `/projects` or `/experience` routes exist (verified: only `/`
and `/legal/[lang]` are in `src/app`), so nothing is deleted and no source export
is removed. Route surface is already `/` + `/legal`; unit 4 just asserts it. Note:
`legal/[lang]/page.tsx` `generateStaticParams` still emits `de`, but `content/legal/de.mdx`
is deleted on this branch — pre-existing, flag for the legal owner, out of scope here.

About section: `home/index.mdx` body opens with `# I'm Lennard` (an h1). The about
renderer must strip/restyle that leading h1 so it doesn't compete with the hero
name, while keeping the rich `HoverLink`/inline-link MDX (rendered via
`getMDXComponents()` as `page.tsx` already does today).

Fact chips (about): need a data source to satisfy R2 (content-driven). Add a
`facts: string[]` frontmatter field on `home/index.mdx`; do not hardcode in JSX.

Scroll-progress bar + scroll-reveal are **page chrome owned here** (see design.md
motion "core" tier): a `scroll-progress.tsx` island and a `data-reveal`
IntersectionObserver utility. These are core motion (always on), distinct from
neon-effects' deferred enhancement motion.

Reuse: RetroUI `Card` for note cards and work rows where it fits; existing
`Section`/typography components for structure; `--shadow-*` for elevation. No new
shadow/border CSS.

## Open Questions

1. **Experience link target** — experience rows have `companyLink`; project rows
   may have repo/demo. Decide row click behavior (external vs none) in design.md.
2. **Notes body vs frontmatter** — short notes fit in a `text` frontmatter field;
   longer ones want MDX body. Recommendation: support both, prefer body when present.
