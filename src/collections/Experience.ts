// collections/Experiences.ts
import { CollectionConfig } from 'payload';

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'position'
  },
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
    },
    {
      name: 'startDate',
      type: 'date',
      required: true
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      admin: {
        description: 'Leave blank if still working here'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      required: false
    },
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
  ],
  upload: true
};
