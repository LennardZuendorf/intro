'use client';

import { cn } from '@/lib/utils/ui';
import type * as React from 'react';

import { ColorSelect } from '@/components/shared/color-select';
import { SocialButtons } from '@/components/shared/social-buttons';
import { ThemeSelect } from '@/components/shared/theme-select';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site';
import Link from 'next/link';

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
        <SocialButtons iconSize='2vh' buttonVariant='default' />
        <div className='flex items-end gap-x-4'>
          <ColorSelect buttonVariant='default' className='shadow-md' popoverClassName='shadow-lg' />
          <ThemeSelect buttonVariant='default' className='shadow-md' popoverClassName='shadow-lg' />
        </div>
      </div>
      <div className='relative z-[2]'>
        <div className='flex items-center gap-x-2 text-sm font-mono'>
          <div>Built by Lennard Zündorf</div>
          <div> {`© ${new Date().getFullYear()}`}</div>
          <div>{' | '}</div>
          <Link href='/legal'>
            <Button variant='link' className='justify-center items-center' size='icon'>
              legal
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
