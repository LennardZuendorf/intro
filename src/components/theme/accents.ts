/**
 * Single source of truth for the accent axis.
 *
 * Plain module (NOT "use client") so it can be imported by both the client
 * AccentProvider/AccentSwatches and the server-rendered pre-paint AccentScript.
 * Keeping the hex set + labels here prevents the three sites from silently
 * desyncing (e.g. the pre-paint script validating an accent the provider no
 * longer offers).
 */

export type Accent = '#C6FF2E' | '#FF2E9A' | '#21E6E0' | '#FF6A1A';

export const ACCENT_OPTIONS = [
  '#C6FF2E',
  '#FF2E9A',
  '#21E6E0',
  '#FF6A1A'
] as const satisfies readonly Accent[];

export const DEFAULT_ACCENT: Accent = '#C6FF2E';

export const ACCENT_STORAGE_KEY = 'lz_accent';

export const ACCENT_LABELS: Record<Accent, string> = {
  '#C6FF2E': 'Lime',
  '#FF2E9A': 'Pink',
  '#21E6E0': 'Cyan',
  '#FF6A1A': 'Orange'
};

export function isValidAccent(value: unknown): value is Accent {
  return (ACCENT_OPTIONS as readonly string[]).includes(value as string);
}
