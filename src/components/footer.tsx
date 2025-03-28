'use client';

import { cn } from '@/lib/utils/ui';
import type * as React from 'react';

import { ThemeSelect } from '@/components/shared/theme-select';
import { ColorSelect } from '@/components/shared/color-select';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MailboxIcon } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={cn(
        'flex flex-col items-center pt-4 w-full pb-4 border-t-4 border-border space-y-5 md:space-y-2',
        className
      )}
    >
      <div className='container flex flex-col sm:flex-row items-center justify-between align-middle space-y-5 md:space-y-2'>
        <div className='flex items-start space-x-2'>
          <Link href={siteConfig.links.mail}>
            <Button
              variant='link'
              className='justify-center items-center text-mtext hover:text-atext hover:bg-accent-light'
              size='icon'
            >
              <MailboxIcon size='3vh' />
            </Button>
          </Link>
          <Link href={siteConfig.links.linkedin}>
            <Button
              variant='link'
              className='justify-center items-center hover:text-atext hover:bg-accent-light'
              size='icon'
            >
              <FaLinkedin size='2vh' />
            </Button>
          </Link>
          <Link href={siteConfig.links.github}>
            <Button
              variant='link'
              className='justify-center items-center hover:text-atext hover:bg-accent-light'
              size='icon'
            >
              <FaGithub size='2vh' />
            </Button>
          </Link>
        </div>
        <div className='flex items-end gap-x-4'>
          <ColorSelect />
          <ThemeSelect />
        </div>
      </div>
      <div>
        <div className='flex items-center gap-x-2 text-sm'>
          <div>Build by Lennard Zündorf</div>
          <div> {`© ${new Date().getFullYear()}`}</div>
          <div>{' | '}</div>
          <Link href='/legal'>
            <Button
              variant='link'
              className='justify-center items-center hover:text-accent text-sm font-medium leading-none hover:underline'
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
