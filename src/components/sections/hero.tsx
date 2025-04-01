'use client';

import type { SectionProps } from '@/app/(app)/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ImageCard from '@/components/ui/image-card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Code, H1, H2, H3, H4, L, M, Muted, Quote, S } from '@/components/ui/typography';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils/ui';
import type { PageContent } from '@/payload-types';
import { MailboxIcon } from 'lucide-react';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa6';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

// Interface for the component props
interface HeroSectionProps extends SectionProps {
  pageContent: PageContent;
}

export const HeroSection = ({ className, pageContent }: HeroSectionProps) => {
  const avatar = pageContent?.avatar;

  return (
    <section
      className={cn(
        'min-h-[100svh] w-full relative overflow-hidden',
        'flex items-center justify-center',
        'bg-main z-0',
        className
      )}
      id='hero'
    >
      {/* Grid background with mask */}
      <div
        className='absolute inset-0 w-full h-full z-[1] pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      {/* Hero Section */}
      <div className='relative w-full max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-start gap-16 z-[2]'>
        <div className='w-full lg:w-[55%] flex flex-col items-start gap-8'>
          <Card className='relative w-full'>
            <CardHeader>
              <div className='absolute -top-3 -left-3'>
                <NeoBadge
                  variant='light'
                  rotation='medium'
                  shadow='sm'
                  className='font-mono text-sm'
                  interactive='wiggle'
                >
                  <Code>Hey there! 👋</Code>
                </NeoBadge>
              </div>
              <H1 className='-rotate-1 mb-6'>I'm Lennard</H1>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <NeoBadge
                  variant='default'
                  rotation='slight'
                  shadow='sm'
                  interactive='grow'
                  size='md'
                >
                  <L>Product Manager</L>
                </NeoBadge>
                <NeoBadge
                  className='ml-2'
                  variant='dark'
                  rotation='negative'
                  shadow='sm'
                  interactive='bounce'
                  size='md'
                >
                  <L>Tech Explorer</L>
                </NeoBadge>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div className='relative font-mono text-lg leading-relaxed'>
            <NeoBadge
              variant='light'
              rotation='slight'
              className='font-mono'
              size='lg'
              shadow='sm'
              interactive='lift'
            >
              Building digital products
            </NeoBadge>{' '}
            that combine{' '}
            <NeoBadge
              variant='default'
              rotation='negative'
              className='font-mono'
              size='lg'
              shadow='sm'
              interactive='lift'
            >
              strategic vision
            </NeoBadge>{' '}
            with{' '}
            <NeoBadge
              variant='dark'
              rotation='slight'
              className='font-mono'
              size='lg'
              shadow='sm'
              interactive='lift'
            >
              technical excellence.
            </NeoBadge>
          </div>

          {/* Current Focus Cards */}
          <div className='w-full space-y-4 mt-2'>
            <H4 className='font-mono text-sm uppercase tracking-wider ml-2'>Currently</H4>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <Card className='p-6 relative' rotation='negativeMedium' interactive='flip'>
                <CardHeader>
                  <H3>Product @ Check24 Flug</H3>
                </CardHeader>
                <CardContent>
                  <Muted>
                    Leading product strategy and development for enterprise SaaS solutions.
                  </Muted>
                </CardContent>
                <Link
                  href='/#about'
                  className='absolute bottom-4 right-4 p-2 rounded-md hover:bg-accent/10 transition-colors'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <HiMiniArrowTopRightOnSquare className='h-5 w-5' />
                </Link>
              </Card>
              <Card className='p-6' rotation='slight' interactive='wiggle'>
                <CardHeader>
                  <H3> Ignitr Side Projects</H3>
                </CardHeader>
                <CardContent>
                  <Muted>Building tools and exploring new technologies in web development.</Muted>
                </CardContent>
                <Link
                  href='/projects/ignitr'
                  className='absolute bottom-4 right-4 p-2 rounded-md hover:bg-accent/10 transition-colors'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <HiMiniArrowTopRightOnSquare className='h-5 w-5' />
                </Link>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className='w-full lg:w-[45%] flex flex-col gap-8'>
          {/* Image Card - Avatar */}
          <div className='w-full aspect-square relative'>
            {/* ImageCard as the background */}
            <div className='absolute inset-0'>
              {avatar && typeof avatar === 'object' && avatar.url ? (
                <ImageCard
                  className='w-full h-full'
                  imageUrl={avatar.url}
                  alt={avatar.alt || 'Avatar'}
                  heightClass='h-full'
                  aspectRatio='aspect-square'
                  fullHeight={true}
                  hideCaption={true}
                />
              ) : (
                <ImageCard
                  className='w-full h-full'
                  imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"
                  alt='Avatar'
                  heightClass='h-full'
                  aspectRatio='aspect-square'
                  fullHeight={true}
                  hideCaption={true}
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center'>
            <Link href='/#about' className='flex-1'>
              <Button
                variant='default'
                className='group w-full text-base border-2 border-black shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all rounded-md'
                size='lg'
              >
                Learn more about me
                <HiMiniArrowTopRightOnSquare className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Link href='/#projects' className='flex-1'>
              <Button
                variant='default'
                className='group w-full text-base border-2 border-black shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all rounded-md'
                size='lg'
              >
                View my projects
                <HiMiniArrowTopRightOnSquare className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
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
    </section>
  );
};
