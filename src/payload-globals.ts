import { GlobalConfig } from 'payload';

export const PageContent: GlobalConfig = {
  slug: 'page-content',
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
                  admin: {
                    description: 'selection of skills to showcase in the skills card'
                  }
                },
                {
                  name: 'selectedTechStacks',
                  type: 'relationship',
                  relationTo: 'tag', // ensure this matches your Techstacks collection slug
                  hasMany: true,
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

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'mainText',
      type: 'text',
      admin: {
        description: 'main text in the footer'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mainLink',
          type: 'relationship',
          relationTo: 'tag',
          admin: {
            description: 'main link in the footer'
          },
          hasMany: false
        },
        {
          name: 'socialLinks',
          type: 'relationship',
          relationTo: 'tag',
          hasMany: true,
          admin: {
            description: 'linked socials in the footer'
          }
        }
      ]
    }
  ]
};

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'links',
      type: 'relationship',
      relationTo: 'tag',
      admin: {
        description: 'all the links showcases in the header nav'
      },
      hasMany: true
    },
    {
      name: 'color-switch',
      type: 'checkbox',
      admin: {
        description: 'if the color switch button is enabled'
      }
    }
  ]
};

export const LegalTexts: GlobalConfig = {
  slug: 'legalTexts',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'English',
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
          label: 'German',
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
        }
      ]
    }
  ]
};
