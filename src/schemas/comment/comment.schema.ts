import { z } from 'zod';
import { apiSchemasManager } from '../api.schema';

const authorSchema = z.object({
    '@id': z.string(),
    name: z.string(),
});

const commentSchema = z.object({
    '@id': z.string(),
    author: authorSchema,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable().optional(),
    deletedAt: z.string().datetime().nullable().optional(),
    markdown: z.string(),
    parentId: z.string().nullable().optional(),
    postId: z.string(),
});

const commentRequestSchema = z.object({
    markdown: z.string(),
});

export const commentSchemasManager = {
    comment: commentSchema,
    requestBody: { comment: commentRequestSchema },
    responseBody: { list: apiSchemasManager.responseBody.list(commentSchema) },
};
