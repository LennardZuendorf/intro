import {GridTitle} from '@/components/grid-title'

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-8 md:py-16 lg:py-24">
      <div id="title-hero" className="block text-center justify-center">
        <h1 className="text-4xl font-extrabold lg:text-5xl">
          Welcome to My Portfolio Site!
        </h1>
        <p className="text-xl text-muted-foreground">
          Here you can find all the information about me and my projects.
        </p>
      </div>
      <div>
        <GridTitle />
      </div>
    </section>
  )
}
