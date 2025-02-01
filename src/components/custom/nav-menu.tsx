'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Muted, M } from '@/components/ui/typography';
import { JSX } from 'react';
import { cn } from '@/lib/utils';
import { ThemeSelect } from '@/components/shared/theme-select';

export type NavItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

type Props = {
  navItems: NavItem[];
  className?: string;
};

export const MainNav: React.FC<Props> = ({ navItems, className }) => {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col items-center pt-4 pb-4 gap-1', className)}>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link href={item.link} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === '/about' ? 'font-bold' : 'font-medium'
                  )}
                  active={pathname === '/about'}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem key='theme-switcher'>
            <ThemeSelect buttonVariant='noShadow' />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <M className='text-sm font-semibold leading-none'>{title}</M>
            <Muted>{children}</Muted>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
