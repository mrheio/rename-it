import { AuthError, AuthSuccess } from '@/api';
import { getServerSession } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    try {
        const session = await getServerSession(request);
        return AuthSuccess.session(session).toNextResponse();
    } catch (e) {
        return AuthError.unauthorized().toNextResponse();
    }
};
