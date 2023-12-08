import * as React from "react";
import { cn } from "@/lib/utils"

import { siteConfig } from "@/config/site";
import { RxLinkedinLogo, RxGithubLogo, RxEnvelopeClosed  } from "react-icons/rx";
import Link from 'next/link'
import { ModeToggle } from "@/components/color-toggle"
import {Button} from "@/components/ui/button";

export const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
    {
        return (
            <footer className={cn(className)}>
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <div className="flex flex-col items-center gap-2 px-8 md:flex-row md:gap-2 md:px-0">
                        <div className="flex space-x-4">
                            <Link href={siteConfig.links.mail}>
                                <Button variant="outline" size="icon" className="justify-center items-center">
                                    <RxEnvelopeClosed size={15} className="h-[1.2rem] w-[1.2rem] rotate-0" />
                                </Button>
                            </Link>

                            <Link href={siteConfig.links.linkedin}>
                                <Button variant="outline" size="icon" className="justify-center items-center">
                                    <RxLinkedinLogo size={15} className="h-[1.2rem] w-[1.2rem] rotate-0" />
                                </Button>
                            </Link>

                            <Link href={siteConfig.links.github}>
                                <Button variant="outline" size="icon" className="justify-center items-center">
                                    <RxGithubLogo size={15} className="h-[1.2rem] w-[1.2rem] rotate-0" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <ModeToggle />
                </div>
                <div>
                    <div className="flex items-center space-x-2 text-sm">
                        <div>{siteConfig.name}</div>
                        <div>{`© ${new Date().getFullYear()}`}</div>
                        <div>{` | `}</div>

                        <Link href="/legal">
                            <Button variant="link">
                                legal
                            </Button>
                        </Link>
                    </div>
                </div>
            </footer>
        )
    }
}

