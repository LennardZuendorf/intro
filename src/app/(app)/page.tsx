import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import type { Experience, SectionContent } from '@/payload-types';
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

const queryAllExperiences = cache(async (): Promise<Experience[]> => {
  const payload = await getPayload({ config: configPromise });
  const allExperiences = await payload.find({
    collection: 'experiences',
    sort: '-startDate'
  });
  return allExperiences.docs as Experience[];
});

const Page: NextPage = async () => {
  const sectionContent = await querySectionContent();
  const allExperiences = await queryAllExperiences();

  return (
    <div className='min-h-screen'>
      <HeroSection className='' sectionContent={sectionContent} />
      <AboutSection className='' sectionContent={sectionContent} allExperiences={allExperiences} />
      <Projects className='border-t-4 border-border' />
      <Banner className='' />
    </div>
  );
};

export default Page;
