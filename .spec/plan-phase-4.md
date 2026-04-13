# Phase 4 Plan: Projects — Content + Pages

## Context

Phases 0–2 are shipped: Fumadocs + RetroUI + legal page MDX pipeline all working, monochrome theme dialed in. Phase 3 (home page) and nav are deferred. The biggest remaining feature gap is the **projects showcase** — the core of a personal portfolio site.

We have six project thumbnails already in `public/img/projects/`: **habitus, legalis, quaestio, tempus, thesis, twinkles**. The old CMS-driven project data was deleted with `data/about.ts`. `siteConfig.focusProjects` still references `tempus / thesis / quaestio` as the top three (`data/site.ts:18-22`). The `/projects` nav link exists in `siteConfig.navItems` but has no target page yet, and `components/nav.tsx` returns `null`.

This phase proves the MDX pipeline scales to a second content type and lights up the portfolio's main asset.

## Approach

### 1. Content Collection

Extend `source.config.ts` with a `projects` collection sitting next to `legal`:

```ts
export const projects = defineCollections({
  type: 'doc',
  dir: './content/projects',
  schema: z.object({
    title: z.string(),
    summary: z.string(),          // one-line tagline for cards
    year: z.number(),
    category: z.enum(['personal', 'client', 'university', 'thesis']),
    role: z.string(),              // 'Fullstack', 'Product + Design', etc.
    thumbnail: z.string(),         // /img/projects/<slug>-thumbnail.png
    tech: z.array(z.string()),     // ['TypeScript', 'Next.js', ...]
    featured: z.boolean().default(false),
    github: z.string().url().optional(),
    live: z.string().url().optional()
  })
});
```

Re-export via `lib/source.ts` alongside `legal`.

### 2. Content Files

Scaffold six MDX files in `content/projects/` using existing `siteConfig.focusProjects` to prioritize `tempus`, `thesis`, `quaestio` as `featured: true`. Each file has frontmatter + a short body section (problem → approach → outcome). Where actual content is unknown, use a clear placeholder so the user can fill in later.

| Slug | Featured | Category hint | Thumbnail |
|------|----------|---------------|-----------|
| `tempus` | ✓ | personal | `tempus-thumbnail.png` |
| `thesis` | ✓ | thesis | `thesis-thumbnail.png` |
| `quaestio` | ✓ | personal / university | `quaestio-thumbnail.png` (has showcase images too) |
| `twinkles` | — | personal | `twinkles-thumbnail.png` (+ 3 showcase images) |
| `legalis` | — | personal | `legalis-thumbnail.png` |
| `habitus` | — | personal | `habitus-thumbnail.png` |

### 3. Routes

```
app/projects/
  layout.tsx          # consistent padding like legal/layout.tsx
  page.tsx            # listing grid (SSG)
  [slug]/
    page.tsx          # detail page, generateStaticParams + generateMetadata
```

**Listing page** (`app/projects/page.tsx`):
- Sort: `featured` first, then `year` desc.
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Each cell = `<ProjectCard>` (new component).
- Header row mirrors legal: `Text as="h4">Projects</Text>` + `Back to Main` button.

**Detail page** (`app/projects/[slug]/page.tsx`):
- `generateStaticParams` returns `projects.map(p => ({ slug: p.info.path.replace('.mdx','') }))`.
- `generateMetadata` pulls frontmatter for title/description/OG.
- Layout: back button → large thumbnail → title (Text as="h1") → summary → tech Badges → GitHub/Live Buttons → MDX body rendered with prose classes (same pattern as legal).

### 4. Reusable Component

`components/custom/project-card.tsx` — thin wrapper around RetroUI `Card`:

```tsx
<Link href={`/projects/${slug}`}>
  <Card className="flex flex-col h-full cursor-pointer">
    <Image src={thumbnail} ... className="aspect-video object-cover rounded-t" />
    <Card.Content className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <Text as="h4">{title}</Text>
        {featured && <Badge variant="solid" size="sm">Featured</Badge>}
      </div>
      <p className="text-sm text-muted-foreground">{summary}</p>
      <div className="flex flex-wrap gap-1">
        {tech.slice(0, 4).map(t => <Badge key={t} size="sm">{t}</Badge>)}
      </div>
    </Card.Content>
  </Card>
</Link>
```

Uses: RetroUI `Card`, `Badge`, `Text`; `next/image` for optimized thumbnails; `next/link`.

### 5. Sitemap + SEO

Update `app/sitemap.ts` to loop project slugs:
```ts
const projectRoutes = projects.map(p => `/projects/${p.info.path.replace('.mdx','')}`);
```
Add per-project `generateMetadata` with OG image, title template, description.

## Critical Files

| Action | Path |
|--------|------|
| MODIFY | `source.config.ts` — add `projects` collection |
| MODIFY | `lib/source.ts` — re-export `projects` |
| CREATE | `content/projects/{tempus,thesis,quaestio,twinkles,legalis,habitus}.mdx` (6 files) |
| CREATE | `app/projects/layout.tsx` |
| CREATE | `app/projects/page.tsx` — listing grid |
| CREATE | `app/projects/[slug]/page.tsx` — detail page |
| CREATE | `components/custom/project-card.tsx` |
| MODIFY | `app/sitemap.ts` — include project routes |

## Reused Patterns

- Fumadocs collection pattern from `source.config.ts:4-12` (legal) — replicate structure for projects.
- MDX rendering pattern from `app/legal/page.tsx:32-34` — `page.body` is a `MDXContent` component, render `<Body />`.
- Page padding pattern from `app/legal/page.tsx:37` — `px-4 sm:px-6 md:px-8 py-4 md:py-6 lg:py-8`.
- Tech chips: RetroUI `Badge` — variants available: `default`, `outline`, `solid`, `surface`.
- Card sub-components already export properly per `components/retroui/Card.tsx:59-66`.

## Open Questions (ask user before writing content)

1. **Project content** — scaffold MDX bodies as placeholder stubs (`TODO: fill in`) or do you want to provide source content now?
2. **Featured on home page** — should `featured: true` projects also appear as a preview section on `/`, or stay `/projects`-only for this phase?
3. **Tech stack per project** — scaffold with educated guesses (e.g., `tempus` = TS/React/Next, `thesis` = LaTeX/academic) or leave `tech: []` for you to fill?

## Verification

1. `pnpm lint && npx tsc --noEmit` — zero errors.
2. `pnpm dev` — `.source/` regenerates with both `legal` and `projects` collections; no schema errors.
3. Visit `/projects`: 6 cards in a responsive grid, featured ones bubble to top.
4. Visit `/projects/tempus`: thumbnail + title + tech chips + MDX body render; GitHub/Live buttons appear if URL provided; back button works.
5. `curl localhost:3000/sitemap.xml` — contains all 6 project routes + existing `/` and `/legal`.
6. Lighthouse/browser: no console errors, images lazy-load, layout shifts negligible.

## Out of Scope (future phases)

- Navigation shell (Phase 1.3 — deferred)
- Home page featured-projects section (optional Phase 3 addition)
- Category/tag filtering UI
- MDX custom components (e.g., embedded code blocks, image galleries) — add later if content needs them
- About / experience page (Phase 5)
