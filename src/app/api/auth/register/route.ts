import { SuccessResponse } from '@/api';
import { authSchemasManager } from '@/schemas';
import { hashPass, signJwt } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../db';

export const POST = async (request: NextRequest) => {
    const requestData = await request.json();

    const parsedData =
        authSchemasManager.requestBody.register.safeParse(requestData);

    if (!parsedData.success) {
        throw parsedData.error;
    }

    const hashedPassword = await hashPass(parsedData.data.password);

    const data = {
        email: parsedData.data.email,
        username: parsedData.data.username,
        password: hashedPassword,
    };

    const insertedUser = await prisma.user.create({ data });

    const { id, email, username } = insertedUser;

    const accessToken = await signJwt(
        { sub: id, email, username },
        {
            exp: `${process.env.JWT_EXPIRES_IN}m`,
            secret: process.env.JWT_SECRET,
        }
    );

    const refreshToken = await signJwt(
        { id },
        { exp: '30d', secret: process.env.JWT_SECRET }
    );

    const payload = { access_token: accessToken, refresh_token: refreshToken };

    const response = NextResponse.json(
        new SuccessResponse({ message: 'User registered', payload })
    );

    response.cookies
        .set({ name: 'access_token', value: payload.access_token })
        .set({ name: 'refresh_token', value: payload.refresh_token });

    return response;
};
