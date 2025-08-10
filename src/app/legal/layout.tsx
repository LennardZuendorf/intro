import { basehub } from 'basehub';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await basehub().query({
    sectionsAndPages: {
      legalPage: {
        meta: {
          title: true,
          desc: true,
          img: {
            url: true
          }
        }
      }
    }
  });

  return {
    title: data.sectionsAndPages.legalPage.meta.title || 'Lennard Zündorf',
    description:
      data.sectionsAndPages.legalPage.meta.desc ||
      'Full-stack product leader crafting digital experiences.',
    openGraph: {
      title: data.sectionsAndPages.legalPage.meta.title || 'Lennard Zündorf',
      description:
        data.sectionsAndPages.legalPage.meta.desc ||
        'Full-stack product leader crafting digital experiences.',
      url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      images: [
        {
          url: data.sectionsAndPages.legalPage.meta.img?.url || '/img/opengraph.png',
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.sectionsAndPages.legalPage.meta.title || 'Lennard Zündorf',
      description:
        data.sectionsAndPages.legalPage.meta.desc ||
        'Full-stack product leader crafting digital experiences.',
      images: [
        {
          url: data.sectionsAndPages.legalPage.meta.img?.url || '/img/opengraph.png',
          width: 1200,
          height: 630
        }
      ]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className='w-full pt-10 md:pt-15 lg:pt-20'>{children}</div>;
}
