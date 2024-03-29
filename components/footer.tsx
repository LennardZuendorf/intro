"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { siteConfig } from "@/data/site";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ToggleColor } from "@/components/custom/toggle-color";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const pathname = usePathname();
  const shouldStick = pathname === "/" || pathname === "/projects";

  return (
    <footer
      className={cn("flex flex-col items-center pt-4 w-full pb-4", className, {
        "2xl:absolute 2xl:bottom-0": shouldStick,
      })}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-start gap-x-4">
          <Link href={siteConfig.links.mail}>
            <Button
              variant="link"
              size="icon"
              className={cn("justify-center items-center")}
            >
              <h4>Mail</h4>
            </Button>
          </Link>
          <Link href={siteConfig.links.linkedin}>
            <Button
              variant="link"
              size="icon"
              className="justify-center items-center"
            >
              <h4>LinkedIn</h4>
            </Button>
          </Link>
          <Link href={siteConfig.links.github}>
            <Button
              variant="link"
              size="icon"
              className="justify-center items-center"
            >
              <h4>Github</h4>
            </Button>
          </Link>
        </div>
        <div className="flex items-end gap-x-4">
          <ToggleColor />
        </div>
      </div>
      <Separator className="my-4" />
      <div>
        <div className="flex items-center gap-x-2 text-sm">
          <div>Build by Lennard Zündorf</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` | `}</div>

          <Link href="/legal">
            <h4 className="text-sm font-medium leading-none hover:underline">
              legal
            </h4>
          </Link>
        </div>
      </div>
    </footer>
  );
};
