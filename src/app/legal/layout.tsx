import type { Metadata } from 'next';
import { legalSource } from '@/lib/source';

const fallbackMetadata: Metadata = {
  title: 'Lennard Zündorf',
  description: 'Full-stack product leader crafting digital experiences.',
  openGraph: {
    title: 'Lennard Zündorf',
    description: 'Full-stack product leader crafting digital experiences.',
    url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
    images: [{ url: '/img/opengraph.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lennard Zündorf',
    description: 'Full-stack product leader crafting digital experiences.',
    images: [{ url: '/img/opengraph.png', width: 1200, height: 630 }]
  },
  robots: { index: true, follow: true }
};

export async function generateMetadata(): Promise<Metadata> {
  const page = legalSource.getPage(['en']);
  // The frontmatter `meta` block is optional/nullish per the zod schema; the
  // generated runtime types narrow loosely, so re-shape via a typed cast.
  const meta = (
    page?.data as
      | {
          meta?: {
            title?: string | null;
            desc?: string | null;
            img?: { url?: string | null } | null;
          } | null;
        }
      | undefined
  )?.meta;

  if (!meta) {
    return fallbackMetadata;
  }

  const title = meta.title || 'Lennard Zündorf';
  const description = meta.desc || 'Full-stack product leader crafting digital experiences.';
  const imageUrl = meta.img?.url || '/img/opengraph.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      images: [{ url: imageUrl, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630 }]
    },
    robots: { index: true, follow: true }
  };
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
