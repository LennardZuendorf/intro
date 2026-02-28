# intro-zuendorf.me

Personal portfolio site — Next.js 15, React 19, TypeScript, BaseHub CMS, Neobrutalism design.

## Commands

- `pnpm check` — Biome lint + format (auto-fix)
- `pnpm build` — Production build (runs `basehub` type gen first)
- `pnpm test` — Run Jest tests
- `pnpm basehub` — Regenerate BaseHub types (`basehub-types.d.ts`)
- **NEVER run `pnpm dev`** — user already has dev server running
- **ONLY use pnpm** — never npm or yarn

## Critical Rules

- **NEVER use raw HTML text elements** (`<p>`, `<h1>`, etc.) — use typography components from `@/components/ui/typography`
- **NEVER override responsive typography** — use components as-is
- **NEVER create custom shadows/borders/grids** — use component variants and `Section` columns
- Run `/next-best-practices` skill before implementing Next.js code
- Run `/web-design-guidelines` skill before committing UI changes

## Rules

- [UI Components](/.claude/rules/ui-components.md) — Typography, layout, and interactive component conventions
- [Git Conventions](/.claude/rules/git-conventions.md) — Commit format and workflow
- [BaseHub](/.claude/rules/basehub.md) — CMS data fetching patterns
- [Workflow](/.claude/rules/workflow.md) — Task planning, quality gates, execution

## Verification

After making changes, run in order:

1. `pnpm check` — Biome lint + format passes
2. `pnpm build` — Production build succeeds
3. `pnpm test` — All tests pass
