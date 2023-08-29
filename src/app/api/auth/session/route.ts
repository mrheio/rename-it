import { ACCESS_TOKEN_KEY, AppError, AuthError, AuthSuccess } from '@/api';
import { NextRequest } from 'next/server';
import { getSession } from '../auth.service';

export const GET = async (request: NextRequest) => {
    const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

    if (!accessToken) {
        return AuthError.missingAccessToken().toNextResponse();
    }

    try {
        const session = await getSession(accessToken);

        const response = AuthSuccess.session(session).toNextResponse();

        return response;
    } catch (e) {
        return AppError.maybeThrow(e);
    }
};
