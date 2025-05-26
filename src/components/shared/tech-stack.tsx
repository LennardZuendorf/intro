'use client';

import { techStackData } from '@/data/about';
import Link from 'next/link';
import React, { useState } from 'react';
import { NeoBadge } from '../ui/neoBadge';

export function TechStackCompact() {
  const [showAllTech, setShowAllTech] = useState(false);
  const [animatingTech, setAnimatingTech] = useState(false);

  // Display only 4 tech stack items initially (reduced for compact display)
  const visibleTech = techStackData.slice(0, 4);
  const hasMoreTech = techStackData.length > 4;

  // Handle tech stack toggle with animation
  const handleTechToggle = (show: boolean) => {
    setAnimatingTech(true);
    setShowAllTech(show);

    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimatingTech(false);
    }, 500);
  };

  return (
    <div className='flex flex-wrap gap-2 md:gap-3 relative transition-all duration-500 ease-in-out'>
      {(showAllTech ? techStackData : visibleTech).map((tech, index) => (
        <NeoBadge
          key={tech.name}
          variant='dark'
          size='sm'
          className={`tech-badge transition-all duration-300 ease-in-out ${
            animatingTech ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
          } z-10`}
          style={{
            transitionDelay: `${index * 25}ms`
          }}
          rotation={index % 3 === 0 ? 'slight' : index % 3 === 1 ? 'negative' : 'none'}
          interactive='lift'
        >
          <Link href={tech.link} target='_blank' rel='noopener noreferrer' className='inline-block'>
            {tech.name}
          </Link>
        </NeoBadge>
      ))}
      {hasMoreTech && !showAllTech && (
        <NeoBadge
          variant='outline'
          size='sm'
          className='hover:cursor-pointer transition-all duration-300 ease-in-out'
          interactive='lift'
          onClick={() => handleTechToggle(true)}
        >
          + More
        </NeoBadge>
      )}
      {showAllTech && (
        <NeoBadge
          variant='outline'
          size='sm'
          className='hover:cursor-pointer transition-all duration-300 ease-in-out'
          interactive='lift'
          onClick={() => handleTechToggle(false)}
        >
          - Hide
        </NeoBadge>
      )}
    </div>
  );
}
