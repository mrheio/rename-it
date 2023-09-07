import { AppError, AuthSuccess } from '@/api';
import { registerRequestSchema, validateData } from '@/schemas';
import { register } from '@/server';
import { CookiesManager } from '@/utils';
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
        const { accessToken, refreshToken, exp } = await register(parsedData);

        const success = AuthSuccess.register(accessToken, refreshToken, exp);
        const response = success.toNextResponse();

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
