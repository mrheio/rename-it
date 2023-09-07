import { PostsSuccess } from '@/api';
import { getPosts } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    const posts = await getPosts();

    return PostsSuccess.get(posts).toNextResponse();
};
