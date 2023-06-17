import { z } from 'zod';
import { authSchemasManager } from './auth.schema';

export type Auth = z.infer<typeof authSchemasManager.auth>;

export type Me = z.infer<typeof authSchemasManager.me>;

export type LoginRequestBody = z.infer<
    typeof authSchemasManager.requestBody.login
>;

export type RefreshRequestBody = z.infer<
    typeof authSchemasManager.requestBody.refresh
>;

export type RegisterRequestBody = z.infer<
    typeof authSchemasManager.requestBody.register
>;
