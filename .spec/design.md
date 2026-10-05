# zuendorf.me redesign: design spec

Visual source of truth: `Hybrid.dc.html` (home, "D · Hybrid") and `Project.dc.html` (subpage, "D1"). Where this spec and the mockups disagree, the mockups win unless a row below is marked **deviation**.

Chosen mockup levers (`data-props`):

| Lever | Value |
|-------|-------|
| `dark` | `false`: light is the default, with a toggle |
| `shadow` | `4`px |
| `nameShadow` | `double` |
| `nameRamp` | `true` |
| `showPalette` | `false` (a preview lever only) |

## 1. Tokens

### 1.1 Colour (raw values)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `bg` | `#F4F4F2` | `#0A0A0A` | Page background |
| `card` | `#FFFFFF` | `#141414` | Surfaces with a hard shadow (nav, cards, palette, boxes) |
| `fg` | `#111111` | `#EDEDED` | Text, strong borders, hard shadow, pixel name |
| `muted` | `#525252` | `#9A9A9A` | Secondary text, tags, hints (≈7:1 on bg in both themes) |
| `soft` | `#E4E4E1` | `#232323` | Hairlines, hover background, separators |
| `off` | `#E4E4E1` | `#1A1A1A` | Figure placeholder fill |
| `dot` | `#E4E4E1` (= soft) | `#2E2E2E` | Figure placeholder dot grid |

### 1.2 Mapping to shadcn CSS variables (`app/globals.css`)

| shadcn var | Light | Dark |
|------------|-------|------|
| `--background` | bg | bg |
| `--foreground`, `--card-foreground`, `--popover-foreground`, `--secondary-foreground`, `--accent-foreground` | fg | fg |
| `--card`, `--popover` | card | card |
| `--primary` | fg | fg |
| `--primary-foreground` | card | card |
| `--secondary`, `--muted`, `--accent` | soft | soft |
| `--muted-foreground` | muted | muted |
| `--border` | soft (hairlines are the default `border`) | soft |
| `--input`, `--ring` | fg | fg |
| `--destructive` | fg (mono; not used) | fg |
| `--radius` | `0` | `0` |
| custom `--off`, `--dot` | see 1.1 | see 1.1 |
| custom `--shadow-offset` | `4px` | `4px` |

Strong borders use `border-foreground`. Hairlines use `border-border`.

### 1.3 Shape, borders, shadow

| Token | Value |
|-------|-------|
| Radius | 0 everywhere |
| Strong border (`nb` surfaces, card image divider, facts strip, rule tops) | `2px solid fg` |
| Chip / control border | `1.5px solid fg` |
| Hairline | `1px solid soft` |
| Hard shadow `shadow-nb` | `4px 4px 0 fg` |
| Hard shadow, hover `shadow-nb-hover` | `6px 6px 0 fg`, combined with `translate(-2px,-2px)` |

### 1.4 Typography

Families: **Geist** (sans: body, headings) and **JetBrains Mono** (labels, meta, terminal bits). Weights: Geist 400/500/600 and JetBrains Mono 400/500.

| Role | Family | Size / line-height | Weight / tracking | Where |
|------|--------|--------------------|-------------------|-------|
| `tag` | mono | 11px | 400, `0.18em`, UPPERCASE, muted | Section labels, kicker |
| `tag-sm` | mono | 10px | same | Card status, facts labels, palette groups, figure placeholder label |
| Lede | sans | 19 / 1.6 | 400 | Hero paragraph |
| Body L | sans | 18 / 1.75 | 400 | Project prose |
| Body | sans | 17 / 1.7 | 400 | Home about |
| Body S | sans | 16 / 1.55–1.7 | 400 | Beliefs, steps, decisions |
| Small | sans | 14–15 / 1.5–1.6 | 400 | Card one-liner, work note, contact note |
| Row title | sans | 16 | 500 | Work role, step heading |
| Mono M | mono | 14 / 1.6 | 400 | Now and where-it-is lines, decision title (500) |
| Mono S | mono | 12–13 | 400 | Nav links, dates, step labels, captions, footer, kbd (11) |
| Card name | mono | 16 | 500 | Project card |
| Project H1 | sans | `clamp(40px, 10vw, 64px)` / 1 | 600, `-0.045em` | Subpage title (**assumption:** the mobile clamp; the mockup only shows 64) |
| Tagline | sans | 21 / 1.5 | 400 | Subpage |
| Palette input | mono | 15, height 52 | 400 | – |
| Palette item | sans | 14, height 44 | 400 | – |

`text-wrap: pretty` on paragraphs. Links: `underline`, 1px thickness, 4px offset, going to 2px on hover. `a.nb` cards have no underline.

### 1.5 Spacing and layout

| Token | Value |
|-------|-------|
| Reading column | `max-width: 680px`, side padding 20px (16px below `sm`, **assumption**) |
| Wide column (project page) | `max-width: 1040px` |
| Home section gap | 80px |
| Project block gap | 64px |
| Gap inside a section (label → content) | 20px on home, 18px on project |
| Page padding | top 24, bottom 120 |
| Hero | padding-top 24, gap 28 (kicker → name 20) |
| Sticky nav | `top: 16px`, padding 6, gap 6, `z-30` |
| Anchor offset | `scroll-margin-top: 88px` on sections (clears the floating nav) |
| Breakpoint | Tailwind `sm` (640px) replaces the mockup's 620px (**assumption**, negligible difference) |

## 2. Component inventory

All components are square-cornered and use tokens only. "nb" means a strong border, a `card` background and the hard shadow.

### 2.1 Status bar (home only)
- Full width, `border-bottom: 1px soft`, padding 10/20, centred and wrapping.
- An 8×8 `fg` square followed by mono 12 muted text.

### 2.2 Floating navbar
- nb pill (square), sticky, centred (`align-self: center`), wraps on overflow.
- **Home variant:** `[SearchButton] [about building work]ˢᵐ⁺ │ [GitHub][LinkedIn][Mail][Theme]`
- **Project variant:** `[← home] │ [indexed brain vibe]ˢᵐ⁺ │ [⌘K][Theme]`

| Part | Spec | States |
|------|------|--------|
| SearchButton (`kbtn`) | h40, `bg` fill, 1.5px fg border, mono 12. Search icon 14 + "Search" (hidden <sm) + kbd | Hover: bg soft. Focus-visible ring. On the project variant only the kbd shows |
| kbd | 1px muted border, padding 1/5, mono 11 muted. Shows `⌘K` on Apple and `Ctrl K` elsewhere (resolved after mount) | Hidden on `(pointer: coarse)` (**refinement**) |
| Nav link (`nl`) | h40, padding 0 10, mono 12 muted, no underline | Hover: fg on soft. Current (`aria-current`): fg on soft |
| Separator | 1.5×24 soft | – |
| Icon button (`ib`) | 40×40, icon 17, stroke 2, transparent | Hover: bg soft |
| Theme toggle | Half-filled circle icon (the same icon in both themes, so no hydration mismatch). `aria-label="Switch to dark theme"` / `"…light…"` | – |

### 2.3 Command palette
- shadcn `CommandDialog`, restyled: nb panel, `width: min(560px, 100% - 32px)`, fixed `top: 96px`, centred, `z-50`.
- Overlay: `rgba(10,10,10,.45)`, with no blur.
- Input row: muted `>` prompt, mono 15 input height 52, `esc` kbd, `border-bottom: 1.5px fg`.
- List: `max-height: 380px`, padding 8. Group heading is `tag-sm`, padding 12/12/6.
- Item: h44, padding 0 12, sans 14, with the mono 11 muted hint right-aligned. **Selected or hover: inverted (`bg fg`, text `card`, hint `card`).**
- Empty: mono 13 muted "No results.", padding 20/12.
- Footer: `border-top 1px soft`, mono 11 muted, `↑↓ move ↵ open esc close`.

### 2.4 Pixel-name hero (`PixelName`)
- Two lines: `LENNARD` / `ZÜNDORF`. Glyphs are 5 rows tall with 2-cell strokes. `Ü` is 7 rows: an umlaut row, a blank row, then the U. Words are bottom-aligned. There is 1 blank cell between glyphs and 1 cell gap between lines.
- **On cells:** filled `fg`. **Ramp:** row index `r` → step `round(r / (H-1) * 6)`, and step k fills `color-mix(in oklab, fg (100-6k)%, bg)`, so the bottom rows are 64% fg.
- **Drop shadow:** cell (r,c) is shadow if it is off and (r-1,c-1) is on. Only the outer edges of the shadow region are drawn. At ≥ `sm` they are drawn as a **double** line (3px total: 1px line, 1px gap, 1px line). Below `sm` they are a **single** 1px line.
- **Cursor:** a 1×1-cell `fg` block after `ZÜNDORF`, one cell gap, bottom-aligned with the shadow row, blinking `1.1s steps(1)` (50% → opacity 0).
- **Size:** fluid width. At desktop the cell is ≈ 10–11px (content width / 62 columns). At 360px viewport the cell is ≈ 5px.
- Glyph bitmaps (`1` = on), copied verbatim from `Hybrid.dc.html`:

```ts
export const GLYPHS = {
  L: ['1100000','1100000','1100000','1100000','1111111'],
  E: ['1111111','1100000','1111100','1100000','1111111'],
  N: ['111000011','111100011','110110011','110011011','110001111'],
  A: ['0111110','1100011','1111111','1100011','1100011'],
  R: ['1111110','1100011','1111110','1100011','1100011'],
  D: ['1111110','1100011','1100011','1100011','1111110'],
  Z: ['1111111','0001110','0011100','0111000','1111111'],
  U: ['0110110','0000000','1100011','1100011','1100011','1100011','0111110'], // renders Ü
  O: ['0111110','1100011','1100011','1100011','0111110'],
  F: ['1111111','1100000','1111100','1100000','1100000'],
} as const;
```

- Resulting grids: `LENNARD` is 59 glyph columns × 5 rows. `ZÜNDORF` is 57 × 7. Each gets +1 column and +1 row for the shadow. Preview (█ on, ░ shadow):

```
██      ███████ ███    ██ ███    ██  █████  ██████  ██████
██░     ██░░░░░░████   ██░████   ██░██░░░██ ██░░░██ ██░░░██
██░     █████   ██░██  ██░██░██  ██░███████░██████░░██░  ██░
██░     ██░░░░  ██░ ██ ██░██░ ██ ██░██░░░██░██░░░██ ██░  ██░
███████ ███████ ██░  ████░██░  ████░██░  ██░██░  ██░██████░░
 ░░░░░░░ ░░░░░░░ ░░   ░░░░ ░░   ░░░░ ░░   ░░ ░░   ░░ ░░░░░░
         ██ ██
          ░░ ░░
███████ ██   ██ ███    ██ ██████   █████  ██████  ███████
 ░░███░░██░  ██░████   ██░██░░░██ ██░░░██ ██░░░██ ██░░░░░░
  ███░░ ██░  ██░██░██  ██░██░  ██░██░  ██░██████░░█████
 ███░░  ██░  ██░██░ ██ ██░██░  ██░██░  ██░██░░░██ ██░░░░
███████  █████░░██░  ████░██████░░ █████░░██░  ██░██░
 ░░░░░░░  ░░░░░  ░░   ░░░░ ░░░░░░   ░░░░░  ░░   ░░ ░░
```

### 2.5 Section label
- `tag` style, rendered as `<h2>`: `<span aria-hidden>01 / </span>about`. The index is decorative, and the name is the heading text.

### 2.6 Belief rows (home 01)
- Container `border-top: 2px fg`, margin-top 8. Rows: padding 16/0, `border-bottom 1px soft`, gap 20, baseline aligned.
- Mono 12 muted numeral (`i.` `ii.` `iii.`, width 28) + body S. Render as an `<ol>` with custom markers.

### 2.7 Prompt list (home 02/now, project 06/where it is)
- Mono 14 / 1.6, gap 12. Each row is a muted `>` + text, gap 14. Render as a `<ul>`.

### 2.8 Project card (home 03)
- `a.nb` (whole card is the link). Grid `repeat(auto-fit, minmax(min(190px,100%),1fr))`, gap 20. At 680 that gives 3 columns; on phone it gives 1.
- Image: 4:3, `border-bottom 2px fg`, `next/image` `fill` + `object-cover`. If there is no image, use the figure placeholder (2.12).
- Body: padding 16/18/18, gap 10, flex column. Row 1: name (mono 16/500) on the left, status `tag-sm` on the right. Then the one-liner (14/1.5 muted), then "read more →" (mono 12) pushed to the bottom (`mt-auto`).
- States: rest is shadow 4. Hover and focus-visible: `translate(-2px,-2px)`, shadow 6, transition `.15s ease`. Active: `translate(0,0)`, shadow 2 (**assumption**, a press affordance). Fallback when there is no subpage (tech.md §4.4): the CTA becomes "source ↗" linking externally.

### 2.8a Hard-shadow surface (`Surface`)
- Static nb used by the contact box, command block, decision card and figure frame. Has no hover state.

### 2.9 Chip
- `1.5px fg` border, padding 7/12, mono 12. Static (not interactive) in both 04/side quests and 05/built with. Wraps with gap 8.

### 2.10 Work row (home 05)
- Rows: padding 18/0, gap 24, wrapping. The first row has `border-top 2px fg`. The others have `border-top 1px soft`, and the last also has `border-bottom 1px soft`.
- Period: mono 12 muted, width 120, padding-top 4. Body: title 16/500, note 15/1.5 muted.
- Below the rows: "full history on linkedin ↗" (mono 13 link).

### 2.11 Contact box (home 06)
- nb (static), flex with space-between, padding 8/8/8/20, wrapping. Mono 16 `"$ mail"` (muted) + the address (selectable text, also a `mailto:` link, **assumption**).
- Copy button (`cbtn`): h44, 1.5px fg, mono 12, copy icon 14 + label. Hover: inverted (`bg fg`, text `card`). The label goes "copy" → "copied" for 1.6s, with a `aria-live="polite"` announcement.
- Note below in 15/1.6 muted.

### 2.12 Figure and figure placeholder
- `<figure>`: an nb frame with a fixed aspect ratio (16:9 hero, 4:3 pair), then a mono 12 muted `<figcaption>` "fig. N — caption", gap 10.
- Placeholder fill (`gfx`): `off` background + `radial-gradient(dot 1.2px, transparent 1.2px)` at 12px. In dev it also shows a `tag` label "[hero graphic — 16:9]" bottom-left. In production it shows the pattern only (tech.md §4.5).

### 2.13 Project subpage blocks
| Block | Spec |
|-------|------|
| Path line | Mono 12 muted `~/building/` + slug in fg |
| Header | 680 column, gap 20: path → H1 → tagline → facts strip (margin-top 8) |
| Facts strip | 2px fg border. Grid `auto-fit minmax(min(140px,100%),1fr)`, giving 4 columns on desktop and 2 on phone. Cells padding 14/16, gap 6: `tag-sm` label + mono 13 value (links get ↗). Cell dividers are 1px soft, built with the `gap-px` + `bg-border` technique so wrapping stays clean (**deviation**: the mockup used border-right) |
| Steps (02) | Container `border-top 2px fg`. Rows padding 22/0, `border-bottom 1px soft`, gap 24, wrapping. Mono 13 label `01 connect` (width 96, padding-top 3), then heading 16/500 + text 16/1.65 muted. Rendered as an `<ol>` |
| Command box | Surface, padding 16/20, gap 6, margin-top 8. Lines are mono 13 with a muted `$` prefix, and wide lines scroll horizontally (`overflow-x:auto`) |
| Figure pair | 1040 wide, grid `auto-fit minmax(min(320px,100%),1fr)`, gap 24 |
| Decision card | Surface, padding 24, gap 10. Title mono 14/500, text 16/1.7 muted |
| Prev/next | `<nav aria-label="Projects">`, 680 column, grid `auto-fit minmax(min(240px,100%),1fr)`, gap 20. Two `a.nb` cards, padding 20: `tag-sm` "← back" + mono 15 "all projects", and a right-aligned `tag-sm` "next →" + mono 15 project name |

### 2.14 Footer
- Mono 12 muted, `border-top 1px soft`, padding-top 20, space-between, wrapping. Items: `© {year} Lennard Zündorf` · `legal` (link) · `press ⌘K anywhere` (`Ctrl K` on non-Apple, and hidden on coarse pointers).

## 3. Responsive rules

| Width | Behaviour |
|-------|-----------|
| ≥ 1040 + padding | Project hero and figure pair at 1040, text at 680 |
| 640–1040 | Wide blocks shrink fluidly, the figure pair stays at 2 columns while ≥ 664px, and the facts strip stays at 4 columns |
| < 640 (`sm`) | Nav hides section/project links and the "Search" label (icon + kbd stay, kbd hidden on touch). Project grid goes to 1 column. Figure pair goes to 1 column. Facts strip goes to 2×2. Work period stacks above the body (flex-wrap). Pixel-name shadow switches from double to single line. Side padding is 16 |
| 360 (min supported) | Pixel name fits without horizontal scroll (cell ≈ 5px). Nav fits in one row. The command palette is `100% - 32px` wide |

No horizontal page scroll at any width ≥ 320. Only the command box lines may scroll inside their own box.

## 4. Motion

| Motion | Spec | `prefers-reduced-motion: reduce` |
|--------|------|-------------------------------------|
| Cursor blink | `1.1s steps(1) infinite`, opacity 1 → 0 at 50% | Static, fully visible |
| Hover lift (`a.nb`) | `translate(-2px,-2px)` + shadow 4 → 6, `.15s ease` on transform and box-shadow | Shadow change only, no translate |
| Link underline | 1px → 2px, instant | – |
| Palette open | Overlay fade plus a panel fade/scale of 98 → 100 over 120ms (tw-animate-css, **assumption**: the mockup had no animation) | None |
| Anchor scroll | `scroll-behavior: smooth` | `auto` |
| Theme switch | No transitions (next-themes `disableTransitionOnChange`) | – |

## 5. Iconography
- Lucide-style 24-unit icons, stroke 2, round caps. Nav icons are 17px, button icons 14px.
- GitHub, LinkedIn, Mail and Theme (half-filled circle) are copied as local SVG components from the mockup paths. Lucide no longer ships brand icons.
- Search and Copy come from `lucide-react`. The external-link marker is the text glyph `↗`, not an icon.

## 6. Imagery
- Card images are 4:3. The project hero is 16:9. Figures are 4:3. All sit in nb frames with no rounding and no extra borders inside.
- Prefer monochrome or greyscale product shots and diagrams (**assumption**, to match the mono principle). No stock photos.

## 7. OG image (1200×630)
- `bg` light token, the pixel name (both lines) at the left/centre, the mono `tag` line "// fullstack product manager", and `zuendorf.me` in mono 24 muted.
- Project OG: the same frame, with `~/building/<slug>` + project name in Geist 600 + tagline.

## 8. Accessibility requirements (WCAG 2.2 AA)

- [ ] `<html lang="en">`. A skip link "skip to content" is the first focusable element and visible on focus.
- [ ] Landmarks: `header` (status + nav), `nav[aria-label="Main"]`, `main#content`, `footer`. Project prev/next is `nav[aria-label="Projects"]`.
- [ ] Exactly one `h1` per page. On home it contains the visually hidden text "Lennard Zündorf", and the pixel SVG is `aria-hidden="true" focusable="false"`. Section labels are `h2`.
- [ ] Text contrast is ≥ 4.5:1 in both themes (muted ≈ 7:1). Borders and focus rings use fg, so they are ≥ 3:1.
- [ ] Focus-visible: `outline: 2px solid fg; outline-offset: 2px` on every interactive element. `a.nb` also lifts on focus.
- [ ] Targets are ≥ 40×40 in the nav, the copy button is 44 high, and palette items are 44 high.
- [ ] The project card link has its accessible name from the project name (`aria-labelledby`) and its description from the one-liner (`aria-describedby`). The card image has `alt=""`.
- [ ] Palette: Radix Dialog with an sr-only `DialogTitle` "Command menu". The cmdk combobox/listbox semantics stay intact. Focus returns to the trigger on close. The trigger has `aria-keyshortcuts="Meta+K Control+K"` and `aria-haspopup="dialog"`.
- [ ] Copy actions announce through a single polite live region.
- [ ] The theme toggle label states the target theme. The current project in the nav has `aria-current="page"`.
- [ ] External links are marked with a visible `↗` plus sr-only "(external)". They open in the same tab (**assumption**, see tech.md §6).
- [ ] Motion respects `prefers-reduced-motion` (§4).
- [ ] Figures have meaningful `alt`, or `alt=""` when the caption fully describes them. Placeholders are `aria-hidden`.
- [ ] axe shows no violations on `/`, `/projects/indexed` and `/legal` in both themes.
