'use client';

import type { SectionProps as PageSectionProps } from '@/app/(app)/page';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import { Code, H3, H4, L, Muted } from '@/components/ui/typography';
import { experienceData, techStackData } from '@/data/about';
import { cn } from '@/lib/utils/ui';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CarouselVertical from '../custom/experience-carousel';

export default function AboutSection({ className }: PageSectionProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [animatingTech, setAnimatingTech] = useState(false);
  const [animatingSkills, setAnimatingSkills] = useState(false);

  const allSkills = [
    'Product Management',
    'Software Engineering',
    'Digital Innovation',
    'Scrum & Kanban',
    'Software Architecture',
    'Product Strategy',
    'Data Science',
    'Machine Learning',
    'UX Design'
  ];

  // Display only 5 skills initially
  const visibleSkills = allSkills.slice(0, 5);
  const hasMoreSkills = allSkills.length > 5;

  // Display only 5 tech stack items initially
  const visibleTech = techStackData.slice(0, 5);
  const hasMoreTech = techStackData.length > 5;

  // Handle tech stack toggle with animation
  const handleTechToggle = (show: boolean) => {
    setAnimatingTech(true);
    setShowAllTech(show);

    // Reset animation flag after animation completes
    setTimeout(() => {
      setAnimatingTech(false);
    }, 500);
  };

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
    <section id='about'>
      <Section
        className={className}
        background='grid'
        maxWidth='min(92%, 1280px)'
        centerContent={true}
        containerClassName='justify-center items-center mx-auto relative z-[2]'
        columns={2}
      >
        <Section.Left>
          {/* About Me Card */}
          <div className='relative'>
            <Card className='relative w-full' interactive='slight' rotation='slight'>
              <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                  <NeoBadge
                    variant='light'
                    rotation='medium'
                    className='font-mono text-sm md:text-base 2xl:text-lg'
                    interactive='lift'
                  >
                    <Code>About Me</Code>
                  </NeoBadge>
                </div>
              </CardHeader>
              <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                <div className='prose dark:prose-invert max-w-none'>
                  <p className='font-mono text-sm md:text-base leading-relaxed'>
                    With a strong foundation in{' '}
                    <span className='font-bold inline-block'>Business Computing</span> and a passion
                    for technology, I bridge the gap between code and commerce. My experience in
                    <span className='font-bold inline-block'> Innovation Management</span> and{' '}
                    <span className='font-bold inline-block'>Product Strategy</span> has given me a
                    unique perspective that I apply to my product management approach.
                  </p>
                  <p className='font-mono text-sm md:text-base leading-relaxed mt-3'>
                    When I'm not working as a PM, you can find me expanding my skills through
                    <span className='font-bold inline-block'> language learning</span> and{' '}
                    <span className='font-bold inline-block'>side projects</span> that push my
                    coding abilities.
                  </p>
                </div>
                <Separator />
                <Muted className='font-mono text-sm md:text-base leading-relaxed'>
                  I'm passionate about building with technology, from web apps to data
                  visualizations, always aiming to solve real problems while exploring new tech.
                </Muted>
              </CardContent>
            </Card>
          </div>
          {/* Additional Text Content */}
          <div className='relative font-mono text-base md:text-lg 2xl:text-xl leading-relaxed'>
            <NeoBadge
              variant='light'
              rotation='slight'
              className='font-mono'
              size='lg'
              interactive='grow'
            >
              Building digital products
            </NeoBadge>{' '}
            that combine{' '}
            <NeoBadge
              variant='default'
              rotation='negative'
              className='font-mono'
              size='lg'
              interactive='wiggle'
            >
              strategic vision
            </NeoBadge>{' '}
            with{' '}
            <NeoBadge
              variant='dark'
              rotation='slight'
              className='font-mono'
              size='lg'
              interactive='bounce'
            >
              technical excellence.
            </NeoBadge>
          </div>
        </Section.Left>
        <Section.Right>
          {/* Experience Section - Carousel */}
          <div className='absolute top-15 z-50'>
            <NeoBadge rotation='negativeMedium' interactive='grow'>
              <Code>Experiences</Code>
            </NeoBadge>
          </div>
          <CarouselVertical visibleCount={1} />
        </Section.Right>
        <Section.Bottom>
          {/* Professional Skills */}
          <div className='w-full'>
            <H4 className='font-mono text-sm md:text-base 2xl:text-lg uppercase tracking-wider ml-2 mb-2'>
              Key Skills
            </H4>
            <div className='flex flex-wrap gap-2 md:gap-3 relative w-full transition-all duration-500 ease-in-out'>
              {(showAllSkills ? allSkills : visibleSkills).map((skill, index) => (
                <NeoBadge
                  key={skill}
                  variant='light'
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

          {/* Tech Stack Section */}
          <div className='mt-1 md:mt-2'>
            <H4 className='font-mono text-sm md:text-base 2xl:text-lg uppercase tracking-wider ml-2 mb-2'>
              Tech Stack
            </H4>
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
                  <Link
                    href={tech.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block'
                  >
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
          </div>
        </Section.Bottom>
      </Section>
    </section>
  );
}
