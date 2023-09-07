import { AuthSuccess } from '@/api';
import { getServerSession } from '@/server';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    console.log({ cookies: request.cookies.get('refresh_token') });

    const session = await getServerSession(request);

    return AuthSuccess.session(session).toNextResponse();
};
