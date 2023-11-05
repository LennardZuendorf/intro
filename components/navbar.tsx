"use client";

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { usePathname } from 'next/navigation'
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/miniComponents/theme-switch";
import { Logo } from "@/components/miniComponents/icons";
import { useTheme } from "next-themes";
import {commonColors} from "@nextui-org/theme";

export const Navbar = () => {
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();

	return (
		<NextUINavbar maxWidth="xl" position="sticky">

			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo
							size={50}
							top={theme === "light" ? commonColors.zinc["50"] : commonColors.zinc["900"]}
							bottom={theme === "light" ? commonColors.zinc["900"] : commonColors.zinc["50"]}
							gradientStart={theme === "light" ? commonColors.zinc["200"] : commonColors.zinc["700"]}
							gradientStop={theme === "light" ? commonColors.zinc["700"] : commonColors.zinc["200"]}
						/>
						<p className="font-bold text-inherit">{siteConfig.title}</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-8 basis-1/5 sm:basis-full" justify="end">
				<NavbarItem className="hidden sm:flex gap-2 justify-start ml-2" isActive={pathname==='/projects'}>
					<Link color="foreground" href="/projects">
						Projects
					</Link>
				</NavbarItem>

				<NavbarItem className= "hidden sm:flex gap-2 justify-start ml-2" isActive={pathname==='/about'}>
					<Link color="foreground" href="/about">
						About
					</Link>
				</NavbarItem>

				<NavbarItem className="hidden sm:flex gap-2 justify-end ml-2">
					<ThemeSwitch />
				</NavbarItem>

			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color="foreground"
								href={item.href}
								size="lg"
								className={pathname === item.href ? 'font-bold' : 'font-light'}
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
