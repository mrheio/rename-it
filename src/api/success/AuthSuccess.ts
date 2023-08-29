import { STATUS_CODES } from '../constants';
import AppSuccess from './AppSuccess';

type AppSuccessProps = {
    code?: number;
    message: string;
    payload?: unknown;
};

export default abstract class AuthSuccess extends AppSuccess {
    payload: unknown;

    constructor(props: AppSuccessProps) {
        super({
            code: props.code,
            message: props.message ?? 'Authentication succeeded.',
            payload: props.payload,
        });
    }

    static register(accessToken: string, refreshToken: string, exp: number) {
        return new RegisterSuccess({
            access_token: accessToken,
            refresh_token: refreshToken,
            exp,
        });
    }

    static login(accessToken: string, refreshToken: string, exp: number) {
        return new LoginSuccess({
            access_token: accessToken,
            refresh_token: refreshToken,
            exp,
        });
    }

    static refresh(accessToken: string, refreshToken: string, exp: number) {
        return new RefreshSuccess({
            access_token: accessToken,
            refresh_token: refreshToken,
            exp,
        });
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
}

class LoginSuccess extends AuthSuccess {
    constructor(payload?: unknown) {
        super({
            code: STATUS_CODES.CREATED,
            message: 'User signed in.',
            payload,
        });
    }
}

class RefreshSuccess extends AuthSuccess {
    constructor(payload?: unknown) {
        super({
            code: STATUS_CODES.CREATED,
            message: 'Auth tokens refreshed.',
            payload,
        });
    }
}
