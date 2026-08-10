'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { PALETTE_TOOLTIP, ShortcutBadge } from '@/components/nav/hint-tooltip';
import { Button } from '@/components/ui/retroui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/ui';

const MotionButton = motion.create(Button);

export const ScrollArrow: React.FC = () => {
  const [shouldShow, setShouldShow] = useState(false);

  const checkShouldShow = useCallback(() => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;

    const hasScrollableContent = documentHeight - windowHeight > 10;
    const distanceFromBottom = documentHeight - (currentScroll + windowHeight);
    const isAtBottom = distanceFromBottom < 50;

    setShouldShow(hasScrollableContent && !isAtBottom);
  }, []);

  useEffect(() => {
    const initialTimeout = setTimeout(checkShouldShow, 100);

    window.addEventListener('resize', checkShouldShow);
    window.addEventListener('scroll', checkShouldShow, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('resize', checkShouldShow);
      window.removeEventListener('scroll', checkShouldShow);
    };
  }, [checkShouldShow]);

  const handleArrowClick = () => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
    if (sections.length === 0) return;

    const sortedSections = sections.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.top + window.scrollY - (rectB.top + window.scrollY);
    });

    const viewportHeight = window.innerHeight;
    let currentSectionIndex = 0;
    let maxVisibility = 0;

    for (const [index, section] of sortedSections.entries()) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;
      const visibleTop = Math.max(window.scrollY, sectionTop);
      const visibleBottom = Math.min(window.scrollY + viewportHeight, sectionBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      if (visibleHeight > maxVisibility) {
        maxVisibility = visibleHeight;
        currentSectionIndex = index;
      }
    }

    const nextSectionIndex = Math.min(currentSectionIndex + 1, sortedSections.length - 1);
    const nextSection = sortedSections[nextSectionIndex];
    const dockOffset = 64;

    if (nextSection && nextSectionIndex > currentSectionIndex) {
      const rect = nextSection.getBoundingClientRect();
      const targetScroll = rect.top + window.scrollY - dockOffset;
      window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
      return;
    }

    const currentScroll = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - viewportHeight;
    const targetScroll = Math.min(currentScroll + viewportHeight * 0.8, maxScroll);

    if (targetScroll > currentScroll) {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <div className='fixed bottom-5 left-1/2 z-50 -translate-x-1/2'>
          <Tooltip>
            <TooltipTrigger
              delay={200}
              render={
                <MotionButton
                  onClick={handleArrowClick}
                  variant='flatSecondary'
                  aria-label='Scroll to next section'
                  className={cn(
                    'h-auto gap-1.5 rounded-base border-2 border-border px-3 py-2',
                    'font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]'
                  )}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className='h-4 w-4 shrink-0' aria-hidden='true' />
                  <span>Scroll or Jump</span>
                  <ShortcutBadge>⌘K</ShortcutBadge>
                </MotionButton>
              }
            />
            <TooltipContent side='top'>{PALETTE_TOOLTIP}</TooltipContent>
          </Tooltip>
        </div>
      )}
    </AnimatePresence>
  );
};
