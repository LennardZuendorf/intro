'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Kbd } from '@/components/ui/kbd';
import { Command } from '@/components/ui/retroui/Command';
import { cn } from '@/lib/utils/ui';
import { NAV_SECTIONS, type NavSection } from './sections';

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

function navigateToSection(
  section: NavSection,
  pathname: string,
  router: ReturnType<typeof useRouter>
): void {
  if (section.href) {
    router.push(section.href);
    return;
  }

  if (!section.id) return;

  if (pathname === '/') {
    jumpTo(section.id);
    return;
  }

  router.push(`/#${section.id}`);
}

interface CommandPaletteProps {
  /** Whether the palette dialog is open. Controlled by parent (Dock). */
  open: boolean;
  /** Called when the palette should open or close. */
  onOpenChange: (open: boolean) => void;
}

/**
 * Command palette built on cmdk.
 *
 * The panel is wrapped in cmdk's `Command.Dialog`, which renders a Radix Dialog
 * (Root → Portal → Overlay → Content) around the command menu. Radix provides the
 * accessibility that a hand-rolled overlay lacked: focus is trapped inside the
 * panel, returned to the JUMP trigger on close, Escape closes, background scroll
 * is locked, and `role="dialog"` / `aria-modal` are set automatically.
 *
 * Registers ONE global keydown listener that handles the OPEN shortcuts:
 *   shift+/ → open (ignored while typing in an input/textarea/CE)
 *   ⌘K/⌃K  → open (always)
 *
 * Escape-to-close is handled by Radix, so no manual Escape handling is needed.
 * The Dock must NOT register its own listener — it opens the palette via the
 * `onOpenChange` prop.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Global keyboard shortcut registration — exactly ONE listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && e.shiftKey) {
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

  return (
    <CommandPrimitive.Dialog
      open={open}
      onOpenChange={onOpenChange}
      // Accessible name for the dialog (Radix maps this to aria-label on Content).
      label='Navigation palette'
      // Dim + blur backdrop.
      overlayClassName='fixed inset-0 z-[9998] bg-background/70 backdrop-blur-sm'
      // Position the panel below the top edge, centered horizontally.
      contentClassName='-translate-x-1/2 fixed top-[15vh] left-1/2 z-[9999] w-full max-w-lg px-4'
      // Panel styling (applied to the cmdk root inside the dialog content).
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-base border-2 border-border',
        'bg-card text-card-foreground shadow-shadow shadow-xl'
      )}
    >
      {/* Search input row */}
      <Command.Input placeholder='Jump to a section…' autoFocus />

      <Command.List>
        <Command.Empty className='py-8 text-center font-mono text-muted-foreground text-sm'>
          no match — try &lsquo;work&rsquo; or &lsquo;legal&rsquo;
        </Command.Empty>

        <Command.Group>
          {NAV_SECTIONS.map((section) => (
            <Command.Item
              key={section.id ?? section.href}
              value={`${section.label} ${section.blurb}`}
              onSelect={() => {
                navigateToSection(section, pathname, router);
                onOpenChange(false);
              }}
              className='group flex items-center gap-3 px-3 py-2.5'
            >
              {/* Mono index */}
              <span className='w-4 shrink-0 font-mono text-muted-foreground text-xs'>
                {section.n}
              </span>

              {/* Section label */}
              <span className='font-head font-medium'>{section.label}</span>

              {/* Blurb — pushed right */}
              <span className='ml-auto font-mono text-muted-foreground text-xs'>
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
      <div className='flex items-center gap-4 border-border border-t px-3 py-2 font-mono text-muted-foreground text-xs'>
        <span>
          <Kbd className='text-accent'>↑↓</Kbd> navigate
        </span>
        <span>
          <Kbd className='text-accent'>↵</Kbd> jump
        </span>
        <span>
          <Kbd className='text-accent'>esc</Kbd> close
        </span>
      </div>
    </CommandPrimitive.Dialog>
  );
}
