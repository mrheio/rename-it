import { NextRequest } from 'next/server';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXP_TIME_KEY = 'exp';

const getCookie = (name: string) => (request: NextRequest) => {
    const cookie = request.cookies.get(name);
    return cookie?.value;
};

export const CookiesManager = {
    accessToken: { name: ACCESS_TOKEN_KEY, value: getCookie(ACCESS_TOKEN_KEY) },
    refreshToken: {
        name: REFRESH_TOKEN_KEY,
        value: getCookie(REFRESH_TOKEN_KEY),
    },
    expiryTime: { name: EXP_TIME_KEY, value: getCookie(EXP_TIME_KEY) },
};
