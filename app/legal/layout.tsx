import { cn } from "@/lib/utils"

export default function LegalLayout({children,}: { children: React.ReactNode }) {
    return (
        <section className={cn("flex flex-col items-center justify-center gap-4 py-8 md:py-10")}>
            <div className="inline-block max-w-lg text-center justify-center">
                {children}
            </div>
        </section>
    )
}
