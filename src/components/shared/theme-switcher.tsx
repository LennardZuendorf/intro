'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { S } from '@/components/ui/typography'; // Import clsx for combining classes conditionally

interface ThemeSwitcherProps {
  className?: string; // Optional className for additional styling
  buttonVariant?: 'default' | 'outline' | 'ghost' | 'link'; // Button variant
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className, buttonVariant = 'outline' }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonVariant} // Use the passed button variant
          size='sm'
          className={clsx('flex items-center justify-center', className)} // Combine default and custom className
        >
          {theme === 'light' ? (
            <Sun key='light' size={ICON_SIZE} className='text-muted-foreground' />
          ) : theme === 'dark' ? (
            <Moon key='dark' size={ICON_SIZE} className='text-muted-foreground' />
          ) : (
            <Laptop key='system' size={ICON_SIZE} className='text-muted-foreground' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-content' align='center'>
        <DropdownMenuLabel className='text-center'>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={(e) => setTheme(e)}>
          <DropdownMenuRadioItem className='flex gap-2' value='light'>
            <Sun size={ICON_SIZE} className='text-muted-foreground' /> <S>Light</S>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='dark'>
            <Moon size={ICON_SIZE} className='text-muted-foreground' /> <S>Dark</S>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='system'>
            <Laptop size={ICON_SIZE} className='text-muted-foreground' /> <S>System</S>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
