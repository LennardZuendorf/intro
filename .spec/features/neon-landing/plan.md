---
type: feature-plan
feature: neon-landing
sibling: tech.md
parent: ../../plan.md
updated: 2026-06-29
---

# Feature: neon-landing — Implementation Plan

Builds the one-page site on top of the foundation. Order: content plumbing
(notes collection + work merge) → section components → page composition + route
pruning. A closed box: when DONE, `/` renders the full v4 page from MDX and only
`/` + `/legal` exist.

**Parent:** [../../plan.md](../../plan.md)
**Requirements:** [product.md](product.md)
**Architecture:** [tech.md](tech.md)
**Design:** [design.md](design.md)

**Feature gate:** Starts when **neon-foundation** is `DONE` (root [plan.md](../../plan.md) Feature Sequence). Independent of neon-nav.

---

## Problem Frame

Sections need data before they can render, and the page needs sections before it
can compose. So: data layer first (notes collection, `getWorkItems`), then the six
section components, then `page.tsx` + route cleanup. Route pruning is last so the
work list (which absorbs the dropped routes' content) exists before the routes go.

---

## Requirements Trace

| ID | Requirement | Units |
|---|---|---|
| R1 | [One-page composition](product.md#requirement-one-page-composition) | neon-landing/3 |
| R2 | [Content-driven sections](product.md#requirement-content-driven-sections) | neon-landing/1, neon-landing/2 |
| R3 | [Merged work list](product.md#requirement-merged-work-list) | neon-landing/1, neon-landing/2 |
| R4 | [Notes scratchpad](product.md#requirement-notes-scratchpad) | neon-landing/1, neon-landing/2 |
| R5 | [Route pruning](product.md#requirement-route-pruning) | neon-landing/4 |

---

## Key Technical Decisions

1. **Merge in a lib helper, not the component.** `getWorkItems()` centralizes the
   projects+experience merge/sort so `work.tsx` stays a dumb renderer.
2. **Keep projects/experience collections; drop only their routes.** Content still
   feeds the work list.
3. **Server-component page.** All data fetched server-side; no client data fetch.

---

### neon-landing/1 — Content layer

**Goal:** `notes` collection + `notesSource` + `getWorkItems()` exist and return data; projects/experience schemas carry the fields the work list needs.

**Requirements:** R2, R3, R4

**Dependencies:** —

**Files:**

```
source.config.ts           # notes collection; + year+kind on projects, kind on experience; + facts on home
content/projects/*.mdx     # backfill year + kind (all 3 files)
content/experience/*.mdx   # backfill kind
content/experience/hypoport.mdx  # NEW role (named in copy, currently missing)
content/home/index.mdx     # add facts: string[]
src/lib/source.ts          # notesSource (loaders for projects/experience stay — shared with mdx-blocks)
src/lib/socials.ts         # backfill X / Bluesky / Email
src/lib/work.ts            # merge+sort -> WorkItem[]
content/notes/*.mdx        # seed notes
```

**Test scenarios:**

- `getWorkItems()` returns projects + experience (incl. Hypoport) merged, year-desc, numbered.
- Every work item has a non-empty `kind` and `year`.
- `notesSource` lists seeded notes; `socials` has all 5 contact entries.

**Verification:** `pnpm test` (work merge unit test); `pnpm build`.

---

### neon-landing/2 — Section components

**Goal:** Hero, about, work, notes, contact, footer render from props/sources.

**Requirements:** R2, R3, R4

**Dependencies:** neon-landing/1

**Files:**

```
src/components/sections/{hero,about,work,notes,contact}.tsx
src/components/sections/scroll-progress.tsx   # core page chrome
src/components/footer.tsx
```

**Test scenarios:**

- Work rows show n/title/kind/year; hover fills accent.
- Notes render as tagged cards; about preserves rich bio MDX with the leading `# I'm Lennard` h1 stripped/restyled.
- Fact chips render from `facts` frontmatter (not hardcoded).
- Scroll-progress bar tracks scroll; `data-reveal` sections fade in.

**Verification:** `pnpm test` (render tests for work/notes); manual visual check per [design.md](design.md).

---

### neon-landing/3 — Page composition

**Goal:** `/` composes all sections in order with stable ids.

**Requirements:** R1

**Dependencies:** neon-landing/2

**Files:**

```
src/app/page.tsx
```

**Test scenarios:**

- Sections render in order hero→about→work→notes→contact→footer.
- Each section has its id (`hero`/`about`/`work`/`notes`/`contact`).

**Verification:** `pnpm build`; manual scroll; ids present in DOM.

---

### neon-landing/4 — Route surface assertion

**Goal:** Confirm the route surface is exactly `/` and `/legal`. No code change expected — no `/projects`/`/experience` route trees exist, and the project/experience loaders stay (shared with `mdx-blocks.tsx`).

**Requirements:** R5

**Dependencies:** neon-landing/3

**Files:**

```
(none expected — assertion only; add a routing test if useful)
```

**Test scenarios:**

- Built route list is exactly `/` and `/legal/[lang]`.
- `/legal` still renders; project/experience content appears in the work list and in home MDX `<Project>`/`<Experience>` blocks (loaders intact).

**Verification:** `pnpm build`; enumerate routes; manual `/legal` + `<Project>` block check.

---

## Progress

| Unit | Status |
|---|---|
| neon-landing/1 | NOT STARTED |
| neon-landing/2 | NOT STARTED |
| neon-landing/3 | NOT STARTED |
| neon-landing/4 | NOT STARTED |
