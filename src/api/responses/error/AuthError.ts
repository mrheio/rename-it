import { STATUS_CODES } from '../../constants';
import AppError from './AppError';

export default abstract class AuthError extends AppError {
    static unauthorized() {
        return new UnauthorizedError();
    }
}

class UnauthorizedError extends AuthError {
    constructor() {
        super({
            code: STATUS_CODES.UNAUTHORIZED,
            message: 'Unauthorized request.',
        });
    }
}
