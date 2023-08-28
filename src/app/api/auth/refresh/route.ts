import { AuthError, AuthSuccess, REFRESH_TOKEN_KEY } from '@/api';
import { NextRequest, NextResponse } from 'next/server';
import { refresh, setAuthCookies } from '../auth.service';

export const POST = async (request: NextRequest) => {
    const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

    if (!refreshToken) {
        const responseBody = AuthError.missingRefreshToken();
        return NextResponse.json(responseBody, {
            status: responseBody.code,
        });
    }

    const [newAccessToken, newRefreshToken, exp] = await refresh(refreshToken);

    const responseBody = AuthSuccess.refresh({
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        exp,
    });

    const response = NextResponse.json(responseBody, {
        status: responseBody.code,
    });

    setAuthCookies(response, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    });

    return response;
};
