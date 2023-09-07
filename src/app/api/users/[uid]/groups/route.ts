import { AppError, GroupsSuccess } from '@/api';
import { getUserGroups } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, context) => {
    const { uid } = context.params;

    try {
        const groups = await getUserGroups(uid);

        return GroupsSuccess.get(groups).toNextResponse();
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
