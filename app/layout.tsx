import React from "react";
import type { Metadata } from 'next'
import './globals.css'

import { Provider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import {Navigation} from "@/components/navigation";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(
            "h-screen bg-background font-sans antialiased",
            fontSans.variable
        )}
        >
        <Provider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navigation className="" />
            <main>{children}</main>
            <Footer className="flex flex-col items-center pt-4 pb-4 gap-1" />
        </Provider>
        </body>
        </html>
      </>
  )
}
