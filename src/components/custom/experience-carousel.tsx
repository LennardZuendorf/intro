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
import * as React from 'react';

interface ExperienceCarouselProps {
  visibleCount?: number;
}

export default function ExperienceCarousel({ visibleCount = 2 }: ExperienceCarouselProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    function updateHeight() {
      if (cardRef.current) {
        setCardHeight(cardRef.current.getBoundingClientRect().height);
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const gap = 8; // px, for gap-4
  const carouselHeight = cardHeight
    ? cardHeight * visibleCount + gap * (visibleCount - 1)
    : undefined;

  return (
    <Carousel opts={{ align: 'start' }} orientation='vertical' className='w-full my-14'>
      <CarouselContent
        className='w-full flex-col gap-2 -mt-2'
        style={carouselHeight ? { height: `${carouselHeight}px` } : {}}
      >
        {experienceData.map((exp, idx) => (
          <CarouselItem key={exp.company} className='w-full h-full basis-full md:basis-1/2'>
            <div ref={idx === 0 ? cardRef : undefined}>
              <ExperienceCard experience={exp} className='w-full' />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
