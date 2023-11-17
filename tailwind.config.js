import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {},
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
        themes: {
          light: {
            colors: {
              foreground: "#141414",
              background: "#FEFEFE",
              primary: {
                DEFAULT: "#BEF264",
                foreground: "#000000",
              },
              focus: "#BEF264",
            },
          },
          dark: {
            colors: {
              foreground:"#FEFEFE",
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
