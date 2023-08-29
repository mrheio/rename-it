import { PostsSuccess } from '@/api';
import { NextRequest } from 'next/server';
import { getPosts } from './posts.service';

export const GET = async (request: NextRequest) => {
    const posts = await getPosts();

    return PostsSuccess.get(posts).toNextResponse();
};
