import type { CollectionConfig } from "payload";

export const Technologies: CollectionConfig = {
	slug: "technologies",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
	],
};

export default Technologies;
