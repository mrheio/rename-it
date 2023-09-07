import { AppError, UsersSuccess } from '@/api';
import { getUser } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, context) => {
    const { uid } = context.params;

    try {
        const user = await getUser(uid);

        return UsersSuccess.getOne(user).toNextResponse();
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
