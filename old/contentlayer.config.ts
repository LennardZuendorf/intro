import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `/projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    images: {
      type: "list",
      of: {
        type: "string",
      },
      required: true,
    },
    focus: {
      type: "boolean",
      required: true,
    },
    active: {
      type: "boolean",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    skill: {
      type: "string",
      required: false,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
    },
    github: {
      type: "string",
      required: false,
    },
    link: {
      type: "string",
      required: false,
    },
  },
  computedFields,
}));

const LegalDoc = defineDocumentType(() => ({
  name: "LegalDoc",
  filePathPattern: `/legal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    language: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

const AboutBlock = defineDocumentType(() => ({
  name: "AboutBlock",
  filePathPattern: `/about/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

// @ts-ignore
export default makeSource({
  contentDirPath: "./data",
  documentTypes: [Project, LegalDoc, AboutBlock],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          test: ["h2", "h3"],
          properties: { class: "heading-link" },
        } satisfies Partial<AutolinkOptions>,
      ],
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            dark: "github-dark",
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
  },
});
