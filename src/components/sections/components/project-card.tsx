'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { H4, M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { Project } from '@/payload-types';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
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
      rotation='none'
      shadow='lg'
      interactive='slight'
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
              {technologies.map((tech) => (
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
              Live Demo
            </IconLink>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
