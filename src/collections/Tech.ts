import { CollectionConfig } from 'payload';

export const TechStacks: CollectionConfig = {
  slug: 'techstacks',
  admin: {
    useAsTitle: 'name'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'url',
      type: 'text',
      required: true
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Icon or Logo'
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Database', value: 'database' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Other', value: 'other' }
      ],
      required: false
    }
  ],
  upload: true
};
