'use client';

import type * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Accent = '#C6FF2E' | '#FF2E9A' | '#21E6E0' | '#FF6A1A';

interface AccentContext {
  accent: Accent;
  setAccent: (a: Accent) => void;
  options: readonly Accent[];
}

const ACCENT_OPTIONS = [
  '#C6FF2E',
  '#FF2E9A',
  '#21E6E0',
  '#FF6A1A'
] as const satisfies readonly Accent[];
const STORAGE_KEY = 'lz_accent';
const DEFAULT_ACCENT: Accent = '#C6FF2E';

function isValidAccent(value: unknown): value is Accent {
  return (ACCENT_OPTIONS as readonly string[]).includes(value as string);
}

const AccentCtx = createContext<AccentContext>({
  accent: DEFAULT_ACCENT,
  setAccent: () => undefined,
  options: ACCENT_OPTIONS
});

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  // Read persisted accent on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isValidAccent(stored)) {
        setAccentState(stored);
        document.documentElement.style.setProperty('--primary', stored);
      }
    } catch {
      // localStorage unavailable — use default
    }
  }, []);

  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    document.documentElement.style.setProperty('--primary', a);
    try {
      localStorage.setItem(STORAGE_KEY, a);
    } catch {
      // localStorage unavailable — skip persistence
    }
  }, []);

  return (
    <AccentCtx.Provider value={{ accent, setAccent, options: ACCENT_OPTIONS }}>
      {children}
    </AccentCtx.Provider>
  );
}

export function useAccent(): AccentContext {
  return useContext(AccentCtx);
}
