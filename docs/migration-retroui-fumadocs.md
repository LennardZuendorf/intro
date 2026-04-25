# Migration Plan: BaseHub + shadcn → Fumadocs + RetroUI

Branch: `neon-building`. Goal: simpler stack — RetroUI components + Fumadocs content source (markdown) — keep most existing copy, layout, and visual identity.

---

## 1. Decision summary

| Layer | Now | Target | Approach |
|---|---|---|---|
| Content source | BaseHub CMS (codegen + Pump RSC) | Fumadocs content source (`fumadocs-core` + `fumadocs-mdx`) reading local `.mdx` | Replace |
| UI primitives | shadcn `new-york` + Radix | RetroUI (vendored via `shadcn add`) where parity exists; keep Radix for gaps | Replace 11/14 primitives, keep 3 |
| Tailwind | v3.4 | **v4** (RetroUI native) | Upgrade |
| Styling tokens | Custom neobrutalism CSS vars in `globals.css` + `tailwind.config.ts` | RetroUI `:root`/`.dark` token block, remapped to keep visual identity | Rewrite tokens, keep design |
| Animation | framer-motion + custom CSS hover utilities | Keep framer-motion (project visuals), reconcile with RetroUI's hover-translate | Coexist with care |
| Theme switching | `next-themes` `attribute="class"` | Same | Unchanged |

Three primitives RetroUI does **not** ship: NavigationMenu, HoverCard, ScrollArea. Keep current Radix versions, restyle with new tokens.

---

## 2. Content model: BaseHub → Fumadocs collections

### 2.1 What's actually queried at runtime

(Not what `basehub-types.d.ts` claims — what the routes use.)

| BaseHub field | Used by | Fumadocs replacement |
|---|---|---|
| `globals.mainMeta` | `app/layout.tsx` `generateMetadata` | Static `metadata` export from `lib/site-config.ts` |
| `globals.{showAbout, showProjects}` | `app/page.tsx` feature flags | Drop — collapse to single layout (no v1/v2 split) |
| `globals.icon.url` | `app/icon.tsx` | Static import of `/img/logo-dark.svg` |
| `globals.socials.items[]` (`_id, _title, url, icon` SVG) | `navbar.tsx`, `social-buttons.tsx`, `footer.tsx` (indirect) | `content/site/socials.json` (or single MDX with frontmatter array); `icon` becomes a lucide icon name, not raw SVG |
| `heroSection.mainHeroText.json` (rich text + inline blocks) | `app/page.tsx` | `content/home.mdx` — body MDX, frontmatter `title/description` |
| `heroSection.secondaryHeroText.json` | `app/page.tsx` | Second `.mdx` doc OR second body section in `home.mdx` |
| `legalPage.legalTexts[]` (locale-keyed RichText with callouts) | `app/legal/page.tsx` | `content/legal/{en,de}.mdx` — frontmatter `language: en` |
| `legalPage.meta` | `legal/layout.tsx` | Frontmatter on the legal index doc |

**Inline rich-text blocks** in BaseHub (`HoverCardLinkComponent`, `ProjectComponent`, `ExperienceComponent`, `CalloutComponentComponent`) become **MDX components** consumed via the `components` map passed to `<MDX>`. Same JSX, same hover-card visuals — just sourced from MDX `<Project slug="..."/>` instead of BaseHub block embeds. Project/experience data lives as a sibling collection (`content/projects/*.mdx`, `content/experience/*.mdx`) so MDX components can `getPage(slug)` it.

### 2.2 Fumadocs collections to define

```
content/
  home.mdx                          # hero + secondary hero copy
  legal/{en,de}.mdx                 # locale legal docs
  projects/{stride,indexed,shards,obsidian-task,...}.mdx   # project metadata
  experience/{role-slug}.mdx        # experience entries
  site/socials.json                 # or .yaml — flat list, no body
```

`source.config.ts` defines `home`, `legal`, `projects`, `experience` collections with zod schemas matching the existing TypeScript shapes from `basehub-types.d.ts` (carry over field names: `companyTitle`, `startDate`, `skills[]`, `technology[]`, `links.items[]`, etc.).

---

## 3. UI mapping: shadcn → RetroUI

### 3.1 Direct replacements (run `shadcn add` per component)

| File now | After |
|---|---|
| `components/ui/button.tsx` | `components/retroui/Button.tsx` (keep `asChild` Slot — RetroUI supports it) |
| `components/ui/card.tsx` | `components/retroui/Card.tsx` — **API change**: flat `Card`/`CardHeader`/`CardContent` → compound `Card`/`Card.Header`/`Card.Content`. Codemod every callsite. |
| `components/ui/dialog.tsx` | `components/retroui/Dialog.tsx` (compound, similar API) |
| `components/ui/popover.tsx` | `components/retroui/Popover.tsx` |
| `components/ui/select.tsx` | `components/retroui/Select.tsx` |
| `components/ui/label.tsx` | `components/retroui/Label.tsx` |
| `components/ui/tooltip.tsx` | `components/retroui/Tooltip.tsx` |
| `components/ui/command.tsx` | `components/retroui/Command.tsx` |
| `components/ui/carousel.tsx` | `components/retroui/Carousel.tsx` |
| `components/ui/sonner.tsx` | `components/retroui/Sonner.tsx` |
| `components/ui/neoBadge.tsx` | `components/retroui/Badge.tsx` (RetroUI has Badge — port custom variants) |

### 3.2 Keep on Radix (no RetroUI equivalent)

- `components/ui/navigation-menu.tsx` — used in `navbar.tsx`. Keep, restyle with new tokens.
- `components/ui/hover-card.tsx` — used in 3 richtext hover cards. Keep.
- (No ScrollArea import currently; can drop the dep entirely.)
- `components/ui/separator.tsx` — not in repo (dep is unused). Drop.
- Radix `accordion`, `dropdown-menu`, `scroll-area`, `tabs`, `toast` — deps with **zero imports**. Remove.

### 3.3 Keep custom

- `components/ui/typography.tsx` (894 lines) — keep as project-specific layer; map its CSS classes onto new RetroUI tokens (`font-head`, `font-sans`, `--foreground`).
- `components/ui/section.tsx`, `background-grid.tsx`, `icon-link.tsx`, `expandable-card.tsx` — keep.

---

## 4. Styling: tokens to remap

RetroUI's CSS variable contract differs slightly from current. Reconcile in `globals.css`:

| Current var | RetroUI var | Action |
|---|---|---|
| `--background`, `--foreground` | same names | keep |
| `--primary`, `--primary-foreground` | same | retune values |
| `--card`, `--popover`, `--border`, `--muted`, `--accent`, `--destructive` | same | retune |
| `--shadow-{sm,md,lg}-{x,y}` (custom) | `--shadow-xs`…`--shadow-2xl` (RetroUI) | replace; rewrite Tailwind `boxShadow` map |
| `--blank` (black border) | `--border` | replace token references in component classNames |
| `font-base` / `font-heading` (weights) | `font-sans` / `font-head` (families) | rename + load Archivo Black + Space Grotesk via `next/font` |
| `rounded-base/md/lg = 8/16/24px` | RetroUI default `--radius: 0` | choose: keep softer radii or go full brutalist (`0`). Recommend keep current (8/16/24) — it's a visual identity choice. |

Existing custom hover utilities (`hover-grow`, `hover-lift`, `hover-bounce`, `hover-wiggle`, `hover-flip`, `hover-glow`, `hover-zoom-content`) and animations (`float/wiggle/shimmer/pulse`) are independent of any UI lib — keep verbatim.

---

## 5. Tailwind v3 → v4

Hard requirement for RetroUI's documented install path. Changes:

1. `tailwindcss ^4`, swap PostCSS plugin to `@tailwindcss/postcss`.
2. Replace `@tailwind base/components/utilities` directives with `@import "tailwindcss"` in `globals.css`.
3. Move theme tokens from `tailwind.config.ts` `theme.extend` → `@theme {}` block in CSS.
4. `tailwindcss-animate` → `tw-animate-css` (RetroUI uses it; or keep `tailwindcss-animate` since the class names overlap — verify).
5. Audit class names — v4 dropped some legacy variants; run `pnpm build` and fix lint hits.

Alternative: stay on v3 and port RetroUI's `@theme` block to `tailwind.config.ts` manually. Cheaper short-term, but you fight the upstream docs forever. Recommend committing to v4.

---

## 6. Pipeline changes

Add:
- `fumadocs-core`, `fumadocs-mdx`, `zod` (already present)
- `source.config.ts` at root
- `lib/source.ts` exporting `homeSource`, `legalSource`, `projectSource`, `experienceSource`
- `next.config.mjs` wrapped with `createMDX()` from `fumadocs-mdx/next`
- `.gitignore`: `.source/`
- `tsconfig.json` paths: `"@/.source": ["./.source/index.ts"]`

Remove:
- `basehub`, `graphql` deps
- `basehub.config.ts`, `basehub-types.d.ts`, `.basehub/`
- `pnpm basehub*` scripts; `basehub` step from `build`/`dev`
- `BASEHUB_TOKEN`, `BASEHUB_DRAFT` env vars (`src/env.js`)
- `assets.basehub.com` from `next.config.mjs` `remotePatterns`
- `src/__mocks__/basehub.ts`
- `src/components/shared/social-buttons.test.tsx` BaseHub mock — replace with static fixture

---

## 7. Component-by-component rewrite cost

| File | Touch | Reason |
|---|---|---|
| `app/layout.tsx` | rewrite metadata | Static, no Pump |
| `app/page.tsx` | rewrite | `getPage('home')`, render MDX, drop `NEXT_V2_RELEASE` branch entirely |
| `app/legal/page.tsx` | rewrite | Locale picker via slug or query param; render MDX |
| `app/legal/layout.tsx` | trim | Static metadata from frontmatter |
| `app/icon.tsx` | rewrite | Static logo |
| `components/navbar.tsx` | medium | Drop `basehub/react-icon`; map `socials[].icon` → lucide icon name; receive socials as prop or import from local data |
| `components/footer.tsx` | small | No more BaseHub; SocialButtons gets static data |
| `components/shared/social-buttons.tsx` | medium | Drop async fetch; accept socials prop or import from `content/site/socials.json` |
| `components/shared/richtext-block.tsx` | **rewrite** | Replace `basehub/react-rich-text` with Fumadocs `<MDX components={…}>`. Element overrides → MDX components map. Custom blocks → MDX components callable as `<HoverLink/>`, `<Project/>`, `<Experience/>`, `<Callout/>`. |
| `components/shared/richtext/callout.tsx` | medium | Drop nested `<RichText>`; let MDX render children naturally |
| `components/shared/richtext/{experience,link,project}-hover-card.tsx` | small | Props change from `BaseHubFragment` to local zod-typed shape from `content/projects` collection |
| `components/sections/components/{hero-card,project-card}.tsx` | small/defer | Currently legacy or unmounted; can delete |
| `components/sections/components/projects/*` + `hover-visuals/*` (~1500 LOC) | unchanged | Pure framer-motion SVG visuals, keyed by slug. Mount only when re-enabling projects route. |
| `components/scroll-arrow.tsx` | small | `motion.create(RetroUI Button)` — verify Button forwards refs (most shadcn-derived ones do). |
| `components/theme/theme-select.tsx` | small | Popover + Command both replaced; same shape |
| `components/providers.tsx` | tiny | Add `'use client'` directive (currently fragile) |
| `components/ui/typography.tsx` | small | Update font-family classes only |

Tests:
- `social-buttons.test.tsx` — rewrite mock to local fixture
- `color-select.test.tsx`, `active-theme.test.tsx`, `randomCardProps.test.ts` — unchanged

---

## 8. Suggested execution order

1. **Spike branch off neon-building**: `feat/retroui-fumadocs`.
2. **Tailwind v4 upgrade in isolation**. Get app rendering identically on v4. Lock in.
3. **Add Fumadocs scaffolding** (`source.config.ts`, `lib/source.ts`, empty `content/`). Verify build.
4. **Migrate one route end-to-end first: legal**. It's the simplest BaseHub consumer and exercises the rich-text → MDX path with callouts. Validate the MDX components map.
5. **Migrate home (hero)**. Port hover-card MDX components (`<HoverLink>`, `<Project>`, `<Experience>`, `<Callout>`).
6. **Replace UI primitives** with RetroUI in batch: Button → Card → Dialog → Popover → Select → Label → Tooltip → Command → Carousel → Sonner → Badge. One commit per primitive; codemod Card.* compound API in its own commit.
7. **Restyle the kept Radix three** (NavigationMenu, HoverCard) with new tokens.
8. **Strip BaseHub**: deps, codegen, env, mocks, types file. CI green.
9. **Delete `NEXT_V2_RELEASE` flag** and the legacy code path.
10. **Delete unmounted unused code** (`sections/components/projects/*` is optional — keep if you plan to mount the projects route soon, else move to a separate branch).

Each step independently shippable behind the unmerged feature branch.

---

## 9. Open questions

1. **Locale for legal pages**: BaseHub indexed by `_title === 'English'`. Want a real `/legal/en` + `/legal/de` route, or stay single-locale and pick at build time?
2. **Projects route**: re-enable now (mount `sections/components/projects/*`) or defer? Materially affects scope.
3. **`socials[].icon`**: BaseHub stored raw SVG strings. Switch to lucide icon names (simpler) or keep raw SVG (preserves custom icons)?
4. **Tailwind v4 vs v3**: commit to v4 upgrade as part of this work? Recommend yes.
5. **Brutalist radius**: keep current `8/16/24px` or adopt RetroUI's `0`?
6. **Drafts/preview**: BaseHub draft mode goes away. Acceptable to lose live preview in favor of git-based content workflow?
7. **Stagewise toolbar** (`@stagewise/toolbar-next` dep): in or out of the new build?

---

## 10. Risk register

- **Tailwind v4 migration** — biggest variable. Class-name parity isn't guaranteed.
- **MDX component map drift** — losing 1:1 typed parity with BaseHub blocks. Schema validation via zod on the projects/experience collections is the safety net.
- **`asChild` / Slot composition** in 8+ callsites depends on RetroUI Button forwarding refs and accepting Slot — confirmed in source, but verify post-install.
- **framer-motion + RetroUI hover-translate** — both fire on hover. Pick one per element. Affects Button-wrapped motion components in `scroll-arrow.tsx` and any motion children of Card.
- **Test mock drift** — `__mocks__/basehub.ts` already references stale fields. Pure deletion, no migration cost.
- **Font flash** — Archivo Black is heavy; load via `next/font` with `display: 'swap'`.
