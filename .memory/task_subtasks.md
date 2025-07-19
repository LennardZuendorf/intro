# Hero & Section Refactor – Subtasks Checklist

> All subtasks are assumed to be executed sequentially unless stated otherwise. Owner defaults to current dev.

| ID | File(s) | Description | Type | Est. Time |
|----|---------|-------------|------|-----------|
| ST-1 | `ui/section.tsx` | Add `rowGap` & `colGap` props; default to existing constants; refactor `SectionTop` to use them | Code | 30m |
| ST-2 | `ui/section.tsx` | Remove obsolete comments & ensure exported components re-export unchanged | Code | 10m |
| ST-3 | `sections/hero.tsx` | Delete `#hero-mobile-layout` & `#hero-desktop-layout`; rebuild single responsive markup using Section composables | Code | 1h |
| ST-4 | `sections/hero.tsx` | Implement responsive avatar & navigation button orientation classes | Code | 20m |
| ST-5 | `sections/hero.tsx` | Audit IDs & classNames for uniqueness & remove unused custom widths | Code | 15m |
| ST-6 | `ui/typography.tsx` (if needed) | Verify no raw HTML tags introduced during refactor | Review | 10m |
| ST-7 | `__tests__/hero.test.tsx` | Add snapshot tests for sm, md, lg widths | Test | 30m |
| ST-8 | `pnpm lint` / fix | Run linters & fix issues | Chore | 15m |
| ST-9 | Manual QA | Validate layouts via DevTools (sm, md, lg) | QA | 20m |
| ST-10 | Commit & Push | `feat(hero): consolidate layout & add gap props` | Git | 5m |

---

### Parallelisation Notes
* ST-1 & ST-2 can be done together.
* Testing (ST-7) starts once ST-3–4 are complete.

---

**Definition of Done**: All subtasks checked, all acceptance criteria in PRD met, no linter/test failures, visual QA approved. 