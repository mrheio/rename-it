import { AuthSuccess } from '@/api';
import { CookiesManager } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const response = AuthSuccess.logout().toNextResponse();

    response.cookies
        .set({
            name: CookiesManager.accessToken.name,
            value: '',
            httpOnly: true,
        })
        .set({
            name: CookiesManager.refreshToken.name,
            value: '',
            httpOnly: true,
        })
        .set({
            name: CookiesManager.expiryTime.name,
            value: '',
        })
        .delete(CookiesManager.accessToken.name)
        .delete(CookiesManager.refreshToken.name)
        .delete(CookiesManager.expiryTime.name);

    return response;
};
