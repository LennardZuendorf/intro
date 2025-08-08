'use client';

import { useRef, useState } from 'react';
import ProjectCard from '@/components/sections/components/project-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Code, S } from '@/components/ui/typography';
import { getRandomCardProps } from '@/lib/utils/randomCardProps';

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

interface ProjectsGridProps {
  projects: ProjectData[];
  className?: string;
}

export function ProjectsGrid({ projects, className }: ProjectsGridProps) {
  const [showAll, setShowAll] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const maxVisible = 9; // 3 rows of 3 cards
  const visibleProjects = showAll ? projects : projects.slice(0, maxVisible);
  const hasMore = projects.length > maxVisible;

  // Handle toggle with smooth scroll
  const handleToggle = (show: boolean) => {
    setShowAll(show);

    // Scroll to button after expansion
    if (show && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
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
      {/* Projects Grid with extra large margin for shadows and rotations */}
      <div className='px-16 py-12 mx-4'>
        <div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-300 ease-in-out'
          style={{
            maxHeight: showAll ? 'none' : '1800px', // Increased height for larger margins
            overflow: 'visible' // Changed from hidden to visible to prevent clipping
          }}
        >
          {visibleProjects.map((project, index) => {
            const { rotation, interactive } = getRandomCardProps(project._id);

            return (
              <div
                key={project._id}
                className='transition-all duration-300 ease-in-out'
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <ProjectCard
                  project={project}
                  className='h-full'
                  rotation={rotation}
                  interactive={interactive}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <div ref={buttonRef} className='flex justify-center mt-8'>
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
