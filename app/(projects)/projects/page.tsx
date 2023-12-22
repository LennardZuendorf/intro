import * as React from "react";
import {compareDesc, parseISO} from "date-fns"

import {Separator} from "@/components/ui/separator"
import {ProjectCard} from "@/components/pages/preview-card"
import { allProjects } from "contentlayer/generated"
import type {Project} from 'contentlayer/generated'
import {Title, SubTitle} from "@/components/ui/typography";

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
        <div className="space-y-12 flex flex-col gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8">
            <div className="space-y-4">
                <Title>My Projects </Title>
                <SubTitle>Some Projects are free time, hobby projects. Others are part of my studies.</SubTitle>
            </div>
            <div className="grid grid-rows-3 md:grid-rows-2 gap-4 mx-auto lg:mx-0">
                <ProjectCard project={focusProjects[0]} className="row-span-1"/>
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
            <Separator />
            <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 items-start">
                <div className="grid grid-cols-1 gap-8">
                    {otherProjects
                        .filter((_, i) => i % 2 === 0)
                        .map((project) => (
                            <div key={"focus-preview-".concat(project.title)}>
                                <ProjectCard project={project} className=""/>
                            </div>
                        ))}
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-8">
                    {otherProjects
                        .filter((_, i) => i % 2 === 1)
                        .map((project) => (
                            <div key={"focus-preview-".concat(project.title)}>
                                <ProjectCard project={project} className=""/>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}