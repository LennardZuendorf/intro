import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import animatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        overlay: 'var(--overlay)',
        bg: 'var(--bg)',
        bw: 'var(--accent)',
        accent: 'var(--accent)',
        blank: 'var(--blank)',
        text: 'var(--text)',
        mtext: 'var(--mtext)',
        atext: 'var(--atext)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        ringOffset: 'var(--ring-offset)',

        secondaryBlack: '#212121'
      },
      borderRadius: {
        base: '4px',
        md: '8px',
        lg: '12px'
      },
      boxShadow: {
        shadow: 'var(--shadow)',
        lshadow: 'var(--shadow-l)'
      },
      translate: {
        boxShadowX: '6px',
        boxShadowY: '4px',
        reverseBoxShadowX: '-6px',
        reverseBoxShadowY: '-4px'
      },
      fontWeight: {
        base: '500',
        heading: '900'
      }
    }
  },
  plugins: [typographyPlugin, animatePlugin]
};

export default config;
