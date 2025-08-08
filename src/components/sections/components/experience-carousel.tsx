'use client';
import React from 'react';
import ExperienceCard from '@/components/sections/components/experience-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils/ui';

// Create a type that matches what we actually query from BaseHub
type ExperienceData = {
  _id: string;
  _title: string;
  companyDescription?: string | null;
  companyLink?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  jobActivities?: {
    json: {
      content: any;
    };
  } | null;
  skills?:
    | {
        _id: string;
        _title: string;
      }[]
    | null;
};

interface ExperienceCarouselProps {
  experiences: ExperienceData[];
  visibleCount?: number;
}

export default function ExperienceCarousel({
  experiences,
  visibleCount = 2
}: ExperienceCarouselProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const cardHeight = 345;

  // Calculate basis for responsive design
  const getBasisClass = () => {
    if (visibleCount === 1) return 'basis-full';
    if (visibleCount === 2) return 'basis-full md:basis-1/2';
    return `basis-full md:basis-1/${Math.min(visibleCount, 3)}`;
  };

  if (!experiences || experiences.length === 0) {
    return (
      <div
        className='w-full p-2 flex items-center justify-center'
        style={{ height: `${cardHeight}px` }}
      >
        <div className='text-muted-foreground'>No experiences available</div>
      </div>
    );
  }

  return (
    <Carousel
      opts={{ align: 'start', dragFree: false }}
      orientation='vertical'
      className='w-full p-2'
    >
      <CarouselContent
        className={cn('w-full flex-col mt-2 mb-2')}
        style={{
          height: `${cardHeight}px`
        }}
      >
        {experiences.map((exp, idx) => (
          <CarouselItem
            key={`experience-${exp._id}`}
            className={`w-full ${getBasisClass()}`}
            style={{
              marginBottom: 0
            }}
          >
            <div ref={idx === 0 ? cardRef : undefined} className='h-full'>
              <ExperienceCard experience={exp} className='w-full max-h-[345px]' />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='-top-3 left-1/2 -translate-x-1/2' />
      <CarouselNext className='-bottom-3 left-1/2 -translate-x-1/2' />
    </Carousel>
  );
}
