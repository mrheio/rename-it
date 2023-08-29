import { z } from 'zod';
import {
    loginRequestSchema,
    refreshRequestSchema,
    registerRequestSchema,
} from './auth.schema';

export type LoginRequestBody = z.infer<typeof loginRequestSchema>;

export type RefreshRequestBody = z.infer<typeof refreshRequestSchema>;

export type RegisterRequestBody = z.infer<typeof registerRequestSchema>;
