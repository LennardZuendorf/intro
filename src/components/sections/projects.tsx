import { SectionProps } from '@/app/(app)/page';
import { cn } from '@/lib/utils/ui';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import React from 'react';
import { ProjectCarousel } from '@/components/custom/project-carousel';

export async function Projects({ className }: SectionProps) {
  const payloadProjects = await queryProjects();

  return (
    <section id='projects' className={cn('', className)}>
      <div className='flex flex-col w-full sm:w-11/12 md:w-10/12 px-5 sm:px-2 md:px-0 mx-auto items-center space-y-5 md:space-y-10 h-full md:justify-center'>
        <div className='space-y-2'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-center'>MY PROJECTS</h2>
          <p className='text-xl text-center mx-auto'>
            A selection of products I&lsquove managed from conception to delivery
          </p>
        </div>
        <div className='w-full relative'>
          <ProjectCarousel projects={payloadProjects} />
        </div>
      </div>
    </section>
  );
}

const queryProjects = async () => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'projects',
    draft,
    overrideAccess: draft,
    pagination: false
  });

  return result.docs || null;
};
