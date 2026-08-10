'use client';

import type * as React from 'react';
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

export function ShardsAgentsHoverVisual({ colorHex, className }: VisualProps) {
  const [hovered, setHovered] = useState(false);
  const gradientId = `shards-hover-${useId()}`;
  const linearId = `shards-linear-${useId()}`;
  const secondaryColor = useMemo(() => deriveSecondaryColor(colorHex), [colorHex]);

  return (
    <div
      aria-hidden
      className={cn('relative h-full w-full overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <EditorDocument hovered={hovered} color={colorHex} secondaryColor={secondaryColor} />
      <WorkflowPipeline hovered={hovered} color={colorHex} secondaryColor={secondaryColor} />
      <AuthorLabels color={colorHex} secondaryColor={secondaryColor} />
      <GradientRevealLayer color={colorHex} linearId={linearId} />
      <EllipseGradient color={colorHex} gradientId={gradientId} />
      <GridLayer />
    </div>
  );
}

/* ── Editor document — chunky word blocks with hard shadows ── */

interface TextBlock {
  id: string;
  x: number;
  y: number;
  w: number;
  author: 'ai' | 'human';
  delay: string;
}

const textBlocks: TextBlock[] = [
  { id: 'p1-1', x: 32, y: 32, w: 42, author: 'human', delay: '0ms' },
  { id: 'p1-2', x: 78, y: 32, w: 56, author: 'ai', delay: '40ms' },
  { id: 'p1-3', x: 138, y: 32, w: 34, author: 'human', delay: '80ms' },
  { id: 'p1-4', x: 176, y: 32, w: 48, author: 'ai', delay: '100ms' },
  { id: 'p2-1', x: 32, y: 46, w: 58, author: 'ai', delay: '60ms' },
  { id: 'p2-2', x: 94, y: 46, w: 38, author: 'human', delay: '100ms' },
  { id: 'p2-3', x: 136, y: 46, w: 64, author: 'ai', delay: '140ms' },
  { id: 'p3-1', x: 32, y: 60, w: 46, author: 'ai', delay: '120ms' },
  { id: 'p3-2', x: 82, y: 60, w: 52, author: 'ai', delay: '160ms' },
  { id: 'p3-3', x: 138, y: 60, w: 48, author: 'ai', delay: '200ms' },
  { id: 'p4-1', x: 32, y: 74, w: 40, author: 'human', delay: '180ms' },
  { id: 'p4-2', x: 76, y: 74, w: 54, author: 'human', delay: '220ms' },
  { id: 'p4-3', x: 134, y: 74, w: 36, author: 'ai', delay: '240ms' }
];

const textBlocksP2: TextBlock[] = [
  { id: 's1-1', x: 32, y: 92, w: 48, author: 'ai', delay: '260ms' },
  { id: 's1-2', x: 84, y: 92, w: 58, author: 'human', delay: '300ms' },
  { id: 's1-3', x: 146, y: 92, w: 40, author: 'ai', delay: '320ms' },
  { id: 's2-1', x: 32, y: 104, w: 64, author: 'human', delay: '340ms' },
  { id: 's2-2', x: 100, y: 104, w: 44, author: 'ai', delay: '360ms' }
];

const EditorDocument = ({
  hovered,
  color,
  secondaryColor
}: {
  hovered: boolean;
  color: string;
  secondaryColor: string;
}) => (
  <div className='absolute inset-0 z-8'>
    <svg
      className='pointer-events-none absolute inset-0 h-full w-full'
      viewBox={HOVER_VISUAL_SVG_VIEWBOX}
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
    >
      {/* Margin line — thick */}
      <line
        x1={26}
        y1={10}
        x2={26}
        y2={114}
        stroke={color}
        strokeWidth={hovered ? 2.5 : 2}
        opacity={hovered ? 0.35 : 0.08}
        className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
      />

      {/* Heading block — big chunky bar with hard shadow */}
      <rect
        x={34}
        y={16}
        width={hovered ? 140 : 115}
        height={10}
        rx={1}
        fill='currentColor'
        opacity={0.06}
        className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
      />
      <rect
        x={32}
        y={14}
        width={hovered ? 140 : 115}
        height={10}
        rx={1}
        fill={secondaryColor}
        stroke={secondaryColor}
        strokeWidth={hovered ? 1.5 : 0}
        opacity={hovered ? 0.5 : 0.14}
        className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
      />

      {/* Word blocks — chunky rectangles with shadows on AI blocks */}
      {textBlocks.map((block) => {
        const isAi = block.author === 'ai';
        const fillColor = isAi ? color : secondaryColor;
        return (
          <g key={block.id}>
            {/* Hard shadow for AI blocks */}
            {isAi && (
              <rect
                x={block.x + 2}
                y={block.y + 2}
                width={block.w}
                height={9}
                rx={1}
                fill={color}
                opacity={hovered ? 0.15 : 0}
                className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-opacity duration-500'
                style={{ transitionDelay: block.delay }}
              />
            )}
            {/* Word bar */}
            <rect
              x={block.x}
              y={block.y}
              width={block.w}
              height={9}
              rx={1}
              fill={fillColor}
              stroke={isAi && hovered ? color : 'none'}
              strokeWidth={isAi && hovered ? 1 : 0}
              opacity={hovered ? (isAi ? 0.5 : 0.2) : 0.07}
              className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
              style={{ transitionDelay: block.delay }}
            />
          </g>
        );
      })}

      {/* Blinking cursor — chunky block */}
      <rect
        x={190}
        y={58}
        width={4}
        height={12}
        rx={1}
        fill={color}
        opacity={hovered ? 0.9 : 0}
        className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-opacity duration-300'
        style={{ transitionDelay: '350ms' }}
      >
        {hovered && (
          <animate attributeName='opacity' values='0.9;0.1;0.9' dur='1s' repeatCount='indefinite' />
        )}
      </rect>

      {/* Second heading — chunky */}
      <rect
        x={34}
        y={84}
        width={hovered ? 100 : 82}
        height={4}
        rx={1}
        fill='currentColor'
        opacity={0.05}
      />
      <rect
        x={32}
        y={82}
        width={hovered ? 100 : 82}
        height={4}
        rx={1}
        fill={color}
        opacity={hovered ? 0.4 : 0.12}
        className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
        style={{ transitionDelay: '200ms' }}
      />

      {/* Second paragraph words */}
      {textBlocksP2.map((block) => {
        const isAi = block.author === 'ai';
        const fillColor = isAi ? color : secondaryColor;
        return (
          <g key={block.id}>
            {isAi && (
              <rect
                x={block.x + 2}
                y={block.y + 2}
                width={block.w}
                height={8}
                rx={1}
                fill={color}
                opacity={hovered ? 0.12 : 0}
                className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-opacity duration-500'
                style={{ transitionDelay: block.delay }}
              />
            )}
            <rect
              x={block.x}
              y={block.y}
              width={block.w}
              height={8}
              rx={1}
              fill={fillColor}
              opacity={hovered ? (isAi ? 0.45 : 0.18) : 0.05}
              className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
              style={{ transitionDelay: block.delay }}
            />
          </g>
        );
      })}
    </svg>
  </div>
);

/* ── Workflow pipeline — chunky nodes with hard shadows ── */

interface PipelineNode {
  y: number;
  label: string;
  delay: string;
}

const pipelineNodes: PipelineNode[] = [
  { y: 18, label: 'read', delay: '0ms' },
  { y: 40, label: 'plan', delay: '80ms' },
  { y: 62, label: 'edit', delay: '160ms' },
  { y: 84, label: 'review', delay: '240ms' },
  { y: 106, label: 'commit', delay: '320ms' }
];

const PIPELINE_X = 288;
const NODE_SIZE_REST = 8;
const NODE_SIZE_HOVER = 14;

const WorkflowPipeline = ({
  hovered,
  color,
  secondaryColor
}: {
  hovered: boolean;
  color: string;
  secondaryColor: string;
}) => {
  const nodeSize = hovered ? NODE_SIZE_HOVER : NODE_SIZE_REST;
  const half = nodeSize / 2;

  return (
    <svg
      className='pointer-events-none absolute inset-0 z-7 h-full w-full'
      viewBox={HOVER_VISUAL_SVG_VIEWBOX}
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
      focusable='false'
    >
      {/* Vertical connecting line — thick dashes */}
      <line
        x1={PIPELINE_X}
        y1={22}
        x2={PIPELINE_X}
        y2={110}
        stroke={color}
        strokeWidth={hovered ? 2 : 1}
        strokeDasharray='4 6'
        opacity={hovered ? 0.4 : 0.1}
        className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
      >
        {hovered && (
          <animate
            attributeName='stroke-dashoffset'
            from='10'
            to='0'
            dur='1.2s'
            repeatCount='indefinite'
          />
        )}
      </line>

      {/* Nodes — chunky squares with hard shadows */}
      {pipelineNodes.map((node) => (
        <g key={node.label}>
          {/* Hard shadow */}
          <rect
            x={PIPELINE_X - half + 3}
            y={node.y - half + 3}
            width={nodeSize}
            height={nodeSize}
            rx={2}
            fill={hovered ? color : 'currentColor'}
            opacity={hovered ? 0.2 : 0.04}
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-600'
            style={{ transitionDelay: node.delay }}
          />
          {/* Node square */}
          <rect
            x={PIPELINE_X - half}
            y={node.y - half}
            width={nodeSize}
            height={nodeSize}
            rx={2}
            fill={hovered ? color : secondaryColor}
            stroke={hovered ? color : 'currentColor'}
            strokeWidth={hovered ? 2 : 1}
            opacity={hovered ? 0.8 : 0.15}
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
            style={{ transitionDelay: node.delay }}
          />
          {/* Label */}
          <text
            x={PIPELINE_X + half + 8}
            y={node.y + 3}
            textAnchor='start'
            fill={hovered ? color : 'currentColor'}
            fontSize='8'
            fontFamily='monospace'
            fontWeight='900'
            opacity={hovered ? 0.65 : 0.1}
            className='ease-[cubic-bezier(0.6,0.6,0,1)] transition-all duration-500'
            style={{ transitionDelay: node.delay }}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ── Author labels — blocky pills ── */

const AuthorLabels = ({ color, secondaryColor }: { color: string; secondaryColor: string }) => (
  <div
    className='absolute top-2 left-3 z-9 flex items-center gap-1'
    style={{ '--color': color, '--secondary-color': secondaryColor } as React.CSSProperties}
  >
    <div className='flex shrink-0 items-center rounded-xs border-2 border-border bg-primary px-1.5 py-0.5 transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0'>
      <div className='h-1.5 w-1.5 rounded-xs bg-(--color)' />
      <span className='ml-1 text-[9px] font-black text-primary-foreground/60'>AI</span>
    </div>
    <div className='flex shrink-0 items-center rounded-xs border-2 border-border bg-primary px-1.5 py-0.5 transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0'>
      <div className='h-1.5 w-1.5 rounded-xs bg-(--secondary-color)' />
      <span className='ml-1 text-[9px] font-black text-primary-foreground/60'>Human</span>
    </div>
  </div>
);
