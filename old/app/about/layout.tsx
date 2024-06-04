import { cn } from "@/lib/utils";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={cn("flex flex-col h-max")}>
      <div className="inline-block text-center justify-center">{children}</div>
    </section>
  );
}
