import { z } from 'zod';
import { apiSchemasManager } from '../api.schema';

const communitySchema = z.object({
    '@id': z.string(),
    name: z.string(),
    rules: z.string(),
    slug: z.string(),
    wiki: z.string(),
    description: z.string(),
    domain: z.string().nullable(),
    coverUrl: z.string().nullable(),
    iconUrl: z.string().nullable(),
    members: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().nullable(),
    deletedAt: z.string().datetime().nullable(),
});

const communityStatisticsSchema = z.object({
    commentsAllTime: z.number(),
    commentsLastDay: z.number(),
    commentsLastMonth: z.number(),
    commentsLastWeek: z.number(),
    commentsLastYear: z.number(),
    postsAllTime: z.number(),
    postsLastDay: z.number(),
    postsLastMonth: z.number(),
    postsLastWeek: z.number(),
    postsLastYear: z.number(),
    viewsAllTime: z.number(),
    viewsLastDay: z.number(),
    viewLastMonth: z.number(),
    viewsLastWeek: z.number(),
    viewsLastYear: z.number(),
});

const detailedCommunitySchema = communitySchema.extend({
    statistics: communityStatisticsSchema,
});

const communityRequestSchema = z.object({
    coverUrl: z.string(),
    description: z.string(),
    iconUrl: z.string(),
    name: z.string(),
    rules: z.string(),
    slug: z.string(),
    wiki: z.string(),
});

export const communitySchemasManager = {
    community: communitySchema,
    communityStatistics: communityStatisticsSchema,
    detailedCommunity: detailedCommunitySchema,
    requestBody: { community: communityRequestSchema },
    responseBody: {
        list: apiSchemasManager.responseBody.list(communitySchema),
    },
};
