import { z } from 'zod';
import { apiSchemasManager } from '../api.schema';

const postAuthorSchema = z.object({
    '@id': z.string(),
    name: z.string(),
});

const postMediaSchema = z.object({
    contentType: z.string().nullable().optional(),
    url: z.string().nullable().optional(),
});

const postSchema = z.object({
    '@id': z.string(),
    title: z.string(),
    author: postAuthorSchema,
    communityId: z.string(),
    linkedUrl: z.string().nullable().optional(),
    markdown: z.string(),
    media: postMediaSchema,
    upvotes: z.number(),
    downvotes: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable(),
    deletedAt: z.string().datetime().nullable(),
});

const postRequestSchema = z.object({
    linkedUrl: z.string(),
    markdown: z.string(),
    media: postMediaSchema,
    title: z.string(),
});

export const postSchemasManager = {
    post: postSchema,
    requestBody: { post: postRequestSchema },
    responseBody: { list: apiSchemasManager.responseBody.list(postSchema) },
};
