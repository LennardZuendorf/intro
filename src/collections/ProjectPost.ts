import type { CollectionConfig } from 'payload';

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical';

import { Banner } from '@/components/blocks/banner/config';
import { MediaBlock } from '@/components/blocks/media-block/config';

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField
} from '@payloadcms/plugin-seo/fields';
import { authenticated } from '@/lib/admin/access/authenticated';
import { authenticatedOrPublished } from '@/lib/admin/access/authenticatedOrPublished';
import { formatSlug } from '@/collections/hooks/formatSlug';
import { env } from '@/env';

export const ProjectPost: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        return `${env.NEXT_PUBLIC_URL}/projects/${data.slug}`;
      }
    },
    useAsTitle: 'title',
    group: 'Content'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar'
      },
      hooks: {
        beforeValidate: [formatSlug('title')]
      },
      index: true,
      label: 'Slug'
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature()
                  ];
                }
              }),
              label: false,
              required: true
            }
          ],
          label: 'Content'
        },
        {
          label: 'Classes',
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
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image'
            }),
            MetaTitleField({
              hasGenerateFn: true
            }),
            MetaImageField({
              relationTo: 'media'
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description'
            })
          ]
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        },
        position: 'sidebar'
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          }
        ]
      }
    }
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100 // We set this interval for optimal live preview
      }
    },
    maxPerDoc: 50
  }
};
