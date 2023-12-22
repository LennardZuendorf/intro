"use client"
import * as React from "react"
import Link from "next/link"
import { siteConfig } from "@/data/site";
import { usePathname } from 'next/navigation'
import {allProjects} from 'contentlayer/generated'

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
import {compareDesc, parseISO} from "date-fns";

interface FooterProps {
    className?: string
}

export const Nav: React.FC<FooterProps> = ({ className = ""  }) => {
    const pathname = usePathname();

    const focusProjects = allProjects
        .filter((project) => project.focus)
        .sort((a, b) => {
            return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)))
        }).slice(0, 3)

    // @ts-ignore
    return (
        <div className={cn("flex flex-col items-center pt-4 pb-4 gap-1", className)}>
            <NavigationMenu className="rounded-md border">
                <NavigationMenuList>
                    <NavigationMenuItem key="/">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/" ? 'font-black' :  'font-medium')} active={pathname === "/"}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem key="/projects">
                        <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/projects"
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                View all my projects.
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                This still needs more text
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                {focusProjects.map((project) => (
                                    <ListItem
                                        key={project.title}
                                        title={project.title}
                                        href={pathname.includes("projects/") ? project.slug : project.path}
                                    >
                                        {project.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem key="/about">
                        <Link href="/about" legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/about" ? 'font-black' :  'font-medium')} active={pathname === "/about"}>
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"