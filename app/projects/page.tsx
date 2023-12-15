import Image from "next/image"
import Link from "next/link"
import { allProjects } from "contentlayer/generated"
import { compareDesc, parseISO, format } from "date-fns"

export default function Projects() {
    const focusProjects = allProjects
        .filter((project) => project.focus)
        .sort((a, b) => {
            return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)))
        })

      const otherProjects = allProjects
          .filter((project) => !project.focus)
          .sort((a, b) => {
            return compareDesc(parseISO(String(a.date)), parseISO(String(b.date)))
          })

  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8">
        <hr className="my-8" />
        {focusProjects?.length ? (
            <div className="grid gap-10 sm:grid-cols-3">
                {focusProjects.map((project, index) => (
                    <article
                        key={project.title}
                        className="group relative flex flex-col space-y-2"
                    >
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={800}
                                height={400}
                                className="rounded-md border bg-muted transition-colors"
                                priority={index <= 1}
                            />
                        )}
                        <h2 className="text-1xl font-extrabold">{project.title}</h2>
                        {project.description && (
                            <p className="text-muted-foreground">{project.description}</p>
                        )}
                        {project.date && (
                            <p className="text-sm text-muted-foreground">
                                {format(parseISO(String(project.date)), 'LLLL d, yyyy')}
                            </p>
                        )}
                        <Link href={project.path} className="absolute inset-0">
                            <span className="sr-only">View Article</span>
                        </Link>
                    </article>
                ))}
            </div>
        ) : (
            <p>No Focus Projects.</p>
        )}

        {otherProjects?.length ? (
            <div className="grid gap-5 sm:grid-cols-6">
                {otherProjects.map((project, index) => (
                    <article
                        key={project.title}
                        className="group relative flex flex-col space-y-2"
                    >
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={400}
                                height={200}
                                className="rounded-md border bg-muted transition-colors"
                                priority={index <= 1}
                            />
                        )}
                        <h2 className="text-xl font-black">{project.title}</h2>
                        {project.description && (
                            <p className="text-muted-foreground">{project.description}</p>
                        )}
                        {project.date && (
                            <p className="text-s text-muted-foreground">
                                {format(parseISO(String(project.date)), 'LLLL d, yyyy')}
                            </p>
                        )}
                        <Link href={project.path} className="absolute inset-0">
                            <span className="sr-only">View Article</span>
                        </Link>
                    </article>
                ))}
            </div>
        ) : (
            <p>No Other Projects.</p>
        )}
    </div>
  )
}