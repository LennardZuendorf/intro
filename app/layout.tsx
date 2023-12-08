import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { UIProvider } from "./uiProvider";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import {Footer} from "@/components/footer";
import { PHProvider } from "./posthogProvider";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head ><title></title></head>
			<PHProvider>
				<body
					className={clsx(
						"min-h-screen bg-background font-sans",
						fontSans.variable
					)}
				>
					<UIProvider themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col h-screen">
							<Navbar />
							<main className="container mx-auto grow w-11/12 sm:w-10/12 lg:w-8/12 xl:6/12 place-items-center">
								{children}
							</main>
							<Footer />
						</div>
					</UIProvider>
				</body>
			</PHProvider>
		</html>
	);
}
