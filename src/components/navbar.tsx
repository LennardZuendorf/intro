'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HomeIcon, MessageCircleIcon, UserIcon } from 'lucide-react';
import { MainNav } from '@/components/custom/nav-menu';

export const Nav = ({ className }: { className?: string }) => {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <HomeIcon className='h-4 w-4 text-neutral-500 dark:text-white' />
    },
    {
      name: 'About',
      link: '/about',
      icon: <UserIcon className='h-4 w-4 text-neutral-500 dark:text-white' />
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: <MessageCircleIcon className='h-4 w-4 text-neutral-500 dark:text-white' />
    }
  ];

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
        <MainNav navItems={navItems} />
      </motion.div>
    </AnimatePresence>
  );
};
