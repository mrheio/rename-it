import { z } from 'zod';

export const authSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresAt: z.string().datetime(),
});

export const meSchema = z.object({
    id: z.string(),
    username: z.string(),
    activated: z.boolean(),
    banned: z.boolean(),
    isAdmin: z.boolean(),
    isModeratorFor: z.array(z.string()),
    locked: z.boolean(),
});

export const loginRequestSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerRequestSchema = z.object({
    email: z.string().trim().min(1).email(),
    username: z.string().trim().min(1),
    password: z.string().trim().min(1),
});

export const refreshRequestSchema = z.object({
    refresh_token: z.string(),
});
