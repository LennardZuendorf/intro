'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';

// CSS injected once for data-reveal fade+rise — keeps global styles co-located with the observer
const revealStyles = `
  [data-reveal] {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  [data-reveal].reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** Observes every [data-reveal] element and adds .reveal-visible when it enters the viewport. */
function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('reveal-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);
}

/** Fixed top progress bar (accent colour) + data-reveal scroll utility. Core page chrome. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useRevealOnScroll();

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static string, no user input */}
      <style dangerouslySetInnerHTML={{ __html: revealStyles }} />
      <motion.div
        className='fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-50'
        style={{ scaleX }}
        aria-hidden='true'
      />
    </>
  );
}
