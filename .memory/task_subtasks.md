# Projects Section Finalization – Subtasks Checklist

> Execute subtasks sequentially unless noted otherwise. Owner defaults to current dev.

| ID | File(s) | Description | Type | Est. Time |
|----|---------|-------------|------|-----------|
| ST-1 | `lib/utils/randomCardProps.ts` | Implement deterministic random utility | Code | 0.5h |
| ST-2 | `components/sections/components/project-card.tsx` | Add `rotation` & `interactive` props; forward to `Card` | Code | 0.5h |
| ST-3 | `components/sections/components/project-grid.tsx` | Increase `maxVisible` to 9; integrate `getRandomCardProps`; CSS height transition; scroll on expand | Code | 1.5h |
| ST-4 | `components/sections/components/project-carousel.tsx` | Pass random props to `ProjectCard` | Code | 0.5h |
| ST-5 | `components/sections/projects.tsx` | Hybrid rendering logic: grid (`hidden sm:hidden lg:grid` etc.) vs carousel; pass classes | Code | 1h |
| ST-6 | `__tests__/projects-grid.test.tsx` | Snapshot grid collapsed/expanded | Test | 0.5h |
| ST-7 | `__tests__/projects-carousel.test.tsx` | Snapshot carousel presence on `sm` | Test | 0.5h |
| ST-8 | `__tests__/randomCardProps.test.ts` | Unit test deterministic outputs | Test | 0.5h |
| ST-9 | Lint & Format | Run Biome; fix issues | Chore | 0.25h |
| ST-10 | Manual QA | Resize check, lighthouse run, keyboard nav | QA | 1h |
| ST-11 | Commit & Push | `feat(projects): responsive grid + randomized card variants` | Git | 0.25h |

---

### Parallelisation Notes
* **ST-1 → ST-4** can be developed in parallel by separate contributors if desired.
* Testing subtasks (ST-6–8) wait for code completion of ST-1–4.

---

**Definition of Done**: All subtasks checked, acceptance criteria in PRD met, tests & linters pass, visual QA approved. 