import { prisma } from './db';

export const getPostComments = async (pid: string) => {
    const comments = await prisma.comment.findMany({ where: { post_id: pid } });

    return comments;
};
