import { defineCollections, defineConfig } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const legal = defineCollections({
  type: 'doc',
  dir: './content/legal',
  schema: z.object({
    title: z.string(),
    language: z.enum(['de', 'en']),
    lastUpdated: z.string().optional()
  })
});

export default defineConfig();
