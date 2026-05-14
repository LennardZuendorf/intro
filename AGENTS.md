# intro-zuendorf.me

Personal portfolio site — Next.js 15, React 19, TypeScript, Fumadocs MDX content, Neobrutalism design.

## Core principles

- **Simplicity first.** Make every change as small and direct as it can be while meeting the goal; touch only the code and files the task requires.
- **No laziness.** Prefer root causes over symptoms; avoid “temporary” fixes that become permanent. Hold work to a senior engineer bar.
- **Evidence before claims.** Do not call a task done until verification below has actually been run (or honestly explain what could not be run and why).

## Workflow (non-optional)

### Plan and re-plan

- **Use structured planning for non-trivial work** — anything with roughly three or more steps, unclear requirements, or architectural impact. Prefer Cursor **Plan** mode (or an equivalent written plan) so steps, files, and verification are explicit up front; detailed specs reduce thrash.
- **Think → plan → work.** Reason about constraints and risks before edits. If reality diverges from the plan (new constraints, a wrong assumption, a dead end), **stop and re-plan** instead of pushing forward blindly.
- **Use planning for verification too** — not only for “building”: spell out how you will prove correctness before you declare success.

### Task tracking

For multi-step or multi-session work, use a lightweight task file so progress stays inspectable:

1. **Plan first** — write a checkable plan to `tasks/todo.md` (create the file and `tasks/` directory if missing).
2. **Validate the plan** — reconcile it with repo rules (this file, skills, existing patterns); ask the user only when requirements are genuinely ambiguous.
3. **Track progress** — check items off as you complete them.
4. **Explain changes** — short high-level summary at meaningful milestones.
5. **Document results** — add a brief review section to `tasks/todo.md` when the thread completes (what shipped, what was skipped, follow-ups).
6. **Capture lessons** — after **any** user correction that reveals a repeatable mistake, append the pattern to `tasks/lessons.md` (create if missing) and, when appropriate, suggest a durable rule (e.g. Cursor rule or skill) so the same slip is less likely next time.

## Skills and orchestration

- **Use skills whenever they apply.** If a listed or discoverable skill matches the task, read it and follow it — do not substitute ad-hoc “best guesses” for skill guidance.
- **Use Compound Engineering** when the job matches its tools (`/ce-plan`, `/ce-debug`, `/ce-code-review`, `/ce-commit-push-pr`, `/ce-brainstorm`, subagent reviewers, etc.). Prefer CE orchestration over reinventing the same workflow inline.
- **Project-specific skills** — run the `/next-best-practices` skill before implementing Next.js code; run `/web-design-guidelines` before committing UI-only changes.

## Subagents

- **Use subagents liberally** to keep the main context focused: exploration, research, parallel review passes, and isolated investigations belong in subagents when available.
- **One coherent task per subagent** — narrow prompts beat kitchen-sink delegations.
- **Parallelize independent work** — when branches of work do not share mutable state, split across subagents instead of serial monologues.

## Autonomous execution

- **Bug reports and failures** — when given a bug, failing test, log, or CI error, drive to resolution yourself: reproduce, diagnose, fix, and verify. Minimize back-and-forth unless you are blocked on a product decision or missing secrets/access.
- **CI** — treat failing checks as part of the task: inspect output, fix, and re-run verification without waiting to be told.

## Quality bar (balanced)

- For non-trivial changes, briefly ask whether there is a **clearer or more composable** approach before presenting the result.
- If a fix feels hacky, consider: “Knowing what I know now, what would the clean solution look like?” — then implement that when cost is reasonable.
- **Do not** slow down trivial/obvious edits with endless reframing; save the design pass for real complexity.

## Commands

- `pnpm check` — Biome lint + format (auto-fix)
- `pnpm build` — Production build
- `pnpm test` — Run Jest tests
- **NEVER run `pnpm dev`** — user already has dev server running
- **ONLY use pnpm** — never npm or yarn

## Critical rules

- **NEVER use raw HTML text elements** (`<p>`, `<h1>`, etc.) — use typography components from `@/components/ui/typography`
- **NEVER override responsive typography** — use components as-is
- **NEVER create custom shadows/borders/grids** — use component variants and `Section` columns

## Next.js & React

- **Prefer reusable components** — extract repeated UI into shared components under `@/components`; extend existing primitives before adding parallel implementations.
- **No one-off visuals** — do not invent ad hoc layout, spacing, colors, borders, or motion for a single screen; compose from existing UI, variants, and `Section` patterns.
- **Minimal client boundaries** — add `"use client"` only where interactivity or browser-only APIs require it; keep data fetching and static structure in Server Components by default.
- **Stable composition** — prefer small props and clear component boundaries over giant prop bags or inline render functions that obscure structure.

## Verification

Before claiming a task is complete:

1. **Prove it** — run the project checks in order and fix failures:
   - `pnpm check` — Biome lint + format passes
   - `pnpm build` — production build succeeds
   - `pnpm test` — all tests pass
2. **When behavior is subtle or regression-prone**, compare against `main` (or the stated base branch): diff, targeted manual reasoning, or focused tests as appropriate.
3. **Sanity-check your own diff** — would a staff engineer be comfortable shipping this without more cleanup?

If verification cannot be run (environment limitation, flaky external service), say so explicitly and state what was verified instead.
