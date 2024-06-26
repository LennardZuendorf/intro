import type { Project } from "contentlayer/generated";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { M, SMuted, Lead, Muted, S, H3, H2 } from "@/components/ui/typography";
import Image from "next/image";
import { calloutData } from "@/data/about";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { RxEnvelopeOpen, RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import { HiOutlineDocument } from "react-icons/hi";

type Props = {
  className?: string;
};

export const GreetingCard: React.FC<Props> = ({ className }) => {
  return (
    <Card key="intro" className={cn("w-full", className)} variant="interactive">
      <CardHeader className="p-1 pr-4 justify-end">
        <SMuted className="font-mono text-end">hello</SMuted>
      </CardHeader>
      <CardContent className="place-self-center grid gap-2 grid-cols-3 justify-center lg:justify-start items-center  p-4 pt-0">
        <div className="flex col-span-3 md:col-span-1 justify-center lg:justify-start p-2">
          <Image
            src="/img/avatar.png"
            alt="Lennard Zündorf profile picture"
            width={250}
            height={250}
            className="rounded-md border bg-muted transition-colors"
            priority
          />
        </div>
        <div className="flex flex-col col-span-3 md:col-span-2 gap-4 justify-between text-center lg:text-start">
          <H3 className="font-black font-title">Hi! I&apos;m Lennard!</H3>
          <M className="leading-normal">
            I&apos;m a <strong>Product Manager</strong> with a neck for coding,
            focused on turning product vision into reality.
          </M>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link href={siteConfig.links.mail}>
              <Button className={cn("justify-center items-center")} size="icon">
                <RxEnvelopeOpen className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={siteConfig.links.linkedin}>
              <Button className="justify-center items-center" size="icon">
                <RxLinkedinLogo className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={siteConfig.links.github}>
              <Button className="justify-center items-center" size="icon">
                <RxGithubLogo className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={siteConfig.links.cv}>
              <Button className="justify-center items-center">
                <HiOutlineDocument className="mr-1 h-4 w-4" /> CV
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
