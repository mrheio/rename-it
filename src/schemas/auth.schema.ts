import { z } from 'zod';

export const refreshRequestSchema = z.object({
    refresh_token: z.string(),
});
