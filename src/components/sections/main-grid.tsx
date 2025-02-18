'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';
import { SectionProps } from '@/app/(app)/page';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { H3, L, M, Muted, SMuted } from '@/components/ui/typography';
import Link from 'next/link';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';

export const MainSection = ({
  className = 'mx-auto flex flex-col h-screen md:justify-center'
}: SectionProps) => {
  return (
    <section className={cn(className, 'flex flex-col gap-2 sm:gap-4')} id='hero'>
      <div className='grid grid-cols-12 gap-2 w-full'>
        <Card key='intro' className={cn('w-full', 'col-span-12 lg:col-span-8 lg:row-span-2')}>
          <CardHeader className='p-1 pr-4 justify-end'>
            <SMuted className='font-mono text-end'>hello</SMuted>
          </CardHeader>
          <CardContent className='place-self-center grid gap-2 grid-cols-3 justify-center lg:justify-start items-center  p-4 pt-0'>
            <div className='flex flex-col col-span-3 md:col-span-2 gap-4 justify-between text-center lg:text-start'>
              <H3 className='font-black font-title'>Hi! I&apos;m Lennard!</H3>
              <M className='leading-normal'>
                I&apos;m a <strong>Product Manager</strong> with a neck for coding, focused on
                turning product vision into reality.
              </M>
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-12 lg:col-span-4 lg:row-span-3'>
          <CardHeader className='p-1 pr-4 justify-end'>
            <SMuted className='font-mono text-end'>about me</SMuted>
          </CardHeader>
          <CardContent>
            <ul className='my-6 ml-6 list-disc [&>li]:mt-2 text-sm xl:text-base 2xl:text-lg'>
              <li>
                <strong>I enjoying working on software</strong> with real world impact.
              </li>
              <li>
                My focus is technology based <strong>product management</strong>, which combines my
                expertise in <strong>product, engineering, innovation</strong> and{' '}
                <strong>business</strong>.
              </li>
              <li>
                I&apos;m a <strong>coding enthusiast </strong>always trying to learn and leveling up
                my skills in product, coding and software at large.
              </li>
              <li>
                My free time I spent with <strong>music and various podcasts</strong>, working out
                or working on my own projects.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className='col-span-12 lg:col-span-4 lg:row-span-1 hidden lg:block'>
          <CardHeader className='p-1 pr-4 justify-end'>
            <SMuted className='font-mono text-end'>about</SMuted>
          </CardHeader>
          <CardContent className='grid grid-cols-3 justify-between'>
            <div className='col-span-2 flex flex-wrap justify-start text-start'>
              <L>Learn About Me</L>
              <Muted>My skills, experiences and techstack.</Muted>
            </div>
            <div className='col-span-1 flex justify-end items-center'>
              <Link href='/about#about-me' scroll={false}>
                <Button variant='default' size='icon'>
                  <HiMiniArrowTopRightOnSquare className='h-4 w-4' />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-12 lg:col-span-4 lg:row-span-1 hidden lg:block'>
          <CardHeader className='p-1 pr-4 justify-end'>
            <SMuted className='font-mono text-end'>projects</SMuted>
          </CardHeader>
          <CardContent className='grid grid-cols-3 justify-between'>
            <div className='col-span-2 flex flex-wrap justify-start text-start'>
              <L>See All My Projects</L>
              <Muted>All my academic and free time projects.</Muted>
            </div>
            <div className='col-span-1 flex justify-end items-center'>
              <Link href='/projects' scroll={false}>
                <Button variant='default' size='icon'>
                  <HiMiniArrowTopRightOnSquare className='h-4 w-4' />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className='col-span-12 lg:col-span-8 lg:row-span-1 hidden lg:block'>
          <CardHeader className='p-1 pr-4 justify-end'>
            <SMuted className='font-mono text-end'>topics</SMuted>
          </CardHeader>
          <CardContent className='gap-1 flex flex-wrap'></CardContent>
        </Card>
      </div>
    </section>
  );
};
