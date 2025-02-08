import type { NextPage } from 'next';
import { Banner } from '@/components/banner';
import { MainSection } from '@/components/sections/main-grid';
import { AboutSection } from '@/components/sections/about';
import { ProjectSection } from '@/components/sections/project-grid';

export interface SectionProps {
  className?: string;
}

const Page: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='container lg:w-9/12 md:w-10/12 sm:w-11/12 gap-10'>
        <MainSection />
        <AboutSection />
        <ProjectSection />
        <Banner />
      </div>
    </div>
  );
};

export default Page;
