import type { SectionProps } from '@/app/(app)/page';
import { cn } from '@/lib/utils/ui';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import React from 'react';
import CarouselVertical from '../custom/experience-carousel';

export async function Projects({ className }: SectionProps) {
  const _payloadProjects = await queryProjects();

  return (
    <section id='projects' className={cn('py-14 md:py-24 relative overflow-hidden', className)}>
      {/* Decorative elements */}
      <div className='absolute -top-20 -left-20 w-40 h-40 rounded-full bg-accent-light opacity-10 blur-3xl' />
      <div className='absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-accent-dark opacity-10 blur-3xl' />

      <div className='flex flex-col w-full sm:w-11/12 md:w-10/12 px-5 sm:px-2 md:px-0 mx-auto items-center space-y-10 md:space-y-16 h-full'>
        <div className='space-y-6 relative max-w-3xl mx-auto'>
          {/* Badge with enhanced neobrutalist styling */}
          <div className='flex justify-center mb-4'>
            <span className='inline-block bg-accent-dark text-atext px-4 py-2 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 rounded-md text-sm md:text-base uppercase tracking-wider'>
              Projects
            </span>
          </div>

          <h2 className='text-4xl md:text-6xl font-extrabold text-center text-mtext leading-tight'>
            MY{' '}
            <span className='text-accent relative inline-block'>
              PROJECTS
              <span className='absolute -bottom-2 left-0 w-full h-1 bg-accent-light' />
            </span>
          </h2>
          <p className='text-lg md:text-xl text-center mx-auto max-w-2xl text-mtext/80 font-medium'>
            A selection of products I&lsquove managed from conception to delivery
          </p>
        </div>

        {/* Project carousel container with enhanced styling */}
        <div className='w-full relative border-2 border-black p-4 md:p-6 rounded-lg bg-main shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:-translate-x-1'>
          {/* Small decorative elements */}
          <div className='absolute -top-3 -right-3 w-6 h-6 bg-accent-light border-2 border-black rounded-full' />
          <div className='absolute -bottom-3 -left-3 w-6 h-6 bg-accent border-2 border-black rounded-full' />

          {/* ProjectCarousel component remains untouched */}
          <CarouselVertical />
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
