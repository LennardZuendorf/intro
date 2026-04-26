export const siteMeta = {
  title: 'Lennard Zündorf',
  description: 'Personal site of Lennard Zündorf — engineer, builder, and writer.',
  ogImage: '/img/opengraph.png'
} as const;

export type SiteMeta = typeof siteMeta;
