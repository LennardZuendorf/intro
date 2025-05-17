// collections/Experiences.ts
import type { CollectionConfig } from 'payload';

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'position',
    group: 'Content Collection'
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true
        },
        {
          name: 'position',
          type: 'text',
          required: true
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true
        },
        {
          name: 'endDate',
          type: 'date',
          required: false,
          admin: {
            description: 'Leave blank if still working here'
          }
        }
      ]
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
      filterOptions: () => ({
        type: {
          equals: 'skill'
        }
      })
    },
    {
      name: 'description',
      type: 'textarea',
      required: false
    },
    {
      type: 'row',
      fields: [
        {
          name: 'responsibilityOne',
          type: 'textarea',
          required: true
        },
        {
          name: 'responsibilityTwo',
          type: 'textarea',
          required: false
        },
        {
          name: 'responsibilityThree',
          type: 'textarea',
          required: false
        }
      ]
    }
  ],
  upload: true
};
