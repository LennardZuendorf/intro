import type { Project } from "contentlayer/generated";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { M, H4, Lead, Muted, S, H3, H2 } from "@/components/ui/typography";
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
    <Card key="intro" className={cn("w-full", className)}>
      <CardHeader className="p-1 pr-4 justify-end">
        <Muted className="font-mono text-end">hello</Muted>
      </CardHeader>
      <CardContent className="grid gap-2 grid-cols-3 justify-center lg:justify-start items-center p-4 pt-0">
        <div className="flex col-span-3 md:col-span-1 justify-center lg:justify-start p-2">
          <Image
            src="/img/avatar.png"
            alt="Lennard Zündorf profile picture"
            width={200}
            height={200}
            className="rounded-md border bg-muted transition-colors"
            priority
          />
        </div>
        <div className="flex flex-col col-span-3 md:col-span-2 gap-4 justify-between text-center lg:text-start">
          <H3 className="font-black font-title">{calloutData.introCallout}</H3>
          <M className="leading-normal">{calloutData.secondCallout}</M>
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
