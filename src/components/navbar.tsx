'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils/ui';
import { FolderArchiveIcon, HomeIcon, UserIcon } from 'lucide-react';
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

const navItems = [
  {
    name: 'Home',
    link: '/#',
    icon: <HomeIcon className='h-4 w-4 text-neutral-500 dark:text-white' />
  },
  {
    name: 'Projects',
    link: '/#projects',
    icon: <FolderArchiveIcon className='h-4 w-4 text-neutral-500 dark:text-white' />
  },
  {
    name: 'About',
    link: '/#about',
    icon: <UserIcon className='h-4 w-4 text-neutral-500 dark:text-white' />
  }
];

export const Nav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    const direction = current! - scrollYProgress.getPrevious()!;
    if (scrollYProgress.get() < 0.05) {
      setVisible(false);
    } else {
      setVisible(direction < 0);
    }
  });

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
      </motion.div>
    </AnimatePresence>
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
