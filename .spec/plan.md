# Implementation Plan: intro-zuendorf.me Rebuild

## Phase 0: Project Setup & Dependencies

### Step 0.1: Clean Up Legacy Dependencies

- Remove unused Radix UI packages (accordion, dropdown-menu, label, menubar, navigation-menu, popover, select, separator, slider, tabs, tooltip) -- these will be replaced by RetroUI equivalents as needed.
- Remove `embla-carousel`, `embla-carousel-autoplay`, `embla-carousel-react` (not needed initially).
- Remove `tailwindcss-animate` if RetroUI handles its own animations.
- Keep: `next`, `react`, `react-dom`, `next-themes`, `lucide-react`, `react-icons`, `class-variance-authority`, `clsx`, `tailwind-merge`, `@vercel/analytics`, `@vercel/speed-insights`, `title-case`, `date-fns`.

### Step 0.2: Install New Dependencies

```bash
pnpm add fumadocs-mdx fumadocs-core @types/mdx zod
```

### Step 0.3: Install RetroUI Components

```bash
npx shadcn add @retroui/button
npx shadcn add @retroui/badge
npx shadcn add @retroui/card
npx shadcn add @retroui/accordion
npx shadcn add @retroui/input
```

Install components one at a time. Each replaces the corresponding file in `components/ui/`. May need to update `components.json` for RetroUI registry if it differs from default shadcn.

### Step 0.4: Configure Fumadocs

1. Create `source.config.ts` at project root with `defineCollections` for `legal` collection (start minimal).
2. Wrap `next.config.mjs` with `createMDX()` from `fumadocs-mdx/next`.
3. Add `"collections/*": ["./.source/*"]` path to `tsconfig.json`.
4. Create `lib/source.ts` with loader for legal collection.
5. Add `.source/` to `.gitignore`.
6. Run `pnpm dev` to verify Fumadocs generates `.source/` correctly.

**Checkpoint:** Project builds and dev server starts with Fumadocs + RetroUI installed.

---

## Phase 1: Foundation -- Theme & Layout

### Step 1.1: globals.css Overhaul

- Replace current shadcn CSS variables with neo-brutalist monochrome palette.
- Add RetroUI rounded theme overrides (user will provide CSS).
- Set `--border` to pure black in both light and dark modes.
- Add background texture (subtle noise SVG + radial fade).
- Set `--radius` to rounded value (~0.75rem or per user preference).

### Step 1.2: Root Layout

- Update `app/layout.tsx`: keep Provider, Nav, Footer structure.
- Ensure fonts (Lato, League Spartan, Roboto Mono) remain wired via CSS variables.
- Verify dark mode toggle works with RetroUI's `.dark` class approach.

### Step 1.3: Nav Component

- Rebuild `components/nav.tsx` (currently returns null).
- Fixed floating strip: top on desktop, bottom on mobile.
- Contents: social icon buttons (GitHub, LinkedIn, Mail) + theme toggle.
- Use RetroUI Button (icon variant) with neo-brutalist press effect.
- Back-arrow button appears on sub-pages (detect via `usePathname`).

### Step 1.4: Footer Component

- Simplify `components/footer.tsx` using RetroUI components.
- Social links + theme toggle + legal link + copyright.
- Neo-brutalist border-top separator.

**Checkpoint:** Site has working layout with nav, footer, theme toggle, and neo-brutalist styling. All pages render (even if empty).

---

## Phase 2: Legal Page -- First MDX Content

### Step 2.1: Create Legal MDX Content

- Create `content/legal/privacy-de.mdx` -- migrate German privacy text from `app/legal/page.tsx`.
- Create `content/legal/privacy-en.mdx` -- migrate English privacy text.
- Define frontmatter: `title`, `language`, `lastUpdated`.

### Step 2.2: Define Legal Collection

- In `source.config.ts`: define `legal` collection pointing to `content/legal/` with Zod schema.
- In `lib/source.ts`: create `legalSource` loader.

### Step 2.3: Build Legal Page

- Rewrite `app/legal/page.tsx` to fetch MDX content from Fumadocs.
- Render with tabs (German/English) using RetroUI components.
- Style prose content with `@tailwindcss/typography` or custom prose styles.
- Add back button to nav on this page.

### Step 2.4: Verify

- Both language tabs render correctly.
- MDX content parses without errors.
- Links, headings, lists all styled properly.
- SEO metadata preserved.

**Checkpoint:** Legal page renders MDX content from Fumadocs. First end-to-end proof that the content pipeline works.

---

## Phase 3: Home Page

### Step 3.1: Hero Section

- Rebuild `app/page.tsx` with RetroUI Card, Badge, Button.
- Hero card: name, title ("Fullstack Product Builder"), description, social links.
- Badges row with neo-brutalist styling (slight rotation, variant fills).
- Section label badge floating top-left of content area.
- Full viewport height, centered.

### Step 3.2: JSON-LD & SEO

- Keep structured data (Person schema).
- Verify OG image generation still works.

**Checkpoint:** Home page looks complete with neo-brutalist design, all interactive elements work.

---

## Phase 4: Projects (Content + Pages)

### Step 4.1: Create Project MDX Files

- Create `content/projects/` directory.
- Migrate each project to an MDX file with frontmatter (title, description, thumbnail, tags, github, live, featured).
- Move project images to `public/img/projects/` (already there).

### Step 4.2: Define Projects Collection

- Add `projects` collection to `source.config.ts`.
- Add `projectsSource` loader to `lib/source.ts`.

### Step 4.3: Project Listing Page

- Create `app/projects/page.tsx`.
- Grid of RetroUI Cards showing project thumbnails, titles, tags (as Badges).
- Cards link to individual project pages.
- Featured projects highlighted.

### Step 4.4: Individual Project Page

- Create `app/projects/[slug]/page.tsx`.
- Render project MDX content.
- Show metadata: tags, links (GitHub, live demo).
- `generateStaticParams` for SSG.

**Checkpoint:** Full project showcase working end-to-end with MDX content.

---

## Phase 5: Polish & Ship

### Step 5.1: About / Experience

- Decide: keep experience data in `data/about.ts` (it's structured data, not prose) or move to MDX.
- Build about section or integrate into home page.

### Step 5.2: Redirects

- Verify `/linkedin`, `/github`, `/cv` redirects still work in `next.config.mjs`.

### Step 5.3: Error Pages

- Style `app/not-found.tsx` with RetroUI components.

### Step 5.4: Performance & SEO Audit

- Verify all pages statically generated.
- Check Lighthouse scores.
- Verify sitemap, robots.txt, metadata.

### Step 5.5: Final Cleanup

- Remove any remaining legacy components not used by RetroUI.
- Remove old `data/` files that have been migrated to MDX.
- Clean up unused CSS.

**Checkpoint:** Site is production-ready.

---

## Execution Priority

The initial implementation (Phases 0-2) focuses on:

1. **Fumadocs working** -- content pipeline proven with legal page.
2. **RetroUI integrated** -- design system applied with rounded theme.
3. **Legal page rendering MDX** -- first real content flowing through the system.

This validates the entire architecture before building out projects and polish.

## Risk Areas

| Risk | Mitigation |
|------|-----------|
| RetroUI component coverage gaps | Fall back to custom-styled components using same CVA pattern |
| Fumadocs + Tailwind 4 compatibility | Test early in Phase 0; Fumadocs uses next plugin which should work |
| Rounded theme CSS conflicts with RetroUI defaults | Apply overrides at CSS variable level, not per-component |
| Next.js 16 + Fumadocs compatibility | Fumadocs actively supports latest Next.js; test in Phase 0 |
| MDX prose styling | May need custom `mdx-components.tsx` for consistent neo-brutalist prose |

## Files Changed Per Phase

| Phase | New Files | Modified Files |
|-------|-----------|---------------|
| 0 | `source.config.ts`, `lib/source.ts`, `content/` dirs | `package.json`, `next.config.mjs`, `tsconfig.json`, `.gitignore` |
| 1 | - | `app/globals.css`, `app/layout.tsx`, `components/nav.tsx`, `components/footer.tsx`, `components/ui/*` |
| 2 | `content/legal/privacy-de.mdx`, `content/legal/privacy-en.mdx` | `app/legal/page.tsx`, `source.config.ts`, `lib/source.ts` |
| 3 | - | `app/page.tsx` |
| 4 | `content/projects/*.mdx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` | `source.config.ts`, `lib/source.ts` |
| 5 | - | `app/not-found.tsx`, cleanup of old files |
