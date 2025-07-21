import type { Media, SiteControl } from '@/payload-types';
import { tags } from './tagContent';

const image: Media = {
  id: 1,
  alt: 'Lennard Zuendorf - Product Builder',
  url: '/img/opengraph.png',
  filename: 'opengraph.png',
  mimeType: 'image/png',
  filesize: 1000,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString()
};

export const siteControlFallback: SiteControl = {
  id: 1,
  sectionVisibility: {
    showProjects: false,
    showAbout: false
  },
  socials: {
    linkedin: tags[0],
    github: tags[1],
    mail: tags[2]
  },
  meta: {
    title: 'Lennard Zuendorf - Product Builder',
    description: 'Lennard Zuendorf - Product Builder | Personal Website and Portfolio',
    image: image
  },
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString()
};
