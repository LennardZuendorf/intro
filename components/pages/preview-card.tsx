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
    focus?: boolean;
    clickable?: boolean;
};

export const ProjectCard: React.FC<Props> = ({ project, className, focus }) => {
    let baseClassName = "text-start hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    let textMuted = "text-muted-background"
    let text = "text-foreground"

    if (focus) {
        baseClassName = "text-start bg-foreground text-background hover:bg-accent-foreground hover:text-accent-background focus:bg-accent-foreground focus:text-accent-background"
        textMuted = "text-muted-foreground"
        text = "text-background"
    }

    return (
        <Card
            className={cn(className, baseClassName)}
        >
            <Link href={project.path}>
                <CardHeader className="grid grid-flow-col justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className={focus ? "text-background" : "text-foreground"}>
                            {project.description}
                        </CardDescription>
                    </div>
                    <div>
                        <SkillIcon category={project.category} className={cn("h-5 w-5",text)}/>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={cn("flex gap-2 items-center justify-between", textMuted)}>
                        <div className="flex gap-1 justify-start">
                            {project.tags &&
                                (project.tags.slice(0, 2) || []).map((tag) => (
                                    <Badge variant="outline" key={tag} className={focus ? "text-background" : "text-foreground"}>
                                        {tag}
                                    </Badge>
                                ))
                            }
                        </div>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground">
                            {format(parseISO(project.date), 'LLL/yy', )}
                        </code>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};