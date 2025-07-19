'use client';
import ExperienceCard from '@/components/sections/components/experience-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils/ui';
import type { Experience, Tag } from '@/payload-types';
import * as React from 'react';
import {
  type ExperienceData,
  experienceData as fallbackExperienceData
} from '../../../../content/AboutContent';

interface ExperienceCarouselProps {
  visibleCount?: number;
  experiences?: Experience[] | null;
}

export default function ExperienceCarousel({
  visibleCount = 2,
  experiences
}: ExperienceCarouselProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const cardHeight = 345;

  // Calculate basis for responsive design
  const getBasisClass = () => {
    if (visibleCount === 1) return 'basis-full';
    if (visibleCount === 2) return 'basis-full md:basis-1/2';
    return `basis-full md:basis-1/${Math.min(visibleCount, 3)}`;
  };

  const dataToRender =
    experiences && experiences.length > 0
      ? experiences
      : fallbackExperienceData.map((localExp, index): Experience => {
          const firstRole = localExp.roles[0];
          const [start, end] = firstRole.range.split(' - ');
          const parseDate = (dateStr: string | undefined): string | null => {
            if (!dateStr) return null;
            // Simple case for "Month Year" format, handles German month
            const date = new Date(dateStr.replace('Februar', 'February'));
            if (!Number.isNaN(date.getTime())) {
              return date.toISOString();
            }
            return null;
          };

          const startDate = parseDate(start);
          const endDate = end === '...' || !end ? null : parseDate(end);

          return {
            id: index,
            company: localExp.company,
            position: firstRole.title,
            startDate: startDate || new Date().toISOString(),
            endDate: endDate,
            description: localExp.desc,
            responsibilityOne: firstRole.text[0] || '',
            responsibilityTwo: firstRole.text[1] || null,
            responsibilityThree: firstRole.text[2] || null,
            url: localExp.url,
            skills: firstRole.skills.map(
              (skillName): Tag => ({
                id: Math.random(),
                name: skillName,
                type: 'skill',
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString()
              })
            ),
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
          };
        });

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
        {dataToRender.map((exp, idx) => (
          <CarouselItem
            key={exp.id}
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
