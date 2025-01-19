import type { CollectionConfig, CollectionSlug } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media", // Assuming you have a media collection for handling uploads
			required: true,
		},
		{
			name: "link",
			type: "text",
			required: false,
		},
		{
			name: "date",
			type: "date",
			required: true,
		},
	],
};

export default Projects;
