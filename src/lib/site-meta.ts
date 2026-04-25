/**
 * Static site metadata.
 *
 * Replaces the BaseHub `Globals.mainMeta` and feature-flag query that
 * `app/layout.tsx` and `app/page.tsx` consume today. Three strings + two
 * booleans don't justify a Fumadocs collection round-trip.
 *
 * Values below are placeholders — populate with real production values
 * before the U7 cutover (or sooner). Consumers swap in U6/U7.
 */
export const siteMeta = {
  title: 'Lennard Zündorf',
  description: 'Personal site of Lennard Zündorf — engineer, builder, and writer.',
  ogImage: '/img/opengraph.png',
  showAbout: true,
  showProjects: true
} as const;

export type SiteMeta = typeof siteMeta;
