import { AuthError, AuthSuccess } from '@/api';
import { getServerSession } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    const session = await getServerSession(request);

    if (!session) {
        return AuthError.unauthorized().toNextResponse();
    }

    return AuthSuccess.session(session).toNextResponse();
};
