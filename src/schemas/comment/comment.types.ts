import { z } from 'zod';
import { commentSchemasManager } from './comment.schema';

export type Comment = z.infer<typeof commentSchemasManager.comment>;

export type CommentRequestBody = z.infer<
    typeof commentSchemasManager.requestBody.comment
>;
