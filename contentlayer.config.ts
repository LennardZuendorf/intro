import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'

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

export default makeSource({
    contentDirPath: './data',
    documentTypes: [Project],
})