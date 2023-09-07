import { AuthError, AuthSuccess } from '@/api';
import { refresh } from '@/server';
import { CookiesManager } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const refreshToken = CookiesManager.refreshToken.value(request);

    if (!refreshToken) {
        return AuthError.missingRefreshToken().toNextResponse();
    }

    const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        exp,
    } = await refresh(refreshToken);

    const response = AuthSuccess.refresh(
        newAccessToken,
        newRefreshToken,
        exp
    ).toNextResponse();

    response.cookies
        .set({
            name: CookiesManager.accessToken.name,
            value: newAccessToken,
            httpOnly: true,
        })
        .set({
            name: CookiesManager.refreshToken.name,
            value: newRefreshToken,
            httpOnly: true,
        })
        .set({
            name: CookiesManager.expiryTime.name,
            value: exp.toString(),
        });

    return response;
};
