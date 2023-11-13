'use client'

import {header, title} from "@/components/primitives";

export default function AboutPage() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block text-center justify-center">
				<h1 className={title()}>About Me</h1>
			</div>
		</section>
	);
}
