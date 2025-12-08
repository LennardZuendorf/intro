'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/lib/utils/ui';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Apply all default Card styling options from @card.tsx
      'rounded-md border-4 border-border bg-primary text-primary-foreground shadow-black shadow-md transition-all space-x-1 p-1',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// The trigger below implements:
// - DEFAULT: transparent bg (shows parent bg, ie. primary)
// - HOVER: accent bg + accent foreground (like Button "accent")
// - ACTIVE: secondary bg + secondary foreground + border 
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-base px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      // Mutually exclusive: If active, secondary bg/text; else transparent
      'bg-transparent text-primary-foreground',
      // ACTIVE state: secondary colors override default/hover!
      'data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-2 data-[state=active]:border-border data-[state=active]:font-bold',
      // HOVER (but NOT when active)
      'hover:bg-secondary hover:text-secondary-foreground',
      // Remove shadow for tab triggers, match "noShadow" Button
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
