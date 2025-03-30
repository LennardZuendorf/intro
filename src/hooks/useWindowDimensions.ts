import { useEffect, useState } from 'react';

// Define the breakpoints according to Tailwind CSS
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
  xs: 0, // Default for anything smaller than sm
  sm: 640, // 40rem
  md: 768, // 48rem
  lg: 1024, // 64rem
  xl: 1280, // 80rem
  '2xl': 1536 // 96rem
};

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      breakpoint: 'xs' as Breakpoint
    };
  }

  const { innerWidth: width, innerHeight: height } = window;

  // Determine the current breakpoint
  let breakpoint: Breakpoint = 'xs';

  if (width >= breakpoints['2xl']) {
    breakpoint = '2xl';
  } else if (width >= breakpoints.xl) {
    breakpoint = 'xl';
  } else if (width >= breakpoints.lg) {
    breakpoint = 'lg';
  } else if (width >= breakpoints.md) {
    breakpoint = 'md';
  } else if (width >= breakpoints.sm) {
    breakpoint = 'sm';
  }

  return {
    width,
    height,
    breakpoint
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

// Helper functions to check breakpoints
export function useBreakpoint() {
  return useWindowDimensions().breakpoint;
}

export function useIsBreakpoint(breakpoint: Breakpoint) {
  const currentBreakpoint = useBreakpoint();
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
  const targetIndex = breakpointOrder.indexOf(breakpoint);

  return currentIndex >= targetIndex;
}
