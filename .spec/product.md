# Product Specification: intro-zuendorf.me

## Overview

Personal portfolio and digital presence for **Lennard Zuendorf** -- fullstack product leader based in Berlin. The site serves as a professional hub: hero introduction, project showcase, experience/about content, and legally required privacy/imprint pages.

## Target Audience

Recruiters, collaborators, and anyone exploring Lennard's professional profile. The site must load fast, look distinctive, and convey competence without over-engineering.

## Design Language

**Neo-brutalism with a rounded twist.** The foundation is RetroUI's NeoBrutalism component library, applied with a softer, rounded variant: generous `border-radius`, hard offset shadows, bold borders, monospace accents, and high-contrast light/dark modes. The vibe is bold and tactile -- buttons press into shadows, badges float with slight rotations, cards feel placed on a desk.

### Color System

- Monochrome palette: black, white, grays. No accent hue.
- Borders stay **pure black** in both modes (the neo-brutalist signature).
- Light mode: off-white background (#f6f6f6), white cards, black text.
- Dark mode: deep charcoal background (~#1a1a1a), dark gray cards, light text.
- Clean inversion between modes via CSS variables.

### Typography

- **Headings:** League Spartan (local, weight 900) -- heavy and bold.
- **Body:** Lato (Google Font, multiple weights) -- clean sans-serif.
- **Mono/Labels:** Roboto Mono (local) -- used for badges, code, tags.

### Key Visual Elements

1. **Background grid/noise:** Subtle texture covering the page, fading at center via radial mask.
2. **Badges:** Monospace, bold border, slightly rounded, optional rotation. Used for section labels and tags.
3. **Cards:** 2px black border, hard offset shadow. Interactive cards press/lift on hover.
4. **Buttons:** Hard offset shadow that disappears on press (translate into shadow). Icon and action variants.
5. **Nav:** Fixed floating strip -- top on desktop, bottom on mobile. Icon buttons for social links + theme toggle.

## Content Architecture

All content is stored as **MDX files** managed by Fumadocs as a data source. No external CMS.

### Content Types

| Type | Source | Description |
|------|--------|-------------|
| **Legal** | `content/legal/` | Privacy policy (DE + EN), imprint. MDX with tabs for language switching. |
| **Projects** | `content/projects/` | Individual project pages with thumbnail, description, tech stack, links. |
| **Site Content** | `content/pages/` | Hero text, about/experience data, any other static page content. |

### Pages

| Route | Purpose | Content Source |
|-------|---------|---------------|
| `/` | Home / Hero | Hardcoded or `content/pages/home.mdx` |
| `/legal` | Privacy & Imprint | `content/legal/privacy-de.mdx`, `content/legal/privacy-en.mdx` |
| `/projects` | Project listing | All files in `content/projects/` |
| `/projects/[slug]` | Individual project | Single `content/projects/<slug>.mdx` |
| `/about` | About / Experience | `content/pages/about.mdx` or TS data |
| `/linkedin` | Redirect | -> LinkedIn profile |
| `/github` | Redirect | -> GitHub profile |
| `/cv` | Redirect | -> CV PDF |

## Functional Requirements

1. **Dark/light mode** via `next-themes`, class-based toggling.
2. **Responsive:** Mobile-first. Nav moves to bottom on mobile.
3. **SEO:** Full metadata, JSON-LD structured data, OG images, sitemap, robots.
4. **Analytics:** Vercel Analytics + Speed Insights (existing).
5. **Legal compliance:** GDPR privacy policy in German (legally binding) and English.
6. **Performance:** Static generation where possible. No client-side data fetching for content.

## Non-Goals (Initial)

- Blog / writing section (future consideration).
- Contact form.
- CMS integration (Basehub removed, no replacement).
- Search functionality.
- Authentication or user accounts.
