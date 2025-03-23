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

- ESLint & Prettier for code quality and formatting
- Husky for git hooks
- TypeScript for type safety
- PNPM as package manager
