'use client';

import { CommandList } from 'cmdk';
import { Palette } from 'lucide-react';
import type * as React from 'react';
import { useState } from 'react';
import { useThemeConfig } from '@/components/theme/active-theme';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { AppTheme } from '@/lib/types/theme';
import { cn } from '@/lib/utils/ui';

// Map ColorSelect options to AppTheme values
const colorThemeMap: Record<string, AppTheme> = {
  Amber: 'amber',
  Emerald: 'green',
  Rose: 'rose',
  Indigo: 'purple'
};

const accentColors = [
  {
    name: 'Amber',
    className: 'bg-amber-600'
  },
  {
    name: 'Emerald',
    className: 'bg-emerald-600'
  },
  {
    name: 'Rose',
    className: 'bg-rose-400'
  },
  {
    name: 'Indigo',
    className: 'bg-indigo-600'
  }
];

interface ColorSelectProps {
  className?: string;
  buttonVariant?: 'default' | 'link' | 'accent' | 'action' | 'neutral' | 'noShadow';
  noButtonShadow?: boolean;
  popoverClassName?: string;
}

export const ColorThemeSelect: React.FC<ColorSelectProps> = ({
  className,
  buttonVariant = 'default',
  noButtonShadow = false,
  popoverClassName
}) => {
  const [open, setOpen] = useState(false);
  const { activeTheme, setActiveTheme } = useThemeConfig();

  // Determine current selected color based on active theme
  const getCurrentColorName = (): string | null => {
    const reverseMap: Record<AppTheme, string> = {
      amber: 'Amber',
      green: 'Emerald',
      rose: 'Rose',
      purple: 'Indigo',
      default: '',
      mono: '',
      blue: '',
      teal: ''
    };
    return reverseMap[activeTheme] || null;
  };

  const currentColorName = getCurrentColorName();

  /**
   * Updates the theme via ActiveThemeProvider context.
   * If the same color is clicked, resets to 'default' theme.
   */
  const updateTheme = (colorName: string) => {
    const targetTheme = colorThemeMap[colorName];

    if (targetTheme && activeTheme === targetTheme) {
      // Reset to default if same color clicked
      setActiveTheme('default');
    } else if (targetTheme) {
      // Set new theme
      setActiveTheme(targetTheme);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          role='combobox'
          aria-expanded={open}
          size='icon'
          className={cn(noButtonShadow && 'shadow-none', className)}
        >
          <Palette className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='center'
        sideOffset={8}
        className={cn(
          'flex shrink !border-0 p-0 font-base justify-items-center align-middle text-center z-[9999] shadow-lg bg-primary',
          'bottom-full md:bottom-auto', // Position above navbar on mobile, default on desktop
          popoverClassName
        )}
      >
        <Command>
          <CommandList>
            <CommandGroup className='align-middle text-center'>
              {accentColors.map((colorOption) => (
                <CommandItem
                  key={colorOption.name}
                  value={colorOption.name}
                  onSelect={() => {
                    updateTheme(colorOption.name);
                    setOpen(false);
                  }}
                  className={currentColorName === colorOption.name ? 'opacity-60' : ''}
                >
                  <div className='flex flex-row gap-2 items-center justify-start w-full'>
                    <span
                      className={cn(
                        'h-4 w-4 rounded-base border-2 border-border',
                        colorOption.className
                      )}
                    />
                    {colorOption.name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
