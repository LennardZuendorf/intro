'use client';

import { ColorSelect } from '@/components/shared/color-select';
import { SocialButtons } from '@/components/shared/social-buttons';
import { ThemeSelect } from '@/components/shared/theme-select';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils/ui';
import Link from 'next/link';
import type * as React from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <Section
      as='footer'
      background='mask'
      fullHeight={false}
      bgColor='bg-[#F8F5F1] dark:bg-[#1A1A1A]'
      className={cn('border-t-4 border-black space-y-5 md:space-y-2', className)}
      padding='pt-6 pb-6'
      maxWidth='100%'
      containerWidth='100%'
      centerContent={true}
      containerClassName='items-center space-y-5 md:space-y-2'
      maskIntensity={40}
    >
      <div className='container flex flex-col sm:flex-row items-center justify-between align-middle space-y-5 md:space-y-2 z-[10] relative'>
        <SocialButtons iconSize='2vh' buttonVariant='default' />
        <div className='flex items-end gap-x-4'>
          <ColorSelect buttonVariant='default' className='shadow-md' popoverClassName='shadow-lg' />
          <ThemeSelect buttonVariant='default' className='shadow-md' popoverClassName='shadow-lg' />
        </div>
      </div>
      <div>
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
    </Section>
  );
};
