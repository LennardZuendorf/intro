import * as React from "react";
import Link from "next/link"
import {compareDesc, format, parseISO} from "date-fns"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {ProjectCard} from "@/components/pages/preview-card"
import {Button} from "@/components/ui/button";

import {cn} from "@/lib/utils";
import { allProjects } from "contentlayer/generated"
import type {Project} from 'contentlayer/generated'
import {SkillIcon} from "@/components/custom/skill-icon";
import {Badge} from "@/components/ui/badge";

export default async function ProjectsPage() {
    const focusProjects = allProjects
        .filter((project) => project.focus)
        .sort((a, b) => {
            return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)))
        })

    let otherFocusProjects : Project[] = [];

    if (focusProjects.length < 3) {
        otherFocusProjects = focusProjects.slice(3);
        focusProjects.slice(0,3);
    }

    const otherProjects = [ ... allProjects
        .filter((project) => !project.focus)
        .sort((a, b) => {
            return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)))
        }), ...otherFocusProjects];

    return (
        <div className="gap-1 pt-2 mx-auto max-w-7xl lg:px-8 md:space-y-16 md:pt-4 lg:pt-8">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                My Projects
            </h1>
            <div className="grid grid-rows-3 md:grid-rows-2 gap-8 mx-auto">
                <Card key={"focus-preview-".concat(focusProjects[0].title)} className={cn("text-start row-span-1 content-between justify-between hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                    <Link href={focusProjects[0].path}>
                        <CardHeader className="grid grid-flow-col justify-between gap-4">
                            <div className="space-y-1">
                                <CardTitle>{focusProjects[0].title}</CardTitle>
                                <CardDescription className="text-foreground">
                                    {focusProjects[0].description}
                                </CardDescription>
                            </div>
                            <div>
                                <SkillIcon category={focusProjects[0].category} className="h-5 w-5"/>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 text-muted-foreground items-center justify-between">
                                <div className="flex gap-1 justify-start">
                                    {focusProjects[0].tags &&
                                        (focusProjects[0].tags || []).map((tag) => (
                                            <Badge variant="outline">
                                                {tag}
                                            </Badge>
                                        ))
                                    }
                                </div>
                                <code
                                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    {format(parseISO(focusProjects[0].date), 'LLL/yy',)}
                                </code>
                            </div>
                        </CardContent>
                    </Link>
                </Card>
                <div className="row-span-2 md:row-span-1">
                    <div className="grid gap-4 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
                        {[focusProjects[1], focusProjects[2]].map((project) => (
                            <div key={"focus-preview-".concat(project.title)}>
                                <ProjectCard project={project} className="col-span-1 row-span-1"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Separator/>
            <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2">
                <div className="grid grid-cols-1 gap-4">
                    {otherProjects
                        .filter((_, i) => i % 3 === 0)
                        .map((project) => (
                            <div key={"preview-".concat(project.title)}>
                                <ProjectCard project={project} className=""/>
                            </div>
                        ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {otherProjects
                        .filter((_, i) => i % 3 === 1)
                        .map((project) => (
                            <div key={"preview-".concat(project.title)}>
                                <ProjectCard project={project} className=""/>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}