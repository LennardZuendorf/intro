import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { experience, home, legal, projects } from '@/.source';

/**
 * Fumadocs source loaders.
 *
 * `home` and `legal` use `defineCollections` (plain array, no `.toFumadocsSource()`),
 * so they're wrapped with the free function from `fumadocs-mdx/runtime/server`.
 * `projects` and `experience` use `defineDocs` which exposes the helper directly.
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
