'use client';

import { useLayoutEffect } from 'react';
import type { ColorPalette } from '@/lib/utils/ui';

export default function SetColorPreference() {
  useLayoutEffect(() => {
    const colorObj: ColorPalette | null = JSON.parse(localStorage.getItem('color') as string);
    const r = window.document.querySelector(':root') as HTMLElement;

    if (colorObj) {
      r.style.setProperty('--accent', colorObj.colorCode);
    }
  }, []);

  return <></>;
}
