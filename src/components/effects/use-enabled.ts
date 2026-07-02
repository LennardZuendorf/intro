'use client';

import { useEffect, useState } from 'react';

// Shared gate for every enhancement effect (dot-field, cursor, parallax, floaty).
//
// Effects are pure polish and must never be load-bearing, so they mount only
// when the device wants them. Returns `false` on the server and on the first
// client render (stable SSR value → no hydration mismatch), then re-evaluates
// in an effect. Effects that read this MUST render nothing while it is false,
// so gating means no-MOUNT, not just no-animate.
//
// Enabled === the pointer is fine (mouse-like, not touch/coarse) AND the user
// has not requested reduced motion.
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const FINE_POINTER = '(pointer: fine)';

export function useEffectsEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION);
    const finePointer = window.matchMedia(FINE_POINTER);

    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    update();
    reducedMotion.addEventListener('change', update);
    finePointer.addEventListener('change', update);

    return () => {
      reducedMotion.removeEventListener('change', update);
      finePointer.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}
