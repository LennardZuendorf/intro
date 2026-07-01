'use client';

import type { VariantProps } from 'class-variance-authority';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, type buttonVariants } from '@/components/ui/retroui/Button';
import { Menu } from '@/components/ui/retroui/Menu';
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
  className?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>['variant'];
  noButtonShadow?: boolean;
  popoverClassName?: string;
}

export const ThemeSelect: React.FC<ThemeSwitcherProps> = ({
  className,
  buttonVariant = 'default',
  noButtonShadow = false,
  popoverClassName
}) => {
  const [open, setOpen] = React.useState(false);
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
    <Menu open={open} onOpenChange={setOpen}>
      <Menu.Trigger asChild>
        <Button
          variant={buttonVariant}
          aria-label='Select theme'
          size='icon'
          className={cn(noButtonShadow && 'shadow-none', className)}
        >
          {activeIcon}
        </Button>
      </Menu.Trigger>
      <Menu.Content
        align='center'
        sideOffset={8}
        className={cn('z-9999 bg-background', popoverClassName)}
      >
        {themes.map((themeOption) => (
          <Menu.Item
            key={themeOption.value}
            onSelect={() => setTheme(themeOption.value)}
            className={cn('gap-2', activeTheme === themeOption.value && 'opacity-60')}
          >
            {themeOption.icon}
            {themeOption.label}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  );
};
