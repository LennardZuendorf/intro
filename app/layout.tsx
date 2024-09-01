import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/provider-theme";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Dock } from "@/components/dock";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { lato, spartan, roboto_mono } from "./fonts";
import { cn } from "@/lib/utils";
import { siteMetadata } from "@/data/site";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{siteMetadata.title}</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <meta name="robots" content="follow, index" />
          <meta name="description" content={siteMetadata.title} />
          <meta property="og:url" content={siteMetadata.siteUrl} />
          <meta property="og:type" content={"website"} />
          <meta property="og:site_name" content={siteMetadata.title} />
          <meta property="og:title" content={siteMetadata.title} />
          <meta property="og:description" content={siteMetadata.description} />
          <meta
            property="og:image"
            content={siteMetadata.socialBanner}
            key={siteMetadata.title}
          />
          <meta property="twitter:title" content={siteMetadata.title} />
          <meta
            property="twitter:description"
            content={siteMetadata.description}
          />
          <meta
            property="twitter:image"
            content={siteMetadata.socialBanner}
            key={siteMetadata.title}
          />
        </head>
        <body
          className={cn(
            "relative min-h-screen bg-background font-sans antialiased",
            lato.variable,
            spartan.variable,
            roboto_mono.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              <main
                className={cn(
                  "container mx-auto grow place-content-center w-full md:w-9/12 2xl:min-h-[95vh] xl:min-h-[75vh] h-full",
                )}
              >
                {children}
              </main>
              <Dock />
            </TooltipProvider>
            <Footer />
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </>
  );
}
