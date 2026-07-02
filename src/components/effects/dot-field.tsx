'use client';

import { useEffect, useRef } from 'react';
import { useEffectsEnabled } from './use-enabled';

// Hero canvas dot-field (enhancement motion — never load-bearing).
//
// A grid of dots sits behind the hero name. Idle they barely shimmer; near the
// pointer they flee outward within a soft radius, grow, and tint toward the live
// accent, then ease back. Colors are read from runtime CSS vars so accent-swatch
// and light/dark changes recolor the field for free (no prop wiring):
//   --dotbase  → resting dot RGB
//   --dot      → resting (faint) dot alpha
//   --primary  → accent the dots tint toward under the cursor
//
// Self-gates: mounts no <canvas> at all when `useEffectsEnabled()` is false
// (touch / reduced-motion), and pauses its rAF when the hero scrolls off-screen.

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

// Fallbacks only used if a CSS var is missing/unparseable — real values come
// from getComputedStyle at runtime.
const FALLBACK_ACCENT: RGBA = { r: 198, g: 255, b: 46, a: 1 };
const FALLBACK_BASE: RGBA = { r: 120, g: 120, b: 120, a: 1 };
const FALLBACK_DOT: RGBA = { r: 120, g: 120, b: 120, a: 0.07 };

// Grid gap floored so density stays bounded (perf budget: ≥34px).
const GAP = 36;
// Cursor influence radius (css px).
const RADIUS = 140;
// Max flee displacement (css px) — amplitude stays small, "a few px" of drift.
const MAX_PUSH = 24;
const DOT_MIN = 1.1;
const DOT_MAX = 3.6;
const EASE = 0.14;
// Cap DPR so the canvas never over-renders on hi-dpi displays.
const MAX_DPR = 2;

function parseColor(input: string, fallback: RGBA): RGBA {
  const s = input.trim();
  if (!s) return fallback;

  if (s.startsWith('#')) {
    let hex = s.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }
    if (hex.length >= 6) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      const a = hex.length >= 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1;
      if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
        return { r, g, b, a };
      }
    }
    return fallback;
  }

  const m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const parts = m[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(Number);
    const [r, g, b, a] = parts;
    if (parts.length >= 3 && ![r, g, b].some(Number.isNaN)) {
      return { r, g, b, a: a == null || Number.isNaN(a) ? 1 : a };
    }
  }

  return fallback;
}

interface Dot {
  hx: number;
  hy: number;
  cx: number;
  cy: number;
  phase: number;
}

export function DotField() {
  const enabled = useEffectsEnabled();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = document.documentElement;
    let accent = FALLBACK_ACCENT;
    let base = FALLBACK_BASE;
    let dot = FALLBACK_DOT;

    const readColors = () => {
      const cs = getComputedStyle(root);
      accent = parseColor(cs.getPropertyValue('--primary'), FALLBACK_ACCENT);
      base = parseColor(cs.getPropertyValue('--dotbase'), FALLBACK_BASE);
      dot = parseColor(cs.getPropertyValue('--dot'), FALLBACK_DOT);
    };
    readColors();

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    const build = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.floor(width / GAP);
      const rows = Math.floor(height / GAP);
      const offsetX = (width - cols * GAP) / 2 + GAP / 2;
      const offsetY = (height - rows * GAP) / 2 + GAP / 2;
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          const hx = offsetX + i * GAP;
          const hy = offsetY + j * GAP;
          dots.push({
            hx,
            hy,
            cx: hx,
            cy: hy,
            phase: (((i * 7 + j * 13) % 100) / 100) * Math.PI * 2
          });
        }
      }
    };
    build();

    let mouseX = -9999;
    let mouseY = -9999;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        mouseX = x;
        mouseY = y;
        active = true;
      } else {
        active = false;
      }
    };
    const onLeave = () => {
      active = false;
    };

    let raf = 0;
    let running = false;
    let t = 0;

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const d of dots) {
        let prox = 0;
        let tx = d.hx;
        let ty = d.hy;

        if (active) {
          const dx = d.hx - mouseX;
          const dy = d.hy - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS) {
            prox = 1 - dist / RADIUS;
            const push = prox * MAX_PUSH;
            const nd = dist || 1;
            // Flee: push the target away from the cursor along the radial.
            tx = d.hx + (dx / nd) * push;
            ty = d.hy + (dy / nd) * push;
          }
        }

        d.cx += (tx - d.cx) * EASE;
        d.cy += (ty - d.cy) * EASE;

        const shimmer = 0.6 + 0.4 * Math.sin(t + d.phase);
        const idleAlpha = dot.a * shimmer;
        const r = base.r + (accent.r - base.r) * prox;
        const g = base.g + (accent.g - base.g) * prox;
        const b = base.b + (accent.b - base.b) * prox;
        const a = idleAlpha + (1 - idleAlpha) * prox;
        const radius = DOT_MIN + (DOT_MAX - DOT_MIN) * prox;

        ctx.beginPath();
        ctx.arc(d.cx, d.cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a.toFixed(3)})`;
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Pause the rAF loop while the hero is scrolled out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    // Re-read colors when the accent swatch (inline style) or theme class flips.
    const mo = new MutationObserver(readColors);
    mo.observe(root, { attributes: true, attributeFilter: ['class', 'style'] });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Decorative — the hero mounts this inside an aria-hidden backdrop container.
  return <canvas ref={canvasRef} className='absolute inset-0 h-full w-full' />;
}
