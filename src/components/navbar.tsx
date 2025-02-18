'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils/ui';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { M, Muted } from '@/components/ui/typography';
import Link from 'next/link';
import { ThemeSelect } from '@/components/shared/theme-select';
import { usePathname } from 'next/navigation';

type navItemsType = Array<{
  name: string;
  link: string;
}>;

export const Nav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isAnimated = !pathname.includes('projects/') && !pathname.includes('/legal');

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    const direction = current! - scrollYProgress.getPrevious()!;
    if (scrollYProgress.get() < 0.05) {
      setVisible(false);
    } else {
      setVisible(direction < 0);
    }
  });

  const navItems: navItemsType = queryHeaderContent();

  if (isAnimated) {
    return (
      <AnimatePresence mode='wait'>
        <motion.div
          initial={{
            opacity: 1,
            y: -100
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0
          }}
          transition={{
            duration: 0.2
          }}
          className={cn(
            'flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] pr-2 pl-2 py-2 items-center justify-center space-x-4',
            className
          )}
        >
          <Navbar
            className='flex max-w-fit fixed top-10 inset-x-0 mx-auto z-[5000] pr-2 pl-2 py-2 items-center justify-center space-x-4'
            pathname={pathname}
            navItems={navItems}
          />
        </motion.div>
      </AnimatePresence>
    );
  } else {
    return (
      <Navbar className={className ? className : ''} pathname={pathname} navItems={navItems} />
    );
  }
};

const Navbar = ({
  navItems,
  pathname,
  className = ''
}: {
  navItems: navItemsType;
  pathname: string;
  className?: string;
}) => {
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
                    pathname.includes(item.link) ? 'font-bold' : 'font-medium'
                  )}
                  active={!pathname.includes(item.link)}
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

function queryHeaderContent(): navItemsType {
  return [
    {
      name: 'Home',
      link: '/#hero'
    },
    {
      name: 'Projects',
      link: '/#projects'
    },
    {
      name: 'About',
      link: '/#about'
    }
  ];
}
