'use client';

import { CommandList } from 'cmdk';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils/ui';

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
  buttonVariant?: 'default' | 'link' | 'accent' | 'action' | 'neutral' | 'noShadow'; // Button variant
  noButtonShadow?: boolean; // Whether to remove the button shadow
  popoverClassName?: string; // Separate class for the popover
}

export const ThemeSelect: React.FC<ThemeSwitcherProps> = ({
  className,
  buttonVariant = 'default',
  noButtonShadow = false,
  popoverClassName
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

  // Apply theme without any toast notifications
  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
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
          {value ? (
            themes.find((theme) => theme.value === value)?.icon
          ) : (
            <Monitor className='h-4 w-4' />
          )}
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
              {themes.map((themeOption) => (
                <CommandItem
                  key={themeOption.value}
                  value={themeOption.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? 'system' : currentValue);
                    setOpen(false);
                    handleThemeChange(currentValue);
                  }}
                  className={value === themeOption.value ? 'opacity-60' : ''}
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
