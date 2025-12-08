import { MetadataRoute } from 'next';
import { siteMetadata } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.title,
    short_name: 'zuendorf.me',
    description: siteMetadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/img/logo.png',
        sizes: 'any',
        type: 'image/png'
      }
    ]
  };
}
