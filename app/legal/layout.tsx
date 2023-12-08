export default function LegalLayout({
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
