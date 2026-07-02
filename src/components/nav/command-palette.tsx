'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Command } from '@/components/ui/retroui/Command';
import { cn } from '@/lib/utils/ui';
import { NAV_SECTIONS } from './sections';

/** Smooth-scroll the viewport to the section with the given DOM id. */
function jumpTo(id: string): void {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/** Returns true when the event target is an editable field (input/textarea/CE). */
function isEditableTarget(e: KeyboardEvent): boolean {
  const t = e.target as HTMLElement;
  return t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable;
}

interface CommandPaletteProps {
  /** Whether the palette dialog is open. Controlled by parent (Dock). */
  open: boolean;
  /** Called when the palette should open or close. */
  onOpenChange: (open: boolean) => void;
}

/**
 * Command palette built on cmdk (via our RetroUI Command wrapper).
 *
 * Registers ONE global keydown listener that handles:
 *   `/`     → open (ignored while typing in an input/textarea/CE)
 *   ⌘K/⌃K  → open (always)
 *
 * The Dock must NOT register its own listener — it opens the palette via the
 * `onOpenChange` prop.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [mounted, setMounted] = useState(false);

  // Mark SSR-safe
  useEffect(() => {
    setMounted(true);
  }, []);

  // Global keyboard shortcut registration — exactly ONE listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/') {
        if (isEditableTarget(e)) return;
        e.preventDefault();
        onOpenChange(true);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  // Only render the modal overlay client-side and when open
  if (!mounted || !open) return null;

  const overlay = (
    <div
      className='fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]'
      role='dialog'
      aria-modal='true'
      aria-label='Navigation palette'
      onKeyDown={(e) => {
        if (e.key === 'Escape') onOpenChange(false);
      }}
    >
      {/* Dim + blur backdrop — click outside to close */}
      <div
        className='absolute inset-0 bg-background/70 backdrop-blur-sm'
        aria-hidden='true'
        onClick={() => onOpenChange(false)}
      />

      {/* Palette panel — sits above the backdrop */}
      <div className='relative z-10 w-full max-w-lg px-4'>
        <Command
          className={cn(
            'border-2 border-border shadow-xl shadow-shadow rounded-base',
            'bg-card text-card-foreground'
          )}
        >
          {/* Search input row */}
          <Command.Input
            placeholder='Jump to a section…'
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Escape') onOpenChange(false);
            }}
          />

          <Command.List>
            <Command.Empty className='py-8 text-center font-mono text-sm text-muted-foreground'>
              no match — try &lsquo;work&rsquo; or &lsquo;contact&rsquo;
            </Command.Empty>

            <Command.Group>
              {NAV_SECTIONS.map((section) => (
                <Command.Item
                  key={section.id}
                  value={section.label}
                  onSelect={() => {
                    jumpTo(section.id);
                    onOpenChange(false);
                  }}
                  className='group flex items-center gap-3 px-3 py-2.5'
                >
                  {/* Mono index */}
                  <span className='w-4 shrink-0 font-mono text-xs text-muted-foreground'>
                    {section.n}
                  </span>

                  {/* Section label */}
                  <span className='font-head font-medium'>{section.label}</span>

                  {/* Blurb — pushed right */}
                  <span className='ml-auto font-mono text-xs text-muted-foreground'>
                    {section.blurb}
                  </span>

                  {/* Enter hint on selected row */}
                  <Command.Shortcut className='text-accent opacity-0 group-data-[selected=true]:opacity-100'>
                    ↵
                  </Command.Shortcut>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer keyboard hint row */}
          <div className='flex items-center gap-4 border-t border-border px-3 py-2 font-mono text-xs text-muted-foreground'>
            <span>
              <kbd className='text-accent'>↑↓</kbd> navigate
            </span>
            <span>
              <kbd className='text-accent'>↵</kbd> jump
            </span>
            <span>
              <kbd className='text-accent'>esc</kbd> close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
