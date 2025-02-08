import { CollectionConfig } from 'payload';

export const Tag: CollectionConfig = {
  slug: 'tag',
  admin: {
    useAsTitle: 'name',
    description:
      'tags are a multi usable combination of a name, category, and optional url/link and icon',
    group: 'Classes'
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'name of the tag, will be used as label in all lowercase'
          }
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Techstack', value: 'techstack' },
            { label: 'Skill', value: 'skill' },
            { label: 'Socials', value: 'socials' },
            { label: 'Internal', value: 'other' }
          ],
          required: true,
          admin: {
            description: 'category of the tag - can be tech, skill, social or internal'
          }
        }
      ]
    },
    {
      type: 'text',
      name: 'link',
      admin: {
        description: 'optional - must be viable link, i.e. /about or https://google.com otherwise'
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Icon or Logo',
      admin: {
        description: 'optional - a link or logo (should be svg)'
      }
    }
  ]
};
