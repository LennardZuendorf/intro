import type { GlobalConfig } from 'payload';

export const SectionContent: GlobalConfig = {
  slug: 'sectionContent',
  fields: [
    {
      type: 'tabs', // required
      tabs: [
        {
          label: 'Main Hero Section',
          description: 'data displayed on the main hero section',
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
            }
          ]
        },
        {
          label: 'About Section',
          description: 'Data for the About Section',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'AboutMainSection',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'formatted text displayed in the main about me card'
                  }
                },
                {
                  name: 'AboutSubsection',
                  type: 'richText',
                  required: true,
                  admin: {
                    description: 'formatted text in the about me subsection card'
                  }
                }
              ]
            }
          ]
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
