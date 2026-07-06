'use client';

import type * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  ACCENT_OPTIONS,
  type Accent,
  applyAccentToDocument,
  DEFAULT_ACCENT,
  isValidAccent,
  ACCENT_STORAGE_KEY as STORAGE_KEY
} from './accents';

export type { Accent } from './accents';

interface AccentContext {
  accent: Accent;
  setAccent: (a: Accent) => void;
  options: readonly Accent[];
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
        applyAccentToDocument(stored);
      }
    } catch {
      // localStorage unavailable — use default
    }
  }, []);

  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    applyAccentToDocument(a);
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
