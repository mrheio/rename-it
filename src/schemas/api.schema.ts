import { ZodTypeAny, z } from 'zod';

const apiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    debug: z.any().optional(),
});

const getListResponseBodySchema = <T extends ZodTypeAny>(schema: T) =>
    z.object({
        count: z.number(),
        startIndex: z.number(),
        totalCount: z.number(),
        items: z.array(schema),
    });

export const apiSchemasManager = {
    error: apiErrorSchema,
    responseBody: { list: getListResponseBodySchema },
};
