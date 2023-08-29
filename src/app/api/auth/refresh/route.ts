import { AuthError, AuthSuccess, REFRESH_TOKEN_KEY } from '@/api';
import { NextRequest } from 'next/server';
import { refresh, setAuthCookies } from '../auth.service';

export const POST = async (request: NextRequest) => {
    const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

    if (!refreshToken) {
        return AuthError.missingRefreshToken().toNextResponse();
    }

    const [newAccessToken, newRefreshToken, exp] = await refresh(refreshToken);

    const response = AuthSuccess.refresh(
        newAccessToken,
        newRefreshToken,
        exp
    ).toNextResponse();

    setAuthCookies(response, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    });

    return response;
};
