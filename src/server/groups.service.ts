import { prisma } from './db';

export const getUserGroups = async (uid: string) => {
    const groups = await prisma.group.findMany({
        where: { members: { some: { id: uid } } },
    });

    return groups;
};
