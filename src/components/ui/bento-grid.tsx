import type * as React from 'react';
import { cn } from '@/lib/utils/ui';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * BentoGrid - CSS Grid layout with named grid areas.
 * Mobile: single column stack
 * Tablet (md): 2-column layout
 * Desktop (lg+): 3-column bento layout
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid w-full',
        // Gap system
        'gap-3 md:gap-4 lg:gap-5',
        // Padding
        'p-3 md:p-4 lg:p-5',
        // Mobile: single column
        'grid-cols-1',
        // Tablet: 2 columns
        'md:grid-cols-2',
        // Desktop: 3 equal columns with named areas
        'lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCellProps {
  children: React.ReactNode;
  className?: string;
  area: 'hero' | 'stride' | 'role' | 'indexed' | 'shards' | 'career' | 'connect';
}

/**
 * BentoCell - A named cell within the BentoGrid.
 * Uses responsive col/row span classes to achieve the bento layout.
 */
export function BentoCell({ children, className, area }: BentoCellProps) {
  const areaClasses: Record<BentoCellProps['area'], string> = {
    // Hero: 1×2 (spans 2 rows on desktop, 2 rows on tablet)
    hero: 'md:row-span-2 lg:row-span-2',
    // Stride: 2×2 (spans 2 cols + 2 rows on desktop, 1 col + 2 rows on tablet)
    stride: 'md:row-span-2 lg:col-span-2 lg:row-span-2',
    // Role: 1×1
    role: '',
    // Indexed: 1×1
    indexed: '',
    // Shards: 1×1
    shards: '',
    // Career: 1×1
    career: '',
    // Connect: 2×1 (spans 2 cols on desktop, 2 cols on tablet)
    connect: 'md:col-span-2 lg:col-span-2',
  };

  return (
    <div className={cn('flex flex-col min-w-0', areaClasses[area], className)}>
      {children}
    </div>
  );
}
