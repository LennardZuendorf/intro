
# Technical Plan: Single Project Page Redesign (Updated)

## Data Fetching Strategy (Basehub template-aligned)
- List slugs at build time with `basehub({ cache: 'no-store' })`
- In component and `generateMetadata`, use single-item filter with `_sys_slug` and `first: 1`
- Pump result destructuring:
```ts
{async ([{ sectionsAndPages: { projectsSection } }]) => {
  const project = projectsSection.items?.at(0)
}}
```
- Selection set in page:
```graphql
sectionsAndPages {
  projectsSection {
    items(
      filter: { _sys_slug: { eq: $slug } },
      first: 1
    ) {
      _id
      _title
      _slug
      shortDescription
      date
      meta { title, desc, img { url, width, height } }
      text { json { content, toc }, readingTime }
      technology { _id, _title, url, badgeUrl }
      githubLink
      showcaseLink
    }
  }
}
```
- `generateMetadata` minimal selection: `_title`, `shortDescription`, `meta { title, desc, img { url, width, height } }`

## Component Architecture (Server Components)
- File: `src/app/projects/[slug]/page.tsx`
- Section background='grid'
  - Header Card: NeoBadge label, `H1` title, `M` description
    - Stat chips: date, reading time, technology count
    - Actions: Back to Projects, external links if present
  - Left: Reading Card with `RichText` images mapped to `next/image`
  - Right: Sticky stack: Tech Stack, Table of Contents, Project Info (conditional)

## SEO
- Title: `meta.title ?? _title`
- Description: `meta.desc ?? shortDescription`
- OG/Twitter images from `meta.img`; twitter card `summary_large_image` when present

## Accessibility & Performance
- Typography-only chrome; alt texts; sticky sidebar lg+
- Server components only; no client state; optimized images

## Validation Plan
- Manual verify: header chips, RichText images, sidebar visibility/sticky
- Metadata verification via DevTools (OG/Twitter tag presence)
- Lighthouse a11y ≥ 90 