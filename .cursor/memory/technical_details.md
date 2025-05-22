# Technical Details

## Architecture Overview

The project is built on a modern web development stack with the following architecture:

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (TSX)
- **Styling**: TailwindCSS with PostCSS
- **UI Components**: Custom components based on shadcn/ui with a Neobrutalism design approach from neobrutalism.dev

### Backend & CMS

- **CMS**: Payload CMS (self-hosted)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Blob Storage (via @payloadcms/storage-s3 adapter)
- **Email Service**: Resend (via @payloadcms/email-resend)
- **Hosting**: Vercel

### Project Structure

- **/src/app/(app)**: Main application routes
- **/src/app/(payload)**: Payload CMS related routes
- **/src/components**: UI components (shared, sections, UI primitives)
- **/src/collections**: Payload CMS collection definitions
- **/src/hooks**: Custom React hooks
- **/src/lib**: Utility functions and shared logic
- **/src/public**: Static assets
- **/supabase**: Supabase configuration and related files

### Site Structure

- **Homepage (/)**: Single-page approach with sections:
  - Hero section
  - About section
  - Projects section
- **Project Pages (/projects/[project-name])**: Individual pages for each project
- **Legal Page (/legal)**: Contains legal information and policies

## Key Implementation Details

### Design System

- Based on the Neobrutalism aesthetic from neobrutalism.dev
- Utilizes shadcn/ui components with custom styling
- Features bold colors, strong borders, and distinctive visual hierarchy typical of Neobrutalism
- Consistent design language throughout the website

### UI Components

The application uses a mix of:

- Base Radix UI primitives
- shadcn/ui components
- Neobrutalism-styled components
- Custom-built components in `/src/components`

### Content Management

- Payload CMS is integrated directly into the Next.js application
- Collection types include:
  - Users (authentication)
  - Media (file management)
  - Experiences (likely professional experience/resume data)
  - Tags (categorization)
  - ProjectPost (portfolio project entries)
- Global types include:
  - PageContent (general site content)
  - LegalTexts (privacy policy, terms, etc.)

### Navigation & Routing

- Next.js App Router for page routing
- Dynamic routes for project pages (/projects/[project-name])
- Single-page homepage with section navigation
- Links between homepage sections and individual project pages

### Data Flow

1. Content is managed via Payload CMS admin interface
2. Data is stored in PostgreSQL database via Supabase
3. Media is stored using Supabase Blob Storage
4. Next.js application fetches data via Payload API (likely server components)
5. UI renders content based on retrieved data

### Deployment

- CI/CD via GitHub Actions for automated testing and deployment
- Hosted on Vercel (as indicated by vercel.json and .vercel directory)
- Database and storage provided by Supabase
- Environment variables managed through .env file and Vercel

## Dependencies & Tooling

### Core Dependencies

- Next.js, React 19
- Payload CMS and its associated plugins
- TailwindCSS, PostCSS
- Radix UI components
- Various utilities (date-fns, zod, etc.)

### Development Tools

- Biome for code linting and formatting
- Husky for git hooks
- TypeScript for type safety
- PNPM as package manager

### Code Quality Tools

#### Biome Configuration

The project uses Biome as a unified tool for code linting and formatting. The configuration is defined in `biome.json` with the following key features:

- **Linting**: Enables recommended rules with customizations for project needs
  - `correctness.noUnusedVariables`: Set to error level to prevent unused variable declarations
  - `suspicious.noExplicitAny`: Set to warning level to discourage but not block use of `any` type
  - `style.noNonNullAssertion`: Disabled to allow non-null assertions where needed
  - Accessibility and security rules configured based on project requirements
  
- **Formatting**: Consistent code style throughout the project
  - Single quotes for both regular and JSX strings
  - No trailing commas
  - Always use semicolons
  - 100 character line width
  - 2 space indentation
  
- **File Exclusions**: Configuration excludes specific files and directories
  - Build artifacts and caches (`.next`, `node_modules`, etc.)
  - Generated files like `payload-types.ts`
  - Migration files and specific utility files

#### Package.json Scripts

```json
{
  "scripts": {
    "lint": "biome lint .",
    "format": "biome format --write .",
    "check": "biome check --write ."
  }
}
```

#### Pre-commit Hooks

The project uses Husky with lint-staged to ensure code quality before commits:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["biome check --write"],
    "*.{json,html}": ["biome format --write"]
  }
}
```

## Component Architecture Updates

### Reusable Section Component

The project now includes a highly reusable Section component that standardizes layout structures across the site. This component provides consistent styling and behavior while supporting different visual treatments.

#### Section Component Features

- **Flexible Background Options**: Supports three background types:
  - `grid`: Uses BackgroundGrid component for a consistent grid pattern
  - `mask`: Applies a masked grid background with radial gradient
  - `none`: Simple background without special treatment
  
- **Component Composition**: 
  - Provides standardized container structure
  - Supports rendering as different HTML elements via `as` prop
  - Configurable container direction (row or column)
  - Customizable content centering and alignment
  
- **Styling Customization**:
  - Configurable max-width and container width
  - Custom padding and spacing
  - Grid size and mask intensity adjustments
  - Full height toggle for viewport-height sections
  
- **Usage Examples**:
  - Hero section: Uses grid background with row layout
  - About section: Uses grid background with custom content layout
  - Footer: Uses mask background with custom styling

#### Section Component Grid Layout Update (2024-06-09)

- **Change:** When `columns=2`, Section now uses CSS Grid for layout.
- **Grid Structure:**
  - `grid-template-columns: 1fr 1fr` (two equal columns on large screens, one column on small screens)
  - `grid-template-rows: auto auto` (top row for columns, bottom row for full-width content)
- **Placement:**
  - `<Section.Left>`: grid column 1
  - `<Section.Right>`: grid column 2
  - `<Section.Bottom>`: spans both columns in the second row (`col-span-2` on large screens)
- **Responsive:**
  - On small screens, columns stack vertically; on large screens, they are side by side.
- **Usage:**
  - Enables layouts with two columns above and a full-width row below, matching common design patterns for about, hero, or feature sections.

#### Section.Bottom Feature (2024-06-09)

- **Purpose**: Allows a full-width row below the two columns in the Section component when `columns=2`.
- **Usage**: Use `<Section.Bottom>` as a child of Section. When present, it renders below the left and right columns, spanning the full width of the section container.
- **Implementation**: Section extracts Section.Left, Section.Right, and Section.Bottom from its children. If Section.Bottom is present, it is rendered in a new row below the columns, with appropriate spacing and styling. This enables layouts where content needs to span both columns, such as footers, callouts, or additional information.
- **Backward Compatibility**: Existing usages of Section with 1 or 2 columns remain unaffected if Section.Bottom is not used.

#### Technical Implementation

```typescript
// Key component interface
interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  children: ReactNode;
  fullHeight?: boolean;
  background?: 'grid' | 'mask' | 'none';
  bgColor?: string;
  maxWidth?: string;
  containerWidth?: string;
  padding?: string;
  containerClassName?: string;
  gridSize?: string;
  maskIntensity?: number;
  columns?: 1 | 2;
  as?: ElementType;
  centerContent?: boolean;
}
```

- Section now supports a `columns` prop (default: 1). When `columns={2}`, it renders a responsive two-column layout with unified gaps and no extra padding/margin.
- Use `Section.Left` and `Section.Right` subcomponents to define column content.
- All layout logic (background, centering, maxWidth, etc.) is now centralized in Section.
- SectionGrid has been removed and all usages migrated.

### Hero Section

The hero section has been implemented using the Section component with the following features:

- Neobrutalism design elements (bold typography, strong borders, high contrast)
- Responsive layout with proper spacing and alignment
- Interactive elements and animations
- Content management through Payload CMS
- Optimized performance with proper image loading

#### Technical Stack for Hero

- Next.js Server Component for initial render
- TailwindCSS with custom Neobrutalism utility classes
- Framer Motion for animations
- Payload CMS integration for content management
- Image optimization through Next.js Image component

### About Section

The about section will be implemented in two parts:

1. Homepage About Section:

   - Condensed information with key highlights
   - Visual elements following Neobrutalism design
   - Interactive elements for engagement
   - Direct integration with CMS content

2. Dedicated About Page:
   - Full-width layout with detailed information
   - Rich content management through Payload CMS
   - Interactive elements and animations
   - Responsive design for all viewports

#### Technical Stack for About Components

- Next.js App Router for page routing
- Server Components for optimal performance
- TailwindCSS with Neobrutalism design system
- Framer Motion for animations and transitions
- Payload CMS integration for content management

## Content Management Structure

### Hero Content Model

```typescript
// Hero section content model
{
  title: {
    type: 'text',
    required: true,
  },
  subtitle: {
    type: 'text',
    required: true,
  },
  description: {
    type: 'richText',
    required: true,
  },
  ctaButton: {
    type: 'group',
    fields: {
      text: { type: 'text' },
      link: { type: 'text' },
    },
  },
  backgroundImage: {
    type: 'upload',
    relationTo: 'media',
  },
}
```

### About Content Model

```typescript
// About page content model
{
  shortBio: {
    type: 'richText',
    required: true,
  },
  fullBio: {
    type: 'richText',
    required: true,
  },
  skills: {
    type: 'array',
    fields: {
      category: { type: 'text' },
      items: { type: 'array', fields: { name: { type: 'text' } } },
    },
  },
  experience: {
    type: 'array',
    fields: {
      title: { type: 'text' },
      company: { type: 'text' },
      period: { type: 'text' },
      description: { type: 'richText' },
    },
  },
  education: {
    type: 'array',
    fields: {
      degree: { type: 'text' },
      institution: { type: 'text' },
      period: { type: 'text' },
      description: { type: 'richText' },
    },
  },
}
```

## Design System Integration

### Neobrutalism Design Elements

- Bold typography with system fonts
- High contrast color combinations
- Strong borders (3-4px) with slight offsets
- Playful interactive states
- Bold background colors
- Distinctive hover and focus states

### Animation Guidelines

- Subtle hover transitions (150-200ms)
- Page transition animations
- Scroll-triggered animations for sections
- Interactive element feedback
- Loading state animations
