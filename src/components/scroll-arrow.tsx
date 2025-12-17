'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/ui';

// Helper: useMediaQuery for screen size detection (< lg)
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    setMatches(media.matches);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const ScrollArrow: React.FC = () => {
  const { scrollY } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Only show on screens smaller than 'lg'
  const isMobile = useMediaQuery('(max-width: 1023.5px)'); // aligns with Tailwind 'lg' breakpoint

  // Effect: Determine if there's any scrollable content below
  useEffect(() => {
    function checkHasMoreContent() {
      // Is there more content below the current viewport?
      const scrollable = document.body.offsetHeight - window.innerHeight > 10;
      // Also check if we are NOT already at the bottom
      const notAtBottom = window.innerHeight + window.scrollY < document.body.offsetHeight - 100;
      setHasMoreContent(scrollable && notAtBottom);
    }
    checkHasMoreContent();

    // On resize or scroll, re-check
    window.addEventListener('resize', checkHasMoreContent);
    window.addEventListener('scroll', checkHasMoreContent);
    return () => {
      window.removeEventListener('resize', checkHasMoreContent);
      window.removeEventListener('scroll', checkHasMoreContent);
    };
  }, []);

  // Track scrolling activity and check positions
  useEffect(() => {
    const unsubscribe = scrollY.on('change', () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to mark when scrolling stops
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);

      // Check if we're at the bottom of the page
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
    // Find all sections with IDs
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
    if (sections.length === 0) return;

    // Sort sections by their position in the DOM
    const sortedSections = sections.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.top + window.scrollY - (rectB.top + window.scrollY);
    });

    // Find which section is currently most visible in the viewport
    const viewportHeight = window.innerHeight;

    let currentSectionIndex = 0;
    let maxVisibility = 0;

    sortedSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      // Calculate how much of the section is visible in the viewport
      const visibleTop = Math.max(window.scrollY, sectionTop);
      const visibleBottom = Math.min(window.scrollY + viewportHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // If this section is more visible than the current best, update
      if (visibleHeight > maxVisibility) {
        maxVisibility = visibleHeight;
        currentSectionIndex = index;
      }
    });

    // Get the next section (or stay at current if already at the end)
    const nextSectionIndex = Math.min(currentSectionIndex + 1, sortedSections.length - 1);
    const nextSection = sortedSections[nextSectionIndex];

    // Account for navbar height (approximately 4rem = 64px on mobile)
    const navbarOffset = 64;

    // Only scroll if we're not already at the last section or if next section is different
    if (nextSection && nextSectionIndex > currentSectionIndex) {
      // Scroll to the next section
      const rect = nextSection.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const targetScroll = sectionTop - navbarOffset;

      // Use window.scrollTo for more reliable scrolling
      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    } else {
      // If we're at the last section or only one section exists, scroll down by viewport height
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const scrollAmount = viewportHeight * 0.8; // Scroll 80% of viewport height
      const targetScroll = Math.min(currentScroll + scrollAmount, maxScroll);

      // Only scroll if there's room to scroll
      if (targetScroll > currentScroll) {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      } else {
        // If we're at the bottom, scroll to absolute bottom
        window.scrollTo({
          top: maxScroll,
          behavior: 'smooth'
        });
      }
    }
  };

  // Show only if:
  // 1. User is not actively scrolling
  // 2. User is not at the bottom of page or near the footer
  // 3. There is more content below to scroll to
  // 4. On screens < lg breakpoint
  const shouldShow = isMobile && !isScrolling && !isAtBottom && hasMoreContent;

  // Create a motion version of Button
  const MotionButton = motion.create(Button);

  return (
    <AnimatePresence>
      {shouldShow && (
        <MotionButton
          onClick={handleArrowClick}
          variant='default'
          size='icon'
          className={cn('fixed bottom-5 left-1/2 -translate-x-1/2 z-50 lg:hidden')}
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
