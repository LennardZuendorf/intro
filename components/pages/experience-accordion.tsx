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
import { Quote, Code, M, L, S } from "@/components/ui/typography";
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
        <AccordionItem value={experience.company} key={`experience-${index}`}>
          <AccordionTrigger>
            <M className="">{experience.company}</M>
          </AccordionTrigger>
          <AccordionContent className="justify-start">
            <Quote className="text-start text-xs lg:text-xs">
              {experience.desc} -
              <Link
                className="pl-1 text-primary font-semibold underline-offset-4 hover:underline"
                href={experience.url}
              >
                Learn More
              </Link>
            </Quote>
            {experience.roles.map((role, roleIndex) => (
              <Card
                className={cn(
                  "text-start border-0 border-b-2 pb-4 rounded-none",
                )}
                key={`card-${roleIndex}`}
              >
                <CardHeader className="justify-start text-start p-2">
                  <div className="flex flex-col lg:flex-row justify-start lg:justify-between space-y-2">
                    <L>{role.title}</L>
                    <Code className="">{role.range}</Code>
                  </div>
                  <Separator />
                </CardHeader>
                <CardContent className="pl-4 p-2">
                  <ul className="ml-6 list-disc [&>li]:mt-2 text-sm">
                    {role.text.map((description, textIndex) => (
                      <li key={textIndex}>{description.toString()}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-1 md:space-x-2 p-2">
                  {role.skills.map((tag, skillsIndex) => (
                    <Badge key={skillsIndex}>{tag}</Badge>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
