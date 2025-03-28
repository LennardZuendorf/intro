import type { NextPage } from 'next';
import { Banner } from '@/components/banner';
import { MainSection } from '@/components/sections/main-grid';
import AboutSection from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';

export interface SectionProps {
  className?: string;
}

const Page: NextPage = () => {
  return (
    <div className='min-h-screen'>
      <MainSection className='' />

      {/* Scroll indicator and section divider */}
      <div className='relative w-full flex flex-col items-center justify-center py-8 overflow-hidden'>
        {/* Divider line with text */}
        <div className='w-full max-w-4xl mx-auto px-6 flex items-center'>
          <div className='flex-grow h-[2px] bg-black dark:bg-white opacity-10'></div>
          <span className='px-4 font-mono text-sm opacity-50'>scroll</span>
          <div className='flex-grow h-[2px] bg-black dark:bg-white opacity-10'></div>
        </div>

        {/* Animated down arrow */}
        <div className='mt-4 animate-bounce'>
          <svg className='w-6 h-6 opacity-50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 14l-7 7m0 0l-7-7m7 7V3'
            />
          </svg>
        </div>
      </div>

      <AboutSection className='' />
      <Projects className='lg:h-svh bg-main border-t-4 border-border pt-5 pb-5 md:pt-10 md:pb-10' />

      <Banner className='' />
    </div>
  );
};

export default Page;
