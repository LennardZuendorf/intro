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
- Main loop (Opus) = conductor: kick wave Workflow → on completion run real gate serially → commit (best-effort) → advance.
- **ENV CONSTRAINT: `pnpm` is aliased to `sudo -Hu lennarddib pnpm` → needs a password → DEAD unattended.**
  Gate + agents use the binaries directly: `./node_modules/.bin/biome check --write .`,
  `NODE_OPTIONS=--no-deprecation ./node_modules/.bin/next build`, `./node_modules/.bin/jest`.
- Commits DO work (husky/lint-staged resolves pnpm without the sudo alias). Use `git -c commit.gpgsign=false`.
- ScheduleWakeup ~1800s = fallback heartbeat only; workflow-completion notifications drive the loop.
- page.tsx serial: L3 → N3. Effects mounts via section components, runs last.

## Current position
- **CURRENT WAVE: 4 (effects) — RUNNING** · workflow `wf_6fc5daed-c49` (task `wvlgusjgi`). LAST wave.
  On completion: gate (biome + next build + jest incl E1 hook test) → commit best-effort → FINAL pass (full gate + address landing polish follow-ups + review section + done).
- Wave 3 nav: DONE, gate green (next build routes /,/legal + jest 14/14 incl 7 palette + biome), committed `2e8f36e`. N2 529-crash recovered by Opus audit+test agent (palette clean, no bug).
- Wave 2 landing: DONE, gate green (next build routes=/,/legal only + jest 7/7 + biome; fixed 2 JSX `//` eyebrow lint errors inline), committed `e5cec4d`.
- Landing follow-ups (non-blocking polish for final pass): hero clamp() typography override; possible duplicate scroll hint (hero vs global ScrollArrow in layout); placeholder social handles + Hypoport copy.
- Wave 1 foundation: DONE, gate green (build+TS+jest 7/7+biome), committed `72937ba`.
- Known deferred nit (from F1): dark `--secondary` still `#000` (invisible on near-black) — fix in a later wave/polish, outside foundation bar.

## Wave 1 — foundation  [gate: build + accent/mode persistence]  ✅ DONE
- [x] F1 tokens + Space Mono — `globals.css`, `layout.tsx`   *(Opus)*
- [x] F2 accent axis — `theme/accent-provider.tsx`, `theme/accent-swatches.tsx`   *(Sonnet)*
- [x] F3 no-flash persistence — `theme/accent-script.tsx`, `layout.tsx` head   *(Sonnet)*
- [x] GATE green · [x] committed `72937ba` (manual reload persistence: verified structurally — build+script-in-head; headless reload deferred)

## Wave 2 — landing  [gate: build + test + route enum /,/legal]  ✅ DONE
- [x] L1 content layer — notes collection, schema fields, `getWorkItems`, socials, backfill, Hypoport, 4 notes
- [x] L2 sections — hero/about/work/notes/contact + scroll-progress + v4 footer
- [x] L3 page composition — `app/page.tsx` (server, hero→about→work→notes→contact→footer, ids)
- [x] L4 route assertion — routes = /,/legal only ✓
- [x] GATE green · [x] committed `e5cec4d`

## Wave 3 — nav  [gate: build + test palette open/filter/jump]  ✅ DONE
- [x] N1 registry — `components/nav/sections.ts`
- [x] N2 palette — `components/nav/command-palette.tsx` + test *(529-crash → built by N3, Opus-audited clean + tested)*
- [x] N3 dock — `components/nav/dock.tsx` + `app/page.tsx` mount (no old Nav present to remove)
- [x] GATE green (jest 14/14) · [x] committed `2e8f36e`

## Wave 4 — effects  [gate: build + no-mount-under-reduced-motion]
- [ ] E1 gate hook — `effects/use-enabled.ts`   *(Opus)*
- [ ] E2 dot-field — `effects/dot-field.tsx`   *(Opus)*  ‖  [ ] E3 cursor/parallax/floaty — `effects/{cursor,parallax}.tsx`, `globals.css` keyframe   *(Opus)*
- [ ] GATE green · [ ] committed

## Commit log (best-effort)
| Wave | Committed? | SHA / note |
|---|---|---|
| baseline | yes | `385aca0` |
| 1 foundation | yes | `72937ba` |
| 2 landing | yes | `e5cec4d` |
| 3 nav | yes | `2e8f36e` |
| 4 effects | — | |

## Blocked / debug-round log
_(record any gate that needed debugging + round count; note if backstop tripped)_

## Review (fill on completion)
- shipped:
- skipped/blocked:
- follow-ups (content to rewrite, effects fidelity, etc.):
