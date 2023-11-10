import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
        themes: {
          light: {
            colors: {
              foreground: "#141414",
              background: "#FAFAFA",
            },
          },
          dark: {
            colors: {
              foreground:"#F4F4F4",
              background:"#141414",
            },
          },
        },
      }
  )],
}
