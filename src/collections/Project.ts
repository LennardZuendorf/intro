import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'textarea',
      required: true
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Live URL',
      required: false
    },
    {
      name: 'repoUrl',
      type: 'text',
      label: 'Repository URL',
      required: false
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media', // assumes you have a media collection for images/files
      required: false
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'techstacks',
      hasMany: true,
      label: 'Used Technologies'
    },
    {
      name: 'date',
      type: 'date',
      required: false
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text'
        }
      ],
      required: false
    }
  ],
  upload: true
};
