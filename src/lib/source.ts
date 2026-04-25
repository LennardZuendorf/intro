import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { experience, home, legal, projects } from '@/.source';

/**
 * Fumadocs source loaders.
 *
 * `home` and `legal` are `defineCollections({ type: 'doc' })` collections,
 * which the codegen exposes as plain `DocCollectionEntry[]` arrays. They have
 * no `.toFumadocsSource()` method, so we wrap them with the free function
 * exported from `fumadocs-mdx/runtime/server`.
 *
 * `projects` and `experience` are `defineDocs(...)` collections, which expose
 * the helper as a method on the entry directly.
 *
 * No route consumes these yet — they're wired up here so callers in U6/U7
 * can `import { …Source } from '@/lib/source'` without restructuring.
 */
export const homeSource = loader({
  baseUrl: '/',
  source: toFumadocsSource(home, [])
});

export const legalSource = loader({
  baseUrl: '/legal',
  source: toFumadocsSource(legal, [])
});

export const projectSource = loader({
  baseUrl: '/projects',
  source: projects.toFumadocsSource()
});

export const experienceSource = loader({
  baseUrl: '/experience',
  source: experience.toFumadocsSource()
});
