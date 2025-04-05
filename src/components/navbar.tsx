'use client';

import { ColorSelect } from '@/components/shared/color-select';
import { ThemeSelect } from '@/components/shared/theme-select';
import { Button } from '@/components/ui/button';
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
import { Pin, PinOff } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

type navItemsType = Array<{
  name: string;
  link: string;
}>;

export const Nav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const pathname = usePathname();
  const isAnimated = !pathname.includes('/legal');

  // Load pin state from localStorage on mount
  useEffect(() => {
    const savedPinState = localStorage.getItem('navbarPinned');
    if (savedPinState !== null) {
      setIsPinned(savedPinState === 'true');
    }
  }, []);

  // Save pin state to localStorage when it changes
  const togglePin = () => {
    const newPinState = !isPinned;
    setIsPinned(newPinState);

    // If we're unpinning, immediately hide the navbar
    if (!newPinState) {
      setVisible(false);
    }

    localStorage.setItem('navbarPinned', String(newPinState));
  };

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    // Don't auto-hide if pinned
    if (isPinned) {
      setVisible(true);
      return;
    }

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
            y: 100 // Start from bottom for mobile
          }}
          animate={{
            // Mobile: bottom positioning, Desktop: top positioning
            y:
              visible || isPinned
                ? 0
                : typeof window !== 'undefined' && window.innerWidth >= 768
                  ? -100
                  : 100,
            opacity: visible || isPinned ? 1 : 0
          }}
          transition={{
            duration: 0.2
          }}
          className={cn(
            'fixed mx-auto z-[100]',
            'bottom-0 md:bottom-auto md:top-10', // Bottom on mobile, Top on md and up
            'inset-x-0',
            className
          )}
        >
          <Navbar
            className='flex max-w-fit mx-auto'
            pathname={pathname}
            navItems={navItems}
            isPinned={isPinned}
            togglePin={togglePin}
          />
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <Navbar
      className={cn(
        'flex max-w-fit mx-auto fixed inset-x-0 z-[100] bottom-0 md:bottom-auto md:top-10',
        className
      )}
      pathname={pathname}
      navItems={navItems}
      isPinned={isPinned}
      togglePin={togglePin}
    />
  );
};

const Navbar = ({
  navItems,
  pathname,
  className = '',
  isPinned,
  togglePin
}: {
  navItems: navItemsType;
  pathname: string;
  className?: string;
  isPinned: boolean;
  togglePin: () => void;
}) => {
  return (
    <motion.header
      className={cn(
        'flex justify-center items-center py-2',
        'w-full md:w-auto',
        ' px-4',
        className
      )}
    >
      <NavigationMenu className='bg-main w-full md:w-auto'>
        <NavigationMenuList className='flex justify-between w-full'>
          <div className='flex items-center space-x-1 md:space-x-2'>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-main py-1.5 px-2 md:px-3',
                      pathname.includes(item.link) ? 'font-bold' : 'font-medium'
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </div>
          <div className='isolate relative z-[9999]'>
            <NavigationMenuItem key='settings' className='relative bg-main'>
              <div className='flex space-x-1'>
                <ThemeSelect
                  buttonVariant='default'
                  noButtonShadow={true}
                  popoverClassName='z-[9999]'
                />
                <ColorSelect
                  buttonVariant='default'
                  noButtonShadow={true}
                  popoverClassName='z-[9999]'
                />
                <Button
                  variant='default'
                  size='icon'
                  onClick={togglePin}
                  className={cn('shadow-none', isPinned && 'text-mtext')}
                >
                  {isPinned ? <PinOff className='h-4 w-4' /> : <Pin className='h-4 w-4' />}
                </Button>
              </div>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
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
