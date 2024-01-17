"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { H4, Code, H2, H3, M } from "@/components/ui/typography";
import type { ExperienceData } from "@/data/about";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  experienceData: ExperienceData;
  className?: string;
};

export const ExperienceCarousel: React.FC<Props> = ({
  experienceData,
  className,
}) => {
  return (
    <Carousel
      orientation="horizontal"
      className={cn("flex justify-center", className)}
    >
      <CarouselContent className="space-y-4 space-x-4">
        {experienceData.map((experience, index) => (
          <CarouselItem key={index}>
            <Card className="text-start">
              <CardHeader className="flex">
                <div className="grid grid-flow-row  md:grid-flow-col justify-start md:justify-between gap-2">
                  <Link href={experience.url}>
                    <M className="underline">{experience.company}</M>
                  </Link>
                  <div className="flex flex-wrap gap-1 hidden md:block md:space-x-2">
                    <Code>{experience.location}</Code>
                    <Code>{experience.range}</Code>
                  </div>
                </div>
                <H4>{experience.title}</H4>
                <Separator />
              </CardHeader>
              <CardContent className="pl-4">
                <ul className="list-disc list-inside">
                  {experience.text.map((description, index) => (
                    <li key={index}>{description}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-1 md:space-x-2">
                {experience.skills.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
