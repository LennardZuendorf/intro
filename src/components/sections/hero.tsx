'use client';

import type { SectionProps } from '@/app/(app)/page';
import { SocialButtons } from '@/components/shared/social-buttons';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CornerIconLink, IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { ProfileImage } from '@/components/ui/profile-image';
import { Code, H1, H3, H4, L, Muted } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { PageContent } from '@/payload-types';
import Link from 'next/link';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

// Interface for the component props
interface HeroSectionProps extends SectionProps {
  pageContent: PageContent;
}

// Common button styles
const actionButtonClass =
  'group w-full text-base border-2 border-black shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all rounded-md';

export const HeroSection = ({ className, pageContent }: HeroSectionProps) => {
  return (
    <BackgroundGrid
      className={cn(
        'min-h-[100svh] w-full',
        'flex items-center justify-center',
        'bg-main',
        className
      )}
    >
      {/* Hero Section */}
      <div
        id='hero'
        className='w-full px-6 py-8 md:py-12 2xl:py-16 flex flex-col lg:flex-row items-start gap-8 md:gap-12 lg:gap-16 2xl:gap-24 mx-auto'
        style={{
          maxWidth: 'min(92%, 1280px)',
          width: 'clamp(100%, 80vw, 1600px)'
        }}
      >
        <div className='w-full lg:w-[55%] flex flex-col items-start gap-6 md:gap-8 2xl:gap-12'>
          <Card
            className='relative w-full scale-100 md:scale-105 2xl:scale-110'
            interactive='slight'
            rotation='slight'
          >
            <CardHeader className='p-6 md:p-8 2xl:p-10'>
              <div className='absolute -top-3 -left-3 md:-top-4 md:-left-4'>
                <NeoBadge
                  variant='light'
                  rotation='medium'
                  className='font-mono text-sm md:text-base 2xl:text-lg'
                  interactive='lift'
                >
                  <Code>Hey there! 👋</Code>
                </NeoBadge>
              </div>
              <H1 className='-rotate-1 mb-3 text-4xl md:text-5xl 2xl:text-6xl'>I'm Lennard</H1>
            </CardHeader>
            <CardContent className='pt-2 md:pt-4 2xl:pt-5'>
              <div className='space-y-3 md:space-y-4'>
                <NeoBadge
                  variant='default'
                  rotation='slight'
                  interactive='bounce'
                  className='md:text-lg 2xl:text-xl'
                >
                  <L>Product Manager</L>
                </NeoBadge>
                <NeoBadge
                  className='ml-2 md:text-lg 2xl:text-xl'
                  variant='dark'
                  rotation='negative'
                  interactive='wiggle'
                >
                  <L>Tech Explorer</L>
                </NeoBadge>
              </div>

              {/* Social Buttons */}
              <div className='mt-3 md:mt-4 2xl:mt-5'>
                <SocialButtons iconSize='1.25rem' buttonVariant='default' />
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div className='relative font-mono text-lg md:text-xl 2xl:text-2xl leading-relaxed'>
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

          {/* Current Focus Card */}
          <div className='w-full mt-2 md:mt-4'>
            <H4 className='font-mono text-sm md:text-base 2xl:text-lg uppercase tracking-wider ml-2 mb-3'>
              Currently
            </H4>

            <div className='grid grid-cols-1 gap-4'>
              {/* Professional Role */}
              <Card
                className='relative scale-100 md:scale-105 2xl:scale-110'
                rotation='slightNegative'
                interactive='slight'
              >
                <div className='p-4 md:p-6 2xl:p-8'>
                  <H3 className='text-base md:text-lg 2xl:text-xl mb-1 md:mb-2'>
                    Product @ Check24 Flug
                  </H3>
                  <Muted className='text-sm md:text-base 2xl:text-lg'>
                    Leading product strategy and development for enterprise SaaS solutions.
                  </Muted>
                  <CornerIconLink
                    href='/#about'
                    icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 md:h-5 md:w-5' />}
                    className='absolute top-4 right-3 md:top-6 md:right-5'
                    ariaLabel='Learn more about my experience at Check24'
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className='w-full lg:w-[45%] flex flex-col gap-8 md:gap-10 2xl:gap-12'>
          {/* Profile Image */}
          <div className='w-full scale-100 md:scale-105 2xl:scale-110'>
            <ProfileImage
              image={pageContent?.avatar}
              alt='Lennard Zündorf'
              className='w-full'
              aspectRatio='aspect-square'
              hideCaption={true}
            />
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 md:gap-6 2xl:gap-8 items-stretch sm:items-center justify-center mt-4 md:mt-6 2xl:mt-8'>
            <IconLink
              href='/#about'
              icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 md:h-5 md:w-5' />}
              variant='default'
              className={cn(actionButtonClass, 'text-base md:text-lg 2xl:text-xl md:py-3 2xl:py-4')}
              size='lg'
              iconPosition='right'
            >
              Learn more about me
            </IconLink>
            <IconLink
              href='/#projects'
              icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 md:h-5 md:w-5' />}
              variant='default'
              className={cn(actionButtonClass, 'text-base md:text-lg 2xl:text-xl md:py-3 2xl:py-4')}
              size='lg'
              iconPosition='right'
            >
              View my projects
            </IconLink>
          </div>
        </div>
      </div>

      {/* Add keyframes for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(var(--tw-rotate));
          }
          100% {
            transform: translateY(-10px) rotate(var(--tw-rotate));
          }
        }
      `}</style>
    </BackgroundGrid>
  );
};
