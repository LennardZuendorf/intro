'use client';
import type { ExperienceComponent } from 'basehub-types';
import ExperienceCard from '@/components/sections/components/experience-card';
import { cn } from '@/lib/utils/ui';

interface ExperienceCarouselProps {
  experiences: ExperienceComponent[];
}

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className='w-full p-2 flex items-center justify-center h-full min-h-[300px]'>
        <div className='text-muted-foreground'>No experiences available</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2',
        // Custom scrollbar styling using webkit pseudo-elements
        '[&::-webkit-scrollbar]:w-2',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-border',
        '[&::-webkit-scrollbar-thumb]:rounded-full',
        '[&::-webkit-scrollbar-thumb]:border-2',
        '[&::-webkit-scrollbar-thumb]:border-solid',
        '[&::-webkit-scrollbar-thumb]:border-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-clip-padding',
        // Hover state
        'hover:[&::-webkit-scrollbar-thumb]:bg-accent'
      )}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--border) transparent'
      }}
    >
      {experiences.map((exp) => (
        <div key={`experience-${exp._id}`} className='flex-shrink-0'>
          <ExperienceCard experience={exp} className='w-full' />
        </div>
      ))}
    </div>
  );
}
