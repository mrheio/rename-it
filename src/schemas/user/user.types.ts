import { z } from 'zod';
import { userSchemasManager } from './user.schema';

export type User = z.infer<typeof userSchemasManager.user>;
