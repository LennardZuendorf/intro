'use client';

import { useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils/ui';
import {
  deriveSecondaryColor,
  EllipseGradient,
  GradientRevealLayer,
  GridLayer
} from './shared-layers';
import type { VisualProps } from './types';

export function ObsidianTaskHoverVisual({ colorHex, className }: VisualProps) {
  const [hovered, setHovered] = useState(false);
  const gradientId = `obsidian-hover-${useId()}`;
  const linearId = `obsidian-linear-${useId()}`;
  const secondaryColor = useMemo(() => deriveSecondaryColor(colorHex), [colorHex]);

  return (
    <div
      aria-hidden
      className={cn('relative h-full w-full overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MarkdownTextLayer hovered={hovered} color={colorHex} />
      <CheckboxBlocks hovered={hovered} color={colorHex} secondaryColor={secondaryColor} />
      <StatusPills color={colorHex} secondaryColor={secondaryColor} />
      <GradientRevealLayer color={colorHex} linearId={linearId} />
      <EllipseGradient color={colorHex} gradientId={gradientId} />
      <GridLayer />
    </div>
  );
}

/* ── Background markdown text — faded task syntax tiled at angle ── */

const markdownLines = [
  { text: '- [ ] refactor sidebar module', x: -20, y: 18, delay: '0ms' },
  { text: '- [x] implement drag handlers', x: 40, y: 34, delay: '40ms' },
  { text: '- [ ] add priority sorting', x: -10, y: 50, delay: '80ms' },
  { text: '- [x] obsidian plugin API v2', x: 55, y: 66, delay: '120ms' },
  { text: '- [ ] kanban board view', x: 5, y: 82, delay: '160ms' },
  { text: '- [x] visual task states', x: 70, y: 98, delay: '200ms' },
  { text: '- [ ] custom status icons', x: -30, y: 114, delay: '240ms' }
];

const MarkdownTextLayer = ({ hovered, color }: { hovered: boolean; color: string }) => (
  <svg
    className='pointer-events-none absolute inset-0 z-[7] h-full w-full'
    viewBox='0 0 356 120'
    preserveAspectRatio='xMidYMid slice'
    aria-hidden='true'
    focusable='false'
  >
    <g
      className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-transform duration-700'
      style={{
        transform: hovered ? 'rotate(-2deg) translate(8px, -4px)' : 'rotate(-1.5deg)',
        transformOrigin: '178px 60px'
      }}
    >
      {markdownLines.map((line) => {
        const isChecked = line.text.includes('[x]');
        return (
          <text
            key={line.text}
            x={line.x}
            y={line.y}
            fontFamily='monospace'
            fontSize='11'
            fontWeight='bold'
            fill={isChecked ? color : 'currentColor'}
            opacity={hovered ? (isChecked ? 0.25 : 0.12) : 0.05}
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
            style={{ transitionDelay: line.delay }}
          >
            {line.text}
          </text>
        );
      })}
    </g>
  </svg>
);

/* ── Foreground checkbox blocks — chunky neobrutalist squares ── */

interface CheckboxData {
  id: string;
  x: number;
  y: number;
  size: number;
  checked: boolean;
  hoverChecked: boolean;
  rotation: number;
  hoverRotation: number;
  delay: string;
  primary: boolean;
}

const checkboxes: CheckboxData[] = [
  {
    id: 'cb1',
    x: 48,
    y: 20,
    size: 28,
    checked: false,
    hoverChecked: true,
    rotation: -3,
    hoverRotation: -1,
    delay: '0ms',
    primary: true
  },
  {
    id: 'cb2',
    x: 135,
    y: 10,
    size: 34,
    checked: true,
    hoverChecked: true,
    rotation: 2,
    hoverRotation: 1,
    delay: '60ms',
    primary: true
  },
  {
    id: 'cb3',
    x: 240,
    y: 18,
    size: 26,
    checked: false,
    hoverChecked: true,
    rotation: -1.5,
    hoverRotation: -3,
    delay: '120ms',
    primary: false
  },
  {
    id: 'cb4',
    x: 72,
    y: 62,
    size: 32,
    checked: true,
    hoverChecked: true,
    rotation: 1.5,
    hoverRotation: -0.5,
    delay: '80ms',
    primary: false
  },
  {
    id: 'cb5',
    x: 185,
    y: 55,
    size: 36,
    checked: false,
    hoverChecked: true,
    rotation: -2,
    hoverRotation: 1.5,
    delay: '180ms',
    primary: true
  },
  {
    id: 'cb6',
    x: 290,
    y: 50,
    size: 24,
    checked: false,
    hoverChecked: false,
    rotation: 3,
    hoverRotation: 2,
    delay: '240ms',
    primary: false
  }
];

const CheckboxBlocks = ({
  hovered,
  color,
  secondaryColor
}: {
  hovered: boolean;
  color: string;
  secondaryColor: string;
}) => (
  <svg
    className='pointer-events-none absolute inset-0 z-[8] h-full w-full'
    viewBox='0 0 356 120'
    preserveAspectRatio='xMidYMid slice'
    aria-hidden='true'
    focusable='false'
  >
    {checkboxes.map((cb) => {
      const isChecked = hovered ? cb.hoverChecked : cb.checked;
      const justChecked = hovered && !cb.checked && cb.hoverChecked;
      const rot = hovered ? cb.hoverRotation : cb.rotation;
      const blockColor = cb.primary ? color : secondaryColor;

      return (
        <g
          key={cb.id}
          className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-600'
          style={{
            transform: `rotate(${rot}deg)`,
            transformOrigin: `${cb.x + cb.size / 2}px ${cb.y + cb.size / 2}px`,
            transitionDelay: cb.delay
          }}
        >
          {/* Hard shadow */}
          <rect
            x={cb.x + 4}
            y={cb.y + 4}
            width={cb.size}
            height={cb.size}
            rx={2}
            fill={justChecked ? blockColor : 'currentColor'}
            opacity={hovered ? 0.25 : 0.08}
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
            style={{ transitionDelay: cb.delay }}
          />
          {/* Box */}
          <rect
            x={cb.x}
            y={cb.y}
            width={cb.size}
            height={cb.size}
            rx={2}
            fill='var(--color-primary, hsl(0 0% 98%))'
            stroke={isChecked ? blockColor : 'currentColor'}
            strokeWidth={2.5}
            opacity={hovered ? 0.85 : 0.15}
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
            style={{ transitionDelay: cb.delay }}
          />
          {/* Fill for checked state */}
          {isChecked && (
            <rect
              x={cb.x + 5}
              y={cb.y + 5}
              width={cb.size - 10}
              height={cb.size - 10}
              rx={1}
              fill={blockColor}
              opacity={hovered ? 0.5 : 0.12}
              className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
              style={{ transitionDelay: cb.delay }}
            />
          )}
          {/* Checkmark — bold, chunky lines */}
          {isChecked && (
            <g
              opacity={hovered ? 0.8 : 0.2}
              className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-opacity duration-500'
              style={{ transitionDelay: cb.delay }}
            >
              <line
                x1={cb.x + cb.size * 0.22}
                y1={cb.y + cb.size * 0.52}
                x2={cb.x + cb.size * 0.42}
                y2={cb.y + cb.size * 0.72}
                stroke={justChecked ? color : blockColor}
                strokeWidth={3}
                strokeLinecap='square'
              />
              <line
                x1={cb.x + cb.size * 0.42}
                y1={cb.y + cb.size * 0.72}
                x2={cb.x + cb.size * 0.78}
                y2={cb.y + cb.size * 0.28}
                stroke={justChecked ? color : blockColor}
                strokeWidth={3}
                strokeLinecap='square'
              />
            </g>
          )}
        </g>
      );
    })}
  </svg>
);

/* ── Status pills — top-right, fade on hover ── */

const StatusPills = ({ color, secondaryColor }: { color: string; secondaryColor: string }) => (
  <div
    className='absolute top-2 right-3 z-[9] flex items-center gap-1'
    style={{ '--color': color, '--secondary-color': secondaryColor } as React.CSSProperties}
  >
    <div className='flex shrink-0 items-center rounded-sm border-2 border-border bg-primary px-1.5 py-0.5 transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0'>
      <div className='h-1.5 w-1.5 rounded-sm bg-[var(--secondary-color)]' />
      <span className='ml-1 text-[9px] font-bold text-primary-foreground/60'>3 open</span>
    </div>
    <div className='flex shrink-0 items-center rounded-sm border-2 border-border bg-primary px-1.5 py-0.5 transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0'>
      <div className='h-1.5 w-1.5 rounded-sm bg-[var(--color)]' />
      <span className='ml-1 text-[9px] font-bold text-primary-foreground/60'>5 done</span>
    </div>
  </div>
);
