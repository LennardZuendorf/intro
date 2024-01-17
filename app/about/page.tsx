import * as React from "react";
import { Code, H2, H3, H4, L, Lead, M, S } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AboutBlock } from "contentlayer/generated";
import { allAboutBlocks } from "contentlayer/generated";
import { calloutData, experienceData, techStackData } from "@/data/about";
import { Mdx } from "@/components/custom/mdx-components";
import { ExperienceCarousel } from "@/components/pages/experience-carousel";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/custom/brand-icons";
import { ExperienceAccordion } from "@/components/pages/experience-accordion";

export default async function AboutPage() {
  const activities = allAboutBlocks.find((p) =>
    p.title.includes("Activities"),
  ) as AboutBlock;

  return (
    <div className="flex flex-col justify-center items-center gap-4 lg:gap-8 py-2">
      <Card key="intro" className="w-full text-start">
        <CardHeader className="flex flex-col space-y-2 p-4">
          <H4 className="font-black font-title">Lennard Zündorf</H4>
        </CardHeader>
        <CardContent className="flex flex-col justify-start gap-4 p-4">
          <S className="leading-loose lg:leading-relaxed">
            <L className="inline inline-flex mr-1 font-bold">I&aposm</L>a 24
            year old student of <strong>Business Computing</strong> at the
            University of Applied Sciences for Technology and Busines Berlin
            (HTW Berlin). I&aposm <strong>graduating in March 2024</strong>. I
            also work as a <strong>Backend Product Manager </strong> at{" "}
            <strong>Check24 Flug </strong>. I currently live in{" "}
            <strong>Berlin, Germany</strong>.
          </S>
          <S className="leading-loose lg:leading-relaxed">
            While I&aposm a student, I have{" "}
            <strong>always worked much and gained many experiences</strong>.
            Studying has felt more like my side project for years. In my
            (limited) free time I&aposve had a passion for coding, which parts
            of this website are meant to showcase.
          </S>
          <S className="leading-loose lg:leading-relaxed">
            I combine a <strong> strong technological background </strong> and a
            high affinity for programming with a passion for product and the
            bigger picture of software. Which has lead me to my current position
            in <strong>Technical Product Management</strong>.
          </S>
          <div className="space-y-2 pt-4">
            <Card className={cn("border-0")}>
              <CardHeader className="p-2">
                <H4 className="">Technologies I Commonly Use</H4>
              </CardHeader>
              <CardContent className="flex flex-wrap lg:grid lg:grid-cols-12 gap-2 p-2 pb-2">
                {techStackData.map((tech, index) => (
                  <BrandIcon
                    brand={tech.icon}
                    title={tech.name}
                    className="h-6 w-6"
                    key={tech.name}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card key="experiences" className="w-full">
        <CardHeader className="">
          <H4 className="font-title">Work Experiences</H4>
        </CardHeader>
        <CardContent className="">
          <ExperienceAccordion experienceData={experienceData} />
        </CardContent>
      </Card>
    </div>
  );
}
