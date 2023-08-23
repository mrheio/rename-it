import { z } from 'zod';

const authSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresAt: z.string().datetime(),
});

const meSchema = z.object({
    id: z.string(),
    username: z.string(),
    activated: z.boolean(),
    banned: z.boolean(),
    isAdmin: z.boolean(),
    isModeratorFor: z.array(z.string()),
    locked: z.boolean(),
});

const loginRequestSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const registerRequestSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string(),
});

const refreshRequestSchema = z.object({
    refresh_token: z.string(),
});

export const authSchemasManager = {
    auth: authSchema,
    me: meSchema,
    requestBody: {
        login: loginRequestSchema,
        register: registerRequestSchema,
        refresh: refreshRequestSchema,
    },
};
