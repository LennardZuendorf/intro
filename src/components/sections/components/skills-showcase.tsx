'use client';

import { NeoBadge } from '@/components/ui/neoBadge';
import { H4 } from '@/components/ui/typography';
import { useState } from 'react';
import { aboutFallbackData } from '../../../../content/AboutContent';

interface SkillsShowcaseProps {
  skills: string[];
}

export default function SkillsShowcase({ skills }: SkillsShowcaseProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [animatingSkills, setAnimatingSkills] = useState(false);

  // Ensure we have at least 5 skills for proper display
  const skillsToDisplay = skills.length >= 5 ? skills : aboutFallbackData.skills;

  // Display only 5 skills initially for full-width layout
  const visibleSkills = skillsToDisplay.slice(0, 5);
  const hasMoreSkills = skillsToDisplay.length > 5;

  // Handle skills toggle with animation
  const handleSkillsToggle = (show: boolean) => {
    setAnimatingSkills(true);
    setShowAllSkills(show);

    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimatingSkills(false);
    }, 500);
  };

  return (
    <div className='w-full'>
      <H4 className='font-mono uppercase tracking-wider ml-2 mb-4'>What I Do</H4>
      <div className='flex flex-wrap gap-2 md:gap-3 relative w-full transition-all duration-500 ease-in-out'>
        {(showAllSkills ? skillsToDisplay : visibleSkills).map((skill, index) => (
          <NeoBadge
            key={skill}
            variant={index % 3 === 0 ? 'default' : index % 3 === 1 ? 'light' : 'dark'}
            size='sm'
            className={`skill-badge transition-all duration-300 ease-in-out ${
              animatingSkills ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
            } z-10`}
            style={{
              transitionDelay: `${index * 25}ms`
            }}
            rotation={index % 3 === 0 ? 'slight' : index % 3 === 1 ? 'negative' : 'none'}
            interactive={index % 3 === 0 ? 'lift' : index % 3 === 1 ? 'bounce' : 'wiggle'}
          >
            {skill}
          </NeoBadge>
        ))}
        {hasMoreSkills && !showAllSkills && (
          <NeoBadge
            variant='outline'
            size='sm'
            className='hover:cursor-pointer transition-all duration-300 ease-in-out'
            interactive='lift'
            onClick={() => handleSkillsToggle(true)}
          >
            + More
          </NeoBadge>
        )}
        {showAllSkills && (
          <NeoBadge
            variant='outline'
            size='sm'
            className='hover:cursor-pointer transition-all duration-300 ease-in-out'
            interactive='lift'
            onClick={() => handleSkillsToggle(false)}
          >
            - Hide
          </NeoBadge>
        )}
      </div>
    </div>
  );
}
