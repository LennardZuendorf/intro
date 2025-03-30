'use client';

import { cn } from '@/lib/utils/ui';
import type * as React from 'react';

import { ColorSelect } from '@/components/shared/color-select';
import { ThemeSelect } from '@/components/shared/theme-select';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site';
import { MailboxIcon } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={cn(
        'flex flex-col items-center pt-6 pb-6 w-full border-t-4 border-black space-y-5 md:space-y-2 relative',
        'bg-[#F8F5F1] dark:bg-[#1A1A1A] z-0',
        className
      )}
    >
      <div
        className='absolute inset-0 w-full h-full pointer-events-none z-[1]'
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      <div className='container flex flex-col sm:flex-row items-center justify-between align-middle space-y-5 md:space-y-2 z-[10] relative'>
        <div className='flex items-start space-x-2'>
          <Link href={siteConfig.links.mail}>
            <Button
              variant='link'
              className='justify-center items-center text-mtext hover:text-atext hover:bg-accent-light rounded-md hover:border-2 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              size='icon'
            >
              <MailboxIcon size='3vh' />
            </Button>
          </Link>
          <Link href={siteConfig.links.linkedin}>
            <Button
              variant='link'
              className='justify-center items-center hover:text-atext hover:bg-accent-light rounded-md hover:border-2 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              size='icon'
            >
              <FaLinkedin size='2vh' />
            </Button>
          </Link>
          <Link href={siteConfig.links.github}>
            <Button
              variant='link'
              className='justify-center items-center hover:text-atext hover:bg-accent-light rounded-md hover:border-2 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
              size='icon'
            >
              <FaGithub size='2vh' />
            </Button>
          </Link>
        </div>
        <div className='flex items-end gap-x-4'>
          <ColorSelect
            buttonVariant='default'
            className='shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all hover:border-2 hover:border-black'
          />
          <ThemeSelect
            buttonVariant='default'
            className='shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all hover:border-2 hover:border-black'
          />
        </div>
      </div>
      <div className='relative z-[2]'>
        <div className='flex items-center gap-x-2 text-sm font-mono'>
          <div>Built by Lennard Zündorf</div>
          <div> {`© ${new Date().getFullYear()}`}</div>
          <div>{' | '}</div>
          <Link href='/legal'>
            <Button
              variant='link'
              className='justify-center items-center hover:text-accent text-sm font-medium leading-none hover:underline p-0 hover:bg-accent-light hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
              size='icon'
            >
              legal
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
