'use client';

import type { VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, type cardVariants } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { Project } from '@/payload-types';

type CardVariants = VariantProps<typeof cardVariants>;

interface ProjectCardProps {
  project: Project;
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
  // Handle hero image - it can be a number (ID) or Media object
  const heroImageUrl =
    typeof project.heroImage === 'object' && project.heroImage?.url ? project.heroImage.url : null;

  // Handle technologies - they should now always be populated Tag objects
  const technologies =
    project.technologies
      ?.map((tech) => {
        // With our optimized query, these should always be Tag objects with name property
        if (typeof tech === 'object' && tech && 'name' in tech && tech.name) {
          return tech.name;
        }

        // This shouldn't happen with our new approach, but safety fallback
        console.warn('Unexpected technology format:', tech);
        return null;
      })
      .filter((tech): tech is string => tech !== null && tech.length > 0) || [];

  console.log('Technologies for project:', project.title, technologies);

  return (
    <Card
      className={cn('w-full h-[450px] overflow-hidden', className)}
      variant='default'
      rotation={rotation}
      shadow='lg'
      interactive={interactive}
    >
      {/* Title Picture */}
      {heroImageUrl && (
        <div className='h-48 overflow-hidden'>
          <Image
            src={heroImageUrl}
            alt={project.title}
            width={400}
            height={192}
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            loading='lazy'
          />
        </div>
      )}

      <CardHeader className='pb-2'>
        {/* Title */}
        <H4 className='line-clamp-1'>{project.title}</H4>
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
                  key={`${project.id}-tech-${tech}`}
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
                  key={`${project.id}-tech-more`}
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
          {project.slug && (
            <IconLink
              href={`/projects/${project.slug}`}
              variant='accent'
              size='sm'
              className='flex-1'
            >
              Read More
            </IconLink>
          )}

          {/* Button to see it live */}
          {project.liveUrl && (
            <IconLink
              href={project.liveUrl}
              external={project.liveUrl.startsWith('http')}
              variant='neutral'
              size='sm'
              iconPosition='right'
              className='flex-1'
            >
              <ExternalLink className='w-3 h-3' />
              Preview
            </IconLink>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
