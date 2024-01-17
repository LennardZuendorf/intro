import { Roboto_Mono, Lato } from "next/font/google";
import localFont from "next/font/local";

export const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const spartan = localFont({
  src: "../public/fonts/league_spartan.ttf",
  weight: "900",
  display: "swap",
  variable: "--font-spartan",
});

export const roboto_mono = localFont({
  src: "../public/fonts/roboto_mono.ttf",
  display: "swap",
  variable: "--font-mono",
});
