import { CollectionSlug, type GlobalConfig } from "payload";

export const Nav: GlobalConfig = {
	slug: "nav",
	fields: [
		{
			name: "items",
			type: "array",
			required: true,
			maxRows: 8,
			fields: [
				{
					name: "description",
					type: "text",
					required: true,
				},
				{
					name: "label",
					type: "text",
					required: true,
				},
				{
					name: "href",
					type: "text",
					required: true,
				},
			],
		},
	],
};

export const SiteMetadata: GlobalConfig = {
	slug: "site-metadata",
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "text",
			required: true,
		},
		{
			name: "headerTitle",
			type: "text",
			required: true,
		},
		{
			name: "language",
			type: "text",
			required: true,
		},
		{
			name: "theme",
			type: "text",
			required: true,
		},
		{
			name: "siteUrl",
			type: "text",
			required: true,
		},
		{
			name: "siteLogo",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "image",
			type: "text",
			required: true,
		},
		{
			name: "socialBanner",
			type: "text",
			required: true,
		},
		{
			name: "locale",
			type: "text",
			required: true,
		},
	],
};
