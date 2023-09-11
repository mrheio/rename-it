import { AuthError, AuthSuccess } from '@/api';
import { CookieKey, verifyJwt } from '@/utils';
import { NextRequest } from 'next/server';
import { CONFIG } from '../../../../../config';

export const POST = async (request: NextRequest) => {
    const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;

    if (!accessToken) {
        return AuthError.unauthorized().toNextResponse();
    }

    try {
        await verifyJwt(accessToken, CONFIG.JWT_SECRET);
    } catch (e) {
        // TODO: check if it should do something if token verification fails
        // if (e instanceof errors.JWTExpired) {
        //     return AuthError.unauthorized().toNextResponse();
        // }
    }

    const response = AuthSuccess.logout().toNextResponse();

    response.cookies.delete(CookieKey.AccessToken);
    response.cookies.delete(CookieKey.RefreshToken);

    return response;
};
