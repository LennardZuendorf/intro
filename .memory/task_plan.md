
# Technical Implementation Plan: Payload CMS to BaseHub CMS Migration

## 🏗️ UPDATED ARCHITECTURE STATUS

### ✅ COMPLETED FOUNDATION
**BaseHub Infrastructure**: 
- BaseHub MCP properly configured in `.cursor/mcp.json`
- BaseHub SDK installed (`basehub@9.2.3`) 
- Generated types in `.basehub/basehub-types.d.ts`
- Schema implemented with Projects, Experiences, and component types

**Current BaseHub Schema Analysis**:
```typescript
// IMPLEMENTED COLLECTIONS
Projects: {
  items: ProjectsItem[] // title, shortDescription, meta, technology
}

Experiences: {
  items: ExperiencesItem[] // company, dates, jobActivities, skills  
}

// IMPLEMENTED COMPONENTS  
TechComponent     // Technology tags with links
SkillComponent    // Skill categorization  
SocialsComponent  // Social media links
UntitledComponent // Generic components

// IMPLEMENTED GLOBALS
AboutSection      // aboutMeText, quickSkillsShowcase
HeroSection       // mainHeroText
```

## 📋 REVISED MIGRATION PHASES

### Phase 1: Content Audit & Export (IMMEDIATE)
**Objective**: Export Payload content and map to existing BaseHub schema

**Using BaseHub MCP Tools**:
1. **Inspect Current BaseHub Content**
   - Use MCP to examine existing BaseHub data
   - Document current schema structure
   - Identify any content already migrated

2. **Payload Content Export**
   - Export all Payload collections systematically
   - Map Payload structure to BaseHub schema
   - Create content transformation scripts

**Implementation Tasks**:
- [ ] Use BaseHub MCP to inspect current content state
- [ ] Export Payload ProjectPost → BaseHub ProjectsItem mapping
- [ ] Export Payload Experience → BaseHub ExperiencesItem mapping  
- [ ] Export Payload Tag → BaseHub TechComponent/SkillComponent mapping
- [ ] Export Payload Media → BaseHub asset mapping

### Phase 2: Content Migration Execution (WEEK 1)
**Objective**: Transfer all content from Payload to BaseHub using MCP tools

**Migration Strategy**:
```typescript
// Content Mapping Strategy
PayloadProjectPost → BaseHub ProjectsItem {
  title → title
  shortDescription → shortDescription
  slug → _slug  
  featuredImage → meta reference
  content → rich text content
  technologies → technology component references
  githubUrl/liveUrl → link components
  publishedAt → _sys metadata
}

PayloadExperience → BaseHub ExperiencesItem {
  company → companyDescription  
  position → _title
  startDate/endDate → date fields
  description + responsibilities → jobActivities rich text
  technologies → skills (UntitledComponent references)
}
```

**MCP-Assisted Migration Tasks**:
- [ ] Use MCP tools to create BaseHub content systematically
- [ ] Migrate projects with proper technology component references
- [ ] Migrate experiences with skill component associations
- [ ] Upload and reference media assets via BaseHub CDN
- [ ] Validate content integrity using MCP queries

### Phase 3: Application Integration (WEEK 2)
**Objective**: Replace Payload API calls with BaseHub GraphQL queries

**API Integration Pattern**:
```typescript
// lib/basehub.ts (CREATE)
import { basehub } from 'basehub'

export const client = basehub({
  draft: process.env.NODE_ENV === 'development'
})

// lib/content/fetchProjects.ts (REPLACE)
export async function fetchProjects() {
  const data = await client.query({
    projects: {
      items: {
        _id: true,
        _title: true,
        _slug: true,
        shortDescription: true,
        meta: {
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

// lib/content/fetchExperiences.ts (REPLACE)
export async function fetchExperiences() {
  const data = await client.query({
    experiences: {
      items: {
        _title: true,
        companyDescription: true,
        startDate: true,
        endDate: true,
        jobActivities: {
          html: true,
          plainText: true
        },
        skills: {
          _title: true
        }
      }
    }
  })
  
  return data.experiences.items
}
```

**Integration Tasks**:
- [ ] Create BaseHub client configuration
- [ ] Replace all content fetching functions
- [ ] Update server components with BaseHub queries
- [ ] Implement ISR caching with webhook revalidation
- [ ] Test all pages render correctly with BaseHub data

### Phase 4: Infrastructure Migration (WEEK 3)
**Objective**: Remove Payload infrastructure and finalize BaseHub integration

**Cleanup Strategy**:
```bash
# Remove Payload Dependencies
- src/app/(payload)/     # Admin routes
- src/collections/       # Payload collections  
- src/migrations/        # Database migrations
- src/payload.config.ts  # Payload configuration

# Update Package Dependencies
- Remove: payload, @payloadcms/* packages
- Keep: basehub (already installed)
- Update: environment variables
```

**Environment Migration**:
```bash
# REMOVE (Payload/Supabase)
POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD, etc.
S3_ACCESS_KEY, S3_SECRET_KEY, S3_STORAGE_URL, etc.
PAYLOAD_SECRET

# KEEP (BaseHub - already configured)  
BASEHUB_TOKEN (✅ in env.js)

# ADD (Production)
BASEHUB_WEBHOOK_SECRET (for revalidation)
```

**Infrastructure Tasks**:
- [ ] Remove all Payload CMS files and dependencies
- [ ] Clean up environment variables  
- [ ] Update build scripts (remove Payload commands)
- [ ] Configure BaseHub webhooks for revalidation
- [ ] Test deployment pipeline without Payload

## 🔧 IMPLEMENTATION ARCHITECTURE

### BaseHub Client Integration
```typescript
// lib/basehub.ts
import { basehub } from 'basehub'

export const client = basehub({
  // Configuration loaded from basehub.config.ts
  draft: process.env.NODE_ENV === 'development'
})

// Type-safe queries with generated types
export type ProjectsQuery = typeof client.query.projects
export type ExperiencesQuery = typeof client.query.experiences
```

### Component Updates
```typescript
// components/sections/projects.tsx (UPDATE)
import { fetchProjects } from '@/lib/content/fetchProjects'

export async function ProjectsSection() {
  const projects = await fetchProjects()
  
  return (
    <Section>
      {projects.map((project) => (
        <ProjectCard 
          key={project._id}
          title={project._title}
          description={project.shortDescription}
          technologies={project.technology?.map(t => t._title)}
          slug={project._slug}
        />
      ))}
    </Section>
  )
}

// components/sections/about.tsx (UPDATE)  
import { fetchAboutSection } from '@/lib/content/fetchAboutSection'

export async function AboutSection() {
  const aboutData = await fetchAboutSection()
  
  return (
    <Section>
      <div dangerouslySetInnerHTML={{ 
        __html: aboutData.aboutMeText?.html 
      }} />
      <QuickSkillsShowcase skills={aboutData.quickSkillsShowcase} />
    </Section>
  )
}
```

### Webhook Integration
```typescript
// app/api/revalidate/route.ts (CREATE)
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Verify BaseHub webhook signature
  const signature = request.headers.get('x-basehub-signature')
  if (!verifyWebhookSignature(signature, body)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 })
  }
  
  // Revalidate based on content type
  switch (body.type) {
    case 'projects.updated':
      revalidateTag('projects')
      revalidatePath('/projects')
      break
    case 'experiences.updated':
      revalidateTag('experiences')
      revalidatePath('/')
      break
    case 'about.updated':
      revalidatePath('/')
      break
  }
  
  return Response.json({ revalidated: true })
}
```

## 🎯 SUCCESS CRITERIA & VALIDATION

### Technical Validation
- [ ] All pages render with BaseHub data (100% functional parity)
- [ ] Performance maintained or improved vs. Payload baseline
- [ ] Type safety maintained throughout application  
- [ ] Build and deployment pipeline functional
- [ ] No broken links or missing content

### Content Validation  
- [ ] All projects migrated with complete metadata
- [ ] All experiences migrated with proper date formatting
- [ ] All media assets accessible via BaseHub CDN
- [ ] Rich text content properly formatted
- [ ] Technology/skill relationships preserved

### Performance Validation
- [ ] Page load times ≤ current baseline
- [ ] Core Web Vitals maintained or improved
- [ ] Image optimization working via BaseHub CDN
- [ ] Caching strategy effective (webhook revalidation working)

## 🚀 EXECUTION TIMELINE

**Week 1: Content Migration**
- Days 1-2: Content audit using BaseHub MCP tools
- Days 3-4: Execute content migration with MCP assistance
- Days 5-7: Content validation and refinement

**Week 2: Application Integration**  
- Days 8-10: Implement BaseHub API integration
- Days 11-12: Update all server components
- Days 13-14: Test and optimize performance

**Week 3: Infrastructure Cleanup**
- Days 15-17: Remove Payload dependencies  
- Days 18-19: Configure production webhooks
- Days 20-21: Final testing and deployment

---

**Migration Strategy**: ✅ MCP-Assisted Content Migration with Parallel Development  
**Risk Level**: Low-Medium (BaseHub infrastructure already proven)  
**Ready to Execute**: Immediate start with BaseHub MCP tools 