import { NextResponse } from 'next/server';
import { STATUS_CODES } from '../../constants';
import AppSuccess from './AppSuccess';

export default abstract class AuthSuccess extends AppSuccess {
    payload: unknown;

    static register(accessToken: string, refreshToken: string) {
        return new RegisterSuccess({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    }

    static login(accessToken: string, refreshToken: string) {
        return new LoginSuccess({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    }

    static refresh(accessToken: string, refreshToken: string) {
        return new RefreshSuccess({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    }

    static session(payload: unknown) {
        return new SessionSuccess(payload);
    }

    static logout() {
        return new LogoutSuccess();
    }
}

class RegisterSuccess extends AuthSuccess {
    constructor(payload?: unknown) {
        super({
            code: STATUS_CODES.CREATED,
            message: 'User registered.',
            payload,
        });
    }

    toNextResponse(init?: ResponseInit | undefined) {
        return NextResponse.json(
            { ...(this.payload as object) },
            {
                ...init,
                status: this.code,
            }
        );
    }
}

class LoginSuccess extends AuthSuccess {
    constructor(payload?: unknown) {
        super({
            code: STATUS_CODES.OK,
            message: 'User signed in.',
            payload,
        });
    }

    toNextResponse(init?: ResponseInit | undefined) {
        return NextResponse.json(
            { ...(this.payload as object) },
            {
                ...init,
                status: this.code,
            }
        );
    }
}

class RefreshSuccess extends AuthSuccess {
    constructor(payload?: unknown) {
        super({
            code: STATUS_CODES.OK,
            message: 'Auth tokens refreshed.',
            payload,
        });
    }

    toNextResponse(init?: ResponseInit | undefined) {
        return NextResponse.json(
            { ...(this.payload as object) },
            {
                ...init,
                status: this.code,
            }
        );
    }
}

class SessionSuccess extends AuthSuccess {
    constructor(payload: unknown) {
        super({ message: 'Session returned.', payload });
    }
}

class LogoutSuccess extends AuthSuccess {
    constructor() {
        super({ message: 'Session terminated.' });
    }
}
