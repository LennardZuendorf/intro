'use client';

import { useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils/ui';
import {
  deriveSecondaryColor,
  EllipseGradient,
  GradientRevealLayer,
  GridLayer,
  HOVER_VISUAL_SVG_VIEWBOX
} from './shared-layers';
import type { VisualProps } from './types';

export function IndexedHoverVisual({ colorHex, className }: VisualProps) {
  const [hovered, setHovered] = useState(false);
  const gradientId = `indexed-hover-${useId()}`;
  const linearId = `indexed-linear-${useId()}`;
  const secondaryColor = useMemo(() => deriveSecondaryColor(colorHex), [colorHex]);

  return (
    <div
      aria-hidden
      className={cn('relative h-full w-full overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SceneLayout hovered={hovered} color={colorHex} secondaryColor={secondaryColor} />
      <GradientRevealLayer color={colorHex} linearId={linearId} />
      <EllipseGradient color={colorHex} gradientId={gradientId} />
      <GridLayer />
    </div>
  );
}

/* ── Main scene — index card in center with doc badges + flow lines ── */

const SceneLayout = ({
  hovered,
  color,
  secondaryColor
}: {
  hovered: boolean;
  color: string;
  secondaryColor: string;
}) => (
  <div className='absolute inset-0 z-8 flex items-center justify-center'>
    <FlowLines hovered={hovered} color={color} />
    {docBadges.map((badge) => (
      <DocBadge
        key={badge.label}
        badge={badge}
        hovered={hovered}
        color={color}
        secondaryColor={secondaryColor}
      />
    ))}
    <IndexCard hovered={hovered} color={color} secondaryColor={secondaryColor} />
  </div>
);

/* ── Index card — neobrutalist block with abstract chunk bars ── */

interface IndexBar {
  width: string;
  hoverWidth: string;
  opacity: number;
  hoverOpacity: number;
  primary: boolean;
  delay: string;
}

const indexBars: IndexBar[] = [
  {
    width: '60%',
    hoverWidth: '90%',
    opacity: 0.15,
    hoverOpacity: 0.5,
    primary: true,
    delay: '0ms'
  },
  {
    width: '45%',
    hoverWidth: '70%',
    opacity: 0.1,
    hoverOpacity: 0.35,
    primary: false,
    delay: '80ms'
  },
  {
    width: '75%',
    hoverWidth: '95%',
    opacity: 0.12,
    hoverOpacity: 0.45,
    primary: true,
    delay: '160ms'
  },
  {
    width: '35%',
    hoverWidth: '55%',
    opacity: 0.08,
    hoverOpacity: 0.3,
    primary: false,
    delay: '240ms'
  },
  {
    width: '50%',
    hoverWidth: '80%',
    opacity: 0.1,
    hoverOpacity: 0.4,
    primary: true,
    delay: '320ms'
  }
];

const IndexCard = ({
  hovered,
  color,
  secondaryColor
}: {
  hovered: boolean;
  color: string;
  secondaryColor: string;
}) => (
  <div
    className='ease-[cubic-bezier(0.6,0.6,0,1)] relative z-10 flex flex-col overflow-hidden rounded-md border-2 border-border bg-primary transition-all duration-500'
    style={{
      width: 164,
      height: 84,
      boxShadow: hovered ? `5px 5px 0px 0px ${color}70` : '4px 4px 0px 0px rgba(0,0,0,0.5)',
      transform: hovered ? 'scale(1.04) rotate(-1deg)' : 'scale(1) rotate(-0.5deg)'
    }}
  >
    {/* Title bar — bold label, no macOS dots */}
    <div className='flex items-center border-b-2 border-border px-3 py-1'>
      <span className='font-mono text-[8px] font-black text-primary-foreground/50'>indexed</span>
      <span className='ml-auto font-mono text-[7px] font-bold text-primary-foreground/25'>
        FAISS
      </span>
    </div>

    {/* Abstract index chunk bars */}
    <div className='flex flex-1 flex-col justify-center gap-[5px] px-3 py-2'>
      {indexBars.map((bar) => (
        <div
          key={bar.delay}
          className='ease-[cubic-bezier(0.6,0.6,0,1)] h-[5px] rounded-xs transition-all duration-500'
          style={{
            width: hovered ? bar.hoverWidth : bar.width,
            backgroundColor: bar.primary ? color : secondaryColor,
            opacity: hovered ? bar.hoverOpacity : bar.opacity,
            transitionDelay: bar.delay
          }}
        />
      ))}
    </div>
  </div>
);

/* ── Doc badges — neobrutalist micro-cards ── */

interface DocBadgeData {
  label: string;
  x: number;
  y: number;
  hoverX: number;
  hoverY: number;
  floatDelay: string;
  primary: boolean;
}

const docBadges: DocBadgeData[] = [
  { label: '.md', x: -140, y: -26, hoverX: -110, hoverY: -14, floatDelay: '0s', primary: true },
  { label: '.py', x: 140, y: -30, hoverX: 110, hoverY: -16, floatDelay: '0.5s', primary: true },
  { label: '.pdf', x: -135, y: 26, hoverX: -108, hoverY: 16, floatDelay: '1s', primary: false },
  { label: '.csv', x: 135, y: 22, hoverX: 108, hoverY: 12, floatDelay: '1.5s', primary: false },
  { label: '.jira', x: -48, y: -50, hoverX: -34, hoverY: -44, floatDelay: '0.3s', primary: true },
  { label: '.wiki', x: 52, y: 48, hoverX: 38, hoverY: 42, floatDelay: '0.8s', primary: false }
];

const DocBadge = ({
  badge,
  hovered,
  color,
  secondaryColor
}: {
  badge: DocBadgeData;
  hovered: boolean;
  color: string;
  secondaryColor: string;
}) => {
  const badgeColor = badge.primary ? color : secondaryColor;

  return (
    <div
      className='ease-[cubic-bezier(0.6,0.6,0,1)] absolute z-5 rounded-sm border-2 border-border bg-primary px-1.5 py-0.5 transition-all duration-700'
      style={{
        transform: hovered
          ? `translate(${badge.hoverX}px, ${badge.hoverY}px)`
          : `translate(${badge.x}px, ${badge.y}px)`,
        boxShadow: hovered ? `2px 2px 0px 0px ${badgeColor}50` : '2px 2px 0px 0px rgba(0,0,0,0.3)',
        animation: `indexed-float 3s ease-in-out ${badge.floatDelay} infinite`
      }}
    >
      <span
        className='ease-[cubic-bezier(0.6,0.6,0,1)] font-mono text-[7px] font-black text-primary-foreground/50 transition-colors duration-500'
        style={{ color: hovered ? badgeColor : undefined }}
      >
        {badge.label}
      </span>
    </div>
  );
};

/* ── Animated flow lines (SVG) — dashes travel from badges to center ── */

const FlowLines = ({ hovered, color }: { hovered: boolean; color: string }) => (
  <svg
    className='pointer-events-none absolute inset-0 z-6 h-full w-full transition-opacity duration-500'
    viewBox={HOVER_VISUAL_SVG_VIEWBOX}
    preserveAspectRatio='xMidYMid slice'
    aria-hidden='true'
    focusable='false'
    style={{ opacity: hovered ? 1 : 0.15 }}
  >
    {flowPaths.map((p) => (
      <line
        key={p.key}
        x1={p.x1}
        y1={p.y1}
        x2={178}
        y2={60}
        stroke={color}
        strokeWidth='0.7'
        strokeDasharray='3 7'
        opacity={hovered ? 0.5 : 0.15}
        className='transition-opacity duration-500'
      >
        {hovered && (
          <animate
            attributeName='stroke-dashoffset'
            from='10'
            to='0'
            dur='1s'
            repeatCount='indefinite'
          />
        )}
      </line>
    ))}
  </svg>
);

const flowPaths = [
  { key: 'md', x1: 33, y1: 32 },
  { key: 'py', x1: 323, y1: 28 },
  { key: 'pdf', x1: 38, y1: 90 },
  { key: 'csv', x1: 318, y1: 86 },
  { key: 'jira', x1: 128, y1: 8 },
  { key: 'wiki', x1: 233, y1: 110 }
];
