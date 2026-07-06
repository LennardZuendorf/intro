/**
 * Single source of truth for the accent axis.
 *
 * Plain module (NOT "use client") so it can be imported by both the client
 * AccentProvider/AccentSwatches and the server-rendered pre-paint AccentScript.
 * Keeping the hex set + labels here prevents the three sites from silently
 * desyncing (e.g. the pre-paint script validating an accent the provider no
 * longer offers).
 */

export type Accent = '#4E9E96' | '#B07A8A' | '#7A8FA8' | '#A89060';

export const ACCENT_OPTIONS = [
  '#4E9E96',
  '#B07A8A',
  '#7A8FA8',
  '#A89060'
] as const satisfies readonly Accent[];

export const DEFAULT_ACCENT: Accent = '#4E9E96';

export const ACCENT_STORAGE_KEY = 'lz_accent';

export const ACCENT_FOREGROUNDS: Record<Accent, string> = {
  '#4E9E96': '#f4f4ec',
  '#B07A8A': '#f4f4ec',
  '#7A8FA8': '#f4f4ec',
  '#A89060': '#f4f4ec'
};

export const ACCENT_LABELS: Record<Accent, string> = {
  '#4E9E96': 'Teal',
  '#B07A8A': 'Rose',
  '#7A8FA8': 'Slate',
  '#A89060': 'Ochre'
};

export function isValidAccent(value: unknown): value is Accent {
  return (ACCENT_OPTIONS as readonly string[]).includes(value as string);
}

export function applyAccentToDocument(accent: Accent): void {
  document.documentElement.style.setProperty('--primary', accent);
  document.documentElement.style.setProperty('--primary-foreground', ACCENT_FOREGROUNDS[accent]);
}
