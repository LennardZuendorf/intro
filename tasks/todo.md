# v4 overnight autonomous build — STATE MACHINE

**This file is the durable resume anchor.** After any context reset, the main loop
reads this to know the current wave + unit status and continues. Design:
`docs/superpowers/specs/2026-07-02-overnight-v4-autonomous-build-design.md`.
Source of truth for features: `.spec/features/<name>/`.

## Operator decisions (locked 2026-07-02)
- Failure policy: **debug til green** (Opus systematic-debugging), backstop = 8 rounds/gate then halt+report.
- Scope: **all 4 features** incl. effects.
- Git: **commit per green wave**, **no PR**. Commits **best-effort/non-gating**,
  `git -c commit.gpgsign=false` (1Password agent fails unattended); commit failure → log here, keep building.
- Content: **author placeholders**.
- Effects: **synthesize from spec prose** (reference HTML absent).
- Parallelism: plan-gates; disjoint-file fan-out within a wave.

## Run mechanics
- Main loop (Opus) = conductor: kick wave Workflow → on completion run real gate
  (`pnpm check`→`build`→`test` + assertion) serially → code-reviewer → commit (best-effort) → advance.
- ScheduleWakeup ~1200s = fallback heartbeat only; workflow-completion notifications drive the loop.
- page.tsx serial: L3 → N3. Effects mounts via section components, runs last.

## Current position
- **CURRENT WAVE: 1 (foundation) — RUNNING** · workflow `wf_9eb2575c-109`.
- On completion: main loop runs gate (`pnpm check`→`build`→`test` + persistence assert) → code-reviewer → commit (best-effort) → launch Wave 2.
- Baseline commit: DONE `385aca0`.

## Wave 1 — foundation  [gate: build + accent/mode persistence]
- [ ] F1 tokens + Space Mono — `globals.css`, `layout.tsx`   *(Opus: color-mix math)*
- [ ] F2 accent axis — `theme/accent-provider.tsx`, `theme/accent-swatches.tsx`   *(Sonnet)*
- [ ] F3 no-flash persistence — `theme/accent-script.tsx`, `layout.tsx` head   *(Sonnet)*
- [ ] GATE green · [ ] committed

## Wave 2 — landing  [gate: build + test + route enum /,/legal]
- [ ] L1 content layer — `source.config.ts`, `content/*.mdx` backfill, `content/notes/*`, new `hypoport.mdx`, `lib/{work,socials,source}.ts`   *(Sonnet ‖ fan-out)*
- [ ] L2 sections — `sections/{hero,about,work,notes,contact}.tsx`, `sections/scroll-progress.tsx`, `footer.tsx`   *(Sonnet ‖ fan-out)*
- [ ] L3 page composition — `app/page.tsx`   *(Opus: keystone)*
- [ ] L4 route assertion — verify-only   *(Sonnet)*
- [ ] GATE green · [ ] committed

## Wave 3 — nav  [gate: build + test palette open/filter/jump]
- [ ] N1 registry — `components/nav/sections.ts`   *(Sonnet)*
- [ ] N2 palette — `components/nav/command-palette.tsx`   *(Opus: keyboard/focus)*
- [ ] N3 dock — `components/nav/dock.tsx` + `app/page.tsx` (mount Dock, remove Nav)   *(Sonnet)*
- [ ] GATE green · [ ] committed

## Wave 4 — effects  [gate: build + no-mount-under-reduced-motion]
- [ ] E1 gate hook — `effects/use-enabled.ts`   *(Opus)*
- [ ] E2 dot-field — `effects/dot-field.tsx`   *(Opus)*  ‖  [ ] E3 cursor/parallax/floaty — `effects/{cursor,parallax}.tsx`, `globals.css` keyframe   *(Opus)*
- [ ] GATE green · [ ] committed

## Commit log (best-effort)
| Wave | Committed? | SHA / note |
|---|---|---|
| baseline | — | |
| 1 foundation | — | |
| 2 landing | — | |
| 3 nav | — | |
| 4 effects | — | |

## Blocked / debug-round log
_(record any gate that needed debugging + round count; note if backstop tripped)_

## Review (fill on completion)
- shipped:
- skipped/blocked:
- follow-ups (content to rewrite, effects fidelity, etc.):
