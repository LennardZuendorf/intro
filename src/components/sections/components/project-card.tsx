'use client';

import type { VariantProps } from 'class-variance-authority';
import type React from 'react';
import { Card, CardContent, CardFooter, CardHeader, type cardVariants } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import type { ProjectData } from '@/lib/types/projects';
import { cn, hexToRgba } from '@/lib/utils/ui';
import { IndexedAnimatedCard } from './projects/indexed';
import { ShardsAnimatedCard } from './projects/shards';
import { StrideAnimatedCard } from './projects/stride';

type CardVariants = VariantProps<typeof cardVariants>;

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
  rotation?: CardVariants['rotation'];
}

const animatedCardMap: Record<
  string,
  React.ComponentType<{ project: ProjectData; className?: string }>
> = {
  stride: StrideAnimatedCard,
  indexed: IndexedAnimatedCard,
  shards: ShardsAnimatedCard
};

export default function ProjectCard({ project, className, rotation = 'none' }: ProjectCardProps) {
  const AnimatedCard = animatedCardMap[project._slug];
  if (AnimatedCard) {
    return <AnimatedCard project={project} className={className} />;
  }

  // Handle technologies from BaseHub
  const technologies = project.technology?.map((tech) => tech._title) || [];

  // Get project color, default to blue if none set
  const projectColor = project.color?.hex || '#3b82f6';

  return (
    <Card
      className={cn('w-full overflow-hidden', className)}
      variant='default'
      rotation={rotation}
      shadow='lg'
      style={{
        backgroundColor: hexToRgba(projectColor, 0.1)
      }}
    >
      <CardHeader spacing='compact' className='pb-2'>
        <H4 className='line-clamp-1'>{project._title}</H4>
      </CardHeader>

      <CardContent spacing='compact' className='pt-0 pb-2'>
        <M className='text-muted-foreground line-clamp-3 mb-3 text-sm leading-relaxed'>
          {project.shortDescription}
        </M>

        {technologies.length > 0 && (
          <div className='space-y-2'>
            <div className='flex flex-wrap gap-1.5'>
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
          </div>
        )}
      </CardContent>

      <CardFooter spacing='compact' className='pt-2 mt-auto'>
        <div className='flex gap-2 w-full'>
          {project._slug && (
            <IconLink
              href={`/projects/${project._slug}`}
              variant='accent'
              size='sm'
              className='flex-1'
            >
              Read More
            </IconLink>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
