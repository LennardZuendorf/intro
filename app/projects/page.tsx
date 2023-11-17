'use client'

import { title } from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";

export default function DocsPage() {
	return (
		<div className="flex flex-col items-center justify-center gap-8 sm:gap-16" >
			<div className="inline-block text-center justify-center">
				<h1 className={title()}>Projects</h1>
			</div>
		</div>
	);
}
