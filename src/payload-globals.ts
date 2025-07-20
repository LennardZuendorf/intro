import type { GlobalConfig } from 'payload';

export const SectionContent: GlobalConfig = {
  slug: 'sectionContent',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'MainIntroSection',
          type: 'richText',
          required: true,
          admin: {
            description: 'text displayed in the intro card'
          }
        },
        {
          name: 'MainAboutMeSection',
          type: 'richText',
          required: true,
          admin: {
            description: 'text displayed in the about me card'
          }
        }
      ]
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'main avatar/picture of me'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'selectedSkills',
          type: 'relationship',
          relationTo: 'tag', // ensure this matches your Skills collection slug
          hasMany: true,
          filterOptions: () => ({
            type: {
              equals: 'skill'
            }
          }),
          admin: {
            description: 'selection of skills to showcase in the skills card'
          }
        },
        {
          name: 'selectedTechStacks',
          type: 'relationship',
          relationTo: 'tag', // ensure this matches your Techstacks collection slug
          hasMany: true,
          filterOptions: () => ({
            type: {
              equals: 'techstack'
            }
          }),
          admin: {
            description: 'selection of tech to showcase in the skills card'
          }
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'selectedProjects',
          type: 'relationship',
          relationTo: 'projects', // ensure this matches your Projects collection slug
          hasMany: false,
          admin: {
            description: 'single project shown on the project preview card'
          }
        },
        {
          name: 'selectedExperiences',
          type: 'relationship',
          relationTo: 'experiences', // ensure this matches your Experiences collection slug
          hasMany: false,
          admin: {
            description: 'single (current) experience shown on the experience preview card'
          }
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'quickSkills',
          type: 'array',
          maxRows: 4,
          minRows: 2,
          admin: {
            description: 'exactly 4 skills to display in the quick skills section'
          },
          fields: [
            {
              name: 'skill',
              type: 'text',
              required: true,
              admin: {
                description: 'skill name for display'
              }
            }
          ]
        }
      ]
    }
  ]
};

export const SiteControls: GlobalConfig = {
  slug: 'siteControls',
  admin: {
    group: 'Site Settings & SEO'
  },
  fields: [
    {
      name: 'sectionVisibility',
      type: 'group',
      label: 'Section Visibility',
      admin: {
        description: 'Control which sections are shown on the site'
      },
      fields: [
        {
          name: 'showProjects',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show projects section on the landing page'
          }
        },
        {
          name: 'showAbout',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show about section on the landing page'
          }
        }
      ]
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'relationship',
          relationTo: 'tag',
          filterOptions: () => ({
            type: {
              equals: 'socials'
            }
          }),
          hasMany: false,
          admin: {
            description: 'link to my linkedin profile'
          }
        },
        {
          name: 'github',
          type: 'relationship',
          relationTo: 'tag',
          filterOptions: () => ({
            type: {
              equals: 'socials'
            }
          }),
          hasMany: false,
          admin: {
            description: 'link to my github profile'
          }
        },
        {
          name: 'mail',
          type: 'relationship',
          relationTo: 'tag',
          filterOptions: () => ({
            type: {
              equals: 'socials'
            }
          }),
          hasMany: false,
          admin: {
            description: 'link to my github profile'
          }
        }
      ]
    }
  ]
};

export const LegalContent: GlobalConfig = {
  slug: 'legalContent',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'EnglishLegalDisclaimers',
          description: 'English Language Legal Disclaimers',
          fields: [
            {
              name: 'englishText',
              type: 'richText',
              required: true,
              admin: {
                description: 'formatted text displayed as English speaking legal disclaimers'
              }
            }
          ]
        },
        {
          label: 'GermanLegalDisclaimers',
          description: 'German Language Legal Disclaimers',
          fields: [
            {
              name: 'germanText',
              type: 'richText',
              required: true,
              admin: {
                description: 'formatted text displayed as German speaking legal disclaimers'
              }
            }
          ]
        },
        {
          label: 'PrivacyDisclaimers',
          description: 'Additional Privacy Disclaimers',
          fields: [
            {
              name: 'privacy',
              type: 'richText',
              admin: {
                description: 'additional information about privacy'
              }
            }
          ]
        }
      ]
    }
  ]
};
