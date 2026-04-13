'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RxArrowLeft, RxEnvelopeOpen, RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site';
import { IconButton } from '@/components/retroui/Button';
import { ToggleColor } from '@/components/custom/toggle-color';

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);

  // On mobile, fade the nav out when the footer scrolls into view so it
  // doesn't overlap the copyright + legal line. Desktop ignores this via
  // md: utility overrides below.
  React.useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const isSubPage = pathname !== '/';

  return (
    <nav
      aria-label='Primary'
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50',
        'flex items-center gap-1 rounded border-2 bg-card p-1.5 shadow-md',
        'transition-opacity duration-300',
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
        'md:opacity-100 md:pointer-events-auto'
      )}
    >
      {isSubPage && (
        <>
          <Link href='/' aria-label='Back to home'>
            <IconButton
              variant='outline'
              size='icon'
              icon={<RxArrowLeft className='h-4 w-4' />}
              animationType='scale'
            />
          </Link>
          <div className='w-px h-6 bg-border mx-1' aria-hidden='true' />
        </>
      )}
      <Link
        href={siteConfig.links.github}
        aria-label='GitHub'
        target='_blank'
        rel='noopener noreferrer'
      >
        <IconButton
          variant='outline'
          size='icon'
          icon={<RxGithubLogo className='h-4 w-4' />}
          animationType='rotate'
        />
      </Link>
      <Link
        href={siteConfig.links.linkedin}
        aria-label='LinkedIn'
        target='_blank'
        rel='noopener noreferrer'
      >
        <IconButton
          variant='outline'
          size='icon'
          icon={<RxLinkedinLogo className='h-4 w-4' />}
          animationType='scale'
        />
      </Link>
      <Link href={siteConfig.links.mail} aria-label='Email'>
        <IconButton
          variant='outline'
          size='icon'
          icon={<RxEnvelopeOpen className='h-4 w-4' />}
          animationType='bounce'
        />
      </Link>
      <div className='w-px h-6 bg-border mx-1' aria-hidden='true' />
      <ToggleColor />
    </nav>
  );
};
