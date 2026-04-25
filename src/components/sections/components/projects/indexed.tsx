'use client';

import type * as React from 'react';
import { useId } from 'react';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import type { ProjectData } from '@/lib/types/projects';
import { cn, hexToRgb } from '@/lib/utils/ui';

interface IndexedAnimatedCardProps {
  project: ProjectData;
  className?: string;
}

export function IndexedAnimatedCard({ project, className }: IndexedAnimatedCardProps) {
  const instanceId = useId();
  const mainColor = project.color?.hex || '#3b82f6';

  const rgb = hexToRgb(mainColor);
  const secondaryColor = `rgb(${Math.min(255, rgb.r + 50)}, ${Math.min(255, rgb.g + 50)}, ${Math.min(255, rgb.b + 50)})`;

  const technologies = project.technology?.map((tech) => tech._title) || [];

  return (
    <div
      role='region'
      aria-labelledby={`indexed-card-title-${project._id}`}
      aria-describedby={`indexed-card-desc-${project._id}`}
      className={cn(
        'group/animated-card relative w-full overflow-hidden rounded-md border-4 border-border bg-primary text-primary-foreground shadow-black shadow-md',
        className
      )}
    >
      {/* Visual Layer — Index/Document themed */}
      <div className='h-[140px] w-full overflow-hidden'>
        <IndexVisual
          mainColor={mainColor}
          secondaryColor={secondaryColor}
          gradientId={`indexed-glow-${instanceId}`}
        />
      </div>

      {/* Body */}
      <div className='flex flex-col space-y-1.5 border-t-4 border-border p-3'>
        <H4 id={`indexed-card-title-${project._id}`} className='line-clamp-1'>
          {project._title}
        </H4>
        <M
          id={`indexed-card-desc-${project._id}`}
          className='text-muted-foreground line-clamp-3 text-sm leading-relaxed'
        >
          {project.shortDescription}
        </M>

        {technologies.length > 0 && (
          <div className='flex flex-wrap gap-1.5 pt-2'>
            {technologies.slice(0, 3).map((tech) => (
              <NeoBadge
                key={`${project._id}-tech-${tech}`}
                variant='light'
                size='sm'
                rotation='none'
                interactive='none'
                className='text-xs'
              >
                {tech}
              </NeoBadge>
            ))}
            {technologies.length > 3 && (
              <NeoBadge
                key={`${project._id}-tech-more`}
                variant='outline'
                size='sm'
                rotation='none'
                interactive='none'
                className='text-xs'
              >
                +{technologies.length - 3}
              </NeoBadge>
            )}
          </div>
        )}

        <div className='pt-2'>
          <IconLink
            href={project.showcaseLink || `/projects/${project._slug}`}
            variant='accent'
            size='sm'
            className='flex-1'
            external={!!project.showcaseLink}
          >
            {project.showcaseLink ? 'Check it out' : 'Read More'}
          </IconLink>
        </div>
      </div>
    </div>
  );
}

interface IndexVisualProps {
  mainColor: string;
  secondaryColor: string;
  gradientId: string;
}

function IndexVisual({ mainColor, secondaryColor, gradientId }: IndexVisualProps) {
  return (
    <div aria-hidden className='relative h-full w-full overflow-hidden'>
      {/* Background grid */}
      <div
        style={{ '--grid-color': '#80808015' } as React.CSSProperties}
        className='pointer-events-none absolute inset-0 z-1 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-size-[16px_16px] bg-center opacity-70'
      />

      {/* Radial gradient overlay */}
      <div className='absolute inset-0 z-2 flex items-center justify-center'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 356 140'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          focusable='false'
          preserveAspectRatio='xMidYMid slice'
        >
          <defs>
            <radialGradient id={gradientId} cx='0.5' cy='0.5' r='0.6'>
              <stop offset='0%' stopColor={mainColor} stopOpacity='0.2' />
              <stop offset='100%' stopColor={mainColor} stopOpacity='0' />
            </radialGradient>
          </defs>
          <rect width='356' height='140' fill={`url(#${gradientId})`} />
        </svg>
      </div>

      {/* Animated document/index bars */}
      <div className='absolute inset-0 z-3 flex items-end justify-center gap-[3px] px-6 pb-2'>
        {[65, 45, 80, 35, 55, 90, 40, 70, 50, 85, 60, 75].map((h, i) => (
          <div
            key={`bar-h${h}-${i % 2 === 0 ? 'a' : 'b'}`}
            className='flex-1 rounded-t-sm transition-[height] duration-500 ease-out group-hover/animated-card:h-[95%]'
            style={{
              height: `${h}%`,
              backgroundColor: i % 2 === 0 ? mainColor : secondaryColor,
              opacity: 0.7 + i * 0.025
            }}
          />
        ))}
      </div>

      {/* Floating search lens indicator */}
      <div className='ease-[cubic-bezier(0.6,0.6,0,1)] absolute top-3 right-3 z-4 opacity-70 transition-transform duration-500 group-hover/animated-card:translate-x-[-8px] group-hover/animated-card:translate-y-[8px]'>
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          focusable='false'
        >
          <circle cx='11' cy='11' r='6' stroke={mainColor} strokeWidth='2' strokeOpacity='0.6' />
          <line
            x1='15.5'
            y1='15.5'
            x2='20'
            y2='20'
            stroke={mainColor}
            strokeWidth='2'
            strokeOpacity='0.6'
            strokeLinecap='round'
          />
        </svg>
      </div>
    </div>
  );
}
