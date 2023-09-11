import { AppError, AuthSuccess } from '@/api';
import { registerRequestSchema, validateData } from '@/schemas';
import { register } from '@/server';
import { CookieKey } from '@/utils';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
    const requestData = await request.json();

    const [parsedData, parsingError] = validateData(
        requestData,
        registerRequestSchema
    );

    if (parsingError) {
        return parsingError.toNextResponse();
    }

    try {
        const { accessToken, refreshToken } = await register(parsedData);

        const success = AuthSuccess.register(accessToken, refreshToken);
        const response = success.toNextResponse();

        const options = { httpOnly: true };

        response.cookies.set(CookieKey.AccessToken, accessToken, options);
        response.cookies.set(CookieKey.RefreshToken, refreshToken, options);

        return response;
    } catch (e) {
        return AppError.throwOrToNextResponse(e);
    }
};
