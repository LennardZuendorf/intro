'use client';

import { cn } from '@/lib/utils/ui';
import type * as React from 'react';

import { ThemeSelect } from '@/components/shared/theme-select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/data/site';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MailboxIcon } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={cn('flex flex-col items-center pt-4 w-full pb-4', className)}>
      <div className='container flex flex-col sm:flex-row items-center justify-between align-middle'>
        <div className='flex items-start space-x-2'>
          <Link href={siteConfig.links.mail}>
            <Button
              variant='link'
              className='justify-center items-center opacity-60 hover:opacity-100'
              size='icon'
            >
              <MailboxIcon size='3vh' />
            </Button>
          </Link>
          <Link href={siteConfig.links.linkedin}>
            <Button
              variant='link'
              className='justify-center items-center opacity-60 hover:opacity-100'
              size='icon'
            >
              <FaLinkedin size='2vh' />
            </Button>
          </Link>
          <Link href={siteConfig.links.github}>
            <Button
              variant='link'
              className='justify-center items-center opacity-60 hover:opacity-100'
              size='icon'
            >
              <FaGithub size='2vh' />
            </Button>
          </Link>
        </div>
        <div className='flex items-end gap-x-4'>
          <ThemeSelect />
        </div>
      </div>
      <Separator className='my-4' />
      <div>
        <div className='flex items-center gap-x-2 text-sm'>
          <div>Build by Lennard Zündorf</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{' | '}</div>

          <Link href='/legal'>
            <h4 className='text-sm font-medium leading-none hover:underline'>legal</h4>
          </Link>
        </div>
      </div>
    </footer>
  );
};
