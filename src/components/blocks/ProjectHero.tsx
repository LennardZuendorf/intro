import type React from 'react';

import type { Project } from '@/payload-types';

export const ProjectHero: React.FC<{
  post: Project;
}> = ({ post }) => {
  const { title } = post;

  return (
    <div className='relative -mt-[10.4rem] flex items-end'>
      <div className='container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8'>
        <div className='col-start-1 col-span-1 md:col-start-2 md:col-span-2'>
          <div className=''>
            <h1 className='mb-6 text-3xl md:text-5xl lg:text-6xl'>{title}</h1>
          </div>
          <div className='flex flex-col md:flex-row gap-4 md:gap-16' />
        </div>
      </div>
    </div>
  );
};
