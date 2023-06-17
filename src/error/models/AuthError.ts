import { AppErrorProps } from '../types';
import AppError from './AppError';

class AuthError extends AppError {
    constructor(props: AppErrorProps) {
        super(props);
    }
}

export class Unauthorized extends AuthError {
    constructor(props: AppErrorProps) {
        super(props);
    }
}

export class InvalidAuthRequest extends AuthError {
    constructor(props: AppErrorProps) {
        super(props);
    }
}
