import * as React from "react";
import { H2, H4, L, Muted, S } from "@/components/ui/typography";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AboutBlock } from "contentlayer/generated";
import { allAboutBlocks } from "contentlayer/generated";
import { experienceData, techStackData } from "@/data/about";
import { Mdx } from "@/components/custom/mdx-components";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/custom/brand-icons";
import { ExperienceAccordion } from "@/components/pages/experience-accordion";

export const generateStaticParams = async () => {
  return allAboutBlocks.map((p) => ({ slug: p.slug.split("/") }));
};

export default async function AboutPage() {
  const aboutIntro = allAboutBlocks.find((p) =>
    p.title.includes("Intro"),
  ) as AboutBlock;

  const aboutTech = allAboutBlocks.find((p) =>
    p.title.includes("Tech"),
  ) as AboutBlock;

  return (
    <div className="flex flex-col justify-center items-center gap-4 lg:gap-8 py-8">
      <Card key="intro" className="w-full text-start" id="about-me">
        <CardHeader className="flex flex-col space-y-2 p-4">
          <H2 className="font-black font-title">About Me</H2>
        </CardHeader>
        <CardContent className="flex flex-col justify-start gap-4 p-4">
          <Mdx code={aboutIntro.body.code} />
          <H4>I Work On</H4>
          <Muted>
            Check out my
            <Link
              className="pl-1 text-primary underline-offset-4 hover:underline font-semibold"
              href={siteConfig.links.github}
            >
              GitHub
            </Link>
          </Muted>
          <Mdx code={aboutTech.body.code} />
          <div className="space-y-2 pt-4">
            <Card className={cn("border-0")}>
              <CardHeader className="p-2">
                <L className="font-semibold">Technologies I Commonly Use</L>
              </CardHeader>
              <CardContent className="flex flex-wrap lg:grid lg:grid-cols-12 gap-2 p-2 pb-2">
                {techStackData.map((tech, index) => (
                  <BrandIcon
                    brand={tech.icon}
                    title={tech.name}
                    className="h-6 w-6"
                    key={tech.name}
                    link={tech.link}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card key="experiences" className="w-full" id="work-experiences">
        <CardHeader className="text-start">
          <H4 className="font-title">Work Experiences</H4>
          <Muted>
            Check out my
            <Link
              className="pl-1 text-primary underline-offset-4 hover:underline font-semibold"
              href={siteConfig.links.linkedin}
            >
              LinkedIn Profile
            </Link>
          </Muted>
        </CardHeader>
        <CardContent className="">
          <ExperienceAccordion experienceData={experienceData} />
        </CardContent>
      </Card>
    </div>
  );
}
