'use client';

import React from 'react';
import { cn } from '@/lib/utils/ui';

interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MasonryGrid - CSS Grid layout with 35/65 split for root-level structure
 * Mobile: 1 column (stack), Tablet: 2 equal columns, Desktop: 35% left / 65% right split
 * Grid allows for cross-column spanning while columns manage internal flow
 */
export const MasonryGrid = ({ children, className }: MasonryGridProps) => {
  return (
    <div
      className={cn(
        // Full width container
        'w-full',
        // CSS Grid for root structure
        'grid grid-cols-1 md:grid-cols-2',
        // Custom grid template for desktop: 35% left, 65% right
        'lg:grid-cols-[35%_65%]',
        // Auto rows size to content by default
        'auto-rows-auto',
        // Gap between grid items
        'gap-3 md:gap-4 lg:gap-5',
        // Internal padding with extra space for animations
        'p-3 md:p-4 lg:p-5',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * MasonryColumn - Individual column in the masonry layout
 * Manages its own internal flow with optional height control
 */
interface MasonryColumnProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Whether child cards should fill available height
   * - true: Cards use flex-1 to fill height evenly
   * - false: Cards size naturally to content
   */
  fillHeight?: boolean;
  /**
   * Number of rows this column spans in the grid
   */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const MasonryColumn = ({
  children,
  className,
  fillHeight = false,
  rowSpan = 1
}: MasonryColumnProps) => {
  // Build row span classes
  const rowSpanClasses = cn(
    rowSpan === 1 && 'row-span-1',
    rowSpan === 2 && 'row-span-2',
    rowSpan === 3 && 'row-span-3',
    rowSpan === 4 && 'row-span-4',
    rowSpan === 5 && 'row-span-5',
    rowSpan === 6 && 'row-span-6'
  );

  return (
    <div
      className={cn(
        // Grid item positioning
        'col-span-1',
        rowSpanClasses,
        // Flex column for vertical stacking
        'flex flex-col',
        // Gap between items in column
        'gap-3 md:gap-4 lg:gap-5',
        className
      )}
    >
      {fillHeight
        ? // Wrap children to apply flex-1 to each direct child
          React.Children.map(children, (child) => (
            <div className='flex-1 flex flex-col w-full'>{child}</div>
          ))
        : children}
    </div>
  );
};

/**
 * MasonryRow - Optional row container for items that should align horizontally
 * Use within a MasonryColumn when you want items side-by-side
 */
interface MasonryRowProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Whether this row should fill available height and distribute to children
   */
  fillHeight?: boolean;
}

export const MasonryRow = ({ children, className, fillHeight = false }: MasonryRowProps) => {
  return (
    <div
      className={cn(
        // Flex row for horizontal layout
        'flex flex-col md:flex-row',
        // Gap between items
        'gap-3 md:gap-4 lg:gap-5',
        // Full width
        'w-full',
        // Fill height if requested
        fillHeight && 'h-full',
        className
      )}
    >
      {fillHeight
        ? // Distribute height evenly to children
          React.Children.map(children, (child) => (
            <div className='flex-1 flex flex-col h-full w-full'>{child}</div>
          ))
        : children}
    </div>
  );
};
