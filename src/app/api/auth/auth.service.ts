import {
    ACCESS_TOKEN_KEY,
    AuthError,
    REFRESH_TOKEN_KEY,
    UserError,
} from '@/api';
import { LoginRequestBody, RegisterRequestBody } from '@/schemas';
import { checkIsSamePass, hashPass, signJwt, verifyJwt } from '@/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';
import { CONFIG } from '../../../../config';
import { prisma } from '../db';

const handleError = (e: unknown) => {
    if (e instanceof PrismaClientKnownRequestError) {
        throw UserError.fromPrismaError(e);
    }

    throw e;
};

const getAuthJwts = async (user): Promise<[string, string, number]> => {
    const { id, username, email } = user;

    const accessToken = await signJwt(
        { sub: id, email, username },
        {
            exp: `${CONFIG.JWT_EXPIRES_IN}m`,
            secret: CONFIG.JWT_SECRET,
        }
    );

    const refreshToken = await signJwt(
        { id },
        { exp: '30d', secret: CONFIG.JWT_SECRET }
    );

    const exp = Date.now() + parseInt(CONFIG.JWT_EXPIRES_IN) * 60 * 1000;

    return [accessToken, refreshToken, exp];
};

export const register = async (
    data: RegisterRequestBody
): Promise<[string, string, number]> => {
    const hashedPassword = await hashPass(data.password);

    try {
        const insertedUser = await prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hashedPassword,
            },
        });

        const jwts = await getAuthJwts(insertedUser);

        return jwts;
    } catch (e) {
        return handleError(e);
    }
};

export const login = async (
    data: LoginRequestBody
): Promise<[string, string, number]> => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: data.username },
        });

        if (!user) {
            throw UserError.notFound();
        }

        const doPasswordsMatch = await checkIsSamePass(
            data.password,
            user.password
        );

        if (!doPasswordsMatch) {
            throw UserError.notFound();
        }

        return getAuthJwts(user);
    } catch (e) {
        return handleError(e);
    }
};

export const refresh = async (
    refreshToken: string
): Promise<[string, string, number]> => {
    const decoded = await verifyJwt(refreshToken, CONFIG.JWT_SECRET);

    const user = await prisma.user.findUnique({
        where: { id: decoded.payload.id as string },
    });

    return getAuthJwts(user);
};

export const setAuthCookies = (
    response: NextResponse,
    cookies: { accessToken: string; refreshToken: string }
) => {
    response.cookies
        .set({ name: ACCESS_TOKEN_KEY, value: cookies.accessToken })
        .set({ name: REFRESH_TOKEN_KEY, value: cookies.refreshToken });
};

export const getSession = async (acccessToken: string) => {
    try {
        const decoded = await verifyJwt(acccessToken, CONFIG.JWT_SECRET);

        return decoded.payload;
    } catch (e) {
        throw AuthError.sessionExpired();
    }
};
