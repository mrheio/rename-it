import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '../config';
import { myfetch } from './myfetch';
import {
    AUTH_ROUTES_LIST,
    PROTECTED_ROUTES_LIST,
    ROUTES,
    ROUTES_LIST,
} from './router';
import { CookieKey, didTokenExpire } from './utils';

const log = (request: NextRequest) => {
    const isPage = ROUTES_LIST.includes(request.nextUrl.pathname);

    console.log(
        `\x1b[1m${new Date(Date.now()).toISOString()} - ${request.method} - ${
            request.url
        } - Is page: ${isPage}\x1b[22m`
    );
};

const HomeRedirect = (request: NextRequest) =>
    NextResponse.redirect(new URL(ROUTES.PUBLIC.HOME, request.url));

const LoginRedirect = (request: NextRequest) =>
    NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, request.url));

export const middleware = async (request: NextRequest) => {
    log(request);
    console.log(request.cookies.toString());

    const response = NextResponse.next();
    const { pathname } = request.nextUrl;
    const isPage = ROUTES_LIST.includes(pathname);

    if (isPage) {
        const accessToken = request.cookies.get(CookieKey.AccessToken)?.value;
        const refreshToken = request.cookies.get(CookieKey.RefreshToken)?.value;

        console.log('-- Access Token: ', accessToken);
        console.log('-- Refresh Token: ', refreshToken);

        if (!accessToken || !refreshToken) {
            const isProtectedRoute = PROTECTED_ROUTES_LIST.includes(pathname);
            if (isProtectedRoute) {
                console.log('Protected Route. Access Token missing.');
                return LoginRedirect(request);
            }

            return response;
        }

        const isAccessTokenActive = !didTokenExpire(accessToken);

        console.log('-- Access Token Active: ', isAccessTokenActive);

        if (!isAccessTokenActive) {
            const session = await myfetch(`${CONFIG.API_URL}/auth/refresh`)
                .POST()
                .json({ refresh_token: refreshToken })
                .data();

            console.log('---- New Session: ', session);

            const retry = NextResponse.redirect(new URL(request.url));

            retry.cookies.set(CookieKey.AccessToken, session.access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });
            retry.cookies.set(CookieKey.RefreshToken, session.refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });

            return retry;
        }

        if (AUTH_ROUTES_LIST.includes(pathname)) {
            console.log('-- Session already active. Redirecting to home.');
            return HomeRedirect(request);
        }
    }

    return response;
};

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
