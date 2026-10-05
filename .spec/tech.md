# zuendorf.me redesign: tech spec

## 1. Current repo state (as found, 2026-10-05)

| Area | Found | Verdict |
|------|-------|---------|
| Framework | `next@16.0.10`, App Router, `turbopack: {}`, `react@19.0.0` | **Keep**. Bump to the latest 16.x patch and React 19.2.x |
| Package manager | `pnpm@10.24.0` (`packageManager`), `pnpm-lock.yaml` | Keep. **Fix** `vercel.json` (`installCommand: npm install` contradicts pnpm). Delete the file and let Vercel detect pnpm |
| Styling | Tailwind **v4** (`@tailwindcss/postcss`, CSS-first `@theme` in `app/globals.css`, no `tailwind.config`), `tailwindcss-animate`, `@tailwindcss/typography` | Keep TW v4. Replace `tailwindcss-animate` with `tw-animate-css`. Remove `@tailwindcss/typography` |
| shadcn | `components.json`: style `default` (deprecated), baseColor `stone`, HSL variables wrapped as `hsl(var(--x))`. 17 UI files, most unused | Re-init for TW v4 conventions (`new-york` style, `@theme inline`, raw colour values). Keep only `button`, `command`, `dialog`, `tabs` |
| Content | **No Contentlayer anymore** (not in deps or lockfile). The README and `.gitignore`/eslint ignores still mention it. The only content is TS objects in `data/` | Introduce an MDX pipeline (§4). Purge the Contentlayer leftovers |
| Theme | `next-themes@0.4`, `defaultTheme="system"`, 3-way dropdown toggle | Keep the library. Change to light default + a single-click toggle |
| Fonts | Lato (google), League Spartan + Roboto Mono (local TTF in `public/fonts`) | Replace with Geist + JetBrains Mono via `next/font/google` |
| Analytics | `@vercel/analytics` (imported from `/react`), `@vercel/speed-insights/next` | Keep. Switch the import to `@vercel/analytics/next` |
| SEO | `metadata` in layout, `opengraph-image.tsx` + `twitter-image.tsx` (edge, outdated "CHECK24" copy), static `public/img/opengraph-image.png` referenced in metadata, `sitemap.ts` (lists a non-existent `/about`), `robots.ts`, `manifest.ts`, JSON-LD Person on home | Keep the file conventions and rewrite the content (§8) |
| Pages | `/` ("coming soon" card), `/legal` (DE/EN imprint + privacy, 527 lines, uses Tabs/Card/typography), `not-found` | Rewrite home. Restyle legal and 404 |
| Icons | `react-icons` (Rx, Io5), `lucide-react@0.468` | Drop `react-icons`. Use local brand SVGs + lucide |
| Tooling | ESLint 9 flat (`next/core-web-vitals`, `next/typescript`, prettier), Prettier, Husky 9 (`prepare: husky install`, which is deprecated), lint-staged, GH Action (lint, format:check, build on Node 20/22/24) | Keep. Set `prepare` to `husky`. Add the content check to CI (§4.5) |
| Misc | `.env` committed with `NEXT_PUBLIC_SANITY_*` leftovers. `jsconfig.json` duplicates tsconfig paths. `tsconfig` target `es5`. `.idea/`, `.fleet/` committed | Delete `.env` + `jsconfig.json`. Set target `ES2022`. Add `.idea/`, `.fleet/` to `.gitignore` and untrack them (**assumption**: they are not needed) |

## 2. Dependencies

| Action | Packages |
|--------|----------|
| **Remove** | `@radix-ui/react-accordion`, `-dropdown-menu`, `-label`, `-menubar`, `-navigation-menu`, `-popover`, `-select`, `-separator`, `-slider`, `-tooltip`, `embla-carousel`, `embla-carousel-autoplay`, `embla-carousel-react`, `date-fns`, `react-icons`, `title-case`, `tailwindcss-animate`, `@tailwindcss/typography` |
| **Add** | `cmdk`, `@radix-ui/react-dialog` (or the `radix-ui` umbrella, whichever the shadcn CLI emits), `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `zod`, `tw-animate-css` |
| **Upgrade** | `next` + `eslint-config-next` to the latest 16.x. `react`/`react-dom` to the latest 19.2.x. `tailwind-merge` ^3 (TW v4 class support). `lucide-react` latest |
| **Keep** | `next-themes`, `clsx`, `class-variance-authority`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@vercel/analytics`, `@vercel/speed-insights`, tailwind/postcss, eslint/prettier/husky/lint-staged, typescript |

## 3. Routing

| Route | File | Rendering |
|-------|------|-----------|
| `/` | `app/page.tsx` | Static (RSC) |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | SSG: `generateStaticParams` from the registry, `dynamicParams = false` (unknown slug → 404) |
| `/legal` | `app/legal/page.tsx` | Static |
| 404 | `app/not-found.tsx` | Static |
| OG | `app/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx` | Build-time `ImageResponse` (Node runtime) |
| SEO files | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` | Static |

Redirects in `next.config.mjs`:
- Keep `/linkedin`, `/linkd`, `/github`.
- Add `/about → /#about` (permanent) and `/projects → /#building` (temporary).
- For `/cv`, see open question Q3. Default proposal: temporary redirect to LinkedIn.

## 4. Content pipeline

### 4.1 Options evaluated

| Option | Status | Fit for 3 projects + 1 home page | Verdict |
|--------|--------|----------------------------------|---------|
| Contentlayer | Unmaintained, and already removed from this repo | – | ✗ |
| content-collections | Maintained successor to Contentlayer. Zod schemas, typed collections, MDX package | Good DX, but it adds a codegen step + Next plugin. Turbopack compatibility needs verifying per release | Fallback if the content grows (more than ~10 entries, or listings/feeds) |
| Velite | Maintained, schema + codegen | Same trade-off as content-collections, and a smaller ecosystem | ✗ |
| `next-mdx-remote` (RSC) | Runtime MDX compile from strings | Needs fs reads + a compile step at build, and has no advantage for local files | ✗ |
| **`@next/mdx` + typed registry** | First-party and Turbopack-native. No codegen | MDX compiles as modules. `meta` is a JS export validated by zod at build. Pages use static imports | **✓ Recommended** |

### 4.2 Decision: `@next/mdx` + registry + zod
- `next.config.mjs`: `withMDX = createMDX({ extension: /\.mdx$/ })`. No remark/rehype plugins are needed initially. If one is needed later, pass it by **string name** (Turbopack requires serialisable options).
- `mdx-components.tsx` at the repo root, as required by `@next/mdx` in the App Router. It maps `p`, `a`, `em`, `code` and similar elements to styled elements, plus the custom blocks (§5.3).
- MDX lives in `content/projects/<slug>.mdx` and is imported as a module, **not** routed as a page. `pageExtensions` stays the default.
- Each MDX file exports `meta`:

```mdx
export const meta = {
  slug: 'indexed', order: 1, name: 'indexed', status: 'active', started: '[YYYY]',
  oneLiner: 'Local-first search over your code, docs and tickets. Speaks MCP.',
  tagline: 'One local knowledge base per project. Code, docs, issues, wikis — one MCP, zero cloud.',
  site: { label: 'indexed.sh', href: 'https://indexed.sh' },
  source: { label: 'GitHub', href: 'https://github.com/LennardZuendorf/indexed' },
  cardImage: '/projects/indexed/card.png',
  hero: { src: '/projects/indexed/hero.png', alt: '…', caption: '…' },
  stack: ['Python','LlamaIndex','FAISS','ONNX Runtime','tree-sitter','Docling','MCP'],
  where: ['Migrating to LlamaIndex v2','Reshaping the docs into Guide + Reference','Next: graph-aware retrieval across sources'],
  published: true,
}

<Why>…</Why>
<How>
  <Step label="01 connect" title="Bring every source in.">…</Step>
  …
  <Command lines={['uv tool install indexed-sh', '…']} />
</How>
<FigurePair>
  <Figure n={2} src="…" alt="…" caption="…" />
  <Figure n={3} … />
</FigurePair>
<Decisions>
  <Decision title="Vector search first, graph second.">…</Decision>
</Decisions>
<Learned>…</Learned>
```

### 4.3 Schema (`lib/content/schema.ts`)

```ts
const Link = z.object({ label: z.string(), href: z.string().url() });
const Img  = z.object({ src: z.string().startsWith('/'), alt: z.string(), caption: z.string().optional() });
export const ProjectMeta = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/), order: z.number().int(),
  name: z.string(), status: z.enum(['active', 'paused', 'archived']),
  started: z.string(), oneLiner: z.string().max(90), tagline: z.string(),
  site: Link.optional(), source: Link.optional(),
  cardImage: z.string().optional(), hero: Img.partial({ src: true }),
  stack: z.array(z.string()).min(1), where: z.array(z.string()).min(1),
  published: z.boolean().default(true),
});
```

### 4.4 Registry (`content/projects/index.ts`)
- Static imports: `import * as indexed from './indexed.mdx'` (and the same for brain and vibe). Explicit imports are bundler-safe and avoid template-literal dynamic imports.
- `lib/content/projects.ts` exposes `getProjects()` (parsed, sorted by `order`), `getProject(slug)` and `getNeighbors(slug)` (next wraps around).
- Zod parse failure → **build fails**.
- `published: false` → the project is excluded from `generateStaticParams`, the sitemap and palette subpage links. Its home card falls back to linking `source.href` with the CTA "source ↗". This lets launch happen before brain/vibe copy is ready, if Lennard chooses that (Q4).

### 4.5 Placeholders
- In MDX: `<Placeholder>…</Placeholder>`. In TS content: strings starting with `[`.
- Dev renders placeholders muted, in brackets, as in the mockups.
- `scripts/check-content.ts` (run via `pnpm check:content`, wired into CI and `pre-push`) fails if any placeholder is found in a published project or in `content/site.ts`, unless `ALLOW_PLACEHOLDERS=1` (used for Vercel preview builds).
- A missing image is **not** a placeholder error. The `gfx` dot pattern is an acceptable final fallback, rendered without its bracket label in production.

### 4.6 Home content
- `content/site.ts` holds typed objects: `site` (url, title, description, links, email), `status`, `hero`, `about`, `beliefs`, `now`, `sideQuests`, `work`, `contact`.
- It replaces `data/site.ts` and `data/about.ts`. The old `data/about.ts` work history stays in git history only (product.md C10).

### 4.7 Assets
- `public/projects/<slug>/{card,hero,fig-2,fig-3}.{png,webp}`, referenced by path.
- Rendered with `next/image` `fill` inside fixed-aspect frames, with `sizes` set (card `(min-width:640px) 213px, 100vw`, hero `(min-width:1080px) 1040px, 100vw`, figure `(min-width:1080px) 508px, 100vw`). The hero gets `priority`.

## 5. Component architecture

```
app/
  layout.tsx                 fonts, <ThemeProvider>, <CommandMenuProvider>, skip link, <Analytics/>, <SpeedInsights/>
  page.tsx                   home: composes sections from content/site.ts + getProjects()
  projects/[slug]/page.tsx   template (§5.3), generateStaticParams, generateMetadata
  projects/[slug]/opengraph-image.tsx
  legal/page.tsx             restyled (Tabs DE/EN kept; Card/typography removed)
  not-found.tsx, opengraph-image.tsx, sitemap.ts, robots.ts, manifest.ts, globals.css
content/
  site.ts
  projects/index.ts, indexed.mdx, brain.mdx, vibe.mdx
mdx-components.tsx
components/
  site/  status-bar.tsx  nav.tsx  nav-search-button.tsx (client)  theme-toggle.tsx (client)
         theme-provider.tsx (client)  command-menu.tsx (client)  footer.tsx  icons.tsx  skip-link.tsx
         kbd-hint.tsx (client, ⌘ vs Ctrl)  live-region.tsx (client)
  pixel-name/  glyphs.ts  layout.ts (pure)  pixel-name.tsx (RSC, inline SVG)
  home/  hero.tsx  section.tsx (Section + SectionLabel)  belief-list.tsx  prompt-list.tsx
         project-card.tsx  chip.tsx  work-list.tsx  contact-box.tsx  copy-button.tsx (client)
  project/ path-line.tsx  facts-strip.tsx  blocks.tsx (Why/How/Step/Command/Decisions/Decision/Learned)
           figure.tsx (Figure, FigurePair, GfxPlaceholder)  project-pager.tsx  placeholder.tsx
  ui/    button.tsx  command.tsx  dialog.tsx  tabs.tsx     (shadcn, restyled via tokens)
lib/
  utils.ts (cn)  content/schema.ts  content/projects.ts  platform.ts (isApple)
scripts/
  check-content.ts
```

### 5.1 Server vs client
- Everything is an RSC except: theme provider and toggle, command menu (+ provider, global key listener), nav search button, kbd hint, copy button and live region.
- The pixel name is rendered on the server with no JS.

### 5.2 Shared primitives (CSS utilities in `globals.css`, `@utility`)
- `nb`: 2px fg border, card background, `shadow-nb`.
- `nb-link`: `nb` plus the hover/focus lift (§design 4).
- `tag`, `tag-sm`, `chip`, `gfx`.
- Expose `--shadow-nb` in `@theme` so `shadow-nb` becomes a class.

### 5.3 Project page template (`app/projects/[slug]/page.tsx`)

```
<Nav variant="project" current={slug}/>
<article className="mx-auto max-w-[1040px] flex flex-col gap-16">
  <Figure ratio="16/9" n={1} {...meta.hero} priority/>
  <header class=max-w-[680px]> <PathLine/> <h1/> <p tagline/> <FactsStrip/> </header>
  <Body components={mdxBlocks}/>          // Why(01) How(02) FigurePair Decisions(03) Learned(04)
  <Section i="05" label="built with"><Chip…/></Section>
  <Section i="06" label="where it is"><PromptList/></Section>
  <ProjectPager prev="all projects" next={neighbors.next}/>
</article>
```

- The block components hard-code their index and label, which enforces the fixed numbering.
- Text blocks constrain themselves to 680px. `Figure` and `FigurePair` span 1040px.

## 6. Theming
- `next-themes`: `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange`. **Assumption:** this follows "light default + toggle". See Q1 on honouring the system preference.
- Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));`. `:root` and `.dark` hold the raw hex tokens (design §1). `@theme inline { --color-background: var(--background); … --radius: 0; --shadow-nb: var(--shadow-offset) var(--shadow-offset) 0 var(--foreground); }`.
- The toggle flips with `setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')`. Any theme-dependent label renders after mount to avoid hydration mismatch.
- `viewport.themeColor` uses media pairs with `#F4F4F2` / `#0A0A0A`. `manifest.ts` uses `#F4F4F2`.
- Links: external links open in the **same tab** everywhere, including the palette (**assumption**, for calm and consistency; the mockup palette used `window.open`).

## 7. ⌘K implementation
- `CommandMenuProvider` (client, in the root layout) holds `open` state and exposes `useCommandMenu()` → `{ open, setOpen, toggle }`.
- Global listener: `keydown` on `document`, where `(e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)` → `preventDefault()`, then `toggle()`. Esc and focus return are handled by Radix Dialog.
- UI: shadcn `CommandDialog` (Radix Dialog + cmdk), restyled per design §2.3.
  - Items are built from `content/site.ts` + `getProjects()`. The project list is passed from the RSC layout as serialisable props.
  - `value` = `label + group + hint` for filtering. Selected styling uses `data-[selected=true]`.
- Actions:
  - `navigate(id)`: if `pathname === '/'`, run `scrollIntoView({behavior: reduced ? 'auto' : 'smooth'})` + `history.replaceState(null,'','#'+id)`. Otherwise run `router.push('/#'+id)`.
  - Project → `router.push('/projects/'+slug)`.
  - External → `window.location.assign(url)`.
  - Copy email → `navigator.clipboard.writeText`, then announce via the live region. If the clipboard is unavailable, fall back to `mailto:`.
  - Toggle theme.
  - Every action closes the dialog first.
- Bundle: the key listener and provider load eagerly (tiny). Load `CommandDialog` through `next/dynamic({ ssr:false })` on first open, and prefetch it on SearchButton hover/focus.
- Kbd label: `isApple()` (`navigator.userAgentData?.platform ?? navigator.platform` matching `/mac|iphone|ipad/i`) after mount. SSR shows `⌘K`.

## 8. Pixel-name renderer
- `layout.ts` (pure, unit-testable) has `layoutWord(word, glyphs)`, which returns `{ cols, rows, on: Cell[] with rampStep, shadowEdges: Segment[] }`.
  - Glyphs are placed with a 1-column gap and bottom-aligned to the tallest glyph `H`.
  - Ramp step = `round(r/(H-1)*6)`.
  - Shadow cell = off ∧ on(r-1,c-1). For each shadow cell, emit the edges whose neighbour (top/bottom/left/right) is not a shadow cell. These match the mockup's `bt/bb/bl/br`.
- `PixelName` (RSC) renders **one inline `<svg>` per line**, with `viewBox="0 0 {cols+1+gap+cursor} {rows+1}"`, `width="100%"` and `shape-rendering="crispEdges"`.
  - On cells: `<rect>`s merged into horizontal runs per row and per ramp step, roughly 60 rects per line. Fill comes from classes `.r0–.r6` (`color-mix` in CSS, so it follows the theme with no JS).
  - Shadow, two `<g>` groups:
    - `.sh-double`: each edge is drawn as 2 lines, at the cell edge and inset by 2/11 of a cell.
    - `.sh-single`: 1 line.
    - Both use `stroke-width` in non-scaling px (`vector-effect="non-scaling-stroke"`, 1px).
    - CSS shows `.sh-double` at ≥ sm and `.sh-single` below.
  - Cursor: `<rect class="cursor">` on the last line only. CSS animation applies, disabled under reduced motion.
- Both SVGs sit in a flex column with gap = 1 cell. They are sized so the cell size is equal across lines: each SVG gets `width: calc(var(--cell) * cols)`, with `--cell: min(11px, (100cqi) / 62)` and `container-type: inline-size` on the h1 wrapper (**assumption**). The alternative is setting the line-2 width to `57/59` of line 1.
- Wrapped in `<h1><span class="sr-only">Lennard Zündorf</span><span aria-hidden>…svgs…</span></h1>`.
- Why SVG over the mockup's CSS grid: the grid approach is about 840 empty `<span>`s, while the SVG is about 150 elements (well under 10 KB). It scales cleanly, and the same `layout.ts` feeds the OG image.
- OG reuse: `renderPixelSvgString(word)` → `data:image/svg+xml` `<img>` inside `ImageResponse` (Satori doesn't support CSS grid). It uses resolved hex colours (light theme) instead of `color-mix`.

## 9. SEO, metadata, OG
- `metadataBase` `https://zuendorf.me`, title template `%s · zuendorf.me`, and default title "Lennard Zündorf".
- Description: derive from the hero lede (**assumption**).
- Remove the stale keywords (Berlin, CHECK24, "Software Engineer").
- Per project: `generateMetadata` → `title: meta.name`, `description: meta.tagline`, canonical `/projects/<slug>`.
- OG: dynamic `opengraph-image.tsx` (root + per project), on the **Node runtime** (drop `edge`) so it can `readFile` the JetBrains Mono/Geist TTFs from `node_modules` or `assets/fonts` (**assumption**: Satori needs TTF/OTF, not woff2).
  - Delete `twitter-image.tsx` and `public/img/opengraph-image.png`. X falls back to `og:image`, with `twitter.card = summary_large_image` kept.
- JSON-LD `Person` on home: name, url, `jobTitle: "Product Manager"`, `worksFor: DIB Travel`, `sameAs: [LinkedIn, GitHub]`. Drop `image` (no photo).
- Per project, add `SoftwareSourceCode` JSON-LD with `codeRepository` = `source.href` (optional).
- `sitemap.ts`: `/`, published `/projects/*`, `/legal`. Drop `/about`. `lastModified` comes from the build time.
- `robots.ts`: drop the pointless `/_next/` and `/public/` disallows. Keep `/api/`.
- Icons: keep `app/favicon.ico` + `/img/logo.png` until a pixel "LZ" icon exists. That is optional in M6 (`app/icon.tsx` rendering an "L" glyph from `GLYPHS`).

## 10. Performance budget

| Metric | Budget (mobile, Lighthouse, prod) |
|--------|-----------------------------------|
| Lighthouse Performance / A11y / Best Practices / SEO | ≥ 95 / 100 / 100 / 100 |
| LCP | ≤ 1.8 s (the home LCP is the lede text or the pixel SVG, with no image) |
| CLS | ≤ 0.02 (fonts via `next/font` with fallback metrics, fixed aspect frames) |
| INP | ≤ 100 ms |
| First-load JS, `/` | ≤ 110 KB gz. cmdk/dialog are lazy and not counted until first open |
| Fonts | 2 families, latin subset, at most 5 weight files total, `display: swap` |
| Pixel name SVG (both lines) | ≤ 10 KB inline |
| Images | AVIF/WebP via `next/image`, with no image above the fold on home |

## 11. Analytics
- Keep `<Analytics/>` (import from `@vercel/analytics/next`) and `<SpeedInsights/>`.
- No custom events in v1. Optional later: `track('cmdk_open')` and `track('copy_email')`.
- No cookies, so no banner needed. The privacy text must mention Vercel Web Analytics / Speed Insights (product.md C11).

## 12. Quality gates
- CI (existing workflow): `pnpm lint`, `pnpm format:check`, `pnpm check:content`, `pnpm build`.
- Optional: `vitest` unit tests for `pixel-name/layout.ts`. These assert line widths 59/57, H 5/7, and the shadow rule on a known cell.
- Manual per milestone: axe DevTools + Lighthouse on the preview URL, in both themes, at 360 / 768 / 1280.

## 13. Assumptions (explicit; open questions Q1–Q6 live in plan.md)
1. Light theme is forced by default, and the system preference is ignored (Q1).
2. Breakpoint is 640 instead of 620.
3. External links open in the same tab.
4. The contact address is also a `mailto:` link.
5. `#side-quests` anchor id added.
6. A `legal` link is added to the footer.
7. Project H1 is clamped on mobile.
8. Palette open has a subtle animation.
9. The kbd hint is hidden on coarse pointers.
10. `.idea/` and `.fleet/` get untracked.
11. Card press state is shadow 2.
