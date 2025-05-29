import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import type { SectionContent } from '@/payload-types';
import configPromise from '@payload-config';
import type { NextPage } from 'next';
import { getPayload } from 'payload';
import { cache } from 'react';

export interface SectionProps {
  className?: string;
}

const querySectionContent = cache(async (): Promise<SectionContent> => {
  const payload = await getPayload({ config: configPromise });
  const sectionContent = await payload.findGlobal({
    slug: 'sectionContent'
  });

  return sectionContent as SectionContent;
});

const Page: NextPage = async () => {
  const sectionContent = await querySectionContent();

  return (
    <div className='min-h-screen'>
      <HeroSection className='' sectionContent={sectionContent} />
      <AboutSection className='' />
      <Projects className='lg:h-svh bg-primary border-t-4 border-border pt-5 pb-5 md:pt-10 md:pb-10' />
      <Banner className='' />
    </div>
  );
};

export default Page;
