# Basehub Setup Plan Using MCP Tools - IMPLEMENTATION STATUS

## Status: SDK SETUP COMPLETED - READY FOR SCHEMA CREATION
**Date**: January 15, 2025

Based on the analysis of your PayloadCMS structure and Basehub documentation, here's a step-by-step plan to set up your content structure.

## Implementation Results

✅ **BaseHub SDK Setup Completed**: 
- Installed BaseHub SDK (`basehub@9.2.3`)
- Added environment variables (BASEHUB_TOKEN, BASEHUB_TEAM, BASEHUB_REPO) to env.js
- Created basehub.config.ts with proper configuration
- Updated package.json with `basehub` script for type generation
- Added .basehub to .gitignore
- Configured to output generated types to `.basehub` directory

## Current Status

✅ **Phase 1 Complete**: SDK and project setup
🔄 **Phase 2 Ready**: Now ready to create the schema blocks in your new BaseHub repository

Since you've connected a new, fresh BaseHub repository via MCP, we can now proceed with creating the content schema according to the original plan.

## Next Steps

1. **Create Schema in BaseHub UI**: Use the BaseHub dashboard to create the blocks according to the plan
2. **Generate TypeScript Types**: Run `pnpm basehub` to generate typed client
3. **Test Schema**: Verify blocks appear in GraphQL queries
4. **Migrate Content**: Create migration scripts for PayloadCMS → BaseHub

## Available MCP Tools
- `create_blocks`: Create one or more BaseHub blocks (with possible nested children)
- `delete_blocks`: Delete existing blocks in BaseHub

## Setup Strategy

### Phase 1: Create Component Blocks (Reusable Schemas)

These will serve as the templates for your content types:

#### 1.1 Create Tag Component
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "tag-component",
      "type": "component",
      "title": "Tag",
      "hidden": false,
      "value": [
        {
          "type": "text",
          "title": "Name",
          "value": "",
          "isRequired": true,
          "description": "Name of the tag, will be used as label"
        },
        {
          "type": "select",
          "title": "Type",
          "value": ["techstack"],
          "acceptedValues": ["techstack", "skill", "socials", "other"],
          "multiple": false,
          "isRequired": true,
          "description": "Category of the tag - can be tech, skill, social or internal"
        },
        {
          "type": "text",
          "title": "Link",
          "value": "",
          "isRequired": false,
          "description": "Optional URL link"
        }
      ]
    }
  ]
}
```

#### 1.2 Create Media Component
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "media-component",
      "type": "component",
      "title": "Media",
      "hidden": false,
      "value": [
        {
          "type": "media",
          "title": "File",
          "value": "",
          "isRequired": true,
          "description": "Upload file"
        },
        {
          "type": "text",
          "title": "Alt Text",
          "value": "",
          "isRequired": true,
          "description": "Alternative text for accessibility"
        },
        {
          "type": "rich-text",
          "title": "Caption",
          "value": "",
          "isRequired": false,
          "description": "Optional caption for the media"
        }
      ]
    }
  ]
}
```

#### 1.3 Create Experience Component
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "experience-component",
      "type": "component",
      "title": "Experience",
      "hidden": false,
      "value": [
        {
          "type": "text",
          "title": "Company",
          "value": "",
          "isRequired": true
        },
        {
          "type": "text",
          "title": "Position",
          "value": "",
          "isRequired": true
        },
        {
          "type": "text",
          "title": "URL",
          "value": "",
          "isRequired": false,
          "description": "Company website URL (optional)"
        },
        {
          "type": "date",
          "title": "Start Date",
          "value": "",
          "isRequired": true
        },
        {
          "type": "date",
          "title": "End Date",
          "value": "",
          "isRequired": false,
          "description": "Leave blank if still working here"
        },
        {
          "type": "reference",
          "title": "Skills",
          "value": [],
          "isRequired": false,
          "multiple": true,
          "componentTypes": ["tag"],
          "description": "Related skills (tags with type 'skill')"
        },
        {
          "type": "text",
          "title": "Description",
          "value": "",
          "isRequired": false
        },
        {
          "type": "text",
          "title": "Responsibility One",
          "value": "",
          "isRequired": true
        },
        {
          "type": "text",
          "title": "Responsibility Two",
          "value": "",
          "isRequired": false
        },
        {
          "type": "text",
          "title": "Responsibility Three",
          "value": "",
          "isRequired": false
        }
      ]
    }
  ]
}
```

#### 1.4 Create Project Post Component
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "project-post-component",
      "type": "component",
      "title": "Project Post",
      "hidden": false,
      "value": [
        {
          "type": "text",
          "title": "Title",
          "value": "",
          "isRequired": true
        },
        {
          "type": "text",
          "title": "Short Description",
          "value": "",
          "isRequired": true
        },
        {
          "type": "text",
          "title": "Slug",
          "value": "",
          "isRequired": true,
          "description": "URL-friendly identifier"
        },
        {
          "type": "reference",
          "title": "Hero Image",
          "value": "",
          "isRequired": false,
          "componentTypes": ["media"]
        },
        {
          "type": "rich-text",
          "title": "Content",
          "value": "",
          "isRequired": true,
          "description": "Main project content with rich formatting"
        },
        {
          "type": "reference",
          "title": "Technologies",
          "value": [],
          "isRequired": false,
          "multiple": true,
          "componentTypes": ["tag"],
          "description": "Technologies used (tags with type 'techstack')"
        },
        {
          "type": "text",
          "title": "Live URL",
          "value": "",
          "isRequired": false,
          "description": "Link to live project"
        },
        {
          "type": "text",
          "title": "Repository URL",
          "value": "",
          "isRequired": false,
          "description": "Link to project repository"
        },
        {
          "type": "date",
          "title": "Published At",
          "value": "",
          "isRequired": false
        }
      ]
    }
  ]
}
```

### Phase 2: Create Singleton Blocks (Global Content)

#### 2.1 Create Section Content Singleton
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "section-content-singleton",
      "type": "component",
      "title": "Section Content",
      "hidden": false,
      "singleton": true,
      "value": [
        {
          "type": "rich-text",
          "title": "Main Intro Section",
          "value": "",
          "isRequired": true,
          "description": "Text displayed in the intro card"
        },
        {
          "type": "rich-text",
          "title": "Main About Me Section",
          "value": "",
          "isRequired": true,
          "description": "Text displayed in the about me card"
        },
        {
          "type": "reference",
          "title": "Avatar",
          "value": "",
          "isRequired": false,
          "componentTypes": ["media"],
          "description": "Main avatar/picture"
        },
        {
          "type": "reference",
          "title": "Selected Project",
          "value": "",
          "isRequired": false,
          "componentTypes": ["project-post"],
          "description": "Single project shown on the project preview card"
        },
        {
          "type": "reference",
          "title": "Selected Experience",
          "value": "",
          "isRequired": false,
          "componentTypes": ["experience"],
          "description": "Single (current) experience shown on the experience preview card"
        },
        {
          "type": "collection",
          "title": "Quick Skills",
          "value": [],
          "isRequired": false,
          "maxItems": 4,
          "minItems": 2,
          "description": "Exactly 4 skills to display in the quick skills section",
          "itemSchema": {
            "type": "text",
            "title": "Skill",
            "isRequired": true,
            "description": "Skill name for display"
          }
        }
      ]
    }
  ]
}
```

#### 2.2 Create Site Controls Singleton
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "site-controls-singleton",
      "type": "component",
      "title": "Site Controls",
      "hidden": false,
      "singleton": true,
      "value": [
        {
          "type": "boolean",
          "title": "Show Projects",
          "value": true,
          "isRequired": false,
          "description": "Show projects section on the landing page"
        },
        {
          "type": "boolean",
          "title": "Show About",
          "value": true,
          "isRequired": false,
          "description": "Show about section on the landing page"
        },
        {
          "type": "reference",
          "title": "LinkedIn",
          "value": "",
          "isRequired": false,
          "componentTypes": ["tag"],
          "description": "Link to LinkedIn profile (tag with type 'socials')"
        },
        {
          "type": "reference",
          "title": "GitHub",
          "value": "",
          "isRequired": false,
          "componentTypes": ["tag"],
          "description": "Link to GitHub profile (tag with type 'socials')"
        },
        {
          "type": "reference",
          "title": "Mail",
          "value": "",
          "isRequired": false,
          "componentTypes": ["tag"],
          "description": "Email contact (tag with type 'socials')"
        }
      ]
    }
  ]
}
```

#### 2.3 Create Legal Content Singleton
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "legal-content-singleton",
      "type": "component",
      "title": "Legal Content",
      "hidden": false,
      "singleton": true,
      "value": [
        {
          "type": "rich-text",
          "title": "English Text",
          "value": "",
          "isRequired": true,
          "description": "Formatted text displayed as English speaking legal disclaimers"
        },
        {
          "type": "rich-text",
          "title": "German Text",
          "value": "",
          "isRequired": true,
          "description": "Formatted text displayed as German speaking legal disclaimers"
        },
        {
          "type": "rich-text",
          "title": "Privacy",
          "value": "",
          "isRequired": false,
          "description": "Additional information about privacy"
        }
      ]
    }
  ]
}
```

### Phase 3: Create Collection Blocks

#### 3.1 Create Tags Collection
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "tags-collection",
      "type": "collection",
      "title": "Tags",
      "hidden": false,
      "componentType": "tag",
      "description": "Collection of all tags for technologies, skills, and social links"
    }
  ]
}
```

#### 3.2 Create Media Collection
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "media-collection",
      "type": "collection",
      "title": "Media",
      "hidden": false,
      "componentType": "media",
      "description": "Collection of all media files"
    }
  ]
}
```

#### 3.3 Create Experiences Collection
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "experiences-collection",
      "type": "collection",
      "title": "Experiences",
      "hidden": false,
      "componentType": "experience",
      "description": "Collection of work experiences"
    }
  ]
}
```

#### 3.4 Create Projects Collection
```json
{
  "parentId": "root",
  "data": [
    {
      "transactionId": "projects-collection",
      "type": "collection",
      "title": "Projects",
      "hidden": false,
      "componentType": "project-post",
      "description": "Collection of project posts"
    }
  ]
}
```

## Execution Order

1. **First**: Create all Component blocks (Tag, Media, Experience, Project Post)
2. **Second**: Create Singleton blocks (Section Content, Site Controls, Legal Content)
3. **Third**: Create Collection blocks (Tags, Media, Experiences, Projects)

This order ensures that:
- Components exist before they're referenced
- References between components work correctly
- Collections can properly reference their component types

## Notes

- Each block creation should be done sequentially to avoid dependency issues
- The `transactionId` helps track each operation
- Component blocks serve as schemas that can be instantiated multiple times
- Singleton blocks ensure only one instance exists (for global content)
- Collection blocks provide organized lists of component instances
- All relationships between PayloadCMS collections are preserved through reference fields 