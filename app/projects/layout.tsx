import { cn } from "@/lib/utils";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={cn("flex flex-col")}>
      <div className="inline-block text-center justify-center items-center">
        {children}
      </div>
    </section>
  );
}
