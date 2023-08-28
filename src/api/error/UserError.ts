import { STATUS_CODES } from '@/api';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PRISMA_ERROR_CODES } from '../../../prisma/codes';
import AppError from './AppError';

type UserErrorProps = {
    code?: number;
    message?: string;
    details?: unknown;
};

export default abstract class UserError extends AppError {
    constructor(props: UserErrorProps) {
        super({
            code: props.code,
            message: props.message ?? 'Unknown user error',
            details: props.details,
        });
    }

    static emailTaken(email?: string) {
        return new UserEmailTakenError(email);
    }

    static usernameTaken(username?: string) {
        return new UserUsernameTakenError(username);
    }

    static notFound(credentials?: unknown) {
        return new UserNotFoundError(credentials);
    }

    static fromPrismaError(error: PrismaClientKnownRequestError) {
        if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION) {
            if (Array.isArray(error.meta?.target)) {
                if (error.meta?.target.includes('email')) {
                    return this.emailTaken();
                }
                if (error.meta?.target.includes('username')) {
                    return this.usernameTaken();
                }
            }
        }

        throw error;
    }
}

class UserEmailTakenError extends UserError {
    constructor(email?: string) {
        super({
            message: 'A user with this email already exists.',
            details: email ? { email } : null,
        });
    }
}

class UserUsernameTakenError extends UserError {
    constructor(username?: string) {
        super({
            message: 'A user with this username already exists.',
            details: username ? { username } : null,
        });
    }
}

class UserNotFoundError extends UserError {
    constructor(credentials?: unknown) {
        super({
            code: STATUS_CODES.NOT_FOUND,
            message: 'A user with these credentials does not exist.',
            details: credentials ? { credentials } : null,
        });
    }
}
