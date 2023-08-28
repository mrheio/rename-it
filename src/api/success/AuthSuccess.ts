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

    static register(payload?: unknown) {
        return new RegisterSuccess(payload);
    }

    static login(payload?: unknown) {
        return new LoginSuccess(payload);
    }

    static refresh(payload?: unknown) {
        return new RefreshSuccess(payload);
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
