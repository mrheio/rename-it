import { z } from 'zod';
import { AppErrorProps } from '../../types';
import AppError from './AppError';

export default class ValidationError extends AppError {
    constructor(props: AppErrorProps) {
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
