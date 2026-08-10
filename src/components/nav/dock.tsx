'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { SocialItem } from '@/components/shared/social-buttons';
import { SocialButtons } from '@/components/shared/social-buttons';
import { AccentSelect } from '@/components/theme/accent-select';
import { ThemeSelect } from '@/components/theme/theme-select';
import { Button } from '@/components/ui/retroui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/ui';
import { DockDivider } from './dock-divider';
import { PALETTE_TOOLTIP, ShortcutBadge } from './hint-tooltip';
import { CommandPalette } from './nav-cmd';

interface DockProps {
  socials: SocialItem[];
  /** When set, shows a back arrow as the first dock segment (e.g. on legal pages). */
  backHref?: string;
  className?: string;
}

/**
 * Floating navigation dock — fixed, top-center, visible at all scroll positions.
 *
 * Segments (left → right):
 *   0. Back button — optional, when `backHref` is provided.
 *   1. JUMP button — opens the command palette.
 *   2. Divider
 *   3. Social links — GitHub, LinkedIn, Email.
 *   4. Divider
 *   5. Mode toggle — `ThemeSelect` (light / dark / system).
 *   6. Divider
 *   7. Accent select — colour options behind a palette dropdown.
 */
export function Dock({ socials, backHref, className }: DockProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      {/* Command palette — owns the global keydown listener */}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      {/* Dock pill */}
      <div
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-[100]',
          'flex items-center gap-2 p-1.5',
          'rounded-base border-2 border-border bg-background',
          'shadow-md shadow-shadow',
          'overflow-hidden',
          className
        )}
        role='navigation'
        aria-label='Site navigation'
      >
        {backHref && (
          <>
            <Button variant='flatSecondary' size='icon' asChild>
              <Link href={backHref} aria-label='Go back'>
                <ArrowLeftIcon className='h-4 w-4' />
              </Link>
            </Button>
            <DockDivider />
          </>
        )}

        {/* Segment 1: JUMP */}
        <Tooltip>
          <TooltipTrigger
            delay={200}
            render={
              <Button
                type='button'
                variant='ghost'
                onClick={() => setPaletteOpen(true)}
                aria-label='Open Nav Menu (shift + / or cmd + k)'
                className='h-9 shrink-0 rounded-base gap-1 border-2 border-transparent px-2.5 text-sm'
              >
                JUMP
                <ShortcutBadge>/</ShortcutBadge>
                <ShortcutBadge>⌘K</ShortcutBadge>
              </Button>
            }
          />
          <TooltipContent side='bottom'>{PALETTE_TOOLTIP}</TooltipContent>
        </Tooltip>

        <DockDivider />

        {/* Segment 2: Social links */}
        <SocialButtons
          socials={socials}
          buttonVariant='flatSecondary'
          className='gap-2'
          iconClassName='w-4 h-4'
        />

        <DockDivider />

        {/* Segment 3: Mode toggle */}
        <ThemeSelect buttonVariant='flatSecondary' />

        <DockDivider />

        {/* Segment 4: Accent select */}
        <AccentSelect buttonVariant='flat' />
      </div>
    </>
  );
}
