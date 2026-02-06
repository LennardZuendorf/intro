'use client';

import type { VariantProps } from 'class-variance-authority';
import { Card, CardContent, CardFooter, CardHeader, type cardVariants } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import type { ProjectData } from '@/lib/types/projects';
import { cn } from '@/lib/utils/ui';
import { IndexedAnimatedCard } from './indexed';
import { ShardsAnimatedCard } from './shards';
import { StrideAnimatedCard } from './stride';

type CardVariants = VariantProps<typeof cardVariants>;

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
  rotation?: CardVariants['rotation'];
}

export default function ProjectCard({ project, className, rotation = 'none' }: ProjectCardProps) {
  // Route to specific animated cards by slug
  if (project._slug === 'stride') {
    return <StrideAnimatedCard project={project} className={className} />;
  }
  if (project._slug === 'indexed') {
    return <IndexedAnimatedCard project={project} className={className} />;
  }
  if (project._slug === 'shards') {
    return <ShardsAnimatedCard project={project} className={className} />;
  }

  // Handle technologies from BaseHub
  const technologies = project.technology?.map((tech) => tech._title) || [];

  // Get project color, default to blue if none set
  const projectColor = project.color?.hex || '#3b82f6';

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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
      <CardHeader className='pb-2'>
        <H4 className='line-clamp-1'>{project._title}</H4>
      </CardHeader>

      <CardContent className='pt-0 pb-2'>
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

      <CardFooter className='pt-2 mt-auto'>
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
