import type { Metadata, NextPage } from 'next';
import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { fetchSiteControls } from '@/lib/content/fetchSiteControls';

export interface SectionProps {
  className?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const siteControls = await fetchSiteControls();
  const imageUrl =
    typeof siteControls.meta?.image === 'object' && siteControls.meta?.image?.url
      ? siteControls.meta?.image.url
      : '/img/avatar.png';

  return {
    title: siteControls.meta?.title,
    description: siteControls.meta?.description,
    openGraph: {
      title: siteControls.meta?.title || '',
      description: siteControls.meta?.description || '',
      url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      images: imageUrl
    },
    twitter: {
      card: 'summary_large_image',
      title: siteControls.meta?.title || '',
      description: siteControls.meta?.description || '',
      images: imageUrl
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

const Page: NextPage = async () => {
  const siteControls = await fetchSiteControls();

  return (
    <div className='min-h-screen'>
      <HeroSection className='' siteControls={siteControls} />
      {siteControls.sectionVisibility?.showAbout && <AboutSection className='' />}
      {siteControls.sectionVisibility?.showProjects && (
        <Projects className='border-t-4 border-border' />
      )}
      <Banner className='' />
    </div>
  );
};

export default Page;
