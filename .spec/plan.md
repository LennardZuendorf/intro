# zuendorf.me redesign: implementation plan

Branching: each milestone is one PR into `redesign`, with a Vercel preview per PR. Every PR leaves `pnpm lint && pnpm format:check && pnpm build` green. Production is cut by merging `redesign` → `main` at M7. Production currently shows a "coming soon" card, so an earlier cut after M4 is possible if wanted.
Per-milestone review covers the preview at 360 / 768 / 1280 in light and dark.

| M | Theme | Depends on |
|---|-------|-----------|
| M0 | Cleanup and foundation | – |
| M1 | Tokens, layout shell, nav, theme | M0 |
| M2 | Pixel-name hero | M1 |
| M3 | Home sections | M1 (M2 for the hero) |
| M4 | ⌘K command palette | M1, M3 (anchors) |
| M5 | Content pipeline and project subpages | M1, M3 (cards) |
| M6 | Polish, a11y, performance, SEO | M2–M5 |
| M7 | Content fill and launch | M6 + open content items |

---

## M0: Cleanup and foundation

**Do**
- Remove the dependencies listed in tech.md §2. Add the new ones. Upgrade next / react / tailwind-merge / lucide.
- Delete:
  - `components/ui/{accordion,badge,card,carousel,dropdown-menu,label,menubar,navigation-menu,pagination,popover,select,separator,skeleton,slider,tooltip,typography}.tsx`
  - `components/pages/`, `components/custom/`, `components/provider-theme.tsx`
  - `data/` (after copying needed links into `content/site.ts`)
  - `app/fonts.ts`, `app/twitter-image.tsx`
  - `public/fonts/`, `public/img/projects/`, `public/img/opengraph-image.png`
  - `.env` (Sanity leftovers), `jsconfig.json`, `vercel.json`
- Purge Contentlayer mentions (`.gitignore`, eslint ignores, README).
- `package.json`: set `prepare` to `husky`. `tsconfig` target `ES2022`. Add `.idea/` and `.fleet/` to `.gitignore` and untrack them.
- Re-init shadcn for TW v4 (`components.json`: style `new-york`, baseColor `neutral`, `tailwind.config: ""`). Regenerate `button`, `dialog`, `command`, `tabs`.
- Temporarily strip the legal page down to plain elements so the build passes without Card/typography.
- Rewrite the README (stack, scripts, `.spec/` pointer).

**Acceptance**
- [ ] `pnpm install --frozen-lockfile && pnpm build` passes. No references to removed packages (`grep` is clean for `react-icons|embla|contentlayer|sanity|title-case`).
- [ ] `/legal` renders (unstyled is fine). `/` renders a minimal placeholder.
- [ ] Vercel preview installs with pnpm.

## M1: Tokens, layout shell, nav, theme

**Do**
- `globals.css`:
  - Raw hex tokens for `:root` / `.dark` (design §1)
  - `@theme inline` mapping, `--radius: 0`, `--shadow-nb`
  - `@custom-variant dark`
  - `@utility` for `nb`, `nb-link`, `tag`, `tag-sm`, `chip`, `gfx`
  - Base link styles, `scroll-margin-top`, smooth scroll with a reduced-motion guard
  - Remove the old gradient/noise `body::before`/`::after`
- Fonts: `Geist` (400/500/600) and `JetBrains_Mono` (400/500) via `next/font/google` → `--font-sans` and `--font-mono`.
- `ThemeProvider` (light default, no system). `ThemeToggle` (single-click).
- Layout: skip link, `<header>` slot, `<main id="content">`, `Footer` (© / legal / ⌘K hint).
- `Nav` with home and project variants (search button wired to a no-op until M4). Local brand icons in `components/site/icons.tsx`.
- `StatusBar` (home only).

**Acceptance**
- [ ] Toggle switches the theme instantly. Light is the default on first visit, and the choice persists across reloads. No hydration warnings.
- [ ] Nav is sticky at top 16, centred, nb styled. Section links are hidden below 640. Hover and focus states match design §2.2.
- [ ] All colours come from tokens (`grep -E '#[0-9a-fA-F]{3,6}' components app` finds nothing outside `globals.css`/OG).
- [ ] Keyboard: Tab order is skip link → search → links → icons → toggle. A visible focus ring is on each.

## M2: Pixel-name hero

**Do**
- `components/pixel-name/{glyphs,layout}.ts` + `pixel-name.tsx` per tech.md §8: SVG, merged runs, ramp classes, double/single shadow groups, cursor.
- `home/hero.tsx`: kicker, h1 (sr-only name + aria-hidden SVG), lede.
- Optional: vitest unit tests for `layout.ts`.

**Acceptance**
- [ ] Visual match with `Hybrid.dc.html` at 1280 (double shadow, 6-step ramp, blinking cursor bottom-aligned after ZÜNDORF). Same cell size on both lines.
- [ ] At 360px there's no overflow, the cell is ≈ 5px and the shadow is a single line.
- [ ] Dark theme: the ramp and shadow follow tokens with no JS.
- [ ] Screen reader reads "Lennard Zündorf, heading level 1" once. The SVG is not announced.
- [ ] Reduced motion means the cursor doesn't blink. The SVG payload is ≤ 10 KB.

## M3: Home sections

**Do**
- `content/site.ts` with all copy from product.md §6. Placeholders stay as `[…]` strings.
- Components:
  - `Section`/`SectionLabel` (h2)
  - `BeliefList`
  - `PromptList`
  - `ProjectCard` (data from a temporary static array until M5 provides `getProjects()`)
  - `Chip`
  - `WorkList`
  - `ContactBox` + `CopyButton` + `LiveRegion`
- Compose `app/page.tsx` in order: status, hero, 01–06, footer. Update the JSON-LD Person.

**Acceptance**
- [ ] Section order, copy, spacing and borders match the mockup (80px section gap, 680 column).
- [ ] The project grid is 3 columns at ≥ 640 and 1 column at 360. Cards lift on hover and focus. Images or the gfx placeholder sit at 4:3.
- [ ] Copy button writes the email, shows "copied" for 1.6s and announces it once.
- [ ] Anchors `#about #now #building #side-quests #work #contact` land below the floating nav.
- [ ] Lighthouse a11y is 100 on the preview.

## M4: ⌘K command palette

**Do**
- `CommandMenuProvider` + global ⌘K/Ctrl+K listener in the root layout.
- Lazy `CommandDialog` restyled (design §2.3). Items per product.md §8. Actions per tech.md §7.
- Wire the nav search button, the project-variant ⌘K button and the footer hint. Add the platform-aware kbd label.

**Acceptance**
- [ ] ⌘K (macOS) and Ctrl+K (Win/Linux) open and close the palette on every page. Esc closes it and focus returns to the trigger.
- [ ] ↑↓ moves, ↵ runs, hover selects, and the selected item is inverted. Filtering matches label, group and hint. Empty state reads "No results."
- [ ] Navigate items smooth-scroll on home and route to `/#id` from subpages. Projects route to subpages. Copy email and toggle theme work, and both close the palette.
- [ ] cmdk is not in the initial JS chunk of `/` (check the build output / bundle analyzer).

## M5: Content pipeline and project subpages

**Do**
- `@next/mdx` setup, `mdx-components.tsx`, `lib/content/{schema,projects}.ts`, `content/projects/index.ts` (tech.md §4).
- `content/projects/indexed.mdx`, ported verbatim from `Project.dc.html`. `brain.mdx` and `vibe.mdx` start as skeletons with `<Placeholder>`.
- Project blocks:
  - `PathLine`, `FactsStrip`
  - `Why`, `How`, `Step`, `Command`
  - `Figure`, `FigurePair`
  - `Decisions`, `Decision`
  - `Learned`
  - `ProjectPager`
- `app/projects/[slug]/page.tsx` with `generateStaticParams`, `dynamicParams=false` and `generateMetadata`.
- Switch the home cards and palette to `getProjects()`. Add `published` fallback behaviour.
- `scripts/check-content.ts` + `pnpm check:content`, wired into CI and pre-push. Set `ALLOW_PLACEHOLDERS=1` on Vercel Preview env only.
- Redirects: `/projects → /#building`, `/about → /#about`.

**Acceptance**
- [ ] `/projects/indexed` matches `Project.dc.html` block for block: hero 16:9 at 1040, path, h1, tagline, facts 4 columns (2×2 on phone), 01–06 in order, figure pair 2 columns at 1040 (1 column on phone), pager "all projects" / "next → brain".
- [ ] Invalid `meta` (e.g. a missing `tagline`) fails `pnpm build` with a readable zod error.
- [ ] `/projects/unknown` returns 404. Unpublished projects have no route, and their card links to the source with "source ↗".
- [ ] Production build with a placeholder in a published project fails `check:content`. Preview builds pass.
- [ ] The project-variant nav marks the current project with `aria-current`.

## M6: Polish, a11y, performance, SEO

**Do**
- Dynamic OG images (root + per project, Node runtime, pixel-name SVG data URI). Rewrite `metadata` (title, description, keywords). `sitemap.ts`, `robots.ts`, `manifest.ts`, `viewport.themeColor` per tech.md §9.
- Restyle `/legal` (Tabs DE/EN, prose in tokens) and `not-found` ("404" tag + "~/nowhere" path line + link home, **assumption**).
- Reduced-motion audit. Focus-ring audit. Pass the design §8 checklist.
- Optional: `app/icon.tsx` pixel "L" favicon.
- Bundle check against tech.md §10.

**Acceptance**
- [ ] Lighthouse mobile on `/` and `/projects/indexed` meets Perf ≥ 95, A11y/BP/SEO = 100, in both themes. CLS ≤ 0.02.
- [ ] axe shows 0 violations on `/`, `/projects/indexed`, `/legal` and the 404 page.
- [ ] OG previews render correctly (check with opengraph.xyz or similar) for `/` and each published project.
- [ ] Sitemap lists only real routes. No `/about`. Redirects respond correctly.

## M7: Content fill and launch

**Do**
- Fill open content items C1–C9 (product.md §10) with Lennard. Confirm C10 (work history). Update the legal copy (C11).
- Add final images to `public/projects/<slug>/`.
- Set `published: true` for every project whose copy is complete (see Q4).
- Merge `redesign` → `main`. Verify the production deploy, redirects, analytics and Speed Insights.

**Acceptance**
- [ ] `pnpm check:content` passes without `ALLOW_PLACEHOLDERS`. No `[` placeholder text is visible anywhere in production.
- [ ] Lennard signs off on all copy. Every link in nav, palette, facts and footer resolves (no 404s, no `[link]`).
- [ ] Vercel Analytics records page views. Speed Insights reports from production.
- [ ] Old URLs `/about`, `/linkd`, `/github`, `/cv` behave as decided.

---

## Open questions

| # | Question | Default if unanswered |
|---|----------|-----------------------|
| Q1 | Should the site honour the OS dark-mode preference on the first visit, or always start light? | Always light (the decision as recorded) |
| Q2 | Should the status bar also appear on project pages? (The mockup shows it on home only.) | Home only |
| Q3 | `/cv` currently redirects to `/docs/cv.pdf`, which doesn't exist. Should it redirect to LinkedIn, or should a PDF be added? | Temporary redirect to LinkedIn |
| Q4 | Launch with all three subpages, or ship with only indexed published and brain/vibe cards linking to their source? | Wait for all three |
| Q5 | Do any old project URLs (e.g. `/tempus`) still get traffic and need redirects? | No redirects |
| Q6 | Is the existing legal page (Impressum + DE/EN privacy) still required as-is, with the address etc. current? | Keep it and update only the fonts/analytics sections |
