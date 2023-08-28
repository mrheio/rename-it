import { z } from 'zod';
import AppError from './AppError';

type ValidationErrorProps = {
    message?: string;
    details?: unknown;
};

export default class ValidationError extends AppError {
    constructor(props: ValidationErrorProps) {
        super({
            message: props.message ?? 'Error when validating data.',
            details: props.details ?? null,
        });
    }

    static fromZodError<T>(zodError: z.ZodError<T>) {
        const formattedError = zodError.format();

        return new ValidationError({ details: { ...formattedError } });
    }
}
