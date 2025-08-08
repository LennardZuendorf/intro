import { basehub } from 'basehub';
import type { Metadata, NextPage } from 'next';
import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';

export interface SectionProps {
  className?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await basehub().query({
    globals: {
      mainMeta: {
        title: true,
        desc: true,
        img: {
          url: true
        }
      }
    }
  });

  return {
    title: data.globals.mainMeta.title || 'Lennard Zündorf',
    description:
      data.globals.mainMeta.desc || 'Full-stack product leader crafting digital experiences.',
    openGraph: {
      title: data.globals.mainMeta.title || 'Lennard Zündorf',
      description:
        data.globals.mainMeta.desc || 'Full-stack product leader crafting digital experiences.',
      url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      images: [
        { url: data.globals.mainMeta.img?.url || '/img/opengraph.png', width: 1200, height: 630 }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.globals.mainMeta.title || 'Lennard Zündorf',
      description:
        data.globals.mainMeta.desc || 'Full-stack product leader crafting digital experiences.',
      images: [
        {
          url: data.globals.mainMeta.img?.url || '/img/opengraph.png',
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

const Page: NextPage = async () => {
  // Get global settings for section visibility
  const globalData = await basehub().query({
    globals: {
      showAbout: true,
      showProjects: true
    }
  });

  return (
    <div className='min-h-screen'>
      <HeroSection className='' />
      {globalData.globals.showAbout && <AboutSection className='' />}
      {globalData.globals.showProjects && <Projects className='border-t-4 border-border' />}
      <Banner className='' />
    </div>
  );
};

export default Page;
