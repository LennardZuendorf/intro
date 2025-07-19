'use client';

/**
 * Set Color Preference Component
 * -----------------------------
 * Loads saved color preferences from localStorage and applies them.
 * Shows a welcome back toast notification with a fun, color-specific message.
 *
 * Custom welcome messages for each color:
 * - Amber: "Welcome back to the golden hour! Your amber mood continues. Like a digital sunset that never ends."
 * - Emerald: "The emerald city awaits! Green means go! And also money. And also envy. It's complicated."
 * - Rose: "Life's rosy once again! Pink isn't just a color, it's an attitude. And yours is fabulous."
 * - Indigo: "Back to the deep blue! Indigo: when you're too cool for regular blue. Hipster approved."
 *
 * The toast appears with a 1-second delay to avoid interrupting the initial page load experience.
 */

import { useToast } from '@/hooks/use-toast';
import type { ColorPalette } from '@/lib/utils/ui';
import { useLayoutEffect } from 'react';

export default function SetColorPreference() {
  const { toast } = useToast();

  useLayoutEffect(() => {
    const savedColor = localStorage.getItem('color');
    if (savedColor) {
      try {
        const colorObj: ColorPalette = JSON.parse(savedColor);
        const r = window.document.querySelector(':root') as HTMLElement;

        r.style.setProperty('--accent-light', colorObj.colorCode.light);
        r.style.setProperty('--accent', colorObj.colorCode.base);
        r.style.setProperty('--accent-dark', colorObj.colorCode.dark);
        r.style.setProperty('--grid', colorObj.colorCode.light);
        if (colorObj.colorCode.foreground) {
          r.style.setProperty('--accent-foreground', colorObj.colorCode.foreground);
        }

        // Fun welcome back messages for each color
        const welcomeMessages: Record<string, { title: string; description: string }> = {
          Amber: {
            title: 'Welcome back to the golden hour!',
            description: 'Your amber mood continues. Like a digital sunset that never ends.'
          },
          Emerald: {
            title: 'The emerald city awaits!',
            description: `Green means go! And also money. And also envy. It's complicated.`
          },
          Rose: {
            title: `Life's rosy once again!`,
            description: `Pink isn't just a color, it's an attitude. And yours is fabulous.`
          },
          Indigo: {
            title: 'Back to the deep blue!',
            description: `Indigo: when you're too cool for regular blue. Hipster approved.`
          }
        };

        // Show toast notification with slight delay to avoid initial render flash
        setTimeout(() => {
          toast({
            title: welcomeMessages[colorObj.name]?.title || `Hello ${colorObj.name}!`,
            description:
              welcomeMessages[colorObj.name]?.description ||
              `Welcome back to your ${colorObj.name.toLowerCase()} aesthetic.`,
            variant: 'default',
            duration: 5000
          });
        }, 1000);
      } catch (error) {
        console.error('Error parsing saved color:', error);
      }
    }
  }, [toast]);

  return <></>;
}
