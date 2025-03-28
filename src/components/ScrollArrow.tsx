'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils/ui';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

export const ScrollArrow: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  // This is the reverse logic from the navbar
  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    // Get scroll direction
    const direction = current! - scrollYProgress.getPrevious()!;

    // Show when scrolling up, hide when scrolling down
    if (scrollYProgress.get() < 0.05) {
      setVisible(true); // Always visible at the top
    } else {
      setVisible(direction < 0); // Show when scrolling up (hide when scrolling down)
    }

    // Check if at bottom of page
    const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    setAtBottom(isAtBottom);
  });

  const handleScroll = () => {
    // Find all sections (hero, about, projects)
    const sections = Array.from(document.querySelectorAll('section[id]'));

    if (sections.length === 0) return;

    // Calculate which section is currently most visible
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY + viewportHeight / 2; // Middle of viewport

    // Find the current and next section
    let currentSectionIndex = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      if (scrollPosition >= sectionTop) {
        currentSectionIndex = index;
      }
    });

    // Get the next section (or the last one if we're already at the end)
    const nextSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    const nextSection = sections[nextSectionIndex];

    // Scroll to the next section
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {visible && !atBottom && (
        <motion.button
          onClick={handleScroll}
          className={cn(
            'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50',
            'p-3 border-4 border-black bg-white dark:bg-[#2A2A2A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
            'hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
          )}
          aria-label='Scroll to Next Section'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='6 9 12 15 18 9'></polyline>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
