'use client';

// Vendored from Logging-Studio/RetroUI@main:components/retroui/Menu.tsx
// (https://raw.githubusercontent.com/Logging-Studio/RetroUI/main/components/retroui/Menu.tsx)
// Adapted to use site-local `cn` and theme-aware tokens
// (`bg-background`, `border-border`, `text-popover-foreground`) plus the same
// data-state animation classes used by `Popover.tsx`.

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '@/lib/utils/index';

const Menu = DropdownMenu.Root;
const Trigger = DropdownMenu.Trigger;

interface IMenuContent extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> {}

const Content = ({ className, sideOffset = 8, align = 'center', ...props }: IMenuContent) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      side='bottom'
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-32 border-2 border-border bg-background text-popover-foreground p-1 shadow-md shadow-shadow font-base outline-hidden',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)',
        className
      )}
      {...props}
    />
  </DropdownMenu.Portal>
);

const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  />
));
MenuItem.displayName = 'MenuItem';

const MenuComponent = Object.assign(Menu, {
  Trigger,
  Content,
  Item: MenuItem
});

export { MenuComponent as Menu };
