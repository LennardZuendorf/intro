
# Subtasks: BaseHub CMS Migration (MCP-Assisted)

## 🎯 EXECUTIVE STATUS UPDATE

**✅ FOUNDATION COMPLETE**:
- BaseHub MCP properly configured in `.cursor/mcp.json`
- BaseHub SDK installed and working (`basehub@9.2.3`)
- Generated TypeScript types available (`.basehub/basehub-types.d.ts`)
- Schema implemented with Projects, Experiences, and component types

**🚀 READY FOR EXECUTION**: Content migration and application integration

## 📋 Phase 1: Content Audit & Export (Week 1, Days 1-3)

### 1.1 BaseHub Content State Inspection
**Timeline**: Day 1 (2-3 hours)
**Method**: Use BaseHub MCP tools directly

#### Subtask 1.1.1: Current BaseHub Schema Analysis
- [ ] Use BaseHub MCP to inspect current Projects collection
- [ ] Document existing ProjectsItem structure and fields
- [ ] Use BaseHub MCP to inspect Experiences collection  
- [ ] Document ExperiencesItem structure and fields
- [ ] Inspect component types (TechComponent, SkillComponent, etc.)
- [ ] Create detailed schema mapping document
**Acceptance Criteria**:
- Complete understanding of current BaseHub schema
- Field-by-field mapping between Payload and BaseHub
- Documentation of any schema gaps or mismatches

#### Subtask 1.1.2: Current BaseHub Content Inventory
- [ ] Use BaseHub MCP to list all existing content
- [ ] Count current Projects, Experiences, and components
- [ ] Identify any test/placeholder content to preserve or remove
- [ ] Document current content state for migration planning
**Acceptance Criteria**:
- Complete inventory of existing BaseHub content
- Clear plan for handling existing vs. migrated content
- Content preservation strategy documented

### 1.2 Payload CMS Content Export
**Timeline**: Days 1-2 (4-6 hours)
**Dependencies**: 1.1 (BaseHub analysis complete)

#### Subtask 1.2.1: Export Payload Projects
- [ ] Create script to export all ProjectPost collections from Payload
- [ ] Export with all relationships (tags, media, etc.)
- [ ] Generate JSON files with complete project data
- [ ] Create mapping file: Payload ID → planned BaseHub structure
- [ ] Validate export completeness (count, required fields)
**Acceptance Criteria**:
- All projects exported with complete metadata
- Relationship data preserved
- Export validation confirms 100% data integrity

#### Subtask 1.2.2: Export Payload Experiences
- [ ] Export all Experience collections from Payload
- [ ] Include all related data (technologies, responsibilities)
- [ ] Export with proper date formatting and validation
- [ ] Create mapping file for experience data transformation
- [ ] Validate chronological ordering and data completeness
**Acceptance Criteria**:
- All experiences exported with complete work history
- Date ranges properly formatted
- Technology relationships preserved

#### Subtask 1.2.3: Export Payload Tags and Media
- [ ] Export all Tag collections with type categorization
- [ ] Export all Media collections with metadata and file paths
- [ ] Map tags to appropriate BaseHub component types
- [ ] Create asset migration plan (Supabase → BaseHub CDN)
- [ ] Validate media file accessibility and metadata
**Acceptance Criteria**:
- All tags categorized for BaseHub component mapping
- All media assets accessible with complete metadata
- Asset migration strategy validated

### 1.3 Content Transformation Strategy
**Timeline**: Day 3 (3-4 hours)
**Dependencies**: 1.2 (All exports complete)

#### Subtask 1.3.1: Create Content Mapping Scripts
- [ ] Build transformation functions for Project → ProjectsItem
- [ ] Build transformation functions for Experience → ExperiencesItem
- [ ] Create tag categorization logic (Tech/Skill/Social components)
- [ ] Build rich text content transformation utilities
- [ ] Create media asset reference update logic
**Acceptance Criteria**:
- All transformation functions tested and validated
- Content structure matches BaseHub schema exactly
- Relationship mappings preserved accurately

## 📋 Phase 2: Content Migration Execution (Week 1, Days 4-7)

### 2.1 BaseHub Content Creation (MCP-Assisted)
**Timeline**: Days 4-5 (6-8 hours)
**Method**: Direct BaseHub MCP tool usage

#### Subtask 2.1.1: Technology and Skill Components Migration
- [ ] Use BaseHub MCP to create TechComponent entries for all technologies
- [ ] Use BaseHub MCP to create SkillComponent entries for all skills
- [ ] Use BaseHub MCP to create SocialsComponent entries for social links
- [ ] Verify component creation and relationship capabilities
- [ ] Test component referencing in collections
**Acceptance Criteria**:
- All component types created with proper categorization
- Components can be referenced from collections
- MCP-based component management working correctly

#### Subtask 2.1.2: Projects Collection Migration
- [ ] Use BaseHub MCP to create ProjectsItem entries systematically
- [ ] Migrate all project metadata (title, description, dates)
- [ ] Establish technology component references
- [ ] Upload and reference project images via BaseHub CDN
- [ ] Configure project rich text content
**Acceptance Criteria**:
- All projects created with complete metadata
- Technology relationships properly established
- Media assets accessible via BaseHub CDN
- Rich text content properly formatted

#### Subtask 2.1.3: Experiences Collection Migration
- [ ] Use BaseHub MCP to create ExperiencesItem entries chronologically
- [ ] Migrate all experience metadata (company, roles, dates)
- [ ] Establish skill component references
- [ ] Configure job activities rich text content
- [ ] Validate experience timeline and current status
**Acceptance Criteria**:
- All experiences created in chronological order
- Skill relationships properly established
- Job activities rich text properly formatted
- Experience timeline accurate and complete

### 2.2 Content Validation and Optimization
**Timeline**: Days 6-7 (4-6 hours)
**Dependencies**: 2.1 (All content migrated)

#### Subtask 2.2.1: Content Integrity Validation
- [ ] Use BaseHub MCP to query all migrated content
- [ ] Validate content counts match Payload exports
- [ ] Check all relationships and references are intact
- [ ] Verify rich text content renders correctly
- [ ] Test content search and filtering capabilities
**Acceptance Criteria**:
- 100% content migration success rate
- All relationships functional
- Content renders correctly in BaseHub interface

#### Subtask 2.2.2: Performance and SEO Optimization
- [ ] Optimize image assets for BaseHub CDN delivery
- [ ] Configure SEO metadata for all content items
- [ ] Set up content slugs and URL structure
- [ ] Test content loading performance
- [ ] Validate mobile content rendering
**Acceptance Criteria**:
- Image optimization working correctly
- SEO metadata complete for all content
- URL structure matches current site patterns
- Performance benchmarks meet targets

## 📋 Phase 3: Application Integration (Week 2, Days 8-14)

### 3.1 BaseHub Client Integration
**Timeline**: Days 8-9 (4-6 hours)
**Dependencies**: Phase 2 complete

#### Subtask 3.1.1: BaseHub SDK Integration
- [ ] Create `lib/basehub.ts` with properly configured client
- [ ] Implement type-safe query patterns using generated types
- [ ] Configure development vs. production environment handling
- [ ] Test basic connectivity and query capabilities
- [ ] Set up error handling and fallback strategies
**Acceptance Criteria**:
- BaseHub client working with type safety
- Environment configuration proper for dev/prod
- Error handling robust and informative

#### Subtask 3.1.2: Content Fetching Functions
- [ ] Replace `lib/content/fetchProjects.ts` with BaseHub implementation
- [ ] Replace `lib/content/fetchExperiences.ts` with BaseHub implementation
- [ ] Create `lib/content/fetchAboutSection.ts` for global content
- [ ] Implement caching strategy with ISR tags
- [ ] Add comprehensive TypeScript types for all responses
**Acceptance Criteria**:
- All content fetching functions migrated to BaseHub
- Type safety maintained throughout application
- Caching strategy implemented correctly

### 3.2 Server Component Updates
**Timeline**: Days 10-11 (4-6 hours)
**Dependencies**: 3.1 (Client integration complete)

#### Subtask 3.2.1: Homepage Component Updates
- [ ] Update `app/(app)/page.tsx` with BaseHub data fetching
- [ ] Update `components/sections/hero.tsx` with BaseHub hero content
- [ ] Update `components/sections/about.tsx` with BaseHub about content
- [ ] Update `components/sections/projects.tsx` with BaseHub projects
- [ ] Test complete homepage rendering with BaseHub data
**Acceptance Criteria**:
- Homepage renders correctly with BaseHub content
- All sections display proper data from BaseHub
- Performance maintained or improved

#### Subtask 3.2.2: Project Detail Pages
- [ ] Update `app/(app)/projects/[slug]/page.tsx` with BaseHub queries
- [ ] Implement proper project detail data fetching
- [ ] Update project card components with BaseHub data structure
- [ ] Test dynamic routing with BaseHub slugs
- [ ] Validate project detail page performance
**Acceptance Criteria**:
- Project detail pages render correctly
- Dynamic routing working with BaseHub slugs
- Project relationships (technologies, etc.) display properly

### 3.3 Caching and Performance
**Timeline**: Days 12-14 (4-6 hours)
**Dependencies**: 3.2 (Components updated)

#### Subtask 3.3.1: ISR and Cache Strategy
- [ ] Implement cache tagging for all content types
- [ ] Configure ISR revalidation timing (1 hour fallback)
- [ ] Test cache invalidation scenarios
- [ ] Monitor cache hit rates and performance
- [ ] Optimize query performance and data fetching
**Acceptance Criteria**:
- Cache strategy working effectively
- ISR revalidation functioning correctly
- Performance metrics meet or exceed baseline

#### Subtask 3.3.2: Webhook Integration
- [ ] Create `app/api/revalidate/route.ts` for BaseHub webhooks
- [ ] Configure BaseHub webhook URLs and events
- [ ] Implement webhook signature verification
- [ ] Test automatic revalidation on content changes
- [ ] Monitor webhook delivery and reliability
**Acceptance Criteria**:
- Webhooks triggering proper cache revalidation
- Content changes reflected immediately
- Webhook security properly implemented

## 📋 Phase 4: Infrastructure Cleanup (Week 3, Days 15-21)

### 4.1 Payload Infrastructure Removal
**Timeline**: Days 15-17 (6-8 hours)
**Dependencies**: Phase 3 complete and validated

#### Subtask 4.1.1: Remove Payload Dependencies
- [ ] Remove `src/app/(payload)/` directory completely
- [ ] Remove `src/collections/` directory
- [ ] Remove `src/migrations/` directory
- [ ] Remove `src/payload.config.ts` file
- [ ] Clean up package.json dependencies (remove all @payloadcms/*)
**Acceptance Criteria**:
- All Payload-related code removed
- Application builds successfully without Payload
- No broken imports or references

#### Subtask 4.1.2: Environment Variable Cleanup
- [ ] Remove Payload environment variables from env.js
- [ ] Remove Supabase database environment variables
- [ ] Remove S3 storage environment variables
- [ ] Keep BASEHUB_TOKEN (already configured)
- [ ] Add BASEHUB_WEBHOOK_SECRET for production
**Acceptance Criteria**:
- Environment configuration streamlined
- Only necessary environment variables remain
- Production environment variables documented

### 4.2 Build and Deployment Configuration
**Timeline**: Days 18-19 (3-4 hours)
**Dependencies**: 4.1 (Cleanup complete)

#### Subtask 4.2.1: Update Build Scripts
- [ ] Remove Payload-specific build commands from package.json
- [ ] Update build process to include BaseHub type generation
- [ ] Test build process in clean environment
- [ ] Update CI/CD pipeline to handle BaseHub integration
- [ ] Validate production build optimization
**Acceptance Criteria**:
- Build process optimized for BaseHub only
- CI/CD pipeline working correctly
- Production builds generating without errors

#### Subtask 4.2.2: Production Environment Setup
- [ ] Configure production BaseHub environment variables
- [ ] Set up production webhook endpoints
- [ ] Test staging deployment with BaseHub integration
- [ ] Validate performance in production-like environment
- [ ] Configure monitoring and error tracking
**Acceptance Criteria**:
- Production environment fully functional
- Staging tests passing all validation criteria
- Monitoring and error tracking operational

### 4.3 Final Validation and Testing
**Timeline**: Days 20-21 (4-6 hours)
**Dependencies**: 4.2 (Production setup complete)

#### Subtask 4.3.1: End-to-End Testing
- [ ] Test complete user journey on staging environment
- [ ] Validate all content accessible and properly formatted
- [ ] Test content management workflow via BaseHub dashboard
- [ ] Verify SEO metadata and search engine compatibility
- [ ] Test mobile responsiveness and accessibility
**Acceptance Criteria**:
- All user journeys functional
- Content management workflow smooth
- SEO and accessibility standards maintained

#### Subtask 4.3.2: Performance and Security Validation
- [ ] Run comprehensive performance tests
- [ ] Validate Core Web Vitals scores
- [ ] Test load handling and concurrent users
- [ ] Verify webhook security and rate limiting
- [ ] Validate HTTPS and security headers
**Acceptance Criteria**:
- Performance meets or exceeds baseline
- Security implementation robust
- Load testing passes requirements

## 🎯 SUCCESS CRITERIA SUMMARY

### Migration Success Metrics
- [ ] **Content Migration**: 100% of Payload content successfully migrated
- [ ] **Functional Parity**: All website features working identically
- [ ] **Performance**: Page load times ≤ current baseline (<2s)
- [ ] **Type Safety**: Complete TypeScript integration maintained
- [ ] **Content Management**: BaseHub admin interface fully functional

### Technical Success Metrics
- [ ] **Build Process**: Clean builds without Payload dependencies
- [ ] **Error Rate**: <0.1% error rate in production
- [ ] **Cache Strategy**: >80% cache hit rate, effective revalidation
- [ ] **SEO Preservation**: No negative impact on search rankings
- [ ] **Mobile Performance**: Maintained or improved mobile experience

### Business Success Metrics
- [ ] **Zero Downtime**: Migration completed with minimal disruption
- [ ] **Content Editor Experience**: Improved or maintained ease of use
- [ ] **Infrastructure Simplification**: Reduced dependency complexity
- [ ] **AI Capabilities**: BaseHub AI features available for future use
- [ ] **Developer Experience**: Enhanced development workflow

## 🚀 EXECUTION READINESS

**Current Status**: ✅ BaseHub MCP configured and ready
**Schema Status**: ✅ Implemented and typed
**Team Readiness**: ✅ MCP tools available for migration assistance
**Risk Level**: Low-Medium (infrastructure proven, clear rollback path)

**Next Immediate Action**: Execute Subtask 1.1.1 - Use BaseHub MCP to inspect current content state

---

**Migration Approach**: MCP-Assisted Content Migration with Automated Validation
**Estimated Duration**: 15-21 days (3 weeks)
**Success Probability**: High (BaseHub foundation already established) 