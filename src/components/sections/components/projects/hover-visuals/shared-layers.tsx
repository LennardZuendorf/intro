import type * as React from 'react';
import { hexToRgb } from '@/lib/utils/ui';

/** Shared SVG canvas for project hover preview cards */
export const HOVER_VISUAL_SVG_VIEWBOX = '0 0 356 120';

export interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
}

export function deriveSecondaryColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  if (r === 0 && g === 0 && b === 0 && hex !== '#000000') return hex;
  return `rgb(${Math.min(255, r + 80)}, ${Math.min(255, g + 60)}, ${Math.max(0, b - 40)})`;
}

export const EllipseGradient = ({ color, gradientId }: { color: string; gradientId: string }) => (
  <div className='absolute inset-0 z-5 flex h-full w-full items-center justify-center'>
    <svg
      width='100%'
      height='100%'
      viewBox={HOVER_VISUAL_SVG_VIEWBOX}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
    >
      <rect width='356' height='120' fill={`url(#${gradientId})`} />
      <defs>
        <radialGradient
          id={gradientId}
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(178 65) rotate(90) scale(65 178)'
        >
          <stop stopColor={color} stopOpacity='0.25' />
          <stop offset='0.34' stopColor={color} stopOpacity='0.15' />
          <stop offset='1' stopOpacity='0' />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export const GridLayer = () => (
  <div
    style={{ '--grid-color': '#80808015' } as React.CSSProperties}
    className='pointer-events-none absolute inset-0 z-4 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[20px_20px] bg-center opacity-70'
  />
);

export const GradientRevealLayer = ({ color, linearId }: { color: string; linearId: string }) => (
  <div className='ease-[cubic-bezier(0.6,0.6,0,1)] absolute inset-0 z-6 flex translate-y-full items-center justify-center opacity-0 transition-all duration-500 group-hover/animated-card:translate-y-0 group-hover/animated-card:opacity-100'>
    <svg
      width='100%'
      height='100%'
      viewBox={HOVER_VISUAL_SVG_VIEWBOX}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
    >
      <rect width='356' height='120' fill={`url(#${linearId})`} />
      <defs>
        <linearGradient
          id={linearId}
          x1='178'
          y1='0'
          x2='178'
          y2='120'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.35' stopColor={color} stopOpacity='0' />
          <stop offset='1' stopColor={color} stopOpacity='0.3' />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
