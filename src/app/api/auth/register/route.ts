import { AppError, AuthSuccess } from '@/api';
import { registerFormSchema, validateData } from '@/schemas';
import { register } from '@/server';
import { CookieKey } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const requestData = await request.json();

    const [parsedData, parsingError] = validateData(
        requestData,
        registerFormSchema
    );

    if (parsingError) {
        return parsingError.toNextResponse();
    }

    try {
        const { accessToken, refreshToken } = await register(parsedData);

        const success = AuthSuccess.register(accessToken, refreshToken);
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
