'use client';

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import type { AppTheme } from '@/lib/types/theme';

type ThemeContextType = {
  activeTheme: AppTheme;
  setActiveTheme: (theme: AppTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveColorThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<AppTheme>('default');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage on mount (SSR-safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          // Validate saved theme against AppTheme union
          const validThemes: AppTheme[] = [
            'default',
            'mono',
            'blue',
            'green',
            'amber',
            'rose',
            'purple',
            'teal'
          ];
          if (validThemes.includes(savedTheme as AppTheme)) {
            setActiveTheme(savedTheme as AppTheme);
          }
        }
      } catch (error) {
        console.error('[Theme] Error reading from localStorage:', error);
      }
      setIsInitialized(true);
    }
  }, []);

  // Persist theme changes to localStorage
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', activeTheme);
      } catch (error) {
        console.error('[Theme] Error writing to localStorage:', error);
      }
    }
  }, [activeTheme, isInitialized]);

  // Apply theme classes to DOM
  useEffect(() => {
    console.log('[Theme Debug] Theme change initiated:', activeTheme);
    console.log(
      '[Theme Debug] Current body classes before change:',
      Array.from(document.body.classList)
    );

    // Ensure the <body> always carries the helper class that chart/theme CSS
    // looks for.
    if (!document.body.classList.contains('theme-container')) {
      document.body.classList.add('theme-container');
    }

    // Remove any theme-* classes from <body> (we now keep them on <html>)
    const bodyThemeClasses = Array.from(document.body.classList).filter(
      (c) => c.startsWith('theme-') && c !== 'theme-container'
    );
    bodyThemeClasses.forEach((c) => document.body.classList.remove(c));

    // Move the theme-* classes to the <html> element so that selectors of the
    // form `.theme-blue .theme-container` match (<html> => .theme-blue, <body>
    // => .theme-container).
    const root = document.documentElement;
    const rootThemeClassesToRemove = Array.from(root.classList).filter((c) =>
      c.startsWith('theme-')
    );
    rootThemeClassesToRemove.forEach((c) => root.classList.remove(c));

    const newThemeClass = `theme-${activeTheme}`;
    root.classList.add(newThemeClass);

    // Scaled variant removed; no additional classes required.

    console.log('[Theme Debug] Applied theme class on <html>:', newThemeClass);
    console.log(
      '[Theme Debug] Final body classes after change:',
      Array.from(document.body.classList)
    );
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeConfig must be used within an ActiveThemeProvider');
  }
  return context;
}
