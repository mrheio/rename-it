import { z } from 'zod';

const userSchema = z.object({
    '@id': z.string(),
    avatarUrl: z.string(),
    bio: z.string(),
    email: z.string(),
    name: z.string(),
    password: z.string(),
    slug: z.string(),
});

export const userSchemasManager = {
    user: userSchema,
};
