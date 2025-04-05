'use client';

import { BackgroundGrid } from '@/components/ui/background-grid';
import { cn } from '@/lib/utils/ui';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Content for the section */
  children: ReactNode;
  /** Enable full viewport height */
  fullHeight?: boolean;
  /** Background type */
  background?: 'grid' | 'mask' | 'none';
  /** Background color class */
  bgColor?: string;
  /** Max width for the content container */
  maxWidth?: string;
  /** Container width style */
  containerWidth?: string;
  /** Content padding */
  padding?: string;
  /** Additional container class names */
  containerClassName?: string;
  /** Grid size for background (pixel value) */
  gridSize?: string;
  /** Mask intensity (0-100) */
  maskIntensity?: number;
  /** Container flex direction */
  containerDirection?: 'row' | 'col';
  /** Render as a different HTML element */
  as?: ElementType;
  /** Center content (adds justify-center) */
  centerContent?: boolean;
}

export function Section({
  children,
  className,
  fullHeight = true,
  background = 'none',
  bgColor = 'bg-main',
  maxWidth = 'min(92%, 1280px)',
  containerWidth = 'clamp(100%, 80vw, 1600px)',
  padding = 'px-6 py-8 md:py-12 2xl:py-16',
  containerClassName,
  gridSize = '80px',
  maskIntensity = 40,
  containerDirection = 'col',
  centerContent = true,
  as: Element = 'section',
  ...props
}: SectionProps) {
  // Base section classes
  const sectionClasses = cn(
    'w-full relative',
    fullHeight && 'min-h-[100svh]',
    'flex items-center justify-center',
    bgColor,
    className
  );

  // Container for content
  const containerClasses = cn(
    'w-full flex',
    containerDirection === 'col' ? 'flex-col' : 'flex-col lg:flex-row',
    centerContent && 'items-center justify-center',
    padding,
    containerClassName
  );

  // Common content container
  const contentContainer = (
    <div
      className={containerClasses}
      style={{
        maxWidth,
        width: containerWidth
      }}
    >
      {children}
    </div>
  );

  // Masked grid background (for footer-style)
  if (background === 'mask') {
    return (
      <Element className={cn(sectionClasses, 'z-0')} {...props}>
        <div
          className='absolute inset-0 w-full h-full pointer-events-none z-[1]'
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--grid) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize} ${gridSize}`,
            maskImage: `radial-gradient(circle at center, black ${maskIntensity}%, transparent 100%)`
          }}
        />
        <div className='relative z-[2] w-full flex items-center justify-center'>
          {contentContainer}
        </div>
      </Element>
    );
  }

  // Background grid (for hero-style)
  if (background === 'grid') {
    return (
      <BackgroundGrid className={sectionClasses} {...props}>
        {contentContainer}
      </BackgroundGrid>
    );
  }

  // Default rendering
  return (
    <Element className={sectionClasses} {...props}>
      {contentContainer}
    </Element>
  );
}
