# Technologies, Frameworks, and Technical Constraints

## Core Technology Stack

### Frontend Technologies

#### Framework and Runtime
- **Next.js 15**: React framework with App Router for modern web development
- **React 19**: Latest React version for component-based UI development
- **TypeScript**: Type-safe JavaScript development with TSX for React components
- **Node.js**: Runtime environment for server-side functionality

#### Styling and Design
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS processing for optimization and browser compatibility
- **shadcn/ui**: Component library based on Radix UI primitives
- **Neobrutalism.dev**: Design inspiration and component patterns
- **CSS Variables**: Custom properties for consistent theming

#### UI Component Libraries
- **Radix UI**: Accessible, unstyled UI primitives
  - Dropdown Menu, Navigation Menu, Tabs, Dialog, Popover, etc.
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Icon library for consistent iconography

### Backend and Infrastructure

#### Content Management
- **Payload CMS**: Self-hosted, code-first CMS integrated with Next.js
- **@payloadcms/storage-s3**: S3-compatible storage adapter for media
- **@payloadcms/email-resend**: Email service integration

#### Database and Storage
- **PostgreSQL**: Primary database via Supabase
- **Supabase**: Backend-as-a-Service providing database and storage
- **Supabase Blob Storage**: Object storage for media assets

#### Hosting and Deployment
- **Vercel**: Web application hosting with automatic deployments
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment
- **Git**: Version control with GitHub

### Development Tools

#### Code Quality
- **Biome**: Unified linting and formatting tool (replaces ESLint + Prettier)
  - Configuration: `biome.json`
  - Rules: Correctness, suspicious code detection, style enforcement
  - Format: Single quotes, no trailing commas, semicolons, 100 char line width

#### Package Management
- **PNPM**: Fast, disk space efficient package manager
- **Dependencies**: Managed through `package.json` and `pnpm-lock.yaml`

#### Git Workflow
- **Husky**: Git hooks for automated quality checks
- **lint-staged**: Pre-commit linting and formatting
- **Conventional Commits**: Structured commit message format

## Technical Constraints and Requirements

### Performance Requirements
- **Core Web Vitals**: Must meet Google's performance standards
- **Mobile Performance**: Optimized for mobile devices (primary audience)
- **Loading Speed**: Fast initial page load and navigation
- **Image Optimization**: Efficient media delivery and caching

### Browser Compatibility
- **Modern Browsers**: Support for latest Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **JavaScript**: ES2022+ features with appropriate polyfills
- **CSS**: Modern CSS features with fallbacks

### Accessibility Requirements
- **WCAG 2.1 AA**: Web Content Accessibility Guidelines compliance
- **Screen Readers**: Full compatibility with assistive technologies
- **Keyboard Navigation**: Complete functionality without mouse
- **Color Contrast**: High contrast ratios (enhanced by Neobrutalism design)

### Security Constraints
- **HTTPS**: Secure connections required for all production traffic
- **Content Security Policy**: CSP headers for XSS protection
- **Environment Variables**: Secure handling of sensitive configuration
- **Database Security**: Supabase Row Level Security (RLS) policies

## Dependency Management

### Core Dependencies

#### React Ecosystem
```json
{
  "react": "^19.x.x",
  "next": "^15.x.x",
  "@types/react": "^18.x.x",
  "@types/node": "^22.x.x"
}
```

#### Payload CMS Stack
```json
{
  "payload": "^3.x.x",
  "@payloadcms/storage-s3": "^3.x.x",
  "@payloadcms/email-resend": "^3.x.x",
  "@payloadcms/plugin-redirects": "^3.x.x"
}
```

#### UI and Styling
```json
{
  "tailwindcss": "^3.x.x",
  "@radix-ui/react-*": "^1.x.x",
  "framer-motion": "^11.x.x",
  "lucide-react": "^0.x.x"
}
```

#### Development Tools
```json
{
  "@biomejs/biome": "^1.x.x",
  "husky": "^9.x.x",
  "lint-staged": "^15.x.x"
}
```

### Development Dependencies
- **TypeScript**: Type checking and compilation
- **@types packages**: Type definitions for libraries
- **Biome**: Code quality and formatting
- **Husky**: Git hooks setup

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **zod**: Schema validation and type safety
- **clsx**: Conditional className utility
- **tailwind-merge**: TailwindCSS class merging

## Configuration Files

### Build and Development
- **`next.config.mjs`**: Next.js configuration
- **`tsconfig.json`**: TypeScript compiler configuration
- **`tailwind.config.ts`**: TailwindCSS configuration with custom theme
- **`postcss.config.cjs`**: PostCSS processing configuration

### Code Quality
- **`biome.json`**: Biome linting and formatting rules
- **`.prettierignore`**: File exclusions for formatting
- **`.gitignore`**: Git version control exclusions

### Package Management
- **`package.json`**: Project metadata and dependencies
- **`pnpm-lock.yaml`**: Locked dependency versions

### Component Library
- **`components.json`**: shadcn/ui component configuration

## Environment Configuration

### Environment Variables
Required for development and production:

```bash
# Database
DATABASE_URL=          # PostgreSQL connection string
DIRECT_DATABASE_URL=   # Direct database connection

# Supabase
SUPABASE_URL=         # Supabase project URL
SUPABASE_ANON_KEY=    # Public anonymous key
SUPABASE_SERVICE_KEY= # Service role key (server-side)

# Storage
S3_ENDPOINT=          # S3-compatible endpoint
S3_ACCESS_KEY_ID=     # Storage access key
S3_SECRET_ACCESS_KEY= # Storage secret key
S3_BUCKET=           # Storage bucket name
S3_REGION=           # Storage region

# Email
RESEND_API_KEY=      # Email service API key

# Security
PAYLOAD_SECRET=      # Payload CMS encryption key
NEXT_PUBLIC_SERVER_URL= # Public server URL
```

### Deployment Configuration
- **`vercel.json`**: Vercel deployment settings
- **`.github/workflows/`**: GitHub Actions CI/CD pipelines

## Technical Limitations and Constraints

### Performance Constraints
- **Bundle Size**: Keep JavaScript bundles under 244 KB for optimal loading
- **Image Optimization**: Required for all media assets
- **Database Queries**: Efficient querying to prevent slow page loads
- **Server-Side Rendering**: Balance between SSR and client-side performance

### Development Constraints
- **TypeScript Strict Mode**: All code must pass strict type checking
- **Code Quality**: Biome rules must pass for all commits
- **Component Standards**: Must use established component patterns
- **Responsive Design**: All components must work across device sizes

### Infrastructure Constraints
- **Vercel Limits**: Function execution time and memory limits
- **Supabase Limits**: Database connection and storage quotas
- **GitHub Actions**: CI/CD pipeline runtime limits
- **CDN**: Proper caching strategies required for performance

### Content Management Constraints
- **CMS Schema**: Changes must maintain backward compatibility
- **Media Storage**: File size and format limitations
- **Database Schema**: Migration strategy for schema changes
- **Content Types**: Structured content requirements for components

## Migration and Upgrade Strategy

### Recent Technology Migrations
- **Code Quality Tools** (2024-12-19): ESLint + Prettier → Biome
- **Typography System** (2024-12-20): Custom responsive classes → Unified components
- **Component Architecture** (2024-12-20): Custom implementations → Reusable components

### Future Upgrade Considerations
- **Next.js**: Regular updates for performance and security
- **React**: Migration to latest features and patterns
- **Payload CMS**: Version updates for new features
- **Dependencies**: Regular security updates and feature upgrades

### Compatibility Maintenance
- **Browser Support**: Regular testing across target browsers
- **Mobile Compatibility**: Continuous mobile device testing
- **Accessibility**: Regular accessibility audits and improvements
- **Performance**: Ongoing performance monitoring and optimization 