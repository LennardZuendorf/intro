# System Architecture and Design Decisions

## Architecture Overview

The project is built on a modern web development stack with the following architecture:

### Frontend Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (TSX)
- **Styling**: TailwindCSS with PostCSS
- **UI Components**: Custom components based on shadcn/ui with Neobrutalism design approach from neobrutalism.dev

### Backend & CMS Architecture

- **CMS**: Payload CMS (self-hosted, integrated into Next.js)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Blob Storage (via @payloadcms/storage-s3 adapter)
- **Email Service**: Resend (via @payloadcms/email-resend)
- **Hosting**: Vercel with CI/CD via GitHub Actions

### Project Structure

```
/src/app/(app)           # Main application routes
/src/app/(payload)       # Payload CMS related routes
/src/components/         # UI components organized by type
  /ui/                   # Base UI primitives (shadcn/ui + custom)
  /sections/             # Page section components
  /shared/               # Reusable components
  /blocks/               # CMS block components
/src/collections/        # Payload CMS collection definitions
/src/hooks/              # Custom React hooks
/src/lib/                # Utility functions and shared logic
/src/public/             # Static assets
/supabase/               # Supabase configuration
```

## Design Architecture Decisions

### Component Design System

#### Typography System (Priority #1)
**Decision**: Implement comprehensive 5-breakpoint responsive typography system
- **Rationale**: Eliminates scattered responsive sizing, provides consistent scaling
- **Implementation**: 11 typography components (H1-H4, Lead, L, M, S, XS, Muted, Code)
- **Breakpoints**: base, sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Optimization**: MacBook Pro 14" specific tuning at lg: breakpoint (1024px)

#### Layout Architecture
**Decision**: Reusable Section component for consistent layouts
- **Rationale**: Standardizes layout patterns, reduces code duplication
- **Features**: Grid/mask backgrounds, 1-2 column support, responsive behavior
- **Grid Layout**: CSS Grid for two-column layouts with Section.Left/Right/Bottom subcomponents
- **Flexibility**: Configurable backgrounds, spacing, alignment, and element types

#### Component Hierarchy
**Decision**: Composition-based component architecture
- **Base Layer**: Radix UI primitives for accessibility
- **Enhancement Layer**: shadcn/ui components for consistent patterns
- **Design Layer**: Neobrutalism styling for visual distinctiveness
- **Application Layer**: Project-specific components and layouts

### Neobrutalism Design Decisions

#### Visual Philosophy
**Decision**: Bold, high-contrast Neobrutalism aesthetic
- **Rationale**: Creates memorable impression, aids accessibility, stands out professionally
- **Characteristics**: Thick borders, strong shadows, high contrast, playful rotations
- **Typography**: Aggressive font weights, title-case headings, hierarchical scaling
- **Interactions**: Clear hover states, engaging animations, obvious button styling

#### Color and Contrast
**Decision**: High-contrast color scheme with limited palette
- **Rationale**: Improves accessibility, reinforces brand personality
- **Implementation**: CSS variables for consistent theming
- **Accessibility**: Ensures WCAG compliance with contrast ratios

### Responsive Design Architecture

#### Mobile-First Strategy
**Decision**: Mobile-first responsive design with progressive enhancement
- **Rationale**: Majority of users access on mobile devices
- **Implementation**: Base styles for mobile, progressive enhancement for larger screens
- **Touch Optimization**: Touch-friendly interactive elements, appropriate spacing

#### Breakpoint Strategy
**Decision**: 5-breakpoint system with smooth progression
- **Rationale**: Eliminates jarring size jumps, provides granular control
- **Mobile**: 320px+ base sizing
- **Tablet**: 640px+ (sm) enhanced layouts
- **Laptop**: 768px+ (md) expanded content
- **Desktop**: 1024px+ (lg) optimal viewing (MacBook Pro 14" target)
- **Large**: 1280px+ (xl) and 1536px+ (2xl) for large displays

## Content Management Architecture

### Payload CMS Integration
**Decision**: Integrate Payload CMS directly into Next.js application
- **Rationale**: Single deployment, shared authentication, type safety
- **Benefits**: Real-time updates, unified codebase, simplified hosting

#### Collection Design
**Content Models Defined**:
- **Users**: Authentication and user management
- **Media**: File upload and management with Supabase storage
- **Experiences**: Professional background and resume data
- **Tags**: Categorization system for projects and content
- **ProjectPost**: Portfolio project entries with rich content
- **PageContent**: General site content (Global)
- **LegalTexts**: Privacy policy, terms, etc. (Global)

**Block Components**:
- **Badge Block**: Dynamic badge component with customizable styling and optional linking

#### Data Flow Architecture
1. **Content Creation**: Payload CMS admin interface
2. **Data Storage**: PostgreSQL database via Supabase
3. **Media Storage**: Supabase Blob Storage
4. **Data Fetching**: Next.js server components via Payload API
5. **Rendering**: Server-side rendering with client hydration

### Site Structure Decisions

#### Navigation Architecture
**Decision**: Hybrid single-page + detail pages approach
- **Homepage**: Single scrollable page with sections (Hero, About, Projects)
- **Project Pages**: Individual detail pages with dynamic routing (/projects/[slug])
- **Legal Page**: Standalone page with localization support
- **Redirects**: /projects redirects to homepage projects section

**Rationale**: 
- Single-page homepage provides smooth browsing experience
- Detail pages allow deep-linking and comprehensive project information
- Maintains SEO benefits while supporting different content needs

#### Section-Based Homepage
**Decision**: Distinct homepage sections with smooth navigation
- **Hero Section**: First impression and main branding
- **About Section**: Personal/professional background
- **Projects Section**: Portfolio showcase with project links

## Component Architecture Decisions

### Card System
**Decision**: Unified Card component with multiple variants
- **Variants**: default, reversed, outline, accent, clickable
- **Features**: Rotation effects, interactive hover states, shadow options
- **Composition**: CardHeader, CardContent, CardFooter for semantic structure
- **Usage**: Experience cards, project cards, content containers

### Button System
**Decision**: Comprehensive button variants for different use cases
- **Variants**: default, neutral, noShadow, accent, link, action
- **Features**: Neobrutalism shadows, clear focus states, size options
- **Accessibility**: Keyboard navigation, screen reader support

### Interactive Components
**Decision**: Rich interactive component library
- **NeoBadge**: Rotatable, animated badges for categories and tags
- **IconLink**: Button-style links with icon positioning
- **Carousel**: Touch and keyboard navigable content carousels
- **Navigation**: Dropdown menus, tabs, pagination with consistent styling

## Performance Architecture Decisions

### Code Quality Tools
**Decision**: Migrate to Biome for unified linting and formatting
- **Rationale**: Single tool reduces complexity, faster performance than ESLint + Prettier
- **Configuration**: Centralized rules, pre-commit hooks, consistent formatting
- **Benefits**: Improved developer experience, faster CI/CD, unified standards

### Build and Deployment
**Decision**: Vercel hosting with GitHub Actions CI/CD
- **Rationale**: Seamless Next.js integration, automatic deployments, performance optimization
- **Database**: Supabase PostgreSQL for reliability and performance
- **Storage**: Supabase Blob Storage for media assets
- **Monitoring**: Built-in Vercel analytics and performance monitoring

### Accessibility Architecture
**Decision**: Accessibility-first component design
- **Implementation**: Semantic HTML, proper ARIA labels, keyboard navigation
- **Testing**: Screen reader compatibility, color contrast compliance
- **Benefits**: WCAG compliance, improved usability for all users

## Technical Debt and Refactoring Decisions

### Recent Architecture Improvements

#### Typography Migration (2024-12-20)
**Decision**: Replace scattered responsive classes with unified typography system
- **Problem**: Inconsistent sizing, scattered `text-sm md:text-base` patterns
- **Solution**: Centralized typography components with 5-breakpoint scaling
- **Impact**: Consistent scaling, easier maintenance, better mobile experience

#### Component Standardization (2024-12-20)
**Decision**: Migrate custom card implementations to reusable Card component
- **Problem**: Inconsistent styling, duplicated layout code
- **Solution**: Unified Card component with variants and proper semantic structure
- **Impact**: Consistent theming, reduced code duplication, better maintainability

#### Badge Block System (2025-01-XX)
**Decision**: Create reusable Badge block component for Payload CMS
- **Problem**: Need for dynamic badge content manageable through CMS
- **Solution**: Block component with full NeoBadge integration and optional linking
- **Impact**: Content editors can add badges with various styling options without developer intervention

#### Code Quality Migration (2024-12-19)
**Decision**: Replace ESLint + Prettier with Biome
- **Problem**: Complex configuration, slower performance, tooling conflicts
- **Solution**: Single unified tool with consistent rules
- **Impact**: Faster development workflow, simplified configuration, better performance

## Future Architecture Considerations

### Scalability Decisions
- **Content Growth**: CMS architecture supports new content types and collections
- **Performance**: Image optimization, caching strategies, CDN integration
- **Internationalization**: Structure supports future multi-language content
- **API Integration**: Architecture allows for external API integrations

### Maintenance Strategy
- **Component Library**: Documented components for consistent development
- **Type Safety**: TypeScript throughout for reduced runtime errors
- **Testing Strategy**: Foundation for unit and integration testing
- **Version Control**: Semantic versioning and change documentation 