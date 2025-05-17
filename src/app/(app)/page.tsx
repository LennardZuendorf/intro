import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import type { PageContent } from '@/payload-types';
import configPromise from '@payload-config';
import type { NextPage } from 'next';
import { getPayload } from 'payload';
import { cache } from 'react';

export interface SectionProps {
  className?: string;
}

const queryPageContent = cache(async (): Promise<PageContent> => {
  const payload = await getPayload({ config: configPromise });
  const pageContent = await payload.findGlobal({
    slug: 'sectionContent'
  });

  return pageContent as PageContent;
});

const Page: NextPage = async () => {
  const pageContent = await queryPageContent();

  return (
    <div className='min-h-screen'>
      <HeroSection className='' pageContent={pageContent} />
      <AboutSection className='' />
      <Projects className='lg:h-svh bg-main border-t-4 border-border pt-5 pb-5 md:pt-10 md:pb-10' />
      <Banner className='' />
    </div>
  );
};

export default Page;
