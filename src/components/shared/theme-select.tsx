'use client';

import { CommandList } from 'cmdk';
import { Monitor, Moon, Sun } from 'lucide-react';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const themes = [
  {
    value: 'system',
    label: 'System',
    icon: <Monitor className='h-4 w-4' />
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <Moon className='h-4 w-4' />
  },
  {
    value: 'light',
    label: 'Light',
    icon: <Sun className='h-4 w-4' />
  }
];

interface ThemeSwitcherProps {
  className?: string; // Optional className for additional styling
  buttonVariant?: 'default' | 'reverse' | 'noShadow' | 'accent'; // Button variant
}

export const ThemeSelect: React.FC<ThemeSwitcherProps> = ({
  className,
  buttonVariant = 'default'
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setValue(theme === undefined ? 'system' : theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={buttonVariant} role='combobox' aria-expanded={open} size='icon'>
          {value ? (
            themes.find((theme) => theme.value === value)?.icon
          ) : (
            <Monitor className='h-4 w-4' />
          )}
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
              {themes.map((themeOption) => (
                <CommandItem
                  key={themeOption.value}
                  value={themeOption.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    setTheme(currentValue);
                  }}
                  className={value == themeOption.value ? 'underline' : ''}
                >
                  <div className='flex flex-row gap-2 items-center justify-start w-full'>
                    {themeOption.icon}
                    {themeOption.label}
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
