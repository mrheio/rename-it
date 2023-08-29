import { STATUS_CODES } from '../constants';
import AppError from './AppError';

type AuthErrorProps = {
    code?: number;
    message?: string;
    details?: unknown;
};

export default abstract class AuthError extends AppError {
    constructor(props: AuthErrorProps) {
        super({
            code: props.code,
            message: props.message ?? 'Authentication failed.',
            details: props.details,
        });
    }

    static missingAccessToken() {
        return new MissingAccessTokenError();
    }

    static missingRefreshToken() {
        return new MissingRefreshTokenError();
    }

    static sessionExpired() {
        return new SessionExpiredError();
    }
}

class MissingAccessTokenError extends AuthError {
    constructor() {
        super({
            code: STATUS_CODES.BAD_REQUEST,
            message: 'Missing access token. No session available.',
        });
    }
}

class MissingRefreshTokenError extends AuthError {
    constructor() {
        super({
            code: STATUS_CODES.UNAUTHORIZED,
            message: 'No refresh token provided.',
        });
    }
}

class SessionExpiredError extends AuthError {
    constructor() {
        super({
            code: STATUS_CODES.BAD_REQUEST,
            message: 'Session has expired.',
        });
    }
}
