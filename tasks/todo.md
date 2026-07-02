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
- **✅ DONE. Build complete, loop stopped.** All 4 waves + review polish shipped, every gate green. No PR (per decision). On `neon-building`.
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

## Wave 4 — effects  [gate: build + no-mount-under-reduced-motion]  ✅ DONE
- [x] E1 gate hook — `effects/use-enabled.ts` + test (5/5)
- [x] E2 dot-field + parallax — `effects/{dot-field,parallax}.tsx`, wired into hero.tsx
- [x] E3 cursor + floaty — `effects/cursor.tsx` (mounted in page.tsx), notes floaty, globals keyframe
- [x] GATE green (jest 19/19) · [x] committed `770909d`  (headless: no-mount asserted via E1 test + code; live reduced-motion visual deferred)

## Commit log (best-effort)
| Wave | Committed? | SHA / note |
|---|---|---|
| baseline | yes | `385aca0` |
| 1 foundation | yes | `72937ba` |
| 2 landing | yes | `e5cec4d` |
| 3 nav | yes | `2e8f36e` |
| 4 effects | yes | `770909d` |
| review polish | yes | `edd14ac` |

## Blocked / debug-round log
_(record any gate that needed debugging + round count; note if backstop tripped)_

## Review (final)

**Shipped — full v4 redesign, 6 commits on `neon-building` (baseline `385aca0` → `edd14ac`):**
- **Foundation** `72937ba` — v4 palette (lime `#c6ff2e` + color-mix derived accent vars, `--dot/--dotbase`, `--font-mono`), Space Mono alongside Grotesk/Archivo, accent axis (provider + 4 swatches + pre-paint no-flash script) separate from next-themes mode.
- **Landing** `e5cec4d` — notes collection + schema (year/kind/facts), `getWorkItems()` merge/sort, socials backfill, Hypoport role + 4 seed notes; hero/about/work/notes/contact + scroll-progress + v4 footer; `page.tsx` server composition with stable ids.
- **Nav** `2e8f36e` — section registry, cmdk command palette (`/`,`⌘K`, filter, jump, keyboard), floating dock hosting JUMP + mode + accent.
- **Effects** `770909d` — useEffectsEnabled gate, hero dot-field (accent-aware) + parallax, ring cursor, floaty notes — all no-mount under reduced-motion/touch.
- **Review polish** `edd14ac` — palette Radix Dialog focus-trap; hero LCP fix + no-JS-safe reveal; removed dup ScrollArrow; swatch aria-pressed; accent dedup (`theme/accents.ts`).

**Gates:** every wave green — `next build` (routes exactly `/` + `/legal`, TS clean) + `jest` (final 19/19, incl. 5 effects-hook + 7 palette) + biome. Final Opus review verdict: fix-then-ship; **no correctness/data bugs** (merge/sort, effect gating, accent cascade all verified). One transient API 529 self-recovered mid-run.

**Skipped/blocked:** none. neon-effects synthesized from spec prose (v4 reference HTML absent) — behavior per spec, not pixel-matched to the lost original.

**Follow-ups for you (all non-blocking):**
1. **Placeholder copy** — Hypoport role body, 4 seed notes, project years/kinds, and social handles (X `x.com/lennardzuendorf`, Bluesky `lennardzuendorf.bsky.social`) are plausible placeholders. Replace with real content.
2. **#5 hero `clamp()`** — currently overrides typography inline (H1 base is fixed `text-2xl`, no display scale). Clean fix: add a sanctioned `H1 size="display"` variant to `typography.tsx` and use it.
3. **Effects feel** — dot-field density/radius, cursor ease, parallax strength are spec-synthesis; tune live in a browser to taste.
4. **Live checks not runnable headless** — reduced-motion no-mount, accent-reload no-flash, palette focus-return: asserted via code + tests; eyeball once in a browser.
5. **Legal `<ScrollArrow/>`** — removed globally; if `/legal` wants it, mount locally there.
6. **Dev-only console warning** — cmdk's Dialog lacks a visually-hidden title (Radix advisory, stripped in prod); silence later with a direct `@radix-ui/react-dialog` dep if desired.
7. **`pnpm` alias** — this env aliases `pnpm` → `sudo -Hu lennarddib pnpm`; the run used `./node_modules/.bin/*` directly. Your normal terminal is unaffected.
8. **Deferred nit** — dark `--secondary` still `#000` (near-invisible on near-black); retint if any component uses it.

**No PR opened** (per your choice) — review the diff and merge `neon-building` when ready.
