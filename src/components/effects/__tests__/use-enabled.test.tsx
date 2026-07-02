import { act, renderHook } from '@testing-library/react';
import { useEffectsEnabled } from '@/components/effects/use-enabled';

// The gate hook is the shared precondition for every enhancement effect
// (dot-field, cursor, parallax, floaty). It must return false whenever the user
// prefers reduced motion OR the device lacks a fine pointer (touch / coarse), so
// that effects mount nothing rather than merely stop animating.

type QueryState = Record<string, boolean>;

function mockMatchMedia(state: QueryState) {
  const media = window.matchMedia as unknown as jest.Mock;
  media.mockImplementation((query: string) => ({
    matches: state[query] ?? false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
    onchange: null,
  }));
}

describe('useEffectsEnabled', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn();
  });

  it('returns false when prefers-reduced-motion: reduce (even with a fine pointer)', () => {
    mockMatchMedia({
      '(prefers-reduced-motion: reduce)': true,
      '(pointer: fine)': true,
    });

    const { result } = renderHook(() => useEffectsEnabled());

    expect(result.current).toBe(false);
  });

  it('returns false on a non-pointer / touch device (no fine pointer)', () => {
    mockMatchMedia({
      '(prefers-reduced-motion: reduce)': false,
      '(pointer: fine)': false,
    });

    const { result } = renderHook(() => useEffectsEnabled());

    expect(result.current).toBe(false);
  });

  it('returns true with a fine pointer and no reduced-motion preference', () => {
    mockMatchMedia({
      '(prefers-reduced-motion: reduce)': false,
      '(pointer: fine)': true,
    });

    const { result } = renderHook(() => useEffectsEnabled());

    expect(result.current).toBe(true);
  });

  it('is SSR-safe: stays false when matchMedia is unavailable', () => {
    // Simulate an environment without matchMedia (e.g. server / first render).
    (window as unknown as { matchMedia?: unknown }).matchMedia =
      undefined as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useEffectsEnabled());

    expect(result.current).toBe(false);
  });

  it('re-evaluates when a media query changes (e.g. user enables reduced motion)', () => {
    const listeners: Record<string, () => void> = {};
    const state: QueryState = {
      '(prefers-reduced-motion: reduce)': false,
      '(pointer: fine)': true,
    };

    (window.matchMedia as unknown as jest.Mock).mockImplementation(
      (query: string) => ({
        get matches() {
          return state[query] ?? false;
        },
        media: query,
        addEventListener: (_: string, cb: () => void) => {
          listeners[query] = cb;
        },
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
        onchange: null,
      }),
    );

    const { result } = renderHook(() => useEffectsEnabled());
    expect(result.current).toBe(true);

    act(() => {
      state['(prefers-reduced-motion: reduce)'] = true;
      listeners['(prefers-reduced-motion: reduce)']?.();
    });

    expect(result.current).toBe(false);
  });
});
