---
type: feature-design
feature: component-unification
parent: ../../design.md
siblings:
  - product.md
  - tech.md
  - plan.md
design_format: google-labs-code/design.md-compatible
updated: 2026-07-05
---

# Component Unification — Design

**Parent:** [design.md](../../design.md)  
**Product:** [product.md](product.md) · **Tech:** [tech.md](tech.md)

Visual and interaction rules for adopting **RetroUI** (`@retroui` registry via [retroui.dev](https://retroui.dev)) on this site. This doc does not redefine global tokens — it specifies how registry components must be reskinned to match the neobrutalist system.

---

## RetroUI registry

| Config | Value |
|---|---|
| Registry alias | `@retroui` |
| URL | `https://retroui.dev/r/{name}.json` |
| CLI | `pnpm exec shadcn add @retroui/<name>` |
| In-repo path | `src/components/ui/` (and `retroui/` for vendored site variants) |

**Primitives to adopt in this feature:**

| Registry component | Site role |
|---|---|
| `button` | All clickable controls; preserve `flat` / `flatSecondary` dock variants |
| `tooltip` | Dock JUMP hint, scroll-arrow hint |
| `dropdown-menu` | Theme + accent pickers in dock |
| `hover-card` | MDX Project / Experience / HoverLink previews |
| `kbd` | Shortcut badges in dock, palette footer, tooltips |
| `separator` | Dock segment dividers |
| `alert` | MDX Callout blocks |
| `badge` | Base for `NeoBadge` wrapper (skill tags, fact chips) |

---

## Reskin contract (registry → site)

Every migrated `@retroui/*` file **MUST** apply these overrides on top of registry defaults:

| Token / pattern | Required class or CSS var | Never use |
|---|---|---|
| Radius | `rounded-base` (`--radius: 0.5rem`) | `rounded-md`, `rounded-lg` on neobrutalist surfaces |
| Border | `border-2 border-border` | `border-4` (except legacy until migrated) |
| Shadow | `shadow-md shadow-shadow` (or scale step from design.md) | `shadow-black`, blurred shadows |
| Display font on buttons/labels | `font-head` | `font-heading` (undefined alias) |
| Body font in command list | `font-sans` | `font-body` (undefined) |
| Focus | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary` | stripping focus for aesthetics |
| Z-index (menus) | `z-[9999]` or `z-[110]` for tooltips | `z-9999` (invalid) |

---

## Component patterns after unification

### Button (`@retroui/button`)

- **Dock icon buttons:** `variant="flatSecondary"` or `variant="flat"`, `size="icon"` — no `noButtonShadow` prop; variants already omit shadow.
- **JUMP trigger:** `variant="ghost"` with mono uppercase label; pair with `Kbd` children.
- **Social links:** `Button asChild` + `Link` (never `Link` wrapping `Button`).

### Tooltip (`@retroui/tooltip`)

- Content: `rounded-base border-2 border-border bg-background`, mono `text-xs`, `shadow-md shadow-shadow`.
- May embed `Kbd` children; registry styles `data-slot=kbd` inside tooltip.

### Dropdown menu (`@retroui/dropdown-menu`)

- Theme picker: `DropdownMenuRadioGroup` with Monitor / Moon / Sun items.
- Accent picker: radio items with color swatch + label from [`accents.ts`](../../../src/components/theme/accents.ts).
- Selected item: visible state (not only `opacity-60`); prefer radio indicator.

### Hover card (`@retroui/hover-card`)

- Content: `rounded-base border-2 border-border bg-popover`, `shadow-md shadow-shadow`.
- Trigger: shared `HoverCardInlineTrigger` — subtle underline, `Typography Link`, no duplicated class strings.

### Kbd (`@retroui/kbd`)

- Use `Kbd` for single keys, `KbdGroup` for chords (`⌘K`).
- Inside tooltips: inherits registry inverted styles via `in-data-[slot=tooltip-content]:*` utilities.

### Separator (`@retroui/separator`)

- Dock: `orientation="vertical"`, `className="self-stretch"` — replaces `w-px bg-border` spans.

### Alert (`@retroui/alert`)

- Map MDX Callout `type` → `Alert` `status`: `info`, `check`→`success`, `warning`, `danger`→`error`, `note`→`default`.
- Keep `role="alert"` from registry; icon in grid column per `has-[>svg]` layout.

### NeoBadge (wrapper over `@retroui/badge`)

- Registry `Badge` for chip chrome; wrapper adds `rotation` (`-rotate-2` hero), `shadow-md shadow-shadow`, size→typography mapping.
- Fact chips: `variant="outline"` or custom `bg-card` override inside wrapper only.

---

## Shared wrappers (site-specific)

### SectionEyebrow

```
// {label}  —  font-mono, text-muted-foreground, tracking-widest, uppercase optional per section
```

Canonical implementation via typography `Muted` or `S` — **no** raw `text-xs` / `tracking-[0.12em]` overrides at call sites.

### IconMenuSelect

- Trigger: icon-only `Button`, `aria-label` required.
- Hydration: render static icon placeholder until mounted (avoid dock width jump).

---

## Colors reference (implementation)

Synced with [`globals.css`](../../../src/app/globals.css) and [`accents.ts`](../../../src/components/theme/accents.ts):

| Role | CSS var | Light | Dark |
|---|---|---|---|
| Canvas | `--background` | `#faf9f4` | `#1a1a1a` |
| Ink | `--foreground` / `--border` | `#0b0b0b` | `#e8e8e0` / `#2a2a2a` |
| Card | `--card` | `#ffffff` | `#111111` |
| Muted text | `--muted-foreground` | `#6b675e` | `#6e6e68` |
| Accent (default) | `--primary` | Teal `#4E9E96` | same axis |
| On accent | `--primary-foreground` | `#f4f4ec` | `#f4f4ec` |

**Accent swatches (user picks one):** Teal `#4E9E96`, Rose `#B07A8A`, Slate `#7A8FA8`, Ochre `#A89060`.

---

## Do's and Don'ts (this feature)

- **Do** install from `@retroui` registry before editing primitive internals.
- **Do** grep for `shadow-black`, `rounded-md`, `font-body`, `z-9999` after each phase.
- **Do** use `Typography` components inside alerts and hover cards — no raw `<p>`.
- **Don't** keep Radix hover-card or dropdown-menu alongside Base UI equivalents.
- **Don't** override responsive typography scales on `H1`/`S`/`Muted` at section call sites — add variants instead.
- **Don't** adopt `@retroui/text` — site typography system stays authoritative.

---

## Validation

Root design tokens and component matrix live in [`.spec/design.md`](../../design.md).
Lint after token or component changes:

```bash
pnpm design:lint
```

Expect **0 errors**; WCAG warnings on accent-filled surfaces (teal + bone) are
documented intentional brand choices in the root design doc — not blockers for
this migration.
