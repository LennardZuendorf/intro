import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import {parseISO, format } from "date-fns"
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";

type Props = {
    project: Project;
    className?: string;
};

export const ProjectCard: React.FC<Props> = ({ project, className}) => {
    return (
        <Card className={cn(className)}>
            <Link href={`${project.path}`}>
                <article className="p-4 md:p-8">
                    <div className="flex justify-between gap-2 items-center">
                        <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
                            {project.date ? (
                                <time dateTime={new Date(project.date).toISOString()}>
                                    {format(parseISO(String(project.date)), 'LLLL d, yyyy')}
                                </time>
                            ) : (
                                <span>SOON</span>
                            )}
                        </span>
                    </div>
                    <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
                        {project.title}
                    </h2>
                    <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
                        {project.description}
                    </p>
                </article>
            </Link>
        </Card>
    );
};