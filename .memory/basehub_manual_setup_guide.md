# BaseHub Manual Schema Setup Guide

## Overview

Since the MCP tools aren't available, follow this step-by-step guide to create the schema manually in your BaseHub dashboard.

## Phase 1: Create Component Blocks

Navigate to your BaseHub repository dashboard and create these component blocks:

### 1. Tag Component

**Create Component Block:**
- Name: `Tag`
- Type: Component

**Add Fields:**
1. **Name** (Text)
   - API Name: `name`
   - Required: Yes
   - Description: "Name of the tag, will be used as label"

2. **Type** (Select)
   - API Name: `type`
   - Required: Yes
   - Options: `techstack`, `skill`, `socials`, `other`
   - Default: `techstack`
   - Description: "Category of the tag - can be tech, skill, social or internal"

3. **Link** (Text)
   - API Name: `link`
   - Required: No
   - Description: "Optional URL link"

### 2. Media Component

**Create Component Block:**
- Name: `Media`
- Type: Component

**Add Fields:**
1. **File** (Media)
   - API Name: `file`
   - Required: Yes
   - Description: "Upload file"

2. **Alt Text** (Text)
   - API Name: `altText`
   - Required: Yes
   - Description: "Alternative text for accessibility"

3. **Caption** (Rich Text)
   - API Name: `caption`
   - Required: No
   - Description: "Optional caption for the media"

### 3. Experience Component

**Create Component Block:**
- Name: `Experience`
- Type: Component

**Add Fields:**
1. **Company** (Text)
   - API Name: `company`
   - Required: Yes

2. **Position** (Text)
   - API Name: `position`
   - Required: Yes

3. **URL** (Text)
   - API Name: `url`
   - Required: No
   - Description: "Company website URL (optional)"

4. **Start Date** (Date)
   - API Name: `startDate`
   - Required: Yes

5. **End Date** (Date)
   - API Name: `endDate`
   - Required: No
   - Description: "Leave blank if still working here"

6. **Skills** (Reference)
   - API Name: `skills`
   - Required: No
   - Multiple: Yes
   - Reference Type: `Tag` component
   - Description: "Related skills (tags with type 'skill')"

7. **Description** (Text)
   - API Name: `description`
   - Required: No

8. **Responsibility One** (Text)
   - API Name: `responsibilityOne`
   - Required: Yes

9. **Responsibility Two** (Text)
   - API Name: `responsibilityTwo`
   - Required: No

10. **Responsibility Three** (Text)
    - API Name: `responsibilityThree`
    - Required: No

### 4. Project Post Component

**Create Component Block:**
- Name: `Project Post`
- Type: Component

**Add Fields:**
1. **Title** (Text)
   - API Name: `title`
   - Required: Yes

2. **Short Description** (Text)
   - API Name: `shortDescription`
   - Required: Yes

3. **Slug** (Text)
   - API Name: `slug`
   - Required: Yes
   - Description: "URL-friendly identifier"

4. **Hero Image** (Reference)
   - API Name: `heroImage`
   - Required: No
   - Multiple: No
   - Reference Type: `Media` component

5. **Content** (Rich Text)
   - API Name: `content`
   - Required: Yes
   - Description: "Main project content with rich formatting"

6. **Technologies** (Reference)
   - API Name: `technologies`
   - Required: No
   - Multiple: Yes
   - Reference Type: `Tag` component
   - Description: "Technologies used (tags with type 'techstack')"

7. **Live URL** (Text)
   - API Name: `liveUrl`
   - Required: No
   - Description: "Link to live project"

8. **Repository URL** (Text)
   - API Name: `repositoryUrl`
   - Required: No
   - Description: "Link to project repository"

9. **Published At** (Date)
   - API Name: `publishedAt`
   - Required: No

## Phase 2: Create Document Blocks (Singletons)

### 1. Section Content Document

**Create Document Block:**
- Name: `Section Content`
- Type: Document

**Add Fields:**
1. **Main Intro Section** (Rich Text)
   - API Name: `mainIntroSection`
   - Required: Yes
   - Description: "Text displayed in the intro card"

2. **Main About Me Section** (Rich Text)
   - API Name: `mainAboutMeSection`
   - Required: Yes
   - Description: "Text displayed in the about me card"

3. **Avatar** (Reference)
   - API Name: `avatar`
   - Required: No
   - Multiple: No
   - Reference Type: `Media` component
   - Description: "Main avatar/picture"

4. **Selected Project** (Reference)
   - API Name: `selectedProject`
   - Required: No
   - Multiple: No
   - Reference Type: `Project Post` component
   - Description: "Single project shown on the project preview card"

5. **Selected Experience** (Reference)
   - API Name: `selectedExperience`
   - Required: No
   - Multiple: No
   - Reference Type: `Experience` component
   - Description: "Single (current) experience shown on the experience preview card"

6. **Quick Skill 1** (Text)
   - API Name: `quickSkill1`
   - Required: No
   - Description: "First skill for display"

7. **Quick Skill 2** (Text)
   - API Name: `quickSkill2`
   - Required: No
   - Description: "Second skill for display"

8. **Quick Skill 3** (Text)
   - API Name: `quickSkill3`
   - Required: No
   - Description: "Third skill for display"

9. **Quick Skill 4** (Text)
   - API Name: `quickSkill4`
   - Required: No
   - Description: "Fourth skill for display"

### 2. Site Controls Document

**Create Document Block:**
- Name: `Site Controls`
- Type: Document

**Add Fields:**
1. **Show Projects** (Boolean)
   - API Name: `showProjects`
   - Required: No
   - Default: true
   - Description: "Show projects section on the landing page"

2. **Show About** (Boolean)
   - API Name: `showAbout`
   - Required: No
   - Default: true
   - Description: "Show about section on the landing page"

3. **LinkedIn** (Reference)
   - API Name: `linkedin`
   - Required: No
   - Multiple: No
   - Reference Type: `Tag` component
   - Description: "Link to LinkedIn profile (tag with type 'socials')"

4. **GitHub** (Reference)
   - API Name: `github`
   - Required: No
   - Multiple: No
   - Reference Type: `Tag` component
   - Description: "Link to GitHub profile (tag with type 'socials')"

5. **Mail** (Reference)
   - API Name: `mail`
   - Required: No
   - Multiple: No
   - Reference Type: `Tag` component
   - Description: "Email contact (tag with type 'socials')"

### 3. Legal Content Document

**Create Document Block:**
- Name: `Legal Content`
- Type: Document

**Add Fields:**
1. **English Text** (Rich Text)
   - API Name: `englishText`
   - Required: Yes
   - Description: "Formatted text displayed as English speaking legal disclaimers"

2. **German Text** (Rich Text)
   - API Name: `germanText`
   - Required: Yes
   - Description: "Formatted text displayed as German speaking legal disclaimers"

3. **Privacy** (Rich Text)
   - API Name: `privacy`
   - Required: No
   - Description: "Additional information about privacy"

## Phase 3: Create Collection Blocks

### 1. Tags Collection

**Create Collection Block:**
- Name: `Tags`
- Type: Collection
- Component Template: `Tag`
- Description: "Collection of all tags for technologies, skills, and social links"

### 2. Media Collection

**Create Collection Block:**
- Name: `Media Collection`
- Type: Collection
- Component Template: `Media`
- Description: "Collection of all media files"

### 3. Experiences Collection

**Create Collection Block:**
- Name: `Experiences`
- Type: Collection
- Component Template: `Experience`
- Description: "Collection of work experiences"

### 4. Projects Collection

**Create Collection Block:**
- Name: `Projects`
- Type: Collection
- Component Template: `Project Post`
- Description: "Collection of project posts"

## Phase 4: Test and Generate Types

After creating the schema:

1. **Commit Changes**: Save and commit all changes in BaseHub
2. **Generate Types**: Run `pnpm basehub` in your project
3. **Test GraphQL**: Use BaseHub's GraphQL playground to test queries
4. **Verify Schema**: Check that all fields and relationships work correctly

## Next Steps

Once the schema is created:
1. ✅ Generate TypeScript types with `pnpm basehub`
2. 🔄 Create data fetching functions in your Next.js app
3. 🔄 Migrate existing PayloadCMS content to BaseHub
4. 🔄 Update frontend components to use BaseHub data