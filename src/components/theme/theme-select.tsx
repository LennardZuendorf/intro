'use client';

import type { VariantProps } from 'class-variance-authority';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { buttonVariants } from '@/components/ui/retroui/Button';
import { IconMenuSelect } from './icon-menu-select';

const themes = [
  { value: 'system', label: 'System', icon: <Monitor className='h-4 w-4' /> },
  { value: 'dark', label: 'Dark', icon: <Moon className='h-4 w-4' /> },
  { value: 'light', label: 'Light', icon: <Sun className='h-4 w-4' /> }
];

interface ThemeSwitcherProps {
  className?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
  popoverClassName?: string;
}

export function ThemeSelect({
  className,
  buttonVariant = 'default',
  popoverClassName
}: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeTheme = theme ?? 'system';
  const activeIcon = themes.find((t) => t.value === activeTheme)?.icon ?? (
    <Monitor className='h-4 w-4' />
  );

  return (
    <IconMenuSelect
      value={activeTheme}
      onValueChange={setTheme}
      options={themes}
      triggerIcon={activeIcon}
      ariaLabel='Select theme'
      buttonVariant={buttonVariant}
      className={className}
      popoverClassName={popoverClassName}
    />
  );
}
