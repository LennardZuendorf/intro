import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ColorPalette {
  name: string;
  colorCode: {
    light: string;
    base: string;
    dark: string;
    foreground?: string;
  };
  className: string;
}
