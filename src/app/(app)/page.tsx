import type { NextPage } from 'next';
import { Banner } from '@/components/banner';
import Hero from '@/components/sections/hero-grid';
import { AboutGrid } from '@/components/sections/about';
import { ProjectGrid } from '@/components/sections/project-grid';

const Page: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='container lg:w-9/12 md:w-10/12 sm:w-11/12 gap-10'>
        <Hero />
        <ProjectGrid />
        <AboutGrid />
        <Banner />
      </div>
    </div>
  );
};

export default Page;
