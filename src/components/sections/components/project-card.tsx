'use client';

import type { VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, type cardVariants } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

// Create a type that matches what we actually query from BaseHub
type ProjectData = {
  _id: string;
  _title: string;
  _slug: string;
  shortDescription?: string | null;
  date?: string | null;
  meta?: {
    title?: string | null;
    desc?: string | null;
  } | null;
  technology?:
    | {
        _id: string;
        _title: string;
        url?: string | null;
        badgeUrl?: string | null;
      }[]
    | null;
};

type CardVariants = VariantProps<typeof cardVariants>;

interface ProjectCardProps {
  project: ProjectData;
  className?: string;
  rotation?: CardVariants['rotation'];
  interactive?: CardVariants['interactive'];
}

export default function ProjectCard({
  project,
  className,
  rotation = 'none',
  interactive = 'slight'
}: ProjectCardProps) {
  // Handle technologies from BaseHub
  const technologies = project.technology?.map((tech) => tech._title) || [];

  return (
    <Card
      className={cn('w-full h-[450px] overflow-hidden', className)}
      variant='default'
      rotation={rotation}
      shadow='lg'
      interactive={interactive}
    >
      <CardHeader className='pb-2'>
        {/* Title */}
        <H4 className='line-clamp-1'>{project._title}</H4>
      </CardHeader>

      <CardContent className='pt-0 pb-2'>
        {/* Description */}
        <M className='text-muted-foreground line-clamp-3 mb-3 text-sm leading-relaxed'>
          {project.shortDescription}
        </M>

        {/* Used Technologies */}
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
          {/* Button to read in full */}
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
