
# Subtasks: Single Project Page Redesign

## Preparation
- [x] Confirm BaseHub content is available for at least one project (title, shortDescription, date, text, technology)
- [x] Decide final stat lineup (date, reading time, tech count)

## Data & Routing
- [x] Keep `generateStaticParams` (ensure it uses BaseHub to list slugs)
- [x] Add/Update `generateMetadata` for title/description
- [x] Extend page query to include `text.readingTime(wpm: 183)` and `text.json.toc`
- [x] Align filters to `_sys_slug` and destructuring to template shape

## Layout & Components
- [x] Build header `Card` using `SectionTop` with `NeoBadge` label, `H1` title, `M` short description
- [x] Add stats row with `NeoBadge`s (date, reading time, tech count)
- [x] Add actions row with `IconLink` buttons (Back to Projects; optional external links if present)
- [x] Implement left reading `Card` rendering BaseHub `RichText` with `img` mapping to Next `Image`
- [x] Implement right sticky sidebar container
  - [x] Tech Stack `Card` (image badge or `NeoBadge` fallback)
  - [x] TOC `Card` from `text.json.toc` (hide if empty)
  - [x] Project Info `Card` (date, reading time, counts)

## Styling & Accessibility
- [x] Ensure all text uses typography components; no raw headings in chrome
- [x] Constrain images and add alt text
- [ ] Verify keyboard navigation and focus states

## Validation
- [ ] Test with projects having long content and many images
- [ ] Test with no technologies and/or empty toc
- [ ] Lighthouse A11y ≥ 90 on this page
- [ ] Validate page renders after template-aligned `_sys_slug` query

## Delivery
- [ ] Commit with conventional message (feat: redesign project detail page with BaseHub)
- [ ] Share before/after screenshots 