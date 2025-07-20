# Projects Section Finalization – Technical Architecture & Implementation Plan

## 1. Overview
We will deliver a **hybrid Projects showcase** that renders a **responsive grid** on `md`+ screens and keeps the existing **carousel** for `sm` devices. Cards will receive **deterministic random visual variants** (rotation & interactive) to inject playfulness without re-render flicker. A maximum of **3 grid rows** (9 items) will render initially, followed by a “Show more” toggle that expands/collapses the list.

> NOTE: No third-party packages required – utilities are implemented in-house. All code is typed and passes Biome.

---

## 2. Component-Level Changes

| # | File(s) | Change | Rationale |
|---|---------|--------|-----------|
| 2.1 | `src/lib/utils/randomCardProps.ts` **(new)** | Export `getRandomCardProps(projectId)` returning `{ rotation, interactive }` | Centralises variant logic; deterministic via hash of id. |
| 2.2 | `src/components/sections/components/project-card.tsx` | Accept optional `rotation` & `interactive` props; default to values from parent; forward to `<Card>` | Allows parent to inject visual variety. |
| 2.3 | `src/components/sections/components/project-grid.tsx` | • Update `maxVisible` → `9`.  
• Use `getRandomCardProps` per project and pass to `ProjectCard`.  
• Animate height change via CSS (`transition-[max-height]`) instead of manual anim flag. | Meets PRD limits; random variants; smoother animation. |
| 2.4 | `src/components/sections/components/project-carousel.tsx` | Generate card props via `getRandomCardProps` & pass to `ProjectCard`. | Carousel should match playful visuals. |
| 2.5 | `src/components/sections/projects.tsx` | Rename exports to `ProjectsSection` (optional), keep API.  
Ensure conditional render: `lg:hidden` for carousel, `hidden lg:block` for grid *OR* viewport hook (SSR-safe).  
Pass `className` down for spacing. | Provides hybrid switch; keeps SSR simple. |
| 2.6 | `src/components/ui/neoBadge.tsx` (none) | n/a | Show-more button uses existing NeoBadge ‑ no change needed. |
| 2.7 | **Tests** under `src/components/sections/__tests__/` | Snapshot grid collapsed/expanded; check column count via `getComputedStyle`; carousel presence on `sm`. | Ensure functional correctness. |

---

## 3. Algorithms & Utilities

### 3.1 Deterministic Random Variant
```ts
// randomCardProps.ts
const ROTATIONS = ['none','slight','slightNegative','medium','mediumNegative'] as const;
const INTERACTIVES = ['none','slight','medium'] as const;

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // convert to 32-bit
  }
  return Math.abs(hash);
}

export function getRandomCardProps(id: number | string) {
  const h = typeof id === 'number' ? id : hashString(id.toString());
  return {
    rotation: ROTATIONS[h % ROTATIONS.length],
    interactive: INTERACTIVES[(h >> 3) % INTERACTIVES.length]
  } as const;
}
```
The function guarantees **stable output per project id** across renders, preventing hydration mismatches.

---

## 4. State Management
* `ProjectsGrid` maintains a local `showAll` boolean via `useState`.
* Height transition uses CSS to avoid JS timers; still scroll to bottom on expand via `ref.scrollIntoView`.

---

## 5. Styling Guidelines
* Grid wrapper: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` (Tailwind).  
* Show-more button: `NeoBadge` (`variant='default'` → expand, `variant='outline'` → collapse).
* Use `rotate-*` & interactive classes driven by `Card` variants.

---

## 6. Data Flow / Props
```
ProjectsSection (server) -> projects data
 ├── ProjectsCarousel (client) [sm]  ──┐
 └── ProjectsGrid (client) [md+]      ├── ProjectCard (client)
                                      └── ...Card children
```
All heavy lifting (random props, toggling) occurs in client components. Server component performs data fetch only.

---

## 7. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|-----------|
| Hydration mismatch due to non-deterministic random | Flash / react warnings | Use deterministic hash function. |
| Large project lists impact LCP | Medium | Limit initial cards to 9, lazy-load images, `next/image` optimisation. |
| Carousel/Grid duplicate DOM in SSR | Low | Acceptable; hidden via CSS. Optimize later with dynamic import + viewport check if perf issue. |

---

## 8. Deliverables
1. Utility `randomCardProps.ts`.
2. Updated `ProjectCard` accepting variant props.
3. Refactored `ProjectsGrid` with show-more and variants.
4. Refactored `ProjectCarousel` passing variants.
5. Updated `ProjectsSection` toggling grid/carousel via CSS.
6. Jest/RTL tests.

---

## 9. Timeline
| Task | Est. |
|------|------|
| 2.1 Utility | 0.5 h |
| 2.2 Card update | 0.5 h |
| 2.3 Grid refactor | 1.5 h |
| 2.4 Carousel update | 0.5 h |
| 2.5 Section updates | 1 h |
| 2.7 Tests | 1.5 h |
| QA / buffer | 1 h |
| **Total** | **6.5 h** | 