import { cn } from "@/lib/utils";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={cn("flex flex-col")}>
      <div className="inline-block text-center justify-center">{children}</div>
    </section>
  );
}
