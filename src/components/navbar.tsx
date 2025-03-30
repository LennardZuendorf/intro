'use client';

import { ColorSelect } from '@/components/shared/color-select';
import { ThemeSelect } from '@/components/shared/theme-select';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { M, Muted } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

type navItemsType = Array<{
  name: string;
  link: string;
}>;

export const Nav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isAnimated = !pathname.includes('/legal');

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
  }
  return <Navbar className={className ? className : ''} pathname={pathname} navItems={navItems} />;
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
    <motion.header className={cn('flex flex-col items-center pt-4 pb-4 gap-1', className)}>
      <nav className={cn('flex flex-col items-center pt-4 pb-4 gap-1', className)}>
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
              <NavigationMenuItem key='color-settings'>
                <ThemeSelect
                  buttonVariant='noShadow'
                  className='hover:border-2 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                />
                <ColorSelect
                  buttonVariant='noShadow'
                  className='hover:border-2 hover:border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                />
              </NavigationMenuItem>
              <NavigationMenuItem key='socials' />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </motion.header>
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
      name: 'About',
      link: '/#about'
    },
    {
      name: 'Projects',
      link: '/#projects'
    }
  ];
}
