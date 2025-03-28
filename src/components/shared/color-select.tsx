'use client';

import { CommandList } from 'cmdk';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/ui';
import { Palette } from 'lucide-react';

import type { ColorPalette } from '@/lib/utils/ui';

const accentColors: ColorPalette[] = [
  {
    name: 'Amber',
    colorCode: {
      light: 'oklch(0.766 0.179 58.318)', // Lighter amber
      base: 'oklch(0.666 0.179 58.318)', // Original amber
      dark: 'oklch(0.566 0.179 58.318)' // Darker amber
    },
    className: 'bg-amber-600'
  },
  {
    name: 'Emerald',
    colorCode: {
      light: 'oklch(0.7 0.118 184.704)', // Lighter emerald
      base: 'oklch(0.6 0.118 184.704)', // Original emerald
      dark: 'oklch(0.5 0.118 184.704)' // Darker emerald
    },
    className: 'bg-emerald-600'
  },
  {
    name: 'Rose',
    colorCode: {
      light: 'oklch(0.812 0.194 13.428)', // Lighter rose
      base: 'oklch(0.712 0.194 13.428)', // Original rose
      dark: 'oklch(0.612 0.194 13.428)' // Darker rose
    },
    className: 'bg-rose-400'
  },
  {
    name: 'Indigo',
    colorCode: {
      light: 'oklch(0.611 0.262 276.966)', // Lighter indigo
      base: 'oklch(0.511 0.262 276.966)', // Original indigo
      dark: 'oklch(0.411 0.262 276.966)' // Darker indigo
    },
    className: 'bg-indigo-600'
  }
];

interface ColorSelectProps {
  className?: string;
  buttonVariant?: 'default' | 'reversed' | 'noShadow' | 'accent';
}

//TODO: Fix build error with ColorPalette Type.

export const ColorSelect: React.FC<ColorSelectProps> = ({
  className,
  buttonVariant = 'default'
}) => {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<ColorPalette | null>(null);

  // Load color from localStorage only on client-side
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem('color');
      if (savedColor) {
        setCurrentColor(JSON.parse(savedColor));

        // Apply the saved color when component mounts
        const color = JSON.parse(savedColor);
        const r = window.document.querySelector(':root') as HTMLElement;
        r.style.setProperty('--accent-light', color.colorCode.light);
        r.style.setProperty('--accent', color.colorCode.base);
        r.style.setProperty('--accent-dark', color.colorCode.dark);
      }
    } catch (error) {
      console.error('Error loading color from localStorage:', error);
    }
  }, []);

  const updateColorPalette = (color: ColorPalette) => {
    const r = window.document.querySelector(':root') as HTMLElement;
    // Set accent colors
    r.style.setProperty('--accent-light', color.colorCode.light);
    r.style.setProperty('--accent', color.colorCode.base);
    r.style.setProperty('--accent-dark', color.colorCode.dark);
    // Ensure grid stays neutral
    const isDark = document.documentElement.classList.contains('dark');
    r.style.setProperty('--grid', isDark ? 'oklch(0.25 0 0)' : 'oklch(0.95 0 0)');
    localStorage.setItem('color', JSON.stringify(color));
    setCurrentColor(color);
  };

  const resetColorPalette = () => {
    const r = window.document.querySelector(':root') as HTMLElement;
    r.style.removeProperty('--accent-light');
    r.style.removeProperty('--accent');
    r.style.removeProperty('--accent-dark');
    // Reset grid to neutral
    const isDark = document.documentElement.classList.contains('dark');
    r.style.setProperty('--grid', isDark ? 'oklch(0.25 0 0)' : 'oklch(0.95 0 0)');
    localStorage.removeItem('color');
    setCurrentColor(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={buttonVariant} role='combobox' aria-expanded={open} size='icon'>
          <Palette className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'flex shrink !border-0 p-0 font-base justify-items-center align-middle text-center',
          className
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
                    if (currentColor && currentColor.name === colorOption.name) {
                      resetColorPalette();
                    } else {
                      updateColorPalette(colorOption);
                    }

                    setOpen(false);
                  }}
                  className={currentColor?.name === colorOption.name ? 'opacity-60' : ''}
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
