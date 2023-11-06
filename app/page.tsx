import { title, subtitle } from "@/components/primitives";

export default function Home() {

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Hello and Welcome!</h1>
				<h2>I&apos;m a Technical Product Manager and Business Computing Student.</h2>
			</div>
		</section>
	);
}
