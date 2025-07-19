'use client';

import ProjectCard from '@/components/sections/components/project-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils/ui';
import type { Project } from '@/payload-types';
import * as React from 'react';

interface ProjectCarouselProps {
  projects: Project[];
  visibleCount?: number;
}

export default function ProjectCarousel({ projects, visibleCount = 3 }: ProjectCarouselProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Adjust visibleCount based on actual number of projects
  const effectiveVisibleCount = Math.min(visibleCount, projects.length);

  // Calculate basis for responsive design
  const getBasisClass = () => {
    if (effectiveVisibleCount === 1) return 'basis-full';
    if (effectiveVisibleCount === 2) return 'basis-full md:basis-1/2';
    if (effectiveVisibleCount === 3) return 'basis-full sm:basis-1/2 lg:basis-1/3';
    if (effectiveVisibleCount === 4) return 'basis-full sm:basis-1/2 lg:basis-1/4';
    // For >4, fallback to 1/4 on large screens
    return 'basis-full sm:basis-1/2 lg:basis-1/4';
  };

  return (
    <div className='w-full flex justify-center'>
      <Carousel
        opts={{ align: 'center', dragFree: false, loop: true }}
        orientation='horizontal'
        className='w-full'
      >
        <CarouselContent className='w-full flex-row p-4'>
          {projects.map((project, idx) => (
            <CarouselItem key={project.id} className={`${getBasisClass()} pl-4`}>
              <div ref={idx === 0 ? cardRef : undefined} className='h-full flex justify-center'>
                <ProjectCard project={project} className='w-full max-w-sm h-[450px]' />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='-left-10 top-1/2 -translate-y-1/2' />
        <CarouselNext className='-right-10 top-1/2 -translate-y-1/2' />
      </Carousel>
    </div>
  );
}
