import { AppError, PostsSuccess } from '@/api';
import { getPost } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, context) => {
    const { pid } = context.params;

    try {
        const post = await getPost(pid);

        return PostsSuccess.getOne(post).toNextResponse();
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
