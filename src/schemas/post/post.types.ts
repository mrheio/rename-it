import { z } from 'zod';
import { postSchemasManager } from './post.schema';

export type Post = z.infer<typeof postSchemasManager.post>;

export type PostRequestBody = z.infer<
    typeof postSchemasManager.requestBody.post
>;
