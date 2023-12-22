import * as React from "react";
import Link from "next/link";
import type { Project } from "contentlayer/generated";
import {format, parseISO} from "date-fns";

import {SkillIcon} from "@/components/custom/skill-icon";
import {Card, CardHeader, CardDescription, CardContent, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

type Props = {
    project: Project;
    className?: string;
};

export const ProjectCard: React.FC<Props> = ({ project, className}) => {
    return (
        <Card className={cn("text-start hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className)}>
            <Link href={project.path}>
                <CardHeader className="grid grid-flow-col justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="text-foreground">
                            {project.description}
                        </CardDescription>
                    </div>
                    <div>
                        <SkillIcon category={project.category} className="h-5 w-5"/>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 text-muted-foreground items-center justify-between">
                        <div className="flex gap-1 justify-start">
                            {project.tags &&
                                (project.tags.slice(0, 2) || []).map((tag) => (
                                    <Badge variant="outline" key={tag}>
                                        {tag}
                                    </Badge>
                                ))
                            }
                        </div>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                            {format(parseISO(project.date), 'LLL/yy', )}
                        </code>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};