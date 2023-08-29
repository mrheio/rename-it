import { AppError, AuthSuccess } from '@/api';
import { loginRequestSchema, validateData } from '@/schemas';
import { NextRequest } from 'next/server';
import { login, setAuthCookies } from '../auth.service';

export const POST = async (request: NextRequest) => {
    try {
        const requestData = await request.json();

        const [parsedData, parsingError] = validateData(
            requestData,
            loginRequestSchema
        );

        if (parsingError) {
            return parsingError.toNextResponse();
        }

        const [accessToken, refreshToken, exp] = await login(parsedData);

        const response = AuthSuccess.login(
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
