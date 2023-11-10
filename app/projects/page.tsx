'use client'

import { title } from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function DocsPage() {
	return (
		<div className="w-full space-y-1">
			<div className="space-y-2 pb-8 pt-6 md:space-y-5">
				<h1 className=" className={title()} md:leading-20 mb-2 text-2xl font-extrabold leading-11 tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl">
					Welcome to Zuendorf.Me
				</h1>
				<h1 className="mb-2 text-2xl font-extrabold leading-11 tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
					A website for my project and showcase portfolio.
				</h1>
		  	</div>
		</div>
	);
}
