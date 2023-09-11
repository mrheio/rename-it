import { AppError, AuthSuccess } from '@/api';
import { loginRequestSchema, validateData } from '@/schemas';
import { login } from '@/server';
import { CookieKey } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    let requestData = null;

    requestData = await request.json();

    const [parsedData, parsingError] = validateData(
        requestData,
        loginRequestSchema
    );

    if (parsingError) {
        return parsingError.toNextResponse();
    }

    try {
        const { accessToken, refreshToken } = await login(parsedData);

        const success = AuthSuccess.login(accessToken, refreshToken);
        const response = success.toNextResponse();

        const options = {
            httpOnly: true,
        };

        response.cookies.set(CookieKey.AccessToken, accessToken, options);
        response.cookies.set(CookieKey.RefreshToken, refreshToken, options);

        return response;
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
