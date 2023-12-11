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

export const Nav = () => {
    const pathname = usePathname();
    const navItems = siteConfig.navItems.filter((item) => item.label !== "Projects");
    const focusProjects = allProjects.filter((project) => project.focus);

    return (
        <div className={cn("flex flex-col items-center pt-4 pb-4 gap-1")}>
            <NavigationMenu className="rounded-md border">
                <NavigationMenuList>
                    <NavigationMenuItem key="/">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/" ? 'font-black' :  'font-medium')} active={pathname === "/"}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    {(() => {
                        if (pathname != "/projects") {
                            return (
                                <NavigationMenuItem key="/projects">
                                    <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <NavigationMenuLink asChild>
                                            <Link href="/projects" legacyBehavior passHref>
                                                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                    <div className="text-sm font-bold leading-none">All Projects</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                        View all my projects.
                                                    </p>
                                                </a>
                                            </Link>
                                        </NavigationMenuLink>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {focusProjects.map((project) => (
                                                <ListItem
                                                    key={project.url}
                                                    title={project.title}
                                                    href={project.url}
                                                >
                                                    {project.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                        } else {
                            return (
                                <NavigationMenuItem key="/projects">
                                    <Link href="/projects" legacyBehavior passHref>
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/projects" ? 'font-black' :  'font-medium')} active={pathname === "/projects"}>
                                            Projects
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            )
                        }
                    })()}
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
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
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