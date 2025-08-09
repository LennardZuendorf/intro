# PRD: Single Project Page Redesign (BaseHub Integrated)

## Executive Summary

Design and implement a new single project page at route `/projects/[slug]` that matches the Neobrutalism aesthetic and the component patterns established in `src/components/sections/hero.tsx` and `src/components/sections/about.tsx`. The page will:
- Present a bold header with project title, short description, stats (date, reading time), and primary action buttons.
- Use a two-column layout: left column as the reading area rendering BaseHub RichText, right column with stacked cards for Tech Stack, Table of Contents, and Project Info.
- Consume content exclusively from BaseHub using the established SDK/components.

## Goals
- Consistent visual language with `Hero` and `About` sections using `Section`, `Card`, `NeoBadge`, `IconLink`, and typography components (`H1`, `M`, `L`, etc.).
- Improve readability and scannability of project content.
- Showcase tech stack via badges and optional image badges.
- Provide clear navigation and calls-to-action.
- Maintain accessibility and responsive behavior.

## In Scope
- Redesign of `src/app/projects/[slug]/page.tsx` (server component)
- BaseHub data integration for a single project
- Header with stats and action buttons
- Left reading column with `RichText`
- Right sidebar cards (Tech Stack, Table of Contents, Project Info)
- SEO metadata via `generateMetadata` using BaseHub meta fields

## Out of Scope (for this task)
- New BaseHub fields or schema changes (we will work with the existing schema)
- Related projects carousel
- Comments system

## UX & Visual Design
- Header: Full-width `Card` with a top-left `NeoBadge` label (e.g., `Project`), `H1` title, `M` short description, and a row of stats `NeoBadge`s: publication date (formatted), reading time (from BaseHub `text.readingTime`), and technology count.
- Actions: `IconLink` buttons: Back to Projects, optional external link(s) (e.g., showcase link if present), and optional repo link (shown only if data exists).
- Content Area: `Section columns={2}`
  - Left: Main reading `Card` with `RichText` from BaseHub, mapping images to `next/image` styled to match about section.
  - Right: Sticky sidebar container with stacked `Card`s:
    - Tech Stack: `NeoBadge` for each technology; show `badgeUrl` image if available, fall back to text badge.
    - Table of Contents: Render from `text.json.toc` into a simple list with anchor links to headings (slugs enabled in `text.html` when needed).
    - Project Info: Date, reading time, and any available metadata summary.
- Footer CTA (optional): A bottom `SectionBottom` area with an alert or CTA if needed later.

## Content Model & Data
We will query from `sectionsAndPages.projectsSection.items` with filter `_slug: { eq: params.slug }`, selecting:
- `_id`, `_title`, `_slug`, `shortDescription`, `date`,
- `meta { title, desc }`,
- `text { json { content, toc }, readingTime(wpm: 183) }`,
- `technology { _id, _title, url, badgeUrl }`.

## Functional Requirements
- Server-rendered page resolves by slug and returns 404 if not found.
- Header stats render deterministically based on available data.
- RichText renders with custom `img` mapping to `next/image` and site styling.
- Sidebar cards render conditionally (hide when a section has no data).
- Responsive design from mobile → desktop, with sticky sidebar on large screens.

## Non-Functional Requirements
- Accessibility: Use semantic components and ensure focus states on interactive elements; maintain contrast.
- Performance: Efficient data query; image optimization via Next Image; avoid layout shift.
- SEO: Provide `generateMetadata` using project meta where available.

## Acceptance Criteria
- Page uses only the project's typography components for text (`H1`, `M`, `L`, etc.); no raw HTML headings/paragraphs in our layout chrome.
- Layout follows `Section` columns with left reading and right sidebar.
- Header includes title, short description, date, reading time, and action buttons (at least Back to Projects).
- Tech Stack card displays technologies using `NeoBadge`; if `badgeUrl` exists, an image badge is displayed with consistent styling.
- RichText from BaseHub renders correctly with images.
- Page gracefully handles missing optional fields.
- Lighthouse accessibility score ≥ 90 on this page in dev.

## Risks & Mitigations
- Missing external links: Render only present CTAs; provide Back button as default.
- Large images in content: Ensure Next Image dimensions and borders; constrain within content card.
- TOC anchors: Use BaseHub `html` with slugs if necessary; otherwise rely on RichText headings with ids.

## Dependencies
- BaseHub SDK and types (already installed)
- Existing UI components in `src/components/ui/*`

## Deliverable
A redesigned `projects/[slug]` page matching the established design direction, fully integrated with BaseHub, with documented tests/validation steps.