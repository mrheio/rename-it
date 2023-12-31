import { AppError, AuthSuccess } from '@/api';
import { loginFormSchema, validateData } from '@/schemas';
import { login } from '@/server';
import { CookieKey } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    let requestData = null;

    requestData = await request.json();

    const [parsedData, parsingError] = validateData(
        requestData,
        loginFormSchema
    );

    if (parsingError) {
        return parsingError.toNextResponse();
    }

    try {
        const { accessToken, refreshToken } = await login(parsedData);

        const success = AuthSuccess.login(accessToken, refreshToken);
        const response = success.toNextResponse();

        response.cookies.set(CookieKey.AccessToken, accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        response.cookies.set(CookieKey.RefreshToken, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return response;
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
