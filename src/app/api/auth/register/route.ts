import { AppError, AuthSuccess } from '@/api';
import { registerRequestSchema, validateData } from '@/schemas';
import { NextRequest } from 'next/server';
import { register, setAuthCookies } from '../auth.service';

export const POST = async (request: NextRequest) => {
    try {
        const requestData = await request.json();

        const [parsedData, parsingError] = validateData(
            requestData,
            registerRequestSchema
        );

        if (parsingError) {
            return parsingError.toNextResponse();
        }

        const [accessToken, refreshToken, exp] = await register(parsedData);

        const response = AuthSuccess.register(
            accessToken,
            refreshToken,
            exp
        ).toNextResponse();

        setAuthCookies(response, { accessToken, refreshToken });

        return response;
    } catch (e) {
        return AppError.maybeThrow(e);
    }
};
