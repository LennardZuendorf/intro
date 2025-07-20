# Projects Section Finalization – PRD

## 1. Background / Problem Statement
The current **Projects** section provides users with a carousel of project cards, but it lacks the flexible **grid view** requested in the design vision. On larger screens, a carousel limits discoverability and wastes horizontal space. Conversely, a dense grid on phones overwhelms users with small tap-targets. We need a **hybrid solution** that adapts gracefully across breakpoints while showcasing projects in an engaging, on-brand way.

Key issues with the current implementation:
1. **Single-layout limitation** – No grid view on desktop / tablet.
2. **Static visuals** – Cards do not leverage the playful Neobrutalism rotations & hover states.
3. **Lack of progressive disclosure** – All projects render at once, causing long scrolls and slower LCP.
4. **Inconsistent UX** between mobile and desktop users.

## 2. Goals & Objectives
1. Provide an **adaptive Projects section**
   • **Grid view** on `md` & `lg` with 2 → 3 columns.
   • **Carousel view** on `sm` (mobile) using existing `ProjectCarousel`.
2. **Randomize card visual variants** to keep the page fresh and highlight the design system:
   • Random `rotation` (`none`, `slight`, `slightNegative`, `medium`, `mediumNegative`).
   • Random `interactive` level (`none`, `slight`, `medium`).
3. **Progressive loading** – Initial grid limited to **max 3 rows** (≤ 9 cards) with a **“Show more”** button to reveal the rest.
4. Each **ProjectCard** MUST display:
   • Cover image (16:9, lazy-loaded).
   • Title (using `H3` typography).
   • Short description (max 120 chars).
   • ≥ 3 tech-stack badges (uses `NeoBadge`).
   • “Read more” (internal link) & “Preview” (external, `target="_blank"`).
5. Maintain full accessibility, responsive behavior, and alignment with the Neobrutalism design guides.

## 3. Out-of-Scope
- Redesigning the underlying `Card` component beyond variant usage.
- Any changes to project CMS schema.
- Implementing infinite scroll or intersection-observer lazy fetch (simple show/hide suffices for now).

## 4. Target Layout Sketches

### 4.1 Desktop (`lg` ≥ 1024 px)
```
┌────────────────────────────────────────────────────────────┐
│  Row 1   ┌───────┐ ┌───────┐ ┌───────┐                    │
│          │ Card  │ │ Card  │ │ Card  │                    │
│          └───────┘ └───────┘ └───────┘                    │
│  Row 2   ┌───────┐ ┌───────┐ ┌───────┐                    │
│          │ Card  │ │ Card  │ │ Card  │                    │
│  Row 3   └───────┘ └───────┘ └───────┘                    │
│                                                           │
│             [ Show more ▼ ]                               │
└────────────────────────────────────────────────────────────┘
```
Columns: **3** (`gap-x` 2 rem, `gap-y` 2 rem).

### 4.2 Tablet (`md` 640–1023 px)
```
┌───────────────────────────────────────────────┐
│  Row 1   ┌───────┐ ┌───────┐                 │
│          │ Card  │ │ Card  │                 │
│  Row 2   └───────┘ └───────┘                 │
│  Row 3   ┌───────┐ ┌───────┐                 │
│          │ Card  │ │ Card  │                 │
│  Row 3   └───────┘ └───────┘                 │
│                                             │
│           [ Show more ▼ ]                    │
└───────────────────────────────────────────────┘
```
Columns: **2** (`gap-x` 1.5 rem, `gap-y` 1.5 rem).

### 4.3 Mobile (`sm` < 640 px)
```
┌──────────────────────────┐
│      ←  Card  →          │
│      ←  Card  →          │
│      ←  Card  →          │
│   (carousel indicators)  │
└──────────────────────────┘
```
Full-width **carousel** – swipe & arrow nav.

## 5. Functional Requirements
1. **Responsive switch**
   • Use CSS/Tailwind breakpoints: `hidden lg:grid`, `block lg:hidden`, etc.
2. **Grid layout**
   • `grid-cols-2 md:grid-cols-2 lg:grid-cols-3` within `SectionTop` or dedicated wrapper.
   • Cap initial render to `MAX_INITIAL = 9` cards.
   • “Show more” toggles `showAll` state; smooth scroll to new bottom.
3. **Random card variants**
   • Utility `getRandomCardProps()` returns `{ rotation, interactive }` seeded per render.
   • Ensure random selection but stable between re-renders (memoize by project id).
4. **ProjectCard composition**
   • Use `Card` + `ImageCard` (or `img` w/ mask) inside.
   • Typography components only (H3, S, etc.).
   • Badges via `NeoBadge` with `variant="accent"`.
5. **Buttons**
   • “Read more” → `/projects/[slug]` internal link.
   • “Preview” external; `rel="noopener noreferrer"`.
6. **Accessibility & A11y**
   • `alt` text from project `image.alt`.
   • Buttons & links keyboard-focusable.
7. **Performance**
   • Lazy-load images (`loading="lazy"`).
   • Only mount carousel on `sm` viewport (SSR safe via `useWindowDimensions`).

## 6. Non-Functional Requirements
- **Code Quality**: Pass Biome lint, typed.
- **Testing**: Add Jest/RTL snapshot for grid & carousel, plus unit test for `getRandomCardProps`.
- **Accessibility**: Meets WCAG AA for contrast & keyboard.
- **Maintainability**: Grid & carousel encapsulated in `ProjectsSection` component.

## 7. Acceptance Criteria
| ID | Description | Verification |
|----|-------------|--------------|
| AC-1 | Grid shows 3 cols (`lg`), 2 cols (`md`), hidden on `sm` | Manual resize QA |
| AC-2 | Carousel visible only on `sm` | Manual QA / Jest DOM queries |
| AC-3 | Cards display image, title, description, ≥3 badges, 2 buttons | Unit test snapshot |
| AC-4 | Max 9 cards initially, “Show more” reveals rest | E2E / unit test |
| AC-5 | Random rotations & interactivity visibly vary | Visual QA (diff screenshots) |
| AC-6 | Lint & tests pass | CI run |

## 8. Implementation Tasks (High-Level)
1. **Utility**: `utils/randomCardProps.ts` – return stable random variant per project id.
2. **ProjectCard enhancements** – consume random props; ensure required children.
3. **ProjectsGrid component** – responsive grid, show-more logic.
4. **ProjectsSection wrapper** – switch between `ProjectsGrid` & `ProjectCarousel` based on viewport.
5. **Tests** – snapshots for grid (collapsed/expanded) & carousel.
6. **QA** – cross-browser, keyboard, Lighthouse run.

## 9. Timeline / Effort
- **Dev**: 5–6 hrs  
- **Testing & QA**: 1.5 hrs  
- **Buffer / Review**: 1 hr  

> **Total** ≈ 8.5 hrs 