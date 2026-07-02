'use client';

import { useState } from 'react';
import { AccentSwatches } from '@/components/theme/accent-swatches';
import { ThemeSelect } from '@/components/theme/theme-select';
import { CommandPalette } from './command-palette';

/**
 * Floating navigation dock — fixed, top-center, visible at all scroll positions.
 *
 * Segments (left → right):
 *   1. JUMP button — accent-filled; opens the command palette.
 *   2. Divider
 *   3. Mode toggle — `ThemeSelect` (light / dark / system).
 *   4. Divider
 *   5. Accent swatches — four colour options from `AccentSwatches`.
 *
 * The `CommandPalette` is rendered here so exactly ONE global keydown listener
 * exists (registered inside the palette). The JUMP button opens the palette by
 * setting shared state; it does NOT register its own listener.
 *
 * Dock sits at z-[100]; the palette overlay sits at z-[9999].
 * The container uses `overflow-hidden` so the JUMP button background is clipped
 * to the container's rounded corners without explicit inner-radius arithmetic.
 * ThemeSelect's dropdown uses a Radix portal, so it is NOT clipped.
 */
export function Dock() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      {/* Command palette — owns the global keydown listener */}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      {/* Dock pill */}
      <div
        className={[
          'fixed top-4 left-1/2 -translate-x-1/2 z-[100]',
          'flex h-10 items-stretch',
          'rounded-base border-2 border-border bg-card',
          'shadow-md shadow-shadow',
          'overflow-hidden'
        ].join(' ')}
        role='navigation'
        aria-label='Site navigation'
      >
        {/* Segment 1: JUMP */}
        <button
          type='button'
          onClick={() => setPaletteOpen(true)}
          aria-label='Open navigation palette (/ or ⌘K)'
          className={[
            'flex items-center gap-1.5 px-3',
            'bg-primary text-primary-foreground',
            'hover:bg-primary-hover active:opacity-80',
            'transition-colors duration-150',
            'font-head font-medium text-sm',
            'cursor-pointer'
          ].join(' ')}
        >
          JUMP
          <kbd className='font-mono text-xs opacity-70'>/</kbd>
        </button>

        {/* Divider */}
        <span className='w-px bg-border' aria-hidden='true' />

        {/* Segment 2: Mode toggle */}
        <div className='flex items-center px-1'>
          <ThemeSelect buttonVariant='ghost' noButtonShadow />
        </div>

        {/* Divider */}
        <span className='w-px bg-border' aria-hidden='true' />

        {/* Segment 3: Accent swatches */}
        <div className='flex items-center px-3'>
          <AccentSwatches />
        </div>
      </div>
    </>
  );
}
