import { AuthError, UserError } from '@/api';
import { LoginRequestBody, RegisterRequestBody } from '@/schemas';
import { checkIsSamePass, hashPass, verifyJwt } from '@/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CONFIG } from '../../config';
import { prisma } from './db';

import { CookiesManager, signJwt } from '@/utils';
import { errors } from 'jose';
import { NextRequest } from 'next/server';

export const generateJwts = async (payload) => {
    const accessTokenOptions = {
        exp: `${CONFIG.JWT_EXPIRES_IN}m`,
        secret: CONFIG.JWT_SECRET,
    };

    const accessToken = await signJwt(payload, accessTokenOptions);

    const refreshTokenOptions = {
        exp: `30d`,
        secret: CONFIG.JWT_SECRET,
    };

    const refreshToken = await signJwt({ id: payload.id }, refreshTokenOptions);

    const exp = Date.now() + parseInt(CONFIG.JWT_EXPIRES_IN) * 60 * 1000;

    return { accessToken, refreshToken, exp };
};

export const getServerSession = async (request: NextRequest) => {
    const accessToken = CookiesManager.accessToken.value(request);

    if (!accessToken) {
        return null;
    }

    try {
        const decoded = await verifyJwt(accessToken, CONFIG.JWT_SECRET);
        return decoded.payload;
    } catch (e) {
        if (e instanceof errors.JWTExpired) {
            return null;
        }

        throw e;
    }
};

export const register = async (data: RegisterRequestBody) => {
    const hashedPassword = await hashPass(data.password);

    try {
        const insertedUser = await prisma.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hashedPassword,
            },
        });

        return generateJwts({
            id: insertedUser.id,
            username: insertedUser.username,
        });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            throw UserError.fromPrismaError(e);
        }

        throw e;
    }
};

export const login = async (data: LoginRequestBody) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: data.username },
        });

        if (!user) {
            throw AuthError.unauthorized();
        }

        const doPasswordsMatch = await checkIsSamePass(
            data.password,
            user.password
        );

        if (!doPasswordsMatch) {
            throw UserError.notFound();
        }

        return generateJwts({
            id: user.id,
            username: user.username,
        });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            throw UserError.fromPrismaError(e);
        }

        throw e;
    }
};

export const refresh = async (refreshToken: string) => {
    const decoded = await verifyJwt(refreshToken, CONFIG.JWT_SECRET);

    const user = await prisma.user.findUnique({
        where: { id: decoded.payload.id as string },
    });

    if (!user) {
        throw UserError.notFound();
    }

    return generateJwts({
        id: user.id,
        username: user.username,
    });
};
