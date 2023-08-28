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

    static missingRefreshToken() {
        return new MissingRefreshTokenError();
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
