import { STATUS_CODES } from '@/utils';
import AppError from './AppError';

export default abstract class AuthError extends AppError {
    static missingAccessToken() {
        return new MissingAccessTokenError();
    }

    static missingRefreshToken() {
        return new MissingRefreshTokenError();
    }

    static sessionExpired() {
        return new SessionExpiredError();
    }

    static missingSession() {
        return new MissingSessionError();
    }

    static unauthorized() {
        return new UnauthorizedError();
    }

    static isSessionExpiredError(error: unknown): error is SessionExpiredError {
        return error instanceof SessionExpiredError;
    }
}

class MissingAccessTokenError extends AuthError {
    constructor() {
        super({
            code: STATUS_CODES.UNAUTHORIZED,
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
            code: STATUS_CODES.UNAUTHORIZED,
            message: 'Session has expired.',
        });
    }
}

class MissingSessionError extends AuthError {
    constructor() {
        super({ code: STATUS_CODES.NOT_FOUND, message: 'No auth session.' });
    }
}

class UnauthorizedError extends AuthError {
    constructor() {
        super({
            code: STATUS_CODES.UNAUTHORIZED,
            message: 'Unauthorized request',
        });
    }
}
