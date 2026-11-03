# zuendorf.me redesign: product spec

Status: approved design direction "D · Hybrid", plus the project subpage template "D1".
Visual source of truth: `Hybrid.dc.html` (home) and `Project.dc.html` (subpage), both in the design canvas "zuendorf.me — directions".
Related specs: [design.md](./design.md), [tech.md](./tech.md), [plan.md](./plan.md).

## 1. Goals

| #   | Goal                                                                   | Measure of done                                                                                                     |
| --- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| G1  | Person-first homepage: who Lennard is, how he thinks, what he does now | About, beliefs and now are all above the projects; the hero is the name, not a job title                            |
| G2  | Show the indie projects with depth, without becoming a portfolio site  | 3 project cards, each linking to a dedicated subpage with why / how / decisions / learnings                         |
| G3  | CV is present but secondary                                            | 3 short work rows plus a "full history on LinkedIn ↗" link. No CV page or PDF on the site                           |
| G4  | Calm, mono-colour, timeless look with neobrutalist touches             | Matches the mockups. Every colour comes from 5 tokens per theme. Radius is 0                                        |
| G5  | Keyboard-native                                                        | ⌘K / Ctrl+K works on every page. Every action can be reached without a mouse                                        |
| G6  | Fast, accessible, low-maintenance                                      | See the budgets in tech.md §10 and the a11y list in design.md §8. Content lives in typed files and MDX, with no CMS |

## 2. Audience

| Audience                                                           | What they want                                         | What serves them                                |
| ------------------------------------------------------------------ | ------------------------------------------------------ | ----------------------------------------------- |
| Peers in product and engineering, plus the agent-tooling community | "What is this person building, and how does he think?" | Beliefs, now, project subpages                  |
| Recruiters and hiring managers (secondary)                         | Current role, history, contact                         | Status bar, 05/work, LinkedIn link, contact box |
| Users of his projects (indexed, brain, vibe) arriving from GitHub  | Context on a project and the person behind it          | Project subpage with site and source links      |

## 3. Principles

1. **Person > projects > CV**, in that order on the page.
2. **Mono-colour.** One foreground on one background. Hierarchy comes from weight, size, mono labels and borders, never from hue.
3. **Quiet single column** (680px) for reading. Only project figures go wider (1040px).
4. **Neobrutalist hard edges are sparing.** Hard shadows go only on interactive or "object" surfaces: nav, cards, contact box, command palette, figures, decisions. Text sections stay flat.
5. **Terminal flavour is seasoning, not the meal.** It shows up in `$`, `>`, `~/building/…`, mono tags and the blinking cursor. Body copy stays in sans.
6. **No photo, no stock imagery.** The pixel-art name is the identity.
7. **Content is truthful and in Lennard's voice.** Placeholder copy never ships (enforced; see tech.md §4.5).

## 4. Information architecture

```
/                       Home (single page, anchor sections)
  #top                  hero
  #about                01 / about
  #now                  02 / now
  #building             03 / building
  #side-quests          04 / side quests        (assumption: id added; mockup has none)
  #work                 05 / work
  #contact              06 / contact
/projects/[slug]        Project subpage: indexed | brain | vibe
/legal                  Imprint + privacy (existing page, restyled)
/404                    not-found (restyled)

Redirects (next.config):
/projects     → /#building         (new, temporary)
/about        → /#about            (new, permanent: old sitemap listed /about)
/linkedin, /linkd, /github         (keep as-is)
/cv           → see plan.md Q3 (current target /docs/cv.pdf does not exist)
```

- **Considered, not chosen:** project details in a modal (`Modal.dc.html`). Rejected in favour of subpages, which are linkable, indexable and have room for the long-form template.
- **Earlier explorations:** A "Index card", B "Terminal", C "Ruled sheet". D merges A's structure with B's terminal elements. They are context only.
- **No blog** and no side-quest pages (see non-goals).

## 5. Global elements

| Element                           | Content                                                                    | Notes                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Status bar (home only, above nav) | `■ status: building product at DIB Travel · Stockholm, SE`                 | One string in `content/site.ts`                                                                 |
| Floating nav: home variant        | Search ⌘K · about · building · work · │ · GitHub · LinkedIn · Mail · theme | The section links are hidden below `sm`                                                         |
| Floating nav: project variant     | ← home · │ · indexed · brain · vibe · │ · ⌘K · theme                       | The current project is highlighted (`aria-current="page"`). Project links are hidden below `sm` |
| Command palette                   | Groups: Navigate / Projects / Elsewhere / Actions                          | Contents in §8                                                                                  |
| Footer                            | `© {year} Lennard Zündorf` · `press ⌘K anywhere` · `legal`                 | **Deviation from the mockup:** a `legal` link is added, because the imprint must stay reachable |

## 6. Home page content model

All home copy lives in `content/site.ts` (typed). Copy below is verbatim from `Hybrid.dc.html`. Items in `[brackets]` are open content items (§10).

| #   | Section     | Fields                                                                 | Content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --- | ----------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| –   | Status bar  | `status: string`                                                       | "status: building product at DIB Travel · Stockholm, SE"                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| –   | Hero        | `kicker`, `name` (sr-only h1), `lede`                                  | kicker "// fullstack product manager". h1 "Lennard Zündorf". Pixel art "LENNARD / ZÜNDORF". lede: "I turn user needs into products that just work — from the first conversation to the last commit. Most days that means product at DIB Travel. Most evenings it means small tools for thinking, notes and coding with agents."                                                                                                                                                              |
| 01  | about       | `paragraphs: string[]`, `beliefs: string[3]`                           | P1: "I joined DIB Travel in 2025 as its first product manager and moved from Berlin to Stockholm for it. I sit between ~15 engineers and the people who book trips, and I still like being the one who opens the editor." P2 (muted): **[outside-work line]**. Beliefs i–iii: "Process first, automation second. A tool only helps once the workflow is clear." / "Writing is thinking. Notes are where decisions actually get made." / "Small tools that compose beat big ones that don't." |
| 02  | now         | `now: string[]`                                                        | "Shaping flights and NDC at DIB Travel" / "Rebuilding my notes around agents (Shards)" / "Moving my agent setup to OpenCode"                                                                                                                                                                                                                                                                                                                                                                 |
| 03  | building    | derived from project `meta` (order, name, status, oneLiner, cardImage) | indexed: "Local-first search over your code, docs and tickets. Speaks MCP." brain: "Shared memory, tasks and notes for many agents, via CLI and MCP." vibe: "A spec-driven harness that keeps coding agents on a defined path." All status "active".                                                                                                                                                                                                                                         |
| 04  | side quests | `sideQuests: string[]` (not links)                                     | shipyard · shards · airline-distribution · model-routing · self-hosted-agents · cooking                                                                                                                                                                                                                                                                                                                                                                                                      |
| 05  | work        | `work: {period, title, org, note?}[]`, `linkedinUrl`                   | "2025 → now", "Product Manager, DIB Travel", "First PM. B2B corporate travel, Stockholm." / "**[YYYY]** → 2024", "**[Role]**, CHECK24 Flug", "Flights. Berlin." / "**[YYYY]**", "**[Earlier role or studies]**". Then "full history on linkedin ↗"                                                                                                                                                                                                                                           |
| 06  | contact     | `email`, `contactNote`                                                 | "$ mail lennard@zuendorf.me" with a copy button. Note: "Happy to talk product, agent tooling or how airlines sell seats."                                                                                                                                                                                                                                                                                                                                                                    |

Links (`content/site.ts → links`): email `lennard@zuendorf.me`, LinkedIn `https://www.linkedin.com/in/lennard-zuendorf/`, GitHub `https://github.com/lennardzuendorf`.

## 7. Project subpage content model

One MDX file per project: `content/projects/<slug>.mdx`. The template order is fixed and the components enforce it.

| Order | Block                                                                                          | Source                                                      | Required                         |
| ----- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------- |
| 0     | Hero figure 16:9, full width (1040), caption "fig. 1 — …"                                      | `meta.hero {src, alt, caption}`                             | yes (placeholder allowed in dev) |
| 1     | Path line `~/building/<slug>`                                                                  | derived                                                     | –                                |
| 2     | Title (h1)                                                                                     | `meta.name`                                                 | yes                              |
| 3     | Tagline                                                                                        | `meta.tagline` (also the meta description)                  | yes                              |
| 4     | Facts strip: Status · Started · Site · Source                                                  | `meta.status`, `meta.started`, `meta.site?`, `meta.source?` | status + started                 |
| 5     | `01 / why`: multi-paragraph prose                                                              | MDX `<Why>`                                                 | yes                              |
| 6     | `02 / how it works`: numbered steps (label + heading + text), optional `$` command box         | MDX `<How>`, `<Step>`, `<Command>`                          | yes                              |
| 7     | Figure pair 4:3 (fig. 2, fig. 3), 1040 wide                                                    | MDX `<FigurePair>` / `<Figure>`                             | optional                         |
| 8     | `03 / decisions`: cards (title + text)                                                         | MDX `<Decisions>`, `<Decision>`                             | ≥ 1                              |
| 9     | `04 / what I learned`: prose                                                                   | MDX `<Learned>`                                             | yes                              |
| 10    | `05 / built with`: chips                                                                       | `meta.stack: string[]`                                      | yes                              |
| 11    | `06 / where it is`: `>` lines                                                                  | `meta.where: string[]`                                      | yes                              |
| 12    | Prev/next: "← back / all projects" (→ `/#building`) and "next → <next project>" (wraps around) | registry order                                              | –                                |

`meta` also holds `slug`, `order`, `oneLiner` and `cardImage` for the home card. The schema is in tech.md §4.3.

**indexed**: port all copy verbatim from `Project.dc.html`. Site `https://indexed.sh`, source `https://github.com/LennardZuendorf/indexed`, stack Python, LlamaIndex, FAISS, ONNX Runtime, tree-sitter, Docling, MCP. Where it is: "Migrating to LlamaIndex v2" / "Reshaping the docs into Guide + Reference" / "Next: graph-aware retrieval across sources".
**brain, vibe**: only the one-liners exist. The full page copy is an open item (C9).

## 8. Command palette content

| Group     | Item                                    | Hint                            | Action                                                                                                    |
| --------- | --------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Navigate  | About / Now / Building / Work / Contact | `#about` …                      | On home: smooth-scroll to the section and update the hash. Elsewhere: `router.push('/#id')`               |
| Projects  | indexed / brain / vibe                  | `/projects/<slug>`              | Navigate to the subpage. **Change from the mockup:** the mockup opened indexed.sh, but subpages now exist |
| Elsewhere | GitHub                                  | `lennardzuendorf ↗`             | Open external link                                                                                        |
| Elsewhere | LinkedIn                                | `full CV ↗`                     | Open external link                                                                                        |
| Actions   | Copy email                              | `lennard@zuendorf.me`           | Copy to clipboard, announce "Email copied", close                                                         |
| Actions   | Toggle theme                            | target theme (`dark` / `light`) | Toggle theme, close                                                                                       |

Fuzzy search runs over label, group and hint. The empty state is "No results." The footer shows hints: `↑↓ move · ↵ open · esc close`.

## 9. Non-goals

- Blog, notes feed, RSS, newsletter.
- Pages for side quests (chips are not links), and no project filtering or tagging.
- CMS (the Sanity env vars in `.env` are leftovers and get deleted), i18n, comments, contact form.
- Photo or avatar. Accent colours. Animations beyond the cursor blink, hover lift and palette open.
- A CV page or PDF on the site (LinkedIn is the full history).
- Modal-based project details.

## 10. Open content items (Lennard to supply)

| ID  | Item                                                                                                                                                                                                                           | Where                      | Blocks                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------------------------------------------- |
| C1  | Personal "outside work" line                                                                                                                                                                                                   | Home 01/about P2           | M7 launch                                           |
| C2  | CHECK24 Flug role title + start year (end year 2024 per mockup)                                                                                                                                                                | Home 05/work row 2         | M7                                                  |
| C3  | Earlier role or studies + year                                                                                                                                                                                                 | Home 05/work row 3         | M7                                                  |
| C4  | brain + vibe links (site / source)                                                                                                                                                                                             | Facts strip, palette hints | M5                                                  |
| C5  | Start years for indexed, brain, vibe                                                                                                                                                                                           | Facts strip "Started"      | M5                                                  |
| C6  | Figure captions (fig. 1–3 per project)                                                                                                                                                                                         | Subpages                   | M5                                                  |
| C7  | Project graphics: 3 × card 4:3, 3 × hero 16:9, up to 6 × figure 4:3                                                                                                                                                            | Home cards + subpages      | M5 (gfx-pattern fallback allowed, see tech.md §4.5) |
| C8  | "What I learned" copy (2–3 paragraphs) per project, plus the personal "why" story paragraph for indexed                                                                                                                        | Subpages                   | M5                                                  |
| C9  | Third decision for indexed. All of why / how / decisions / stack / where for brain and vibe                                                                                                                                    | Subpages                   | M5                                                  |
| C10 | Confirm the work history. `data/about.ts` in the repo lists older roles whose dates conflict with the DIB start (e.g. "Senior Product Manager Payment, CHECK24, April 2025 – …"). It is treated as **unverified** and not used | 05/work                    | M3                                                  |
| C11 | Legal/privacy copy update: drop the "Google Web Fonts" section (next/font self-hosts) and add Vercel Web Analytics / Speed Insights                                                                                            | /legal                     | M6                                                  |
