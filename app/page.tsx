import { GreetingCard } from "@/components/pages/greeting-card";
import { CurrentCard } from "@/components/pages/current-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H4, L, M, Muted, SMuted, S } from "@/components/ui/typography";
import * as React from "react";
import { calloutData } from "@/data/about";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";

export default function Home() {
  return (
    <section className="flex flex-col gap-2 sm:gap-4 ">
      <div className="grid grid-cols-12 gap-2 w-full">
        <GreetingCard className="col-span-12 lg:col-span-8 lg:row-span-2" />
        <Card
          className="col-span-12 lg:col-span-4 lg:row-span-3"
          variant="interactive"
        >
          <CardHeader className="p-1 pr-4 justify-end">
            <SMuted className="font-mono text-end">about me</SMuted>
          </CardHeader>
          <CardContent>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-sm xl:text-base 2xl:text-lg">
              <li>
                <strong>I enjoying working on software</strong> with real world
                impact.
              </li>
              <li>
                My focus is technology based <strong>product management</strong>
                , which combines my expertise in{" "}
                <strong>product, engineering, innovation</strong> and{" "}
                <strong>business</strong>.
              </li>
              <li>
                I&apos;m a <strong>coding enthusiast </strong>always trying to
                learn and leveling up my skills in product, coding and software
                at large.
              </li>
              <li>
                My free time I spent with{" "}
                <strong>music and various podcasts</strong>, working out or
                working on my own projects.
              </li>
            </ul>
          </CardContent>
        </Card>
        <CurrentCard
          className=""
          currentDesc={calloutData.focusProject.desc}
          currentCategory={calloutData.focusProject.category}
          currentLink={calloutData.focusProject.link}
          currentText={calloutData.focusProject.text}
          cardHeader="focus project"
        ></CurrentCard>
        <CurrentCard
          className=""
          currentDesc={calloutData.focusJob.desc}
          currentCategory={calloutData.focusJob.category}
          currentLink={calloutData.focusJob.link}
          currentText={calloutData.focusJob.text}
          cardHeader="current job"
        ></CurrentCard>
        <Card
          className="col-span-12 lg:col-span-4 lg:row-span-1 hidden lg:block"
          variant="interactive"
        >
          <CardHeader className="p-1 pr-4 justify-end">
            <SMuted className="font-mono text-end">about</SMuted>
          </CardHeader>
          <CardContent className="grid grid-cols-3 justify-between">
            <div className="col-span-2 flex flex-wrap justify-start text-start">
              <L>Learn About Me</L>
              <Muted>My skills, experiences and techstack.</Muted>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Link href="/about#about-me" scroll={false}>
                <Button variant="outline" size="icon">
                  <HiMiniArrowTopRightOnSquare className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card
          className="col-span-12 lg:col-span-4 lg:row-span-1 hidden lg:block"
          variant="interactive"
        >
          <CardHeader className="p-1 pr-4 justify-end">
            <SMuted className="font-mono text-end">projects</SMuted>
          </CardHeader>
          <CardContent className="grid grid-cols-3 justify-between">
            <div className="col-span-2 flex flex-wrap justify-start text-start">
              <L>See All My Projects</L>
              <Muted>All my academic and free time projects.</Muted>
            </div>
            <div className="col-span-1 flex justify-end items-center">
              <Link href="/projects" scroll={false}>
                <Button variant="outline" size="icon">
                  <HiMiniArrowTopRightOnSquare className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card
          className="col-span-12 lg:col-span-8 lg:row-span-1 hidden lg:block"
          variant="interactive"
        >
          <CardHeader className="p-1 pr-4 justify-end">
            <SMuted className="font-mono text-end">topics</SMuted>
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
