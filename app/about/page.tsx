import * as React from "react";
import { H2, H3, H1, Lead } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AboutBlock } from "contentlayer/generated";
import { allAboutBlocks } from "contentlayer/generated";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RxLinkedinLogo, RxEnvelopeOpen, RxGithubLogo } from "react-icons/rx";
import { HiOutlineDocument } from "react-icons/hi";
import { calloutData, experienceData } from "@/data/about";
import { Mdx } from "@/components/custom/mdx-components";
import { ExperienceCarousel } from "@/components/pages/experience-carousel";

export default async function AboutPage() {
  const activities = allAboutBlocks.find((p) =>
    p.title.includes("Activities"),
  ) as AboutBlock;

  return (
    <div className="flex flex-col justify-center items-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8">
      <div className="space-y-4">
        <H2>About</H2>
        <Lead>Learn more about me, my skills and experiences.</Lead>
      </div>

      <Card key="intro" className="w-full">
        <CardContent className="grid gap-4 grid-cols-3 justify-center md:justify-start items-center">
          <div className="flex col-span-3 md:col-span-1 justify-start">
            <Image
              src="/avatar.png"
              alt="Lennard Zündorf profile picture"
              width={300}
              height={300}
              className="my-8 rounded-md border bg-muted transition-colors"
              priority
            />
          </div>
          <div className="flex flex-col col-span-3 md:col-span-2 gap-8 justify-between text-start">
            <H2>{calloutData.introCallout}</H2>
            <Lead type="foreground">{calloutData.secondCallout}</Lead>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href={siteConfig.links.mail}>
                <Button className={cn("justify-center items-center")}>
                  <RxEnvelopeOpen className="mr-2 h-4 w-4" /> Mail
                </Button>
              </Link>
              <Link href={siteConfig.links.linkedin}>
                <Button className="justify-center items-center">
                  <RxLinkedinLogo className="mr-2 h-4 w-4" /> LinkedIn
                </Button>
              </Link>
              <Link href={siteConfig.links.github}>
                <Button className="justify-center items-center">
                  <RxGithubLogo className="mr-2 h-4 w-4" /> Github
                </Button>
              </Link>
              <Link href={siteConfig.links.cv}>
                <Button className="justify-center items-center">
                  <HiOutlineDocument className="mr-2 h-4 w-4" /> CV
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card key="experiences" className="w-full">
        <CardHeader className="pt-4">
          <CardTitle>
            <H3>Experiences</H3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceCarousel experienceData={experienceData} />
        </CardContent>
      </Card>

      <Card key="activities" className="w-full">
        <CardHeader className="pt-4">
          <CardTitle>
            <H3>A Bit More About Me</H3>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 space-x-4">
          <Mdx code={activities.body.code} className="text-start pt-2" />
        </CardContent>
      </Card>
    </div>
  );
}
