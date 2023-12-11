import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Project = defineDocumentType(() => ({
    name: 'Project',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
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
        description: {
            type: 'string',
            required: true,
        },
        tags: {
            type: 'list',
            of: {
                type: 'string',
            },
        },
        lastmod: {
            type: 'date',
            required: true
        },
        github: {
            type: 'string',
        },
        link: {
            type: 'string',
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (doc) => `/projects/${doc._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'projects',
    documentTypes: [Project],
})