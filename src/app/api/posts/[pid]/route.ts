import { AppError, PostsSuccess } from '@/api';
import { NextRequest } from 'next/server';
import { getPost } from '../posts.service';

export const GET = async (request: NextRequest, context) => {
    const { pid } = context.params;

    try {
        const post = await getPost(pid);

        return PostsSuccess.getOne(post).toNextResponse();
    } catch (e) {
        return AppError.maybeThrow(e);
    }
};
