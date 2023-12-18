import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const computedFields: ComputedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFilePath,
    },
}

const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: `/projects/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        date: {
            type: "date",
            required: true,
        },
        image: {
            type: "string",
            required: true,
        },
        focus:{
            type: 'boolean',
            required: true,
        },
        category:{
            type: 'string',
            required: true,
        },
        icon: {
            type: "string",
            required: false,
        },
        tags: {
            type: 'list',
            of: {
                type: 'string',
            },
        },
        github: {
            type: 'string',
        },
        link: {
            type: 'string',
        },
    },
    computedFields,
}))

const LegalDoc = defineDocumentType(() => ({
name: 'LegalDoc',
    filePathPattern: `/legal/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        language: {
            type: 'string',
            required: true,
        },
    },
    computedFields,
}))

const About = defineDocumentType(() => ({
    name: 'About',
    filePathPattern: `/about/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: './data',
    documentTypes: [Project, LegalDoc, About],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    onVisitLine(node) {
                        if (node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push("line--highlighted")
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ["word--highlighted"]
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
    },
})