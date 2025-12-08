import { MetadataRoute } from 'next';
import { siteMetadata } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/legal'].map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : 0.8
  }));

  return routes;
}
