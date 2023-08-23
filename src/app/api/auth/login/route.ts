import { SuccessResponse } from '@/api';
import { authSchemasManager } from '@/schemas';
import { checkIsSamePass, signJwt } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../db';

export const POST = async (request: NextRequest) => {
    const requestData = await request.json();

    const parsedData =
        authSchemasManager.requestBody.login.safeParse(requestData);

    if (!parsedData.success) {
        throw parsedData.error;
    }

    const potentialUser = await prisma.user.findUnique({
        where: { username: parsedData.data.username },
    });

    if (potentialUser) {
        const passwordMatch = await checkIsSamePass(
            parsedData.data.password,
            potentialUser.password
        );

        if (passwordMatch) {
            const { id, username, email } = potentialUser;

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

            const payload = {
                access_token: accessToken,
                refresh_token: refreshToken,
            };

            const response = NextResponse.json(
                new SuccessResponse({ message: 'User signed in', payload })
            );

            response.cookies
                .set({ name: 'access_token', value: payload.access_token })
                .set({ name: 'refresh_token', value: payload.refresh_token });

            return response;
        }
    }
};
