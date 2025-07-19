'use client';

import ProjectCard from '@/components/sections/components/project-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Code, S } from '@/components/ui/typography';
import type { Project } from '@/payload-types';
import { useState } from 'react';

interface ProjectsGridProps {
  projects: Project[];
  className?: string;
}

export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  const [showAll, setShowAll] = useState(false);
  const [animating, setAnimating] = useState(false);

  const maxVisible = 6;
  const visibleProjects = showAll ? projects : projects.slice(0, maxVisible);
  const hasMore = projects.length > maxVisible;

  // Handle toggle with animation
  const handleToggle = (show: boolean) => {
    setAnimating(true);
    setShowAll(show);

    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className='flex items-center justify-center h-32'>
        <S className='text-muted-foreground'>No projects available</S>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-500 ease-in-out'>
        {visibleProjects.map((project, index) => (
          <div
            key={project.id}
            className={`transition-all duration-300 ease-in-out ${
              animating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
            }`}
            style={{
              transitionDelay: `${index * 50}ms`
            }}
          >
            <ProjectCard project={project} className='h-full' />
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <div className='flex justify-center mt-6'>
          {!showAll ? (
            <NeoBadge
              variant='default'
              size='lg'
              rotation='slight'
              interactive='lift'
              className='cursor-pointer'
              onClick={() => handleToggle(true)}
            >
              <Code>Show More Projects</Code>
            </NeoBadge>
          ) : (
            <NeoBadge
              variant='outline'
              size='lg'
              rotation='negative'
              interactive='lift'
              className='cursor-pointer'
              onClick={() => handleToggle(false)}
            >
              <Code>Show Less</Code>
            </NeoBadge>
          )}
        </div>
      )}
    </div>
  );
}
