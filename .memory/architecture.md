# System Architecture and Design Decisions

## Architecture Overview

The project is transitioning from a modern web development stack to a BaseHub-powered architecture:

### Current Architecture (Payload CMS)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (TSX)
- **Styling**: TailwindCSS with PostCSS
- **UI Components**: Custom components based on shadcn/ui with Neobrutalism design approach from neobrutalism.dev
- **CMS**: Payload CMS (self-hosted, integrated into Next.js)
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Blob Storage (via @payloadcms/storage-s3 adapter)
- **Email Service**: Resend (via @payloadcms/email-resend)
- **Hosting**: Vercel with CI/CD via GitHub Actions

### Target Architecture (BaseHub CMS)
- **Framework**: Next.js 15 (App Router) - *UNCHANGED*
- **Language**: TypeScript (TSX) - *UNCHANGED*
- **Styling**: TailwindCSS with PostCSS - *UNCHANGED*
- **UI Components**: Custom components based on shadcn/ui - *UNCHANGED*
- **CMS**: BaseHub CMS (AI-native headless CMS)
- **Database**: BaseHub's managed GraphQL API
- **Storage**: BaseHub CDN (with automatic optimization)
- **Email Service**: Maintained separately (Resend)
- **Hosting**: Vercel with CI/CD via GitHub Actions - *UNCHANGED*

### Project Structure (Migrated)

```
/src/app/(app)           # Main application routes - UNCHANGED
/src/components/         # UI components organized by type - UNCHANGED
  /ui/                   # Base UI primitives (shadcn/ui + custom) - UNCHANGED
  /sections/             # Page section components - UPDATED (BaseHub data)
  /shared/               # Reusable components - UNCHANGED
  /blocks/               # CMS block components - MIGRATED to BaseHub
/src/lib/                # Utility functions and shared logic
  /content/              # MIGRATED: BaseHub GraphQL fetching functions
  /basehub/              # NEW: BaseHub SDK integration
/.basehub/               # NEW: Generated BaseHub types and client
/basehub.config.ts       # NEW: BaseHub configuration
```

## BaseHub Schema Architecture (IMPLEMENTED)

Based on the generated types analysis, the BaseHub schema is already implemented with:

### Collections (Implemented)
1. **Projects Collection**
   - Type: `ProjectsItem`
   - Fields: title, shortDescription, meta, technology references
   - Status: ✅ IMPLEMENTED

2. **Experiences Collection**
   - Type: `ExperiencesItem`
   - Fields: company description, start/end dates, job activities, skills
   - Status: ✅ IMPLEMENTED

3. **Component Types (Implemented)**
   - `TechComponent` - Technology tags and links
   - `SkillComponent` - Skill categorization
   - `SocialsComponent` - Social media links
   - `UntitledComponent` - Generic component type
   - Status: ✅ IMPLEMENTED

### Global Content (Implemented)
1. **AboutSection**
   - aboutMeText (Rich Text)
   - quickSkillsShowcase
   - Status: ✅ IMPLEMENTED

2. **HeroSection**
   - mainHeroText
   - Status: ✅ IMPLEMENTED

3. **Collection Management**
   - CallsToActions, Socials, etc.
   - Status: ✅ IMPLEMENTED

## Migration Architecture Strategy

### Current Status Assessment
✅ **BaseHub Schema**: Fully implemented and typed  
✅ **BaseHub SDK**: Installed and configured (`basehub@9.2.3`)  
✅ **Type Generation**: Working and up-to-date  
✅ **MCP Integration**: Configured for schema management  
🔄 **Content Migration**: NEEDED  
🔄 **API Integration**: NEEDED  
🔄 **Admin Interface**: NEEDED  

### Migration Phases (Revised)

#### Phase 1: Content Data Export (READY TO EXECUTE)
**Status**: Ready - BaseHub schema matches Payload structure

**Payload → BaseHub Mapping**:
```typescript
// Current Payload Collections → BaseHub Collections
PayloadProjectPost → ProjectsItem {
  title → title
  shortDescription → shortDescription  
  slug → _slug
  featuredImage → meta
  technologies → technology (references)
  content → (rich text content)
  publishedAt → _sys.createdAt
}

PayloadExperience → ExperiencesItem {
  company → companyDescription
  position → _title
  startDate → startDate
  endDate → endDate
  technologies → skills (UntitledComponent references)
  responsibilities → jobActivities (rich text)
}

PayloadTag → TechComponent/SkillComponent/SocialsComponent {
  name → _title
  type → component type selection
  link → link field
}
```

#### Phase 2: Application Integration (ARCHITECTURE DEFINED)
**Content Fetching Pattern**:
```typescript
// lib/basehub.ts (NEW)
import { basehub } from 'basehub'

export const client = basehub({
  draft: process.env.NODE_ENV === 'development'
})

// lib/content/fetchProjects.ts (MIGRATED)
export async function fetchProjects() {
  const data = await client.query({
    projects: {
      items: {
        _id: true,
        _title: true,
        _slug: true,
        shortDescription: true,
        meta: {
          _id: true,
          title: true,
          desc: true
        },
        technology: {
          _title: true,
          link: { url: true }
        }
      }
    }
  })
  
  return data.projects.items
}
```

#### Phase 3: Component Migration (STRAIGHTFORWARD)
**Server Component Updates**:
```typescript
// app/(app)/page.tsx (UPDATED)
import { fetchProjects } from '@/lib/content/fetchProjects'
import { fetchExperiences } from '@/lib/content/fetchExperiences'
import { fetchAboutSection } from '@/lib/content/fetchAboutSection'

export default async function HomePage() {
  const [projects, experiences, aboutSection] = await Promise.all([
    fetchProjects(),
    fetchExperiences(), 
    fetchAboutSection()
  ])

  return (
    <>
      <HeroSection />
      <AboutSection content={aboutSection} />
      <ProjectsSection projects={projects} />
    </>
  )
}
```

#### Phase 4: Admin and Build Integration (FINAL)
**Remove Payload Dependencies**:
- Remove Payload CMS routes: `src/app/(payload)/`
- Remove Payload collections: `src/collections/`
- Remove Payload config: `src/payload.config.ts`
- Update build scripts: Remove Payload-specific commands
- Update environment variables: Remove Payload/Supabase vars

**Add BaseHub Production Integration**:
- Production environment variables for BaseHub
- Webhook configuration for ISR revalidation
- BaseHub admin access via external dashboard

## Technical Implementation Decisions

### BaseHub SDK Integration Architecture

#### Client Configuration
```typescript
// lib/basehub.ts
import { basehub } from 'basehub'

export const client = basehub({
  // Uses environment variables from basehub.config.ts
  draft: process.env.NODE_ENV === 'development'
})
```

#### Type Safety Strategy
- Generated types from BaseHub schema: `.basehub/basehub-types.d.ts`
- Automatic regeneration via `pnpm basehub` script
- Type-safe GraphQL queries with IntelliSense support

#### Caching and Performance Strategy
```typescript
// Next.js ISR with BaseHub
export async function fetchProjects() {
  const data = await client.query(
    { /* GraphQL query */ },
    { 
      next: { 
        tags: ['projects'],
        revalidate: 3600 // 1 hour fallback
      }
    }
  )
  return data.projects.items
}

// Webhook revalidation
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { type } = await request.json()
  
  switch (type) {
    case 'projects':
      revalidateTag('projects')
      break
    case 'experiences':
      revalidateTag('experiences')
      break
  }
  
  return Response.json({ revalidated: true })
}
```

### Content Management Architecture

#### BaseHub Admin Access
- **External Admin**: Access via BaseHub.com dashboard
- **MCP Integration**: Schema management via Cursor MCP tools
- **Draft Preview**: Built-in draft mode with BaseHub SDK
- **Content Workflow**: Direct content editing in BaseHub interface

#### Rich Text and Media Management
- **Rich Text**: BaseHub native rich text with blocks
- **Media Storage**: BaseHub CDN with automatic optimization
- **Asset Migration**: Transfer from Supabase to BaseHub CDN
- **Image Optimization**: Automatic responsive image generation

## Performance and Scalability Decisions

### Content Delivery Optimization
- **Global CDN**: BaseHub's global content delivery network
- **Image Optimization**: Automatic WebP/AVIF conversion and sizing
- **Edge Caching**: GraphQL response caching at edge locations
- **Incremental Regeneration**: Smart cache invalidation via webhooks

### Development Experience Improvements
- **Type Safety**: Complete TypeScript integration with generated types
- **MCP Schema Management**: AI-assisted schema modifications
- **Real-time Preview**: Instant content preview in development
- **Hot Reload**: Content changes reflected immediately in dev mode

## Migration Risk Mitigation

### Data Safety Strategy
- **Parallel Development**: Maintain Payload CMS during migration
- **Content Backup**: Export all Payload data before migration
- **Rollback Plan**: Environment variable switch for quick rollback
- **Validation**: Compare content integrity before/after migration

### Performance Validation
- **Baseline Metrics**: Current Payload CMS performance benchmarks
- **Migration Testing**: Performance testing in staging environment
- **Monitoring**: Post-migration performance monitoring
- **Optimization**: Iterative performance improvements

### SEO Preservation
- **URL Structure**: Maintain existing URL patterns
- **Meta Data**: Migrate all SEO metadata to BaseHub
- **Redirects**: Implement redirects for any URL changes
- **Search Console**: Monitor search engine indexing post-migration

## Future Architectural Considerations

### AI-Powered Features (BaseHub Native)
- **Content Generation**: AI-assisted content creation
- **SEO Optimization**: AI-powered SEO recommendations  
- **Content Analytics**: Advanced content performance insights
- **Personalization**: AI-driven content personalization

### Enhanced Developer Experience
- **Schema Evolution**: Version-controlled schema changes
- **Content Localization**: Multi-language content support
- **Advanced Workflows**: Content approval and publishing workflows
- **Integration Ecosystem**: Third-party service integrations

### Scalability Enhancements
- **Global Content Distribution**: Multi-region content delivery
- **Advanced Caching**: Intelligent cache warming and invalidation
- **Content Optimization**: Automatic content optimization
- **Performance Monitoring**: Advanced performance analytics

---

**Architecture Status**: ✅ BaseHub Schema Implemented, Ready for Content Migration
**Next Phase**: Execute content migration scripts and API integration 