import { CommentsSuccess } from '@/api';
import { getPostComments } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, context) => {
    const { pid } = context.params;

    const comments = await getPostComments(pid);

    return CommentsSuccess.get(comments).toNextResponse();
};
