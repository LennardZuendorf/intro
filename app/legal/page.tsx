'use client'

import {header, title} from "@/components/primitives";
import {Card, CardBody, Divider, Tab, Table, TableCell, TableHeader, TableRow, Tabs} from "@nextui-org/react";

export default function DocsPage() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<div className="inline-block text-start justify-center">
				<h1 className={title()}>Legal & Data Protection</h1>
			</div>
			<div className="inline-block text-center justify-center">
				<div className="w-full">
					<Tabs aria-label="Options" defaultSelectedKey="data-protection">
						<Tab key="data-protection" title="Data Protection">
							<div className="text-start">
								These are the data protection guidelines. They are not yet finished.
							</div>
						</Tab>
						<Tab key="cookies" title="Cookie">
							<div className="text-start">
								This page doesn't use cookies. It uses posthog for analytics, but doesn't store any data about you.
								It's that easy.
							</div>
						</Tab>
						<Tab key="contact" title="Contact">
							<div className="text-start">
								You can contact me under the following information:
								<Table hideHeader aria-label="Example static collection table">
									<TableHeader>
										<TableColumn>NAME</TableColumn>
										<TableColumn>ROLE</TableColumn>
										<TableColumn>STATUS</TableColumn>
									</TableHeader>
									<TableBody>
										<TableRow key="1">
											<TableCell>Tony Reichert</TableCell>
											<TableCell>CEO</TableCell>
											<TableCell>Active</TableCell>
										</TableRow>
										<TableRow key="2">
											<TableCell>Zoey Lang</TableCell>
											<TableCell>Technical Lead</TableCell>
											<TableCell>Paused</TableCell>
										</TableRow>
										<TableRow key="3">
											<TableCell>Jane Fisher</TableCell>
											<TableCell>Senior Developer</TableCell>
											<TableCell>Active</TableCell>
										</TableRow>
										<TableRow key="4">
											<TableCell>William Howard</TableCell>
											<TableCell>Community Manager</TableCell>
											<TableCell>Vacation</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</section>
	);
}
