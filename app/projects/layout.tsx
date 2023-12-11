import { cn } from "@/lib/utils"
import {ProjectsNav} from "@/components/pages/nav-projects";

export default function ProjectLayout({children,}: { children: React.ReactNode }) {
    return (
        <section className={cn("flex flex-col")}>
            <ProjectsNav />
            <div className="inline-block text-center justify-center">
                {children}
            </div>
        </section>
    )
}
