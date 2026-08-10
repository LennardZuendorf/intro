'use client';

import { useEffect, useRef } from 'react';
import { useEffectsEnabled } from './use-enabled';

/**
 * Custom cursor — a small accent ring that trails the pointer with easing and
 * layers over (never replaces) the native cursor. Pure enhancement: it renders
 * nothing until {@link useEffectsEnabled} is true, so on touch / reduced-motion
 * devices no element mounts and no listeners are attached.
 *
 * The ring colour comes from the live `--primary` CSS var (via `borderColor`),
 * so accent-swatch and light/dark changes recolour it for free — no hardcoded
 * hex, no re-render. `mix-blend-mode: difference` keeps it legible on any
 * background. Position is driven imperatively in a single `requestAnimationFrame`
 * loop (transform only) to avoid per-frame React renders or layout thrash.
 */
const RING_SIZE = 28;
const HALF = RING_SIZE / 2;
const EASE = 0.18;

export function Cursor() {
  const enabled = useEffectsEnabled();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const ring = ringRef.current;
    if (!ring) return;

    // Start centred and hidden; reveal on the first real pointer move so the
    // ring never flashes at (0,0).
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let visible = false;
    let raf = 0;

    const show = () => {
      if (visible) return;
      visible = true;
      ring.style.opacity = '1';
    };
    const hide = () => {
      visible = false;
      ring.style.opacity = '0';
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      show();
    };

    const tick = () => {
      x += (targetX - x) * EASE;
      y += (targetY - y) * EASE;
      ring.style.transform = `translate3d(${x - HALF}px, ${y - HALF}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, [enabled]);

  // Gated off → mount nothing (no ring, no listeners, no layout shift).
  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden='true'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: RING_SIZE,
        height: RING_SIZE,
        borderRadius: '9999px',
        border: '2px solid',
        borderColor: 'var(--primary)',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        zIndex: 9999,
        opacity: 0,
        transform: `translate3d(-${RING_SIZE}px, -${RING_SIZE}px, 0)`,
        willChange: 'transform'
      }}
    />
  );
}
