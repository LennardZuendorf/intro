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
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '90%',
          xl: '80%',
        },
      },},
  },
  darkMode: "class",
  plugins: [nextui({
        themes: {
          light: {
            colors: {
              foreground: "#141414",
              background: "#FAFAFA",
              primary: {
                DEFAULT: "#BEF264",
                foreground: "#000000",
              },
              focus: "#BEF264",
            },
          },
          dark: {
            colors: {
              foreground:"#F4F4F4",
              background:"#141414",
              primary: {
                DEFAULT: "#BEF264",
                foreground: "#000000",
              },
              focus: "#BEF264",

            },
          },
        },
      }
  )],
}
