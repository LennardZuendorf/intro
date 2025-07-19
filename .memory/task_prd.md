
# Hero & Section Layout Refactor – PRD

## 1. Background / Problem Statement
Recent iterations to improve the mobile experience introduced **two completely separate markup blocks** inside `src/components/sections/hero.tsx` (`#hero-mobile-layout` & `#hero-desktop-layout`). While functionally correct, this duplication:

1. Inflates LOC, harming maintainability & readability.
2. Creates a risk of visual drift between breakpoints (fixes must be applied twice).
3. Complicates future feature work (e.g., adding a new badge requires changes in two places).

The `Section` component already supports a **two-row / two-column grid** on large screens but isn’t being leveraged effectively in the hero implementation. We need a unified, responsive solution that:
- Keeps a **single source of truth** for each logical UI element.
- Uses **utility classes & conditional rendering** to adapt across breakpoints.
- Hides/reshapes specific elements (e.g., avatar image) on small screens without code duplication.

---

## 2. Goals & Objectives
1. **Eliminate duplicated JSX** inside `hero.tsx`.
2. **Leverage `SectionTop`, `SectionLeft`, `SectionRight`, `SectionBottom`** to handle desktop grid automatically.
3. Ensure **smooth responsive behavior** across three breakpoints:
   - Mobile (< 640 px)
   - Tablet (640 – 1024 px)
   - Desktop (≥ 1024 px)
4. Keep layout gaps, alignments, and rotations consistent with the design system.
5. Hide or rearrange selected content on smaller breakpoints (e.g., profile picture).
6. Produce clean, documented code that passes existing tests & linters.

---

## 3. Out-of-Scope
- Styling or functional changes to other page sections.
- Significant visual redesign beyond layout/spacing tweaks.

---

## 4. Target Layout Sketches

### 4.1 Mobile (< 640 px)
```
┌───────────────────────────────┐
│ Hero Card                     │
├───────────────────────────────┤
│ Mission Statement             │
├───────────────────────────────┤
│ Project Announcement Card     │
├───────────────────────────────┤
│ Current Role Card             │
├───────────────────────────────┤
│ Navigation Buttons (stack)    │
└───────────────────────────────┘
```
Notes:
- `ImageCard` (avatar) **hidden** to save vertical space.
- `gap-y` ≈ `1rem` (16 px) between blocks.

### 4.2 Tablet (640 – 1024 px)
```
Same vertical flow as mobile **but**
- Avatar becomes visible (smaller 80×80).
- Larger gaps (`gap-y` ≈ 1.5rem).
```

### 4.3 Desktop (≥ 1024 px)
```
┌────────────────────────────────────────────────────────────┐
│                SectionTop  (grid cols-2)                  │
│ ┌────────────┐   ┌─────────────────────────────────────┐ │
│ │ Hero Card  │   │ Project Announcement Card           │ │
│ │ + Mission  │   │ Current Role Card                   │ │
│ │ Statement  │   │ Navigation Buttons (row)            │ │
│ └────────────┘   └─────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```
- Avatar visible (120 – 160 px) within Hero Card.
- `SectionLeft` stacks **Hero Card** & **Mission Statement** vertically.
- `SectionRight` stacks **Announcement** + **Role** + **Nav Buttons** vertically.
- Global `gap-x` ≈ 2rem between columns; `gap-y` inside column matches design system.

`SectionBottom` is **unused** in hero for now but remains available for future content.

---

## 5. Functional Requirements
1. Convert duplicated mobile/desktop markup into **single JSX tree** using Tailwind responsive classes (`md:hidden`, `md:block`, `lg:grid`, etc.).
2. **Avatar Image**
   - Hidden on `<sm` (mobile)
   - Shown with `w-20 h-20` on `sm` & `md`
   - `w-40 h-40` on `lg`+
3. Implement responsive **gaps** using existing `responsiveGap` / `responsiveColumnGap` constants in `Section`.
4. Utilize `SectionTop` with two children (`SectionLeft`, `SectionRight`) to create the desktop grid.
5. Make sure internal cards keep their **interactive** & **rotation** props intact.
6. Ensure no hard-coded pixel widths override the design system.

---

## 6. Non-Functional Requirements
- **Accessibility**: Maintain ARIA labels & focus states provided by child components.
- **Performance**: Avoid unnecessary renders; conditional rendering over `display:none` where feasible.
- **Testing**: Existing Jest tests must pass; add a snapshot test for hero responsive layout.
- **Code Quality**: Pass ESLint/biome checks; no unused vars.

---

## 7. Acceptance Criteria
| ID | Description | Verification |
|----|-------------|--------------|
| AC-1 | Only one JSX block for each logical element exists in `hero.tsx`. | Code review diff / grep shows no duplicate element IDs. |
| AC-2 | Layout matches Sketches across breakpoints | Manual QA in Chrome DevTools emulation. |
| AC-3 | Avatar hidden on mobile, shown on tablet & desktop | Visual QA. |
| AC-4 | No linter or unit test regressions | `pnpm lint` & `pnpm test` pass. |
| AC-5 | Section component reusable for future pages | Developer review. |

---

## 8. Implementation Tasks (High-Level)
1. **Section Enhancements**
   - [ ] Review `Section` gap utilities; expose optional `rowGap` & `colGap` if needed.
2. **Hero Refactor**
   - [ ] Remove `#hero-mobile-layout` & `#hero-desktop-layout` containers.
   - [ ] Wrap content in a single `SectionTop` with `SectionLeft` + `SectionRight`.
   - [ ] Apply `hidden` / `block` classes to conditional elements (avatar, nav button orientation, etc.).
3. **Spacing Polish**
   - [ ] Align gaps/padding to design system tokens.
4. **Testing**
   - [ ] Update / add Jest snapshots for hero component.
5. **QA & Review**
   - [ ] Cross-browser & device emulation checks.
   - [ ] Accessibility audit (keyboard nav, contrast).

---

## 9. Timeline / Effort
- **Est. Dev Time**: 4-5 hrs
- **Testing & QA**: 1 hr
- **Buffer / Review**: 1 hr 