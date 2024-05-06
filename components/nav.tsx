"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allProjects } from "contentlayer/generated";

import { cn, getProjects } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { L, Muted, S, M } from "@/components/ui/typography";

interface FooterProps {
  className?: string;
}

export const Nav: React.FC<FooterProps> = ({ className = "" }) => {
  const pathname = usePathname();

  const selectedProjects = [
    ...getProjects().focusProjects,
    ...getProjects().otherProjects,
  ]
    .filter((project) => project.active)
    .slice(0, 3);

  // @ts-ignore
  return (
    <div
      className={cn("flex flex-col items-center pt-4 pb-4 gap-1", className)}
    >
      <NavigationMenu className="rounded-md border">
        <NavigationMenuList>
          <NavigationMenuItem key="/">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/" ? "font-bold" : "font-medium",
                )}
                active={pathname === "/"}
              >
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
                      className={cn(
                        pathname === "/about" ? "font-bold" : "font-medium",
                        "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md",
                      )}
                      href="/projects"
                    >
                      <M>All Projects</M>
                      <S>
                        Look through my various projects from free time and
                        academia.
                      </S>
                    </a>
                  </NavigationMenuLink>
                </li>
                {selectedProjects.map((project) => (
                  <ListItem
                    key={project.title}
                    title={project.title}
                    href={
                      pathname.includes("projects/")
                        ? project.slug
                        : project.path
                    }
                  >
                    <S>{project.description.substring(0, 50).concat("...")}</S>
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key="/about">
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/about" ? "font-bold" : "font-medium",
                )}
                active={pathname === "/about"}
              >
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

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
          )}
          {...props}
        >
          <M className="text-sm font-semibold leading-none">{title}</M>
          <Muted>{children}</Muted>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
