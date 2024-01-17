"use client";

import * as React from "react";
import type { ExperienceData } from "@/data/about";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-menu";
import { H4, Code, M, L, S } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RxLink1 } from "react-icons/rx";

type Props = {
  experienceData: ExperienceData;
  className?: string;
};

export const ExperienceAccordion: React.FC<Props> = ({
  experienceData,
  className,
}) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      {experienceData.map((experience, index) => (
        <AccordionItem value={experience.company} key={index}>
          <AccordionTrigger>
            <M className="">{experience.company}</M>
          </AccordionTrigger>
          <AccordionContent className="justify-start">
            <Card className="text-start border-0">
              <CardHeader className="justify-start text-start p-2">
                <div className="flex flex-col lg:flex-row justify-start lg:justify-between space-y-2">
                  <L>{experience.title}</L>
                  <Code className="">{experience.range}</Code>
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="pl-4 p-2">
                <ul className="ml-6 list-disc [&>li]:mt-2 text-sm">
                  {experience.text.map((description, index) => (
                    <li key={index}>{description}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-1 md:space-x-2 p-2">
                {experience.skills.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </CardFooter>
            </Card>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
