import Image from "next/image"
import Link from "next/link"
import { allProjects } from "contentlayer/generated"
// @ts-ignore
import { Project } from "contentlayer/types"
import { compareDesc, parseISO, format } from "date-fns"
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {ProjectCard} from "@/components/projects/card"
import {siteConfig} from "@/data/site"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import * as React from "react";

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
        <div className="relative pb-16">
            <div className="pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 gap-8 mx-auto">
                    <Card key={focusProjects[0].title} className="col-span-1 row-span-1 lg:row-span-2 text-start justify-start items-start">
                        <Link href={focusProjects[0].path}>
                            <div className="h-full items-between">
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-xs text-zinc-100">
                                            {focusProjects[0].date ? (
                                                <time dateTime={new Date(focusProjects[0].date).toISOString()}>
                                                    {Intl.DateTimeFormat(undefined, {
                                                        dateStyle: "medium",
                                                    }).format(new Date(focusProjects[0].date))}
                                                </time>
                                            ) : (
                                                <span>SOON</span>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardTitle>
                                    <h2>
                                        {focusProjects[0].title}
                                    </h2>
                                </CardTitle>
                                <CardDescription>
                                    <p>
                                        {focusProjects[0].description}
                                    </p>
                                </CardDescription>
                                <CardFooter className="w-full justify-end items-end">
                                    <Button variant="link" size="icon" className={cn("justify-center items-center")}>
                                        <h4>Read More</h4>
                                    </Button>
                                </CardFooter>
                            </div>
                        </Link>
                    </Card>
                    {[focusProjects[1], focusProjects[2]].map((project) => (
                        <div key={project.title} >
                            <ProjectCard project={project} className="col-span-1 row-span-1 lg:row-span-2"/>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
                    <div className="grid grid-cols-1 gap-4">
                        {otherProjects
                            .filter((_, i) => i % 3 === 0)
                            .map((project) => (
                                <div key={project.title} >
                                    <ProjectCard project={project} className="" />
                                </div>
                            ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {otherProjects
                            .filter((_, i) => i % 3 === 1)
                            .map((project) => (
                                <div key={project.title} >
                                    <ProjectCard project={project} className=""/>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}