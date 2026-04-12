# Technical Specification: intro-zuendorf.me

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| Runtime | React | 19.x |
| Language | TypeScript | 5.7+ |
| Styling | Tailwind CSS | 4.x |
| UI Components | RetroUI (@retroui/*) | latest |
| Content | Fumadocs MDX | latest |
| Theming | next-themes | 0.4.x |
| Icons | Lucide React + React Icons | latest |
| Analytics | @vercel/analytics, @vercel/speed-insights | latest |
| Package Manager | pnpm | 10.x |
| Deployment | Vercel | - |

## RetroUI Integration

RetroUI is a NeoBrutalism-styled React + TailwindCSS component library that integrates via the shadcn CLI pattern.

### Installation Pattern

```bash
npx shadcn add @retroui/<component-name>
```

Components are installed individually (like shadcn/ui) into the project's `components/ui/` directory.

### Available Components (known)

- Button (variants: default, secondary, outline, link, ghost; sizes: sm, md, lg, icon)
- Badge (variants: default, outlined, solid, surface)
- Avatar (multiple sizes)
- Accordion
- Input & Textarea
- Alert
- Card (expected, standard in such libraries)

### Styling Approach

- Uses CVA (class-variance-authority) for variant management -- same as current shadcn setup.
- Base styles: `font-head transition-all rounded outline-hidden cursor-pointer duration-200`
- 2px black borders, hard offset shadows, translate transforms on hover/active.
- Dark mode via `.dark` class on document root + CSS variables.

### Rounded Theme Customization

RetroUI defaults to sharp neo-brutalism. We apply a **rounded override** via custom CSS:
- Increase `border-radius` on all components (from sharp corners to ~8-12px).
- Maintain the hard shadows and bold borders.
- User will provide specific rounded theme CSS to integrate.

## Fumadocs MDX Setup

Fumadocs serves as the **content data source** -- we use it to parse MDX files into structured data, NOT as a docs layout framework.

### Packages Required

```bash
pnpm add fumadocs-mdx fumadocs-core @types/mdx
```

### Configuration Files

#### `source.config.ts` (root)

Defines content collections with Zod schemas:

```ts
import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

// Legal content collection
export const legal = defineCollections({
  type: 'doc',
  dir: './content/legal',
  schema: z.object({
    title: z.string(),
    language: z.enum(['de', 'en']),
    lastUpdated: z.string().optional(),
  }),
});

// Projects collection
export const projects = defineCollections({
  type: 'doc',
  dir: './content/projects',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()),
    github: z.string().optional(),
    live: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export default defineConfig();
```

#### `next.config.mjs` (updated)

```js
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig = { /* existing config */ };
const withMDX = createMDX();
export default withMDX(nextConfig);
```

#### `tsconfig.json` (path addition)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "collections/*": ["./.source/*"]
    }
  }
}
```

#### `lib/source.ts`

```ts
import { legal, projects } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const legalSource = loader({
  baseUrl: '/legal',
  source: legal.toFumadocsSource(),
});

export const projectsSource = loader({
  baseUrl: '/projects',
  source: projects.toFumadocsSource(),
});
```

### Content Directory Structure

```
content/
  legal/
    privacy-de.mdx      # German privacy policy
    privacy-en.mdx       # English privacy policy
  projects/
    tempus.mdx
    quaestio.mdx
    thesis.mdx
    twinkles.mdx
    habitus.mdx
    legalis.mdx
  pages/
    home.mdx             # (optional, hero content could stay in TS)
```

### .source/ Directory

Fumadocs auto-generates a `.source/` directory during `next dev` / `next build`. This must be added to `.gitignore`.

## Project Structure (Target)

```
intro/
  .spec/                    # Specifications (this directory)
  app/
    globals.css             # Tailwind + RetroUI theme + rounded overrides
    layout.tsx              # Root layout (Provider, Nav, Footer)
    page.tsx                # Home / hero page
    fonts.ts                # Font definitions (keep existing)
    legal/
      page.tsx              # Legal page (renders MDX from content/legal/)
    projects/
      page.tsx              # Project listing
      [slug]/
        page.tsx            # Individual project page
    not-found.tsx
    manifest.ts
    robots.ts
    sitemap.ts
    opengraph-image.tsx
    twitter-image.tsx
  components/
    ui/                     # RetroUI components (installed via shadcn CLI)
      button.tsx
      badge.tsx
      card.tsx
      accordion.tsx
      ...
    nav.tsx                 # Site navigation
    footer.tsx              # Site footer
    custom/
      toggle-color.tsx      # Theme toggle
  content/                  # MDX content (Fumadocs source)
    legal/
    projects/
    pages/
  data/
    site.ts                 # Site config, metadata, links
  lib/
    utils.ts                # cn() helper etc.
    source.ts               # Fumadocs source loaders
  source.config.ts          # Fumadocs collection definitions
  next.config.mjs
  tailwind.config.ts        # (if needed beyond CSS-first Tailwind 4)
  tsconfig.json
  package.json
```

## CSS Architecture

### globals.css

- Import Tailwind via `@import 'tailwindcss'`
- Define CSS variables for light/dark modes (monochrome palette)
- RetroUI theme overrides for rounded variant
- Background texture (subtle noise/grid with radial fade)
- Neo-brutalist base styles: always-black borders, hard shadows

### Key CSS Variables

```css
:root {
  --background: <off-white>;
  --foreground: <near-black>;
  --card: <white>;
  --border: <pure-black>;    /* neo-brutalist signature */
  --shadow: 4px 4px 0px 0px black;
  --radius: 0.75rem;         /* rounded theme override */
}

.dark {
  --background: <dark-charcoal>;
  --foreground: <light-gray>;
  --card: <dark-gray>;
  --border: <pure-black>;    /* stays black in dark mode */
}
```

## Build & Dev

- `pnpm dev` -- starts Next.js dev server (Turbopack), triggers Fumadocs .source generation
- `pnpm build` -- production build with static generation
- `pnpm lint` / `pnpm format` -- code quality (ESLint + Prettier)
- Pre-commit hooks via Husky + lint-staged (existing)

## Key Decisions

1. **RetroUI over shadcn/ui:** RetroUI provides neo-brutalist styling out of the box. Since it uses the same shadcn CLI install pattern and CVA, migration is straightforward.
2. **Fumadocs as data source only:** We use Fumadocs to parse MDX into data, but render in our own layouts. No Fumadocs docs layout or UI.
3. **Content in MDX:** Legal pages move from hardcoded TSX to MDX files. Projects move from TS data objects to individual MDX files with frontmatter.
4. **Tailwind 4 CSS-first:** Continue using Tailwind 4's CSS-first configuration (no tailwind.config.ts unless needed).
5. **Static generation:** All content pages use `generateStaticParams` for full SSG.
