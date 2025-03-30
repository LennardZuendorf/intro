import { Banner } from '@/components/banner';
import AboutSection from '@/components/sections/about';
import { MainSection } from '@/components/sections/main-grid';
import { Projects } from '@/components/sections/projects';
import type { NextPage } from 'next';

export interface SectionProps {
  className?: string;
}

const Page: NextPage = () => {
  return (
    <div className='min-h-screen'>
      <MainSection className='' />
      <AboutSection className='' />
      <Projects className='lg:h-svh bg-main border-t-4 border-border pt-5 pb-5 md:pt-10 md:pb-10' />
      <Banner className='' />
    </div>
  );
};

export default Page;
