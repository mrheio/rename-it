import { AppError, AuthSuccess, STATUS_CODES } from '@/api';
import { authSchemasManager, validateData } from '@/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { register, setAuthCookies } from '../auth.service';

export const POST = async (request: NextRequest) => {
    const requestData = await request.json();

    const [parsedData, parsingError] = validateData(
        requestData,
        authSchemasManager.requestBody.register
    );

    if (parsingError) {
        return NextResponse.json(parsingError, {
            status: STATUS_CODES.BAD_REQUEST,
        });
    }

    try {
        const [accessToken, refreshToken, exp] = await register(parsedData);

        const responseBody = AuthSuccess.register({
            access_token: accessToken,
            refresh_token: refreshToken,
            exp,
        });

        const response = NextResponse.json(responseBody, {
            status: responseBody.code,
        });

        setAuthCookies(response, { accessToken, refreshToken });

        return response;
    } catch (e) {
        if (e instanceof AppError) {
            return NextResponse.json(e, { status: e.code });
        }

        throw e;
    }
};
