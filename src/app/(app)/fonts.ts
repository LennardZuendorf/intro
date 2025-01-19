import { Lato, Roboto_Mono } from 'next/font/google';

export const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

export const roboto_mono = Roboto_Mono({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono'
});
