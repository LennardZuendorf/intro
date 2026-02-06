'use client';

import type * as React from 'react';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import type { ProjectData } from '@/lib/types/projects';
import { cn } from '@/lib/utils/ui';

interface ShardsAnimatedCardProps {
  project: ProjectData;
  className?: string;
}

export function ShardsAnimatedCard({ project, className }: ShardsAnimatedCardProps) {
  const mainColor = project.color?.hex || '#a855f7';

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(mainColor);
  const secondaryColor = `rgb(${Math.min(255, rgb.r + 60)}, ${Math.min(255, rgb.g + 30)}, ${Math.min(255, rgb.b + 20)})`;
  const tertiaryColor = `rgb(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.min(255, rgb.b + 40)})`;

  const technologies = project.technology?.map((tech) => tech._title) || [];

  return (
    <div
      role='region'
      aria-labelledby='shards-card-title'
      aria-describedby='shards-card-description'
      className={cn(
        'group/animated-card relative w-full overflow-hidden rounded-md border-4 border-border bg-primary text-primary-foreground shadow-black shadow-md',
        className
      )}
    >
      {/* Visual Layer — Crystal/Shard themed */}
      <div className='h-[140px] w-full overflow-hidden'>
        <ShardsVisual
          mainColor={mainColor}
          secondaryColor={secondaryColor}
          tertiaryColor={tertiaryColor}
        />
      </div>

      {/* Body */}
      <div className='flex flex-col space-y-1.5 border-t-4 border-border p-3'>
        <H4 id='shards-card-title' className='line-clamp-1'>
          {project._title}
        </H4>
        <M
          id='shards-card-description'
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

        {(project.showcaseLink || project._slug) && (
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
        )}
      </div>
    </div>
  );
}

interface ShardsVisualProps {
  mainColor: string;
  secondaryColor: string;
  tertiaryColor: string;
}

function ShardsVisual({ mainColor, secondaryColor, tertiaryColor }: ShardsVisualProps) {
  return (
    <div aria-hidden className='relative h-full w-full overflow-hidden'>
      {/* Background grid */}
      <div
        style={{ '--grid-color': '#80808015' } as React.CSSProperties}
        className='pointer-events-none absolute inset-0 z-[1] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-50'
      />

      {/* Radial glow */}
      <div className='absolute inset-0 z-[2] flex items-center justify-center'>
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
            <radialGradient id='shards-glow' cx='0.5' cy='0.6' r='0.5'>
              <stop offset='0%' stopColor={mainColor} stopOpacity='0.25' />
              <stop offset='100%' stopColor={mainColor} stopOpacity='0' />
            </radialGradient>
          </defs>
          <rect width='356' height='140' fill='url(#shards-glow)' />
        </svg>
      </div>

      {/* Crystal shards — geometric polygons */}
      <svg
        className='absolute inset-0 z-[3] h-full w-full'
        viewBox='0 0 356 140'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        preserveAspectRatio='xMidYMid slice'
      >
        {/* Large center shard */}
        <polygon
          points='178,15 210,70 190,130 160,130 145,70'
          fill={mainColor}
          fillOpacity='0.4'
          stroke={mainColor}
          strokeWidth='1'
          strokeOpacity='0.6'
          className='origin-center transition-transform duration-500 group-hover/animated-card:scale-110'
        />
        {/* Left shard */}
        <polygon
          points='80,40 110,20 120,80 95,110 65,75'
          fill={secondaryColor}
          fillOpacity='0.3'
          stroke={secondaryColor}
          strokeWidth='1'
          strokeOpacity='0.5'
          className='origin-center transition-transform duration-500 group-hover/animated-card:rotate-[5deg] group-hover/animated-card:scale-105'
        />
        {/* Right shard */}
        <polygon
          points='260,30 295,50 285,105 255,115 240,65'
          fill={tertiaryColor}
          fillOpacity='0.35'
          stroke={tertiaryColor}
          strokeWidth='1'
          strokeOpacity='0.5'
          className='origin-center transition-transform duration-500 group-hover/animated-card:-rotate-[5deg] group-hover/animated-card:scale-105'
        />
        {/* Small accent shards */}
        <polygon
          points='130,60 150,45 155,85 135,90'
          fill={mainColor}
          fillOpacity='0.25'
          className='origin-center transition-transform duration-700 group-hover/animated-card:translate-x-[-4px] group-hover/animated-card:translate-y-[-4px]'
        />
        <polygon
          points='210,55 230,40 235,80 215,90'
          fill={secondaryColor}
          fillOpacity='0.25'
          className='origin-center transition-transform duration-700 group-hover/animated-card:translate-x-[4px] group-hover/animated-card:translate-y-[-4px]'
        />
        {/* Far left small shard */}
        <polygon
          points='30,70 50,55 55,100 35,105'
          fill={tertiaryColor}
          fillOpacity='0.2'
          className='origin-center transition-transform duration-600 group-hover/animated-card:-rotate-[8deg]'
        />
        {/* Far right small shard */}
        <polygon
          points='310,55 330,45 335,90 315,95'
          fill={mainColor}
          fillOpacity='0.2'
          className='origin-center transition-transform duration-600 group-hover/animated-card:rotate-[8deg]'
        />
      </svg>
    </div>
  );
}
