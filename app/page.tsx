import { GreetingCard } from "@/components/pages/greeting-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H4, L, M, Muted, Code, S } from "@/components/ui/typography";
import * as React from "react";
import { calloutData } from "@/data/about";
import { allProjects } from "@/.contentlayer/generated/";
import type { Project } from "@/.contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxLink1 } from "react-icons/rx";
import { SkillIcon } from "@/components/custom/skill-icon";
import { ProjectCard } from "@/components/pages/project-preview";

export default function Home() {
  const calloutProject = allProjects.find(
    (project) =>
      project.title.toLowerCase() === calloutData.calloutProject.toLowerCase(),
  );

  return (
    <section className="flex flex-col items-center gap-2 sm:gap-4 lg:gap-8 py-4">
      <div className="grid grid-cols-12 gap-2 w-full">
        <GreetingCard className="col-span-12 lg:col-span-8 lg:row-span-2" />
        <Card className="col-span-12 lg:col-span-4 lg:row-span-3">
          <CardHeader className="p-1 pr-4 justify-end">
            <Muted className="font-mono text-end">about me</Muted>
          </CardHeader>
          <CardContent>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-sm">
              <li>
                I&rsquo;m a tech enthusiast bridging <strong>product</strong>,{" "}
                <strong>dev</strong> and other related fields from a technical
                background.
              </li>
              <li>
                I work on software with a{" "}
                <strong>strong focus on product</strong> and{" "}
                <strong>executing product strategy</strong>.
              </li>
              <li>
                Outside work, I explore <strong>programming projects</strong>,
                enhancing my skills and learning new ones.
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-4 lg:row-span-2 space-y-2">
          <CardHeader className="p-1 pr-4 justify-end">
            <Muted className="font-mono font-tiny text-end">
              current project
            </Muted>
          </CardHeader>
          <CardContent className="space-y-1 grid grid-flow-row">
            <div className="flex flex-row flex-wrap items-center">
              <SkillIcon
                variant="default"
                className="w-8 h-8 mr-2"
                category={calloutData.focusProject.category}
              />
              <H4>{calloutData.focusProject.desc}</H4>
            </div>
            <div className="flex flex-row flex-wrap">
              <S className="leading-relaxed">
                I currently focus on
                <Link
                  href={
                    calloutData.focusProject.link === ""
                      ? "/projects"
                      : calloutData.focusProject.link
                  }
                >
                  <Code className="inline inline-flex">
                    {calloutData.focusProject.desc.toLowerCase()}
                  </Code>
                </Link>
                . Which is the final step of my Bachelors.
              </S>
            </div>
            <div></div>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-4 lg:row-span-2 space-y-2">
          <CardHeader className="p-1 pr-4 justify-end">
            <Muted className="font-mono font-tiny text-end">current role</Muted>
          </CardHeader>
          <CardContent className="space-y-1 grid grid-flow-row">
            <div className="flex flex-row flex-wrap items-center">
              <SkillIcon
                variant="default"
                className="w-8 h-8 mr-2"
                category={calloutData.focusJob.category}
              />
              <H4 className="flex-wrap">{calloutData.focusJob.desc}</H4>
            </div>
            <div className="flex flex-row flex-wrap">
              <S className="leading-relaxed">
                I&rsquo;m a technical product manager for the backend team at
                <Link
                  href={
                    calloutData.focusJob.link === ""
                      ? "/projects"
                      : calloutData.focusJob.link
                  }
                >
                  <Code className="inline text-semibold">
                    {calloutData.focusJob.place.toLowerCase()}
                  </Code>
                </Link>
              </S>
            </div>
            <div></div>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-4 lg:row-span-1">
          <CardHeader className="p-1 pr-4 justify-end">
            <Muted className="font-mono text-end">about</Muted>
          </CardHeader>
          <CardContent className="grid grid-cols-3 justify-between">
            <div className="col-span-2 flex flex-wrap justify-start text-start">
              <M>Learn More About Me</M>
              <Muted className="text-sm">
                My skills, experiences and techstack.
              </Muted>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Link href="/about" scroll={false}>
                <Button variant="outline" size="icon">
                  <RxLink1 className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-4 lg:row-span-1">
          <CardHeader className="p-1 pr-4 justify-end">
            <Muted className="font-mono text-end">projects</Muted>
          </CardHeader>
          <CardContent className="grid grid-cols-3 justify-between">
            <div className="col-span-2 flex flex-wrap justify-start text-start">
              <M>See All My Projects</M>
              <Muted className="text-sm">
                All my academic and free time projects.
              </Muted>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Link href="/projects" scroll={false}>
                <Button variant="outline" size="icon">
                  <RxLink1 className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-8 lg:row-span-1 hidden lg:block">
          <CardHeader className="p-1 pr-4 justify-end">
            <Muted className="font-mono text-end">topics</Muted>
          </CardHeader>
          <CardContent className="gap-1 flex flex-wrap">
            {calloutData.skills.map((skill, index) => (
              <Badge key={index}>{skill}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
