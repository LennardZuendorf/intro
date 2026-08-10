# Overnight autonomous v4 build — orchestration design

**Date:** 2026-07-02
**Branch:** `neon-building`
**Goal:** Implement the full v4 redesign (`.spec/plan.md`) autonomously overnight —
foundation + landing + nav + effects — and have a finished, committed product by
morning.

This doc designs the **harness**, not the features. Feature design is the source of
truth in `.spec/features/<name>/{product,tech,design,plan}.md`. Agents read those
directly; this doc says how the build is orchestrated, verified, and made safe.

---

## Operator decisions (locked 2026-07-02)

| Decision | Choice |
|---|---|
| Gate-failure policy | **Debug til green**, then continue (self-heal loop; hard backstop below) |
| Scope | **All 4 features** incl. neon-effects |
| Git | **Commit per green wave**; **no PR** (leave committed on `neon-building`). Commits are **best-effort, non-gating** — see 1Password note |
| Content latitude | **Author placeholders** (notes, hypoport role, frontmatter/socials backfill) |
| Effects source | **Synthesize from spec prose** — the v4 reference HTML is absent from repo+history |
| Parallelism baseline | **Plan-gates (safe)** — whole-feature gates; disjoint-file parallelism *within* a wave |

---

## Grounding facts (verified this session)

- Nothing built. Repo matches specs: globals still yellow `#ffdb33`; layout has
  Archivo Black + Space Grotesk, **no Space Mono**; no accent axis; no
  `content/notes/`; no `src/components/nav/`.
- `cmdk` `framer-motion` `next-themes` `sonner` all present — no installs needed.
- Gates: biome check, next build, jest. **`pnpm` is aliased to `sudo -Hu lennarddib
  pnpm` → needs a password → unusable unattended.** Run binaries directly:
  `./node_modules/.bin/biome check --write .`,
  `NODE_OPTIONS=--no-deprecation ./node_modules/.bin/next build`,
  `./node_modules/.bin/jest`. (Commits still work — husky/lint-staged doesn't hit the alias.)
- Existing tests under `src/**/__tests__/`. Jest configured (`jest.config.ts`).
- **v4 reference HTML `Lennard v4.dc.html` does NOT exist** in repo or git history.
  Effects math comes from `neon-effects/tech.md` + `design.md` prose. Risk noted.
- 38 dirty files = in-progress retroui relocation → **baseline commit before the run**.

---

## Dependency graph (features → units)

```
foundation (F1→F2→F3)  ── single hard gate
   ├─> landing (L1→L2→L3→L4)
   ├─> nav (N1→N2→N3)          N3 edits page.tsx AFTER L3
   └─> effects (E1→E2,E3)      needs landing DONE; mounts via section components
```

**page.tsx is the one hard serial edit:** ordered **L3 (rewrite) → N3 (mount Dock,
remove Nav)**. Effects mounts through section components (hero/notes) + a globals.css
keyframe, not page.tsx — and runs last to keep a single page.tsx editor at a time.

**Critical-path spine (forced serial):** F1→F2→F3 → L2 → L3 → N3 → effects.
Everything else (L1 data, N1/N2, E2‖E3) hides in intra-wave parallelism.

---

## Architecture — Approach B: /loop conductor + per-wave dynamic Workflow

The **main loop (Opus)** is the durable conductor. The **wave Workflow** is the
parallel worker. Verification, commits, spec/state updates, and the failure policy
live in the main loop — never buried in a workflow.

### Per-wave cycle (one iteration)

1. Read `tasks/todo.md` → current wave + unit status (durable across context reset).
2. Invoke `Workflow` for the wave (dynamic script; fans out units w/ model tiering
   + an internal build→debug→retry self-heal). Runs in background.
3. On completion notification → main loop runs the **real gate** in the main
   workspace, serially (no `.next` race between parallel agents):
   `pnpm check` → `pnpm build` → `pnpm test` + wave-specific assertion.
4. Red gate → spawn **systematic-debugging** (Opus) → fix → re-gate. Loop.
5. Green gate → `feature-dev:code-reviewer` pass → fix findings → **commit the wave**
   → tick `tasks/todo.md` + `.spec/features/<name>/plan.md` Progress → next wave.
6. All 4 waves green → final `pnpm check/build/test`, write review section in
   `tasks/todo.md`, **commit; stop (no PR)**. No further wakeup.

Workflow-completion notifications drive the loop; `ScheduleWakeup` (~1200s) is only a
**fallback heartbeat** in case a workflow hangs. If a workflow dies, resume via its
`runId`.

### Wave schedule + gates

| Wave | Feature | Units (intra-wave parallelism) | Gate |
|---|---|---|---|
| 1 | foundation | F1→F2→F3 (serial chain) | build + accent/mode persistence assert |
| 2 | landing | L1 (‖ content backfill) → L2 (‖ 5 sections+chrome) → L3 → L4 | build + test + route enum (`/`,`/legal`) |
| 3 | nav | N1 → N2 → N3 | build + test (palette open/filter/jump) |
| 4 | effects | E1 → (E2 ‖ E3) | build + no-mount-under-reduced-motion assert |

---

## Model tiering (Sonnet efficient · Opus crazy)

**Sonnet (default)** — content backfill, section components, section registry, dock
shell, provider/script wiring, palette scaffold, build/test runner agents, review
fix-ups. `effort: low|medium`.

**Opus (`effort: high`)** — the hard reasoning only:
- F1 token / `color-mix` derived-var math (dual-mode palette correctness)
- L3 page composition (integration keystone)
- N2 palette keyboard/focus logic
- **all effects** (E1/E2/E3 — canvas physics synthesized without the reference)
- the **systematic-debugging** agent on every red gate

---

## Self-heal (debug-til-green) + backstop

Red gate → Opus systematic-debugging agent diagnoses → applies fix → re-gate. Repeat.
**Backstop: after 8 debug rounds on a single gate, STOP the loop** and leave a full
diagnostic report; the last green wave stays committed. "Til green" never means
silent-skip broken code; an honest halt beats looping till morning with nothing.
Independent later waves are not attempted on a hard-stuck earlier wave (spine is
serial — landing needs foundation, etc.).

---

## Verification at each step

- **Per unit** (in wave workflow): agent self-checks typecheck/lint on its own files.
- **Per wave** (main loop, serial): `pnpm check` → `pnpm build` → `pnpm test` + the
  wave assertion, then a `code-reviewer` pass whose findings are fixed pre-commit.
- **Wave assertions:** foundation → accent/mode persist + no undefined derived vars;
  landing → route list is exactly `/` + `/legal/[lang]`, work merge test; nav →
  palette open/filter/jump test, `NAV_SECTIONS` ids ≡ rendered section ids; effects →
  no canvas mounts under `prefers-reduced-motion`.

---

## Safety / resumability

- **Baseline commit** of current WIP before the run (`chore: baseline before v4
  autonomous build`) → clean tree → atomic wave commits.
- **Commits are best-effort, never a gate.** Repo has `commit.gpgsign=true` (SSH via
  1Password agent) which prompts/fails in an unattended run. All autonomous commits
  use `git -c commit.gpgsign=false commit …` to skip signing; if a commit still fails
  for any reason, log it in `tasks/todo.md` and **continue building** — code progress
  is the deliverable, commits are just checkpoints. A failed commit NEVER halts the
  loop and NEVER blocks the next wave. Worst case: morning delivers a green working
  tree with fewer commit checkpoints, which is fine.
- All work on `neon-building` (feature branch, never main).
- `tasks/todo.md` is the durable state machine — every unit/wave status ticked as it
  lands; the main loop resumes from it after any context reset.
- Commit per green wave = coarse, safe revert granularity; a bad wave reverts whole.
- Effects risk (no reference) is isolated to the last wave — foundation+landing+nav
  ship regardless.

---

## Deliverables

1. This design doc (committed).
2. `tasks/todo.md` rewritten as the 4-wave state machine.
3. Four wave-Workflow scripts (built at launch; persisted under the session dir).
4. A finished, committed v4 site on `neon-building` by morning — or the furthest
   green wave + a diagnostic report if the backstop trips.
