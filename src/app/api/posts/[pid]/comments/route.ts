import { CommentsSuccess } from '@/api';
import { NextRequest } from 'next/server';
import { getPostComments } from './comments.service';

export const GET = async (request: NextRequest, context) => {
    const { pid } = context.params;

    const comments = await getPostComments(pid);

    return CommentsSuccess.get(comments).toNextResponse();
};
