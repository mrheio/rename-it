import { UserError } from '@/api';
import { prisma } from './db';

export const getUser = async (uid: string) => {
    const user = await prisma.user.findUnique({ where: { id: uid } });

    if (!user) {
        throw UserError.notFound({ id: uid });
    }

    return user;
};
