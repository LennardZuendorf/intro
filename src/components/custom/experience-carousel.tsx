'use client';
import ExperienceCard from '@/components/custom/experience-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { experienceData } from '@/data/about';
import { cn } from '@/lib/utils/ui';
import * as React from 'react';

interface ExperienceCarouselProps {
  visibleCount?: number;
}

export default function ExperienceCarousel({ visibleCount = 2 }: ExperienceCarouselProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const cardHeight = 345;

  // Calculate basis for responsive design
  const getBasisClass = () => {
    if (visibleCount === 1) return 'basis-full';
    if (visibleCount === 2) return 'basis-full md:basis-1/2';
    return `basis-full md:basis-1/${Math.min(visibleCount, 3)}`;
  };

  return (
    <Carousel
      opts={{ align: 'start', dragFree: false }}
      orientation='vertical'
      className='w-full p-2'
    >
      <CarouselContent
        className={cn('w-full flex-col mt-2 mb-2')}
        style={{
          height: cardHeight ? `${cardHeight}px` : 'auto'
        }}
      >
        {experienceData.map((exp, idx) => (
          <CarouselItem
            key={exp.company}
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
