import { GlobalConfig } from 'payload';

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  fields: [
    {
      type: 'tabs', // required
      tabs: [
        {
          label: 'Main Hero Section', // required
          description: 'This is the data for the main hero section.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'MainIntroSection',
                  type: 'richText',
                  required: true
                },
                {
                  name: 'MainAboutMeSection',
                  type: 'richText',
                  required: true
                }
              ]
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'Main Avatar'
            },
            {
              name: 'selectedSkills',
              type: 'relationship',
              relationTo: 'skills', // ensure this matches your Skills collection slug
              hasMany: true
            },
            {
              name: 'selectedTechStacks',
              type: 'relationship',
              relationTo: 'techstacks', // ensure this matches your Techstacks collection slug
              hasMany: true
            },
            {
              name: 'selectedProjects',
              type: 'relationship',
              relationTo: 'projects', // ensure this matches your Projects collection slug
              hasMany: true
            },
            {
              name: 'selectedExperiences',
              type: 'relationship',
              relationTo: 'experiences', // ensure this matches your Experiences collection slug
              hasMany: true
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
                  required: true
                },
                {
                  name: 'AboutSubsection',
                  type: 'richText',
                  required: true
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const Socials: GlobalConfig = {
  slug: 'socials',
  fields: [
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text'
        },
        {
          name: 'url',
          type: 'text'
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Icon or Logo'
        }
      ],
      required: false
    }
  ]
};
