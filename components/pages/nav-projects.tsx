"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from 'next/navigation'
import {allProjects} from 'contentlayer/generated'

import {cn} from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export const ProjectsNav = () => {
    const pathname = usePathname();
    return (
        <div className={cn("flex flex-col items-center pt-4 pb-4 gap-1")}>
            <NavigationMenu className="rounded-md border">
                <NavigationMenuList>
                    {allProjects.map((item) => (
                        <NavigationMenuItem key={item.url}>
                            <Link href={item.url} legacyBehavior passHref>
                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === item.url ? 'font-black' : item.focus ? 'font-semi-bold': 'font-medium')} active={pathname === item.url}>
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}