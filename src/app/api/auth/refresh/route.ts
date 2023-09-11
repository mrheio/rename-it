import { AuthError, AuthSuccess } from '@/api';
import { refresh } from '@/server';
import { CookieKey } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const contentType = request.headers.get('Content-Type');
    let requestBody = null;

    if (contentType === 'application/json') {
        requestBody = await request.json();
    }

    const refreshToken =
        requestBody?.refresh_token ??
        request.cookies.get(CookieKey.RefreshToken)?.value;

    if (!refreshToken) {
        return AuthError.unauthorized().toNextResponse();
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refresh(refreshToken);

    const success = AuthSuccess.refresh(newAccessToken, newRefreshToken);
    const response = success.toNextResponse();

    const options = { httpOnly: true };

    response.cookies.set(CookieKey.AccessToken, newAccessToken, options);
    response.cookies.set(CookieKey.RefreshToken, newRefreshToken, options);

    return response;
};
