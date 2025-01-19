import type React from "react";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

import { FloatingNav } from "@/components/nav";
import { siteMetadata } from "@/data/site";
import { cn } from "@/lib/utils";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Script from "next/script";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const navItems = [
		{
			name: "Home",
			link: "/",
			icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
		{
			name: "About",
			link: "/about",
			icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
		},
		{
			name: "Contact",
			link: "/contact",
			icon: (
				<IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
			),
		},
	];

	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head>
					<title>{siteMetadata.title}</title>
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<Script
						src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC}
						data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
						strategy="lazyOnload"
					/>
				</head>
				<body
					className={cn(
						"relative min-h-screen bg-background font-sans antialiased",
					)}
				>
					<Providers
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<FloatingNav navItems={navItems} />
						<div
							className={cn(
								"relative container mx-auto grow place-content-center w-full md:w-9/12 2xl:min-h-[95vh] xl:min-h-[75vh] h-full",
							)}
						>
							{children}
						</div>
						<Footer className="absolute inset-x-0 bottom-0" />
					</Providers>
				</body>
			</html>
		</>
	);
}
