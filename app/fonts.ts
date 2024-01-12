import { Roboto_Mono, Lato, League_Spartan } from "next/font/google";

export const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const spartan = League_Spartan({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spartan",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
