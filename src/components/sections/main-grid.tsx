'use client';

import type { SectionProps } from '@/app/(app)/page';
import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import Link from 'next/link';
import { useState } from 'react';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

const interests = [
  'Product Strategy',
  'System Design',
  'User Experience',
  'Tech Innovation',
  'Team Leadership',
  'Full-stack Dev',
  'Cloud Architecture',
  'Agile Methods',
  'Design Systems'
];

export const MainSection = ({ className }: SectionProps) => {
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);

  return (
    <section
      className={cn(
        'min-h-[100svh] w-full relative overflow-hidden',
        'flex items-center justify-center',
        'bg-[#F8F5F1] dark:bg-[#1A1A1A] z-0',
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

      <div className='relative w-full max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center gap-16 z-[2]'>
        {/* Left Content */}
        <div className='w-full lg:w-[55%] flex flex-col items-start gap-8'>
          {/* Name Card */}
          <div className='relative w-full bg-white dark:bg-[#2A2A2A] p-8 rounded-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
            <div className='absolute -top-3 -left-3 px-4 py-1 bg-accent-light text-atext font-mono text-sm border-2 border-black rotate-2 rounded-md'>
              Hey there! 👋
            </div>
            <H3 className='text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tighter -rotate-1 mb-6'>
              Lennard
            </H3>
            <div className='space-y-3'>
              <span className='bg-accent text-atext px-3 py-1.5 font-medium rotate-1 inline-block rounded-md border-2 border-black'>
                Product Manager
              </span>
              <span className='ml-2 bg-accent-dark text-atext px-3 py-1.5 font-medium -rotate-1 inline-block rounded-md border-2 border-black'>
                Tech Explorer
              </span>
            </div>
          </div>

          {/* Description */}
          <div className='relative font-mono text-lg leading-relaxed'>
            <span className='bg-accent-light text-atext px-4 py-2 rounded-md border-2 border-black inline-block rotate-1'>
              Building digital products
            </span>{' '}
            that combine{' '}
            <span className='bg-accent text-atext px-4 py-2 rounded-md border-2 border-black inline-block -rotate-1'>
              strategic vision
            </span>{' '}
            with{' '}
            <span className='bg-accent-dark text-atext px-4 py-2 rounded-md border-2 border-black inline-block rotate-1'>
              technical excellence
            </span>
          </div>

          {/* Current Focus Cards */}
          <div className='w-full space-y-4 mt-2'>
            <h4 className='font-mono text-sm uppercase tracking-wider ml-2'>Currently</h4>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:-rotate-1 transition-all'>
                <h3 className='font-bold text-lg mb-2'>Product @ Company</h3>
                <p className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                  Leading product strategy and development for enterprise SaaS solutions
                </p>
              </div>
              <div className='bg-white dark:bg-[#2A2A2A] p-6 rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-1 transition-all'>
                <h3 className='font-bold text-lg mb-2'>Side Projects</h3>
                <p className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                  Building tools and exploring new technologies in web development
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className='w-full lg:w-[45%] flex flex-col gap-8'>
          {/* Interactive Interest Cloud */}
          <div className='w-full aspect-square relative'>
            <div className='absolute inset-0 bg-white dark:bg-[#2A2A2A] rounded-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='relative w-full h-full p-8'>
                  {interests.map((interest, index) => {
                    const angle = index * (360 / interests.length) * (Math.PI / 180);
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <div
                        key={interest}
                        className={cn(
                          'absolute transform -translate-x-1/2 -translate-y-1/2',
                          'transition-all duration-300 cursor-pointer',
                          hoveredInterest === interest ? 'scale-125 z-10' : 'scale-100 z-0',
                          hoveredInterest && hoveredInterest !== interest
                            ? 'opacity-50'
                            : 'opacity-100'
                        )}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`
                        }}
                        onMouseEnter={() => setHoveredInterest(interest)}
                        onMouseLeave={() => setHoveredInterest(null)}
                      >
                        <span className='bg-white dark:bg-[#2A2A2A] px-3 py-1.5 text-sm font-medium border-2 border-black rounded-md whitespace-nowrap'>
                          {interest}
                        </span>
                      </div>
                    );
                  })}

                  {/* Center piece */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-8xl font-black text-black dark:text-white opacity-10 -rotate-12'>
                      LZ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center'>
            <Link href='/about' className='flex-1'>
              <Button
                variant='default'
                className='group w-full text-base border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md'
                size='lg'
              >
                Learn more about me
                <HiMiniArrowTopRightOnSquare className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Link href='/projects' className='flex-1'>
              <Button
                variant='neutral'
                className='group w-full text-base border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md'
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
