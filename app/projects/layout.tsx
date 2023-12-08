export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="container mx-auto grow w-full">
				{children}
			</div>
		</section>
	);
}
