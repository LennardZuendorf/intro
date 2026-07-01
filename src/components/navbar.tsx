'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { ThemeSelect } from '@/components/theme/theme-select';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/retroui/Button';
import { cn } from '@/lib/utils/ui';

type SocialItem = {
  _id: string;
  _title: string;
  url: string | null;
  icon: string | null;
};

interface NavProps {
  className?: string;
  socials: SocialItem[];
  backHref?: string;
}

export const Nav = ({ className, socials, backHref }: NavProps) => {
  return (
    <header
      className={cn(
        'flex justify-center items-center py-2',
        'w-full md:w-auto',
        'flex max-w-fit mx-auto',
        className
      )}
    >
      <NavigationMenu className='bg-background w-full md:w-auto'>
        <NavigationMenuList className='flex justify-end w-full'>
          <div className='isolate relative z-9999'>
            <NavigationMenuItem key='settings' className='relative bg-background'>
              <div className='flex space-x-1 items-center'>
                {backHref && (
                  <Button variant='flatSecondary' size='icon' asChild>
                    <Link href={backHref} aria-label='Go back'>
                      <ArrowLeftIcon className='w-4 h-4' />
                    </Link>
                  </Button>
                )}
                {socials
                  .filter((social) => social.url && social.icon)
                  .map((social) => (
                    <Button key={social._id} variant='flatSecondary' size='icon' asChild>
                      <Link
                        href={social.url!}
                        aria-label={social._title}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <span
                          className='inline-flex items-center justify-center w-4 h-4 [&>svg]:w-4 [&>svg]:h-4'
                          dangerouslySetInnerHTML={{ __html: social.icon! }}
                        />
                      </Link>
                    </Button>
                  ))}
                <ThemeSelect buttonVariant='flatSecondary' popoverClassName='z-9999' />
              </div>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
