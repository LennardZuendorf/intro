'use client';

import { useToast } from '@/hooks/use-toast';
import { CommandList } from 'cmdk';
import type * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

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
      light: 'oklch(0.6 0.118 184.704)', // Lighter emerald
      base: 'oklch(0.5 0.118 184.704)', // Original emerald
      dark: 'oklch(0.4 0.118 184.704)', // Darker emerald
      foreground: 'oklch(1.0 0 0)' // Foreground emerald (white)
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
      dark: 'oklch(0.411 0.262 276.966)', // Darker indigo
      foreground: 'oklch(1.0 0 0)' // Foreground indigo (white)
    },
    className: 'bg-indigo-600'
  }
];

interface ColorSelectProps {
  className?: string;
  buttonVariant?: 'default' | 'link' | 'accent' | 'action' | 'neutral' | 'noShadow';
  noButtonShadow?: boolean;
  popoverClassName?: string;
}

export const ColorSelect: React.FC<ColorSelectProps> = ({
  className,
  buttonVariant = 'default',
  noButtonShadow = false,
  popoverClassName
}) => {
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<ColorPalette | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Check dark mode preference
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Load color from localStorage only on client-side
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem('color');
      if (savedColor) {
        setCurrentColor(JSON.parse(savedColor));

        // Apply the saved color when component mounts
        const color = JSON.parse(savedColor);
        applyColorPalette(color);
      }
    } catch (error) {
      console.error('Error loading color from localStorage:', error);
    }
  }, []);

  /**
   * Applies color palette based on current theme mode (light/dark).
   * In dark mode, uses lighter accent colors for better contrast.
   * In light mode, uses darker accent colors for better readability.
   */
  const applyColorPalette = useCallback(
    (color: ColorPalette) => {
      const r = window.document.querySelector(':root') as HTMLElement;

      if (isDarkMode) {
        // Dark mode: use lighter accents for better visibility
        r.style.setProperty('--accent-light', color.colorCode.light);
        r.style.setProperty('--accent', color.colorCode.light);
        r.style.setProperty('--accent-dark', color.colorCode.base);
      } else {
        // Light mode: use darker accents for better contrast
        r.style.setProperty('--accent-light', color.colorCode.light);
        r.style.setProperty('--accent', color.colorCode.base);
        r.style.setProperty('--accent-dark', color.colorCode.dark);
      }

      if (color.colorCode.foreground) {
        r.style.setProperty('--accent-foreground', color.colorCode.foreground);
      } else {
        r.style.removeProperty('--accent-foreground');
      }

      // Set grid to use the lightest accent color, consistent with setColorPreference.tsx
      r.style.setProperty('--grid', color.colorCode.light);
    },
    [isDarkMode]
  );

  // Re-apply color when dark mode changes
  useEffect(() => {
    if (currentColor) {
      applyColorPalette(currentColor);
    }
  }, [currentColor, applyColorPalette]);

  /**
   * Updates the color palette across the application and shows a toast notification
   * with a fun, custom message for the selected color.
   *
   * Each color has its own unique toast message with personalized copy:
   * - Amber: "Liquid Gold Activated!" with amber-colored name
   * - Emerald: "Green Machine Engaged!" with emerald-colored name
   * - Rose: "Pretty in Pink Deployed!" with rose-colored name
   * - Indigo: "Deep Blue Dive Commenced!" with indigo-colored name
   *
   * @param color The ColorPalette object containing the selected color information
   */
  const updateColorPalette = (color: ColorPalette) => {
    applyColorPalette(color);
    localStorage.setItem('color', JSON.stringify(color));
    setCurrentColor(color);

    // Unique funny messages for each color
    const colorMessages: Record<string, { title: string; description: string }> = {
      Amber: {
        title: 'Liquid Gold Activated!',
        description: `Golden like a sunset, warm like whiskey. You're basically a hipster now.`
      },
      Emerald: {
        title: 'Green Machine Engaged!',
        description: 'Green with envy, your coworkers will be. Yoda approves this theme, yes.'
      },
      Rose: {
        title: 'Pretty in Pink Deployed!',
        description: `Life's looking pretty in pink! Your screen's blushing with excitement.`
      },
      Indigo: {
        title: 'Deep Blue Dive Commenced!',
        description: 'Deep like the ocean, mysterious like your browser history. Excellent choice.'
      }
    };

    // Show toast notification with neobrutalist styling and color-specific message
    toast({
      title: colorMessages[color.name]?.title || `${color.name} theme activated!`,
      description:
        colorMessages[color.name]?.description ||
        `Your vibe is now ${color.name.toLowerCase()}. Looking good!`,
      variant: 'default',
      duration: 1000
    });
  };

  /**
   * Resets the color palette to system defaults and shows a randomly selected
   * toast notification with a fun message.
   *
   * Random messages include:
   * - "Back to basics! Keeping it minimalist like your excuses for not doing laundry."
   * - "Default restored! Sometimes vanilla is the most exotic flavor of all."
   * - "Reset complete! Like clearing your history after 'research' - we won't judge."
   * - "Color purged! Marie Kondo would be proud. This color did not spark joy."
   */
  const resetColorPalette = () => {
    const r = window.document.querySelector(':root') as HTMLElement;
    r.style.removeProperty('--accent-light');
    r.style.removeProperty('--accent');
    r.style.removeProperty('--accent-dark');
    r.style.removeProperty('--accent-foreground');
    // Reset grid to default from CSS instead of setting explicitly
    r.style.removeProperty('--grid');
    localStorage.removeItem('color');
    setCurrentColor(null);

    // Funny reset messages
    const resetMessages = [
      {
        title: 'Back to basics!',
        description: 'Keeping it minimalist like your excuses for not doing laundry.'
      },
      {
        title: 'Default restored!',
        description: 'Sometimes vanilla is the most exotic flavor of all.'
      },
      {
        title: 'Reset complete!',
        description: 'Like clearing your history after "research" - we won\'t judge.'
      },
      {
        title: 'Color purged!',
        description: 'Marie Kondo would be proud. This color did not spark joy.'
      }
    ];

    // Pick a random funny message
    const randomMessage = resetMessages[Math.floor(Math.random() * resetMessages.length)];

    // Show toast notification with neobrutalist styling
    toast({
      title: randomMessage.title,
      description: randomMessage.description,
      variant: 'default',
      duration: 1000
    });
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
