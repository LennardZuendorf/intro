import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema
} from 'fumadocs-mdx/config';
import { z } from 'zod';

/**
 * Fumadocs collections — mirrors BaseHub block field shapes per the migration
 * matrix (docs/migration-retroui-fumadocs.md §2 + plan §U4). Field names are
 * kept identical to the legacy GraphQL surface (`_title`, `_slug`, `_id`,
 * `mainMeta`, `links.items`, etc.) so MDX wrappers can adopt these objects in
 * place of BaseHub query results without prop renaming. Optional `meta`/`img`
 * shapes use `nullish()` to match the BaseHub-shape parity (BaseHub returned
 * `null` rather than `undefined`).
 */

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
  schema: frontmatterSchema.extend({
    mainMeta: metaShape,
    showAbout: z.boolean().default(true),
    showProjects: z.boolean().default(true)
  })
});

export const legal = defineCollections({
  type: 'doc',
  dir: 'content/legal',
  schema: frontmatterSchema.extend({
    language: z.enum(['en', 'de']),
    _title: z.string(),
    updatedAt: z.coerce.date(),
    meta: metaShape
  })
});

export const projects = defineDocs({
  dir: 'content/projects',
  docs: {
    schema: frontmatterSchema.extend({
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
    schema: frontmatterSchema.extend({
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
