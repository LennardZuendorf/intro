'use client';

import type * as React from 'react';
import { useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils/ui';
import {
  deriveSecondaryColor,
  EllipseGradient,
  GradientRevealLayer,
  GridLayer,
  type LayerProps
} from './shared-layers';
import type { VisualProps } from './types';

export function StrideHoverVisual({ colorHex, className }: VisualProps) {
  const [hovered, setHovered] = useState(false);
  const gradientId = `stride-hover-${useId()}`;
  const linearId = `stride-linear-${useId()}`;
  const secondaryColor = useMemo(() => deriveSecondaryColor(colorHex), [colorHex]);

  return (
    <div
      aria-hidden
      className={cn('relative h-full w-full overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BarChartLayer hovered={hovered} color={colorHex} secondaryColor={secondaryColor} />
      <GradientRevealLayer color={colorHex} linearId={linearId} />
      <InfoRevealLayer color={colorHex} />
      <StatPillsLayer color={colorHex} secondaryColor={secondaryColor} />
      <EllipseGradient color={colorHex} gradientId={gradientId} />
      <GridLayer />
    </div>
  );
}

const barChartData = [
  { height: 14, y: 73, hoverHeight: 14, hoverY: 86, x: 30, secondary: true },
  { height: 14, y: 60, hoverHeight: 14, hoverY: 86, x: 46, secondary: false },
  { height: 28, y: 46, hoverHeight: 20, hoverY: 80, x: 62, secondary: false },
  { height: 20, y: 54, hoverHeight: 34, hoverY: 66, x: 78, secondary: false },
  { height: 20, y: 73, hoverHeight: 28, hoverY: 72, x: 94, secondary: true },
  { height: 34, y: 73, hoverHeight: 14, hoverY: 86, x: 110, secondary: true },
  { height: 34, y: 40, hoverHeight: 20, hoverY: 80, x: 126, secondary: false },
  { height: 20, y: 54, hoverHeight: 14, hoverY: 86, x: 142, secondary: false },
  { height: 14, y: 73, hoverHeight: 28, hoverY: 72, x: 158, secondary: true },
  { height: 28, y: 46, hoverHeight: 40, hoverY: 60, x: 174, secondary: false },
  { height: 20, y: 73, hoverHeight: 48, hoverY: 52, x: 190, secondary: true },
  { height: 34, y: 73, hoverHeight: 34, hoverY: 66, x: 206, secondary: true },
  { height: 14, y: 73, hoverHeight: 54, hoverY: 46, x: 222, secondary: true },
  { height: 20, y: 54, hoverHeight: 60, hoverY: 40, x: 238, secondary: false },
  { height: 14, y: 73, hoverHeight: 40, hoverY: 60, x: 254, secondary: true },
  { height: 28, y: 46, hoverHeight: 48, hoverY: 52, x: 270, secondary: false },
  { height: 34, y: 40, hoverHeight: 60, hoverY: 40, x: 286, secondary: false },
  { height: 20, y: 54, hoverHeight: 54, hoverY: 46, x: 302, secondary: false }
];

const BarChartLayer = ({ hovered, color, secondaryColor }: LayerProps) => (
  <div className='ease-[cubic-bezier(0.6,0.6,0,1)] absolute inset-0 z-8 flex h-[120px] w-full items-center justify-center text-neutral-800/10 transition-transform duration-500 group-hover/animated-card:scale-150 dark:text-white/15'>
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 356 120'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
    >
      {barChartData.map((rect) => {
        const fill = rect.secondary ? (hovered ? secondaryColor : 'currentColor') : color;
        return (
          <rect
            key={`bar-${rect.x}`}
            width={12}
            height={hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={hovered ? rect.hoverY : rect.y}
            fill={fill}
            rx='2'
            ry='2'
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
          />
        );
      })}
    </svg>
  </div>
);

const InfoRevealLayer = ({ color }: { color: string }) => (
  <div className='relative h-full w-full' style={{ '--color': color } as React.CSSProperties}>
    <div className='ease-[cubic-bezier(0.6,0.6,0,1)] absolute inset-0 z-7 flex w-full translate-y-full items-start justify-center bg-transparent p-3 transition-transform duration-500 group-hover/animated-card:translate-y-0'>
      <div className='ease-[cubic-bezier(0.6,0.6,0,1)] rounded-md border border-zinc-200 bg-white/25 p-1 opacity-0 backdrop-blur-xs transition-opacity duration-500 group-hover/animated-card:opacity-100 dark:border-zinc-800 dark:bg-black/25'>
        <div className='flex items-center gap-2'>
          <div className='h-1.5 w-1.5 shrink-0 rounded-full bg-(--color)' />
          <span className='text-[10px] text-black dark:text-white'>Agent Activity</span>
        </div>
        <span className='text-[9px] text-neutral-500 dark:text-neutral-400'>
          Task distribution over time
        </span>
      </div>
    </div>
  </div>
);

const StatPillsLayer = ({ color, secondaryColor }: LayerProps) => (
  <div
    className='absolute top-2 left-3 z-8 flex items-center gap-1'
    style={{ '--color': color, '--secondary-color': secondaryColor } as React.CSSProperties}
  >
    <div className='flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-xs transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0 dark:border-zinc-800 dark:bg-black/25'>
      <div className='h-1.5 w-1.5 rounded-full bg-(--color)' />
      <span className='ml-1 text-[9px] text-black dark:text-white'>+15.2%</span>
    </div>
    <div className='flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-xs transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0 dark:border-zinc-800 dark:bg-black/25'>
      <div className='h-1.5 w-1.5 rounded-full bg-(--secondary-color)' />
      <span className='ml-1 text-[9px] text-black dark:text-white'>+18.7%</span>
    </div>
  </div>
);
