'use client';

import type { ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement, useEffect, useId } from 'react';
import { useEffectsEnabled } from './use-enabled';

// Hero parallax (enhancement motion — never load-bearing).
//
// Drifts its child a few pixels with the pointer offset from screen center, eased
// so it never feels seasick. The transform is applied to the child ELEMENT itself
// (via an injected id + getElementById), not a wrapping div — a wrapper with a
// transform would create a stacking context and break the hero title's
// `mix-blend-difference` legibility over the dot-field. No wrapper also means zero
// structural / layout change whether the effect is on or off.
//
// Self-gates: attaches no listeners and applies no transform when
// `useEffectsEnabled()` is false (touch / reduced-motion); the child renders
// unchanged apart from a harmless id attribute.

interface ParallaxProps {
  children: ReactNode;
  /** Max drift in px along each axis. Keep small — subtle, not tens of px. */
  strength?: number;
}

export function Parallax({ children, strength = 10 }: ParallaxProps) {
  const enabled = useEffectsEnabled();
  const id = useId();

  useEffect(() => {
    if (!enabled) return;
    const el = document.getElementById(id);
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = -nx * strength;
      targetY = -ny * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.style.willChange = 'transform';
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
      el.style.willChange = '';
    };
  }, [enabled, id, strength]);

  if (!isValidElement(children)) return <>{children}</>;

  // Inject a stable id so the effect can drive the child element directly.
  // useId is SSR-stable, so this adds no hydration mismatch.
  return cloneElement(children as ReactElement<{ id?: string }>, { id });
}
