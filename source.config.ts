import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema
} from 'fumadocs-mdx/config';
import { z } from 'zod';

// Override fumadocs's required `title`/`description` to optional. This project
// uses BaseHub-style `_title` for legacy parity. Extending preserves
// fumadocs-generated runtime properties (e.g., `body`) on `page.data`.
const baseSchema = frontmatterSchema.extend({
  title: z.string().optional(),
  description: z.string().optional()
});


const metaShape = z
  .object({
    title: z.string().nullish(),
    desc: z.string().nullish(),
    img: z
      .object({
        url: z.string().nullish()
      })
      .nullish()
  })
  .nullish();

export const home = defineCollections({
  type: 'doc',
  dir: 'content/home',
  schema: baseSchema
});

export const legal = defineCollections({
  type: 'doc',
  dir: 'content/legal',
  schema: baseSchema.extend({
    language: z.enum(['en', 'de']),
    _title: z.string(),
    updatedAt: z.coerce.date(),
    meta: metaShape
  })
});

export const projects = defineDocs({
  dir: 'content/projects',
  docs: {
    schema: baseSchema.extend({
      _title: z.string(),
      _slug: z.string().optional(),
      shortDescription: z.string(),
      color: z.object({
        hex: z.string().regex(/^#[0-9a-fA-F]{6}$/)
      }),
      technology: z
        .array(
          z.object({
            _id: z.string().optional(),
            _title: z.string()
          })
        )
        .default([]),
      links: z
        .object({
          items: z
            .array(
              z.object({
                _id: z.string().optional(),
                _title: z.string(),
                url: z.string()
              })
            )
            .default([])
        })
        .default({ items: [] }),
      extendedPreview: z.boolean().default(false)
    })
  }
});

export const experience = defineDocs({
  dir: 'content/experience',
  docs: {
    schema: baseSchema.extend({
      _title: z.string(),
      _slug: z.string().optional(),
      companyTitle: z.string().nullish(),
      companyLink: z.string().url(),
      shortDescription: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().nullish(),
      skills: z
        .array(
          z.object({
            _id: z.string().optional(),
            _title: z.string()
          })
        )
        .default([])
    })
  }
});

export default defineConfig({});
