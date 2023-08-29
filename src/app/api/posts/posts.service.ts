import { PostsError } from '@/api';
import { prisma } from '../db';

export const getPosts = async () => {
    const posts = await prisma.post.findMany();

    return posts;
};

export const getPost = async (id: string) => {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
        throw PostsError.notFound(id);
    }

    return post;
};
