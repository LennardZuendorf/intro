---
type: entrypoint
scope: technical
children:
  - features/neon-foundation/tech.md
  - features/neon-landing/tech.md
  - features/neon-nav/tech.md
  - features/neon-effects/tech.md
updated: 2026-06-29
---

# intro-zuendorf.me — Technical Architecture

Next.js 16 App Router site, React 19, Tailwind 4, TypeScript. Content is authored
as Fumadocs MDX collections and rendered through Server Components; interactivity
(theming, command palette, motion) lives in small client islands. The v4 redesign
reuses the existing RetroUI primitives and the offset-shadow design tokens rather
than introducing a new component system. Feature implementation detail lives under
`.spec/features/<name>/`.

---

## Design Philosophy

1. **Server-first, island interactivity.** Sections render on the server from
   MDX; `"use client"` is added only where the browser is required (theme/accent
   switch, palette, motion effects).
2. **Content is a contract.** Page structure reads from Fumadocs `loader`
   sources. The renderer never hardcodes a project/role/note.
3. **Reuse the design system.** Tailwind `@theme` tokens, the `--shadow-*` scale,
   and RetroUI `Button`/`Card`/`Command` are the building blocks. New CSS is the
   exception, justified in a feature `tech.md`.
4. **Two orthogonal theme axes.** `next-themes` owns light/dark via the `class`
   attribute; accent is a separate CSS-variable axis with its own persistence —
   they must not be coupled.

---

## Architecture Overview

```
intro/
├── content/                      # Fumadocs MDX (source of truth)
│   ├── home/                     # extended — hero/about/bio copy
│   ├── projects/                 # inherited — feed the merged Work list
│   ├── experience/               # inherited — feed the merged Work list
│   ├── notes/                    # NEW — scratchpad idea cards
│   └── legal/                    # inherited — /legal only surviving route
├── source.config.ts              # extended — add `notes` collection
├── src/
│   ├── app/
│   │   ├── page.tsx              # rewritten — one-page composition
│   │   ├── layout.tsx            # extended — add Space Mono, accent provider
│   │   ├── globals.css           # extended — v4 tokens, accent axis
│   │   └── legal/                # inherited
│   ├── components/
│   │   ├── sections/             # rewritten — hero/about/work/notes/contact
│   │   ├── nav/                  # NEW — floating dock + command palette
│   │   ├── theme/                # extended — mode + accent controls
│   │   ├── effects/              # NEW (deferred) — dot-field/cursor/parallax
│   │   └── ui/retroui/           # inherited — Button/Card/Command/…
│   └── lib/
│       └── source.ts             # extended — add notesSource
└── .spec/                        # Design docs
```

---

## Tech Stack

**Inherited:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Fumadocs
(`fumadocs-core` / `fumadocs-mdx`), RetroUI components (in-repo), `next-themes`,
`cmdk` (command palette), `sonner`, `framer-motion`, `lucide-react`, Biome, Jest.

**Added:** None required — `cmdk` and `framer-motion` already present cover the
palette and motion. The only new "dependency" is the **Space Mono** Google font
(via `next/font/google`, no package install) and a `notes` content collection.

---

## State / Data Contracts

| Contract | Location | Invariant |
|---|---|---|
| Mode (light/dark) | `next-themes` → `.dark` class on `<html>`, `localStorage` key per next-themes | Single source for mode; CSS reads mode-suffixed tokens. |
| Accent | CSS var `--accent`/`--primary` on `<html>`, own `localStorage` key (e.g. `lz_accent`) | One of 4 fixed swatch hexes; independent of mode; applied pre-paint to avoid flash. |
| Content | `content/**` MDX via `loader` sources in `src/lib/source.ts` | Sections render from sources; no inline content data. |
| Work items | `projects` + `experience` sources, merged | One ranked list; merge/sort rule defined in `features/neon-landing/tech.md`. |
| Design tokens | `src/app/globals.css` `@theme` + `:root`/`.dark` | Values mirror `.spec/design.md`; borders/shadows always `--border` (ink). |

---

## Build Sequence

| Order | Component | Feature |
|---|---|---|
| 1 | Tokens, Space Mono, mode+accent theming | neon-foundation |
| 2 | `notes` collection + sources | neon-landing |
| 3 | One-page sections, route cleanup | neon-landing |
| 4 | Floating dock + command palette | neon-nav |
| 5 | Enhancement motion (deferred) | neon-effects |

Map build order to features. Unit-level detail lives in feature `plan.md`.

---

## Features

| Feature | Covers |
|---|---|
| **[features/neon-foundation/](features/neon-foundation/tech.md)** | globals.css tokens, Space Mono, `next-themes` mode + accent CSS-var axis with no-flash persistence. |
| **[features/neon-landing/](features/neon-landing/tech.md)** | `notes` collection + sources, one-page `page.tsx`, section components, merged work list, route deletion. |
| **[features/neon-nav/](features/neon-nav/tech.md)** | Dock + `cmdk` palette island, section registry, keyboard handling. |
| **[features/neon-effects/](features/neon-effects/tech.md)** | Canvas dot-field, custom cursor, parallax, floaty — client islands, reduced-motion gated. **Deferred.** |

Feature-level files, APIs, and algorithms live in `features/<name>/tech.md`.

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Accent/mode flash on load (FOUC) | Inline pre-paint script sets `--accent` + mode class before first paint; mirror next-themes' approach. |
| Coupling accent into next-themes | Keep accent a separate CSS-var axis + storage key; do not route it through the theme attribute. |
| Work list needs fields the content lacks | `projects` has no date/`kind`, `experience` no `kind`; backfill schema + frontmatter in neon-landing/1 before building the list. |
| Heavy motion hurts mobile/perf | Effects are a deferred feature, desktop-pointer + reduced-motion gated, lazy-mounted. |
