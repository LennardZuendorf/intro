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
import {compareDesc, parseISO} from "date-fns";

export const ProjectsNav = () => {
    const pathname = usePathname();
    const focusProjects = allProjects
        .filter((project) => project.focus)
        .sort((a, b) => {
            return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)))
        })

    return (
        <div className={cn("flex flex-col items-center gap-1")}>
            <NavigationMenu className="rounded-md">
                <NavigationMenuList>
                    {focusProjects.map((item) => (
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