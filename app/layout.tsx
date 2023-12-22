import React from "react";
import './globals.css'
import { Provider } from "@/components/provider-theme"
import { Footer } from "@/components/footer"
import {Nav} from "@/components/nav";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { inter } from "./fonts"
import { cn } from "@/lib/utils"
import {siteMetadata} from "@/data/site";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>{siteMetadata.title}</title>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <meta name="robots" content="follow, index"/>
            <meta name="description" content={siteMetadata.title}/>
            <meta property="og:url" content={siteMetadata.siteUrl}/>
            <meta property="og:type" content={"website"}/>
            <meta property="og:site_name" content={siteMetadata.title}/>
            <meta property="og:description" content={siteMetadata.description}/>
            <meta property="og:title" content={siteMetadata.title}/>
            <meta property="og:image" content={siteMetadata.image} key={siteMetadata.image}/>
        </head>
        <body className={cn(
            "relative h-full bg-background font-sans antialiased",
                inter.className
            )}
            >
            <Provider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Nav/>
                <main
                    className={cn("container mx-auto grow place-items-center w-full md:w-10/12 xl:w-8/12")}
                >
                    {children}
                </main>
                <Footer />
            </Provider>
            <SpeedInsights/>
            <Analytics/>
            </body>
        </html>
      </>
    )
}
