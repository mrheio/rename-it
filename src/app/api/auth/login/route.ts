import { AppError, AuthSuccess } from '@/api';
import { loginRequestSchema, validateData } from '@/schemas';
import { login } from '@/server';
import { CookiesManager } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const contentType = request.headers.get('Content-Type');

    let requestData = null;

    if (contentType === 'application/json') {
        requestData = await request.json();
    } else if (contentType === 'application/x-www-form-urlencoded') {
        const formData = await request.formData();
        requestData = {
            username: formData.get('username')?.toString(),
            password: formData.get('password')?.toString(),
        };
    }

    const [parsedData, parsingError] = validateData(
        requestData,
        loginRequestSchema
    );

    if (parsingError) {
        return parsingError.toNextResponse();
    }

    try {
        const { accessToken, refreshToken, exp } = await login(parsedData);

        const response = AuthSuccess.login(
            accessToken,
            refreshToken,
            exp
        ).toNextResponse();

        response.cookies
            .set({
                name: CookiesManager.accessToken.name,
                value: accessToken,
                httpOnly: true,
            })
            .set({
                name: CookiesManager.refreshToken.name,
                value: refreshToken,
                httpOnly: true,
            })
            .set({
                name: CookiesManager.expiryTime.name,
                value: exp.toString(),
            });

        return response;
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
