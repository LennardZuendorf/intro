'use client';

import type { SectionProps as PageSectionProps } from '@/app/(app)/page';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import {
  Section,
  SectionBottom,
  SectionLeft,
  SectionRight,
  SectionTop
} from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import { Code, H4, M, Muted, S } from '@/components/ui/typography';
import { experienceData, techStackData } from '@/data/about';
import { cn } from '@/lib/utils/ui';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CarouselVertical from '../custom/experience-carousel';

export default function AboutSection({ className }: PageSectionProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
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

  // Display only 5 skills initially for full-width layout
  const visibleSkills = allSkills.slice(0, 5);
  const hasMoreSkills = allSkills.length > 5;

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
        width='lg'
        centerContent={true}
        containerClassName='justify-center items-center mx-auto relative z-[2]'
      >
        <SectionTop>
          <SectionLeft>
            {/* About Me Card */}
            <div className='relative mb-6'>
              <Card className='relative w-full' interactive='medium' rotation='none'>
                <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                  <div className='absolute -top-4 -left-2 md:-top-5 md:-left-3'>
                    <NeoBadge
                      variant='light'
                      rotation='medium'
                      className='font-mono'
                      interactive='lift'
                    >
                      <Code>About Me</Code>
                    </NeoBadge>
                  </div>
                </CardHeader>
                <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
                  <div className='prose dark:prose-invert max-w-none'>
                    <M className='font-mono leading-relaxed'>
                      With a strong foundation in{' '}
                      <span className='font-bold inline-block'>Business Computing</span> and a
                      passion for technology, I bridge the gap between code and commerce. My
                      experience in
                      <span className='font-bold inline-block'> Innovation Management</span> and{' '}
                      <span className='font-bold inline-block'>Product Strategy</span> has given me
                      a unique perspective that I apply to my product management approach.
                    </M>
                    <M className='font-mono leading-relaxed mt-3'>
                      When I'm not working as a PM, you can find me expanding my skills through
                      <span className='font-bold inline-block'> language learning</span> and{' '}
                      <span className='font-bold inline-block'>side projects</span> that push my
                      coding abilities.
                    </M>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats Card */}
            <div className='relative'>
              <Card className='relative w-full' interactive='slight' rotation='slightNegative'>
                <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                  <div className='absolute -top-4 -left-2 md:-top-5 md:-left-3'>
                    <NeoBadge
                      variant='dark'
                      rotation='slight'
                      className='font-mono'
                      interactive='lift'
                    >
                      <Code>Quick Stats</Code>
                    </NeoBadge>
                  </div>
                </CardHeader>
                <CardContent className='p-4 pt-0 md:p-5 md:pt-0 2xl:p-6 2xl:pt-0'>
                  <div className='grid grid-cols-4 gap-2'>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>5+</M>
                      <S className='font-mono text-muted-foreground text-xs'>Years</S>
                    </div>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>15+</M>
                      <S className='font-mono text-muted-foreground text-xs'>Projects Built</S>
                    </div>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>3</M>
                      <S className='font-mono text-muted-foreground text-xs'>Languages</S>
                    </div>
                    <div className='text-center'>
                      <M className='font-mono font-bold'>Berlin</M>
                      <S className='font-mono text-muted-foreground text-xs'>Based In</S>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SectionLeft>

          <SectionRight>
            {/* Experience Section - Carousel */}
            <div className='relative'>
              <Card
                className='relative w-full'
                interactive='none'
                rotation='slight'
                shadow='none'
                variant='invisible'
              >
                <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                  <div className='absolute -top-12 -left-2 md:top-6 md:-left-3 z-[100]'>
                    <NeoBadge
                      variant='dark'
                      rotation='none'
                      className='font-mono'
                      interactive='grow'
                    >
                      <Code>Experiences</Code>
                    </NeoBadge>
                  </div>
                </CardHeader>
                <CardContent className='py-5 px-0'>
                  <CarouselVertical visibleCount={1} />
                </CardContent>
              </Card>
            </div>
          </SectionRight>
        </SectionTop>
        <SectionBottom>
          {/* What I Do - Full Width Skills */}
          <div className='w-full'>
            <H4 className='font-mono uppercase tracking-wider ml-2 mb-4'>What I Do</H4>
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
        </SectionBottom>
      </Section>
    </section>
  );
}
