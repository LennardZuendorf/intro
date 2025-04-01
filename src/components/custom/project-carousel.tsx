'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useIsBreakpoint } from '@/hooks/useWindowDimensions';
import { cn } from '@/lib/utils/ui';
import type { Project } from '@/payload-types';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const isMediumScreen = useIsBreakpoint('md');

  return (
    <div className='w-full relative py-10'>
      <Carousel
        className='w-full'
        orientation='horizontal'
        opts={{
          align: 'start',
          containScroll: 'trimSnaps'
        }}
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id} className={cn('md:basis-1/2 lg:basis-1/3')}>
              <Card className='group h-full' variant='reversed'>
                <div className='relative overflow-hidden border-b-4 border-black aspect-video'>
                  {/*<Image
                    src={
                      typeof project.heroImage === 'object'
                        ? typeof project.heroImage?.url === 'string'
                          ? project.heroImage?.url
                          : 'http://localhost:3000/api/media/file/premium_photo-1661877737564-3dfd7282efcb.jpg'
                        : 'http://localhost:3000/api/media/file/premium_photo-1661877737564-3dfd7282efcb.jpg'
                    }
                    alt={project.title}
                    width={600}
                    height={400}
                    className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 contrast-75'
                  />
                  */}
                </div>

                <div className='p-6'>
                  <h3 className='text-2xl font-bold mb-3'>{project.title}</h3>
                  <p className='mb-4'>{project.shortDescription}</p>

                  <div className='flex flex-wrap gap-2 mb-6'>
                    {project.technologies?.map((tech) => (
                      <Badge
                        key={
                          typeof tech === 'object' && tech !== null ? tech.id || tech.name : tech
                        }
                      >
                        {typeof tech === 'object' && tech !== null ? tech.name : tech}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <Button>
                      View Project
                      <ArrowUpRight className='ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                    </Button>
                  </Link>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          positioning={!isMediumScreen ? 'vertical' : 'horizontal'}
          className='bg-bg border-border'
        />
        <CarouselNext
          positioning={!isMediumScreen ? 'vertical' : 'horizontal'}
          className='bg-bg border-border'
        />
      </Carousel>
    </div>
  );
}
