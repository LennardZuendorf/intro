import { TitleGrid } from "@/components/pages/title-grid";
import { H1, Lead } from "@/components/ui/typography";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-8 md:py-16 lg:py-24">
      <div id="title-hero" className="block text-center justify-center">
        <H1>Welcome to My Portfolio Site!</H1>
        <Lead>
          {" "}
          Here you can find all the information about me and my projects.
        </Lead>
      </div>
      <div>
        <TitleGrid />
      </div>
    </section>
  );
}
