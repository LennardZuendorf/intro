# Hero & Section Layout Refactor – Technical Architecture & Implementation Plan

## 1. Overview
We will **eliminate duplicated JSX** in `hero.tsx` by consolidating mobile/tablet/desktop markup into a single responsive tree that leverages Tailwind breakpoint utilities and the existing `Section` compositional API. Minor enhancements to the `Section` component will expose flexible row/column gaps so that future sections can reuse the same responsive grid logic.

> NOTE: No external package additions are required — Tailwind & existing utilities suffice.

---

## 2. Component-Level Changes

### 2.1 `src/components/ui/section.tsx`
| Change | Rationale |
|--------|-----------|
| **Add props** `rowGap?: string` and `colGap?: string` | Allow callers to override default `responsiveGap` & `responsiveColumnGap` without touching internals. |
| **Expose breakpoint-aware CSS vars** (`--row-gap`, `--col-gap`) via inline style to give granular control if future design iterations need non-Tailwind spacing. | Future-proofing; optional for this refactor. |
| **Refactor `SectionTop` grid classes** to drive gaps from the new props (`rowGap`, `colGap`) and default to `responsiveColumnGap`. | Centralizes spacing logic. |
| **Remove leftover comments for legacy columns** | Clean-up. |

Implementation sketch:
```tsx
function SectionTop({ children, rowGap, colGap }: { children: ReactNode; rowGap?: string; colGap?: string }) {
  const gapY = rowGap ?? responsiveColumnGap;
  const gapX = colGap ?? responsiveColumnGap;
  return (
    <div className={cn(`grid grid-cols-1 md:grid-cols-2 w-full`, gapX)}>
      {/* ...children layout unchanged ... */}
    </div>
  );
}
```

### 2.2 `src/components/sections/hero.tsx`
1. **Delete** the two wrapper divs `#hero-mobile-layout` and `#hero-desktop-layout`.
2. Wrap everything in **single `Section` → `SectionTop` → `SectionLeft` / `SectionRight`** chain.
3. Use `hidden`, `sm:block`, `lg:flex`, etc. to control visibility & orientation.
4. **Avatar logic**
   - `<ImageCard className="hidden sm:block ... lg:w-40 lg:h-40 sm:w-20 sm:h-20" />`.
5. **Navigation Buttons orientation**
   - Use `flex-col sm:flex-row` plus `gap-3 md:gap-4` to toggle between stack vs row.
6. Keep card IDs for analytics but ensure uniqueness (no duplicates).
7. Remove dead CSS classes & inline widths (`w-full` overrides are fine).

### 2.3 Tests
* Add Jest snapshot for `HeroSection` rendering at three viewport widths using `@testing-library/react` + `jest-styled-media-query` mock or simple className snapshot.

---

## 3. CSS & Tailwind Guidelines
* Rely on Tailwind’s responsive prefix strategy.
* Keep **gaps** consistent: use the exported constants from `Section` *or* new props.
* No bespoke media queries in CSS files.

---

## 4. Reusable Utilities
* None required beyond extending `cn` helper if conditional class logic grows.

---

## 5. Data Flow / Props
* No API shape changes. `HeroSection` still accepts optional `sectionContent` pulled from PayloadCMS.
* Avatar URL extraction remains intact.

---

## 6. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|---------|-----------|
| Overlapping Tailwind classes cause unintended styles | Medium | Isolate responsive modifiers; audit final compiled CSS via DevTools. |
| Snapshot tests brittle due to class order | Low | Use regex snapshots or assert presence of key class fragments only. |
| Hidden avatar on mobile harms branding | Low | Re-evaluate after QA; can swap to `sm:hidden` quickly. |

---

## 7. Deliverables
- Updated `section.tsx` with new props + refactored `SectionTop`.
- Refactored `hero.tsx` with unified responsive markup.
- New unit/snapshot tests under `src/components/sections/__tests__/`.
- Git commit following conventional message format `feat(hero): consolidate layout & add section gap props`. 