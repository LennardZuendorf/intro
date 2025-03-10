'use client';

import { CommandList } from 'cmdk';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/ui';
import { Palette } from 'lucide-react';

import type { ColorPalette } from '@/lib/utils/ui';

const accentColors: ColorPalette[] = [
  {
    name: 'Amber',
    colorCode: 'oklch(0.666 0.179 58.318)',
    className: 'bg-amber-600'
  },
  {
    name: 'Emerald',
    colorCode: 'oklch(0.6 0.118 184.704)',
    className: 'bg-emerald-600'
  },
  {
    name: 'Rose',
    colorCode: 'oklch(0.712 0.194 13.428)',
    className: 'bg-rose-400'
  },
  {
    name: 'Indigo',
    colorCode: 'oklch(0.511 0.262 276.966)',
    className: 'bg-indigo-600'
  }
];

interface ColorSelectProps {
  className?: string;
  buttonVariant?: 'default' | 'reversed' | 'noShadow' | 'accent';
}

export const ColorSelect: React.FC<ColorSelectProps> = ({
  className,
  buttonVariant = 'default'
}) => {
  const [open, setOpen] = React.useState(false);

  const currentColor: ColorPalette | null = JSON.parse(localStorage.getItem('color') as string);
  console.log(JSON.parse(localStorage.getItem('color') as string));

  const updateColorPalette = (color: ColorPalette) => {
    const r = window.document.querySelector(':root') as HTMLElement;
    r.style.setProperty('--accent', color.colorCode);
    localStorage.setItem('color', JSON.stringify(color));
  };

  const resetColorPalette = () => {
    const r = window.document.querySelector(':root') as HTMLElement;
    r.style.removeProperty('--accent');
    localStorage.removeItem('color');
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
