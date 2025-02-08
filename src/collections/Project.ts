import type { CollectionConfig } from 'payload';
export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    livePreview: {
      url: 'localhost:3000/projects'
    }
  },
  fields: [
    {
      type: 'tabs', // required
      tabs: [
        {
          label: 'Content',
          description: 'main content for the project page',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true
                },
                {
                  name: 'date',
                  type: 'date',
                  required: true
                }
              ]
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media', // assumes you have a media collection for images/files
              required: false
            },
            {
              name: 'projectText',
              type: 'richText',
              required: true
            }
          ]
        },
        {
          label: 'Classes',
          description: 'optional classes to accommodate the project page',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'technologies',
                  type: 'relationship',
                  relationTo: 'tag',
                  hasMany: true,
                  label: 'Used Technologies'
                },
                {
                  type: 'text',
                  name: 'liveUrl',
                  admin: {
                    description:
                      'optional - must be viable link, i.e. /about or https://google.com otherwise'
                  },
                  // @ts-expect-error this is a text field but I cannot set string as a type
                  validate: (value) => {
                    if (!value || value.trim() === '') {
                      return true;
                    } else {
                      return /^(\/|https?:\/\/)/.test(value)
                        ? true
                        : 'Must be a valid URL (e.g. /about or https://google.com)';
                    }
                  }
                },
                {
                  type: 'text',
                  name: 'repoUrl',
                  admin: {
                    description:
                      'optional - must be viable link, i.e. /about or https://google.com otherwise'
                  },
                  // @ts-expect-error this is a text field but I cannot set string as a type
                  validate: (value) => {
                    if (!value || value.trim() === '') {
                      return true;
                    } else {
                      return /^(\/|https?:\/\/)/.test(value)
                        ? true
                        : 'Must be a valid URL (e.g. /about or https://google.com)';
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  upload: true
};
