'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

export const ScrollArrow: React.FC = () => {
  const { scrollY } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scrolling activity and check positions
  useEffect(() => {
    const unsubscribe = scrollY.on('change', () => {
      // When any scroll activity happens
      setIsScrolling(true);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to mark when scrolling stops
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // 300ms timeout - shorter for better responsiveness

      // Check if we're at the bottom of the page
      const footerSection = document.querySelector('footer');

      if (footerSection) {
        const footerRect = footerSection.getBoundingClientRect();
        const isNearFooter = footerRect.top <= window.innerHeight;

        // At bottom of page if we're at footer or actually at page bottom
        const actuallyAtBottom =
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        setIsAtBottom(isNearFooter || actuallyAtBottom);
      } else {
        // If no footer, just check if we're at the bottom of the document
        const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        setIsAtBottom(atBottom);
      }
    });

    // Initial check on mount
    const footerSection = document.querySelector('footer');
    if (footerSection) {
      const footerRect = footerSection.getBoundingClientRect();
      const isNearFooter = footerRect.top <= window.innerHeight;
      const actuallyAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setIsAtBottom(isNearFooter || actuallyAtBottom);
    } else {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setIsAtBottom(atBottom);
    }

    return () => {
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scrollY]);

  const handleArrowClick = () => {
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

  // Show the arrow when:
  // 1. User is not actively scrolling
  // 2. User is not at the bottom of the page or near the footer
  const shouldShow = !isScrolling && !isAtBottom;

  // Create a motion version of Button
  const MotionButton = motion(Button);

  return (
    <AnimatePresence>
      {shouldShow && (
        <MotionButton
          onClick={handleArrowClick}
          variant='default'
          size='icon'
          className={cn('fixed bottom-8 left-1/2 -translate-x-1/2 z-50')}
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
            aria-hidden='true'
          >
            <title>Scroll Down Arrow</title>
            <polyline points='6 9 12 15 18 9' />
          </svg>
        </MotionButton>
      )}
    </AnimatePresence>
  );
};
