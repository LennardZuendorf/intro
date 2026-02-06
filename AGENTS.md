# AGENTS.MD - LLM Engineering Guide

**Last Updated:** 2026-02-06 (Skills added)
**Repository:** intro-zuendorf.me v1.3.0

## Core Operating Principles

### 1. ASK → PLAN → CONFIRM → EXECUTE

**NEVER write code without approval.**

1. **ASK**: Clarify requirements, understand constraints, avoid assumptions
2. **PLAN**: Break down tasks, research patterns, present approach with reasoning
3. **CONFIRM**: Get explicit user approval before any implementation
4. **EXECUTE**: Implement step-by-step with clear explanations

### 2. Quality-First Engineering

- **KISS**: Keep It Simple, Stupid - prefer simplicity over complexity
- **Type Safety**: All code MUST pass TypeScript strict mode
- **Code Quality**: All commits MUST pass Biome checks
- **Accessibility**: WCAG 2.1 AA compliance required
- **Performance**: Meet Core Web Vitals standards

### 3. Critical Constraints

- **ALWAYS check `next-best-practices` skill before implementing Next.js code**
- **NEVER run `pnpm dev`** - user already has a dev server running
- **NEVER override responsive typography** - use components as-is
- **NEVER use raw HTML text elements** - use typography components exclusively
- **NEVER create files without necessity** - prefer editing existing files
- **NEVER proceed without user confirmation**
- **NEVER skip skill validation** - use `web-design-guidelines` before UI commits

## Tech Stack

### Core Technologies
```typescript
// Framework & Language
Next.js 15        // App Router, Server Components
React 19          // Latest React features
TypeScript 5.7    // Strict mode required
Node.js 24.11.1   // Runtime environment

// Styling & UI
TailwindCSS 3.4   // Utility-first CSS
shadcn/ui         // Component library (Radix primitives)
Neobrutalism.dev  // Design system inspiration
Framer Motion 11  // Animations

// Content & Data
BaseHub 9.2.3     // AI-native headless CMS (migrated from Payload)
GraphQL           // BaseHub query language
Supabase          // Legacy storage (migrating away)

// Development Tools
Biome 2.0         // Linting + Formatting (replaces ESLint/Prettier)
PNPM 10.28.2      // Package manager (ONLY use PNPM)
Husky 9.1         // Git hooks
Jest 29.7         // Testing framework
```

### Package Manager Rules
```bash
# ONLY use PNPM - NEVER npm or yarn
pnpm install      # Install dependencies
pnpm dev          # Development server (USER RUNS THIS - NOT YOU)
pnpm build        # Production build
pnpm check        # Biome lint + format
```

## Project Architecture

### Directory Structure
```
/src/
  app/              # Next.js App Router pages
    (app)/          # Main application routes
    projects/[slug] # Dynamic project pages
    legal/          # Legal pages
  components/
    ui/             # Base UI primitives (shadcn/ui + custom)
    sections/       # Page section components (BaseHub data)
    shared/         # Reusable components
    theme/          # Theme and dark mode
  lib/
    content/        # BaseHub GraphQL fetching
    basehub/        # BaseHub SDK integration
    types/          # TypeScript type definitions
    utils/          # Utility functions
  hooks/            # React hooks
  public/           # Static assets

/basehub-types.d.ts # Generated BaseHub types
/basehub.config.ts  # BaseHub configuration
```

### Content Management (BaseHub)

**Schema Collections:**
- `ProjectsItem`: title, shortDescription, meta, technology, text (RichText), links
- `ExperiencesItem`: company, dates, jobActivities (RichText), skills
- `TechComponent`: technology tags with links and badge URLs
- `SkillComponent`: skill categorization
- `SocialsComponent`: social media links

**Data Fetching Pattern:**
```typescript
import { basehub } from 'basehub'

// Server component data fetching
export async function fetchProjects() {
  const data = await basehub().query({
    projects: {
      items: {
        _id: true,
        _title: true,
        _slug: true,
        shortDescription: true,
        meta: { title: true, desc: true, img: true },
        technology: { _title: true, link: { url: true } }
      }
    }
  })
  return data.projects.items
}

// With caching and revalidation
export async function fetchProjects() {
  const data = await basehub().query(
    { /* query */ },
    {
      next: {
        tags: ['projects'],
        revalidate: 3600 // 1 hour
      }
    }
  )
  return data.projects.items
}
```

## UI Component System

### Typography Components (ALWAYS USE FIRST)

**CRITICAL:** NEVER use raw HTML text elements (`<p>`, `<h1>`, etc.)

```typescript
import { H1, H2, H3, H4, Lead, L, M, S, XS, Code, Muted } from '@/components/ui/typography'

// Headings (responsive, auto title-case)
<H1>Main Page Heading</H1>      // text-xl → 2xl:text-6xl
<H2>Section Heading</H2>         // text-lg → 2xl:text-4xl
<H3>Subsection Heading</H3>      // text-base → 2xl:text-3xl
<H4>Small Heading</H4>           // text-sm → 2xl:text-2xl

// Body Text (responsive)
<Lead type="foreground">Important text</Lead>
<L>Large body text</L>           // text-sm → 2xl:text-2xl
<M>Medium body text</M>          // text-xs → 2xl:text-lg
<S>Small text</S>                // text-[0.625rem] → 2xl:text-base
<XS>Extra small text</XS>        // text-[0.5rem] → 2xl:text-sm

// Specialized
<Code>inline code</Code>
<Muted>Secondary text</Muted>
```

### Layout Components

**Section Component:**
```typescript
import { Section } from '@/components/ui/section'

// Single column with grid background
<Section background="grid" fullHeight>
  <H1>Hero Section</H1>
</Section>

// Two-column layout
<Section columns={2} background="mask">
  <Section.Left>Left content</Section.Left>
  <Section.Right>Right content (sticky sidebar)</Section.Right>
  <Section.Bottom>Full-width bottom</Section.Bottom>
</Section>

// Props:
// background: 'grid' | 'mask' | 'none'
// columns: 1 | 2
// fullHeight: boolean (min-h-[100svh])
// centerContent: boolean
// as: ElementType
```

**Card Component:**
```typescript
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

// Standard card
<Card variant="default" shadow="md" borderStyle="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <M>Content here</M>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Variants: default, reversed, outline, accent, clickable
// Rotation: slight, slightNegative, medium, mediumNegative
// Interactive: slight, medium (hover effects)
// Shadow: sm, md, lg, xl
```

### Interactive Components

**Button:**
```typescript
import { Button } from '@/components/ui/button'

<Button variant="default" size="default">Click me</Button>

// Variants: default, neutral, noShadow, accent, link, action
// Sizes: default, sm, lg, icon
```

**NeoBadge (Neobrutalism styled badges):**
```typescript
import { NeoBadge } from '@/components/ui/neoBadge'

<NeoBadge
  variant="default"
  rotation="slight"
  interactive="grow"
  size="md"
>
  <S>Badge Text</S> {/* Use typography components for text */}
</NeoBadge>

// Variants: default, dark, light, outline
// Rotation: none, slight, negative, medium, negativeMedium
// Interactive: none, grow, lift, bounce, wiggle
// Size: sm, md, lg (affects padding, not text - use typography for text)
```

**IconLink:**
```typescript
import { IconLink, CornerIconLink } from '@/components/ui/icon-link'

<IconLink
  href="/projects"
  icon={<ArrowRight />}
  iconPosition="right"
  variant="default"
>
  <M>View Projects</M>
</IconLink>

// CornerIconLink for minimal icon-only links
<CornerIconLink href="/back" icon={<ArrowLeft />} />
```

### Component Import Pattern
```typescript
// Typography (priority import)
import { H1, H2, H3, H4, Lead, L, M, S, Code, Muted } from '@/components/ui/typography'

// Layout
import { Section } from '@/components/ui/section'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

// Interactive
import { Button } from '@/components/ui/button'
import { IconLink, CornerIconLink } from '@/components/ui/icon-link'
import { NeoBadge } from '@/components/ui/neoBadge'

// Specialized
import { ProfileImage } from '@/components/ui/profile-image'
import { Carousel } from '@/components/ui/carousel'
import { RichText } from '@/components/shared/richtext/richtext'
```

## Development Workflows

### Git Commit Standards

**ABSOLUTE FORMAT (50 characters max, one line only):**
```bash
[type](optional-scope): imperative subject

# Examples:
feat(ui): add project detail page
fix(basehub): resolve query caching issue
refactor(components): simplify card variants
chore(deps): update basehub to 9.2.3
```

**Allowed Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change (no bug fix or feature)
- `perf`: Performance improvement
- `style`: Formatting only (no logic changes)
- `test`: Add/update tests
- `docs`: Documentation only
- `build`: Build system changes
- `ci`: CI/CD configuration
- `chore`: Housekeeping (NOT code changes)
- `revert`: Revert previous commit

**Rules:**
- MUST be imperative mood ("add", NOT "added" or "adds")
- MUST be lowercase (except proper nouns/acronyms)
- MUST NOT exceed 50 characters total
- MUST NOT have trailing period
- MUST NOT have body or footer

### Code Quality Standards

**Biome Configuration:**
```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "rules": {
      "correctness": "error",
      "suspicious": "warn",
      "style": "warn"
    }
  }
}
```

**Run before commits:**
```bash
pnpm check  # Biome lint + format (auto-fix)
pnpm build  # Verify build passes
```

### Testing Patterns

```typescript
// Component tests with Jest + Testing Library
import { render, screen } from '@testing-library/react'
import { H1 } from '@/components/ui/typography'

describe('H1 Component', () => {
  it('renders heading with title case', () => {
    render(<H1>hello world</H1>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})

// Run tests
pnpm test         # Run all tests
pnpm test:watch   # Watch mode
```

### Claude Code Skills

**CRITICAL:** Before implementing Next.js code, ALWAYS check `next-best-practices` skill.

#### Available Skills

**1. next-best-practices** ⚠️ **USE BEFORE IMPLEMENTING**
- **Purpose**: Validate Next.js code against framework best practices
- **When to use**:
  - Before creating/modifying page components
  - When implementing data fetching patterns
  - For route handlers, metadata, error boundaries
  - Image/font optimization decisions
  - RSC boundary questions
- **Example**: "Check this server component against Next.js best practices"

**2. web-design-guidelines** 🎨 **USE FOR UI REVIEW**
- **Purpose**: Review UI code for Web Interface Guidelines compliance
- **When to use**:
  - After implementing UI components
  - When auditing accessibility (WCAG 2.1 AA)
  - For UX/design quality checks
  - Before committing UI changes
- **Example**: "Review my landing page for design best practices"

**3. frontend-design** ✨ **USE FOR NEW INTERFACES**
- **Purpose**: Create distinctive, production-grade frontend interfaces
- **When to use**:
  - Building new pages/components from scratch
  - Need creative, polished UI (not generic AI look)
  - Want Neobrutalism-aligned designs
- **Example**: "Design a contact form with Neobrutalism aesthetic"
- **Note**: Skill already knows about project typography/component system

**4. feature-dev:feature-dev** 🏗️ **USE FOR COMPLEX FEATURES**
- **Purpose**: Guided feature development with architecture focus
- **When to use**:
  - Multi-file feature implementations
  - Need codebase pattern analysis first
  - Complex state management or data flows
  - Architectural decisions required
- **Example**: "Implement blog section with BaseHub integration"

**5. find-skills** 🔍 **USE TO DISCOVER MORE**
- **Purpose**: Discover and install additional Claude Code skills
- **When to use**:
  - Looking for specific functionality not covered above
  - Want to extend Claude's capabilities
- **Example**: "Find a skill for database migrations"

**6. keybindings-help** ⌨️ **USE FOR CUSTOMIZATION**
- **Purpose**: Customize keyboard shortcuts in Claude Code
- **When to use**:
  - Want to modify default keybindings
  - Need to add chord shortcuts
- **Example**: "Rebind submit to Ctrl+Enter"

#### Skill Integration Workflow

```typescript
// RECOMMENDED WORKFLOW FOR NEW FEATURES:

1. ASK phase:
   - Clarify requirements
   - If complex feature → consider feature-dev:feature-dev skill

2. PLAN phase:
   - Research existing patterns
   - For Next.js code → MUST check next-best-practices
   - For UI work → consider frontend-design skill

3. CONFIRM phase:
   - Present approach to user
   - Get approval with skill recommendations

4. EXECUTE phase:
   - Implement code
   - Run next-best-practices on Next.js files
   - Run web-design-guidelines on UI components
   - Run Biome checks: pnpm check
   - Run tests: pnpm test

5. REVIEW phase:
   - Final next-best-practices validation
   - Final web-design-guidelines audit
   - Commit with proper format
```

#### Skill Usage Rules

**DO ✅**
- Run `next-best-practices` before implementing ANY Next.js patterns
- Run `web-design-guidelines` before committing UI changes
- Use `frontend-design` for creative new interface work
- Use `feature-dev:feature-dev` for multi-step feature planning
- Check skills proactively as part of quality gates

**DON'T ❌**
- Skip `next-best-practices` validation for Next.js code
- Ignore skill recommendations about best practices
- Use skills for trivial changes (single line fixes)
- Forget to apply skill feedback before committing

## Best Practices

### DO ✅
- Use typography components exclusively for ALL text
- Leverage component variants instead of custom styling
- Follow Neobrutalism aesthetic (borders, shadows, rotations)
- Compose Card with CardHeader/CardContent/CardFooter
- Use Section for consistent page layouts
- Preserve responsive behavior when adding className
- Use BaseHub for all content (GraphQL queries)
- Apply KISS principle - simplicity over complexity
- Ask questions before implementing
- Get user approval before coding
- **Run `next-best-practices` skill before implementing Next.js code**
- **Run `web-design-guidelines` skill before committing UI changes**
- Use skills as quality gates in development workflow

### DON'T ❌
- NEVER use raw HTML text elements (`<p>`, `<h1>`, etc.)
- NEVER override responsive typography sizing
- NEVER run `pnpm dev` (user already has server running)
- NEVER create custom shadows/borders - use variants
- NEVER mix Badge and NeoBadge - prefer NeoBadge
- NEVER create custom layout grids - use Section columns
- NEVER proceed without user confirmation
- NEVER use npm/yarn - ONLY pnpm
- NEVER commit without Biome passing
- NEVER exceed 50 chars in commit messages

## Performance & Accessibility

### Performance Requirements
- Core Web Vitals compliance required
- Image optimization via Next.js Image component
- Bundle size under 244 KB target
- Efficient BaseHub queries with caching
- ISR revalidation via webhooks

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Proper ARIA attributes (all components include them)
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios (Neobrutalism enhances this)

### Image Configuration
```typescript
// next.config.mjs allows:
// - assets.basehub.com (BaseHub CDN)
// - img.shields.io (tech badges)
// - localhost:3000/api/media (development)

// Always use Next Image component
import Image from 'next/image'

<Image
  src="https://assets.basehub.com/..."
  alt="Descriptive alt text"
  width={800}
  height={600}
  className="border-4 border-foreground"
/>
```

## Environment Variables

```bash
# BaseHub (primary CMS)
BASEHUB_TOKEN=              # BaseHub API token

# Legacy (migrating away)
DATABASE_URL=               # PostgreSQL
SUPABASE_URL=              # Supabase project
SUPABASE_ANON_KEY=         # Public key

# Next.js
NEXT_PUBLIC_SERVER_URL=    # Public URL
```

## Common Patterns

### Page Component Pattern
```typescript
// app/(app)/page.tsx
import { basehub } from 'basehub'
import { Section } from '@/components/ui/section'
import { H1, M } from '@/components/ui/typography'

export default async function Page() {
  // Fetch data in Server Component
  const data = await basehub().query({
    sectionsAndPages: {
      heroSection: {
        mainHeroText: true
      }
    }
  })

  return (
    <Section background="grid" fullHeight>
      <H1>{data.sectionsAndPages.heroSection.mainHeroText}</H1>
    </Section>
  )
}

// Generate metadata
export async function generateMetadata() {
  const data = await basehub().query({
    sectionsAndPages: {
      heroSection: {
        meta: { title: true, desc: true }
      }
    }
  })

  return {
    title: data.sectionsAndPages.heroSection.meta?.title,
    description: data.sectionsAndPages.heroSection.meta?.desc
  }
}
```

### RichText Rendering Pattern
```typescript
import { RichText } from 'basehub/react-rich-text'
import Image from 'next/image'

<RichText
  content={data.text.json.content}
  components={{
    img: ({ src, alt, width, height }) => (
      <Image
        src={src}
        alt={alt || ''}
        width={width || 800}
        height={height || 600}
        className="border-4 border-foreground shadow-neo"
      />
    )
  }}
/>
```

### Two-Column Detail Page Pattern
```typescript
// app/projects/[slug]/page.tsx
export default async function ProjectPage({ params }) {
  const data = await basehub().query({
    projects: {
      items: {
        __args: {
          filter: { _sys_slug: { eq: params.slug } },
          first: 1
        },
        _id: true,
        _title: true,
        text: { json: { content: true, toc: true } },
        technology: { _title: true, url: true }
      }
    }
  })

  const project = data.projects.items[0]

  return (
    <Section columns={2} background="grid">
      <Section.Left>
        <Card>
          <CardContent>
            <RichText content={project.text.json.content} />
          </CardContent>
        </Card>
      </Section.Left>

      <Section.Right>
        {/* Sticky sidebar content */}
        <div className="sticky top-24 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              {project.technology.map(tech => (
                <NeoBadge key={tech._title}>
                  <S>{tech._title}</S>
                </NeoBadge>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section.Right>
    </Section>
  )
}
```

## Troubleshooting

### Common Issues

**Typography not rendering:**
- Check that you're importing from `@/components/ui/typography`
- Verify you're NOT using raw HTML elements
- Ensure responsive classes aren't being overridden

**BaseHub query errors:**
- Regenerate types: `pnpm basehub`
- Check `basehub-types.d.ts` for available fields
- Verify environment variable `BASEHUB_TOKEN` is set

**Build failures:**
- Run `pnpm check` to fix Biome issues
- Check TypeScript errors: `tsc --noEmit`
- Verify all imports are correct

**Image not loading:**
- Check `next.config.mjs` remotePatterns
- Verify image source domain is allowed
- Use Next.js Image component, not `<img>`

## Quick Reference

### Essential Commands
```bash
pnpm install          # Install dependencies
pnpm check            # Lint + format with Biome
pnpm build            # Build for production
pnpm test             # Run tests
pnpm basehub          # Regenerate BaseHub types
```

### Essential Skills
```bash
next-best-practices        # Validate Next.js code (USE BEFORE IMPLEMENTING)
web-design-guidelines      # Review UI/UX compliance (USE BEFORE COMMITTING)
frontend-design            # Create new interfaces with Neobrutalism
feature-dev:feature-dev    # Guided complex feature development
find-skills                # Discover more skills
```

### Key Imports
```typescript
// Typography (ALWAYS FIRST)
import { H1, H2, H3, H4, Lead, L, M, S, XS, Code, Muted } from '@/components/ui/typography'

// Layout
import { Section } from '@/components/ui/section'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

// Interactive
import { Button } from '@/components/ui/button'
import { IconLink } from '@/components/ui/icon-link'
import { NeoBadge } from '@/components/ui/neoBadge'

// Data
import { basehub } from 'basehub'
import { RichText } from 'basehub/react-rich-text'
```

### File Locations
```
Components:     src/components/ui/
Sections:       src/components/sections/
Pages:          src/app/(app)/
Content Utils:  src/lib/content/
Types:          basehub-types.d.ts
Config:         basehub.config.ts, next.config.mjs
```

---

**Remember:** ASK → PLAN → CONFIRM → EXECUTE. Quality over speed. KISS principle always.
