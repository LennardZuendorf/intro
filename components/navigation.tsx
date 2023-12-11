"use client"

import * as React from "react"
import Link from "next/link"
import { siteConfig } from "@/data/site";
import { usePathname } from 'next/navigation'

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export const Navigation = () => {
    const pathname = usePathname();

    return (
        <div className={cn("flex flex-col items-center pt-4 pb-4 gap-1")}>
            <NavigationMenu className="rounded-md border">
                <NavigationMenuList>
                    {siteConfig.navItems.map((item) => (
                        <NavigationMenuItem key={item.href}>
                            <Link href={item.href} legacyBehavior passHref>
                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === item.href ? 'font-black' : 'font-medium')} active={pathname === item.href}>
                                    {item.label}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}