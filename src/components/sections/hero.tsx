'use client';

import type { SectionProps as PageSectionProps } from '@/app/(app)/page';
import { SocialButtons } from '@/components/shared/social-buttons';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CornerIconLink, IconLink } from '@/components/ui/icon-link';
import { NeoBadge } from '@/components/ui/neoBadge';
import { ProfileImage } from '@/components/ui/profile-image';
import { Section } from '@/components/ui/section';
import { Code, H1, H3, H4, L, M } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import type { SectionContent } from '@/payload-types';
import Link from 'next/link';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

// Interface for the component props
interface HeroSectionProps extends PageSectionProps {
  sectionContent: SectionContent;
}

export const HeroSection = ({ className, sectionContent }: HeroSectionProps) => {
  return (
    <section id='hero'>
      <Section
        background='grid'
        className={className}
        columns={2}
        centerContent={true}
        containerClassName='justify-center items-center mx-auto'
        maxWidth='min(92%, 1280px)'
      >
        <Section.Left>
          <Card className='relative w-full' interactive='slight' rotation='slight'>
            <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
              <div className='absolute -top-2 -left-2 md:-top-3 md:-left-3'>
                <NeoBadge
                  variant='light'
                  rotation='medium'
                  className='font-mono'
                  interactive='lift'
                >
                  <Code>Hey there! 👋</Code>
                </NeoBadge>
              </div>
              <H1 className='-rotate-1'>I'm Lennard</H1>
            </CardHeader>
            <CardContent className='p-5 pt-0 md:p-6 md:pt-0 2xl:p-8 2xl:pt-0'>
              <div className='prose dark:prose-invert max-w-none mb-3'>
                <M className='font-mono leading-relaxed'>
                  a 25-year-old Product Manager & Product Owner based in Berlin, Germany.
                </M>
                <M className='font-mono leading-relaxed mt-1'>
                  I leverage my technical expertise to execute product strategy, drive
                  implementation and manage the product with a focus on payments.
                </M>
              </div>

              <div className='space-y-2 md:space-y-3'>
                <NeoBadge variant='default' rotation='slight' interactive='bounce'>
                  <L>Product</L>
                </NeoBadge>
                <NeoBadge className='ml-2' variant='dark' rotation='negative' interactive='wiggle'>
                  <L>Technology</L>
                </NeoBadge>
              </div>

              {/* Social Buttons */}
              <div className='mt-3 md:mt-4 2xl:mt-5'>
                <SocialButtons iconSize='1.25rem' buttonVariant='default' />
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div className='relative font-mono leading-relaxed'>
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
          <div className='w-full mt-1 md:mt-3'>
            <H4 className='font-mono uppercase tracking-wider ml-2 mb-2'>Currently</H4>

            <div className='grid grid-cols-1 gap-3'>
              {/* Professional Role */}
              <Card
                className='relative'
                rotation='slightNegative'
                interactive='slight'
                variant='clickable'
              >
                <div className='p-3 md:p-4 2xl:p-6'>
                  <H3 className='mb-1'>Product @ Check24 Flug</H3>
                  <M className='text-muted-foreground'>
                    Leading product strategy and development for enterprise SaaS solutions.
                  </M>
                  <CornerIconLink
                    href='/#about'
                    icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 md:h-5 md:w-5' />}
                    className='absolute top-3 right-2 md:top-4 md:right-3'
                    ariaLabel='Learn more about my experience at Check24'
                  />
                </div>
              </Card>
            </div>
          </div>
        </Section.Left>
        <Section.Right>
          {/* Profile Image */}
          <div className='hidden md:block w-full'>
            <ProfileImage
              image={sectionContent?.avatar}
              alt='Lennard Zündorf'
              className='w-full'
              aspectRatio='aspect-square'
              hideCaption={true}
            />
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 md:gap-4 2xl:gap-6 items-stretch sm:items-center justify-center mt-3 md:mt-4 2xl:mt-6'>
            <IconLink
              href='/#about'
              icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 md:h-5 md:w-5' />}
              variant='action'
              className='md:py-2 2xl:py-3'
              size='lg'
              iconPosition='right'
            >
              Learn more about me
            </IconLink>
            <IconLink
              href='/#projects'
              icon={<HiMiniArrowTopRightOnSquare className='h-4 w-4 md:h-5 md:w-5' />}
              variant='action'
              className='md:py-2 2xl:py-3'
              size='lg'
              iconPosition='right'
            >
              View my projects
            </IconLink>
          </div>
        </Section.Right>
      </Section>
    </section>
  );
};
