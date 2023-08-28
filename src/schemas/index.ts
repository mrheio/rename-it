export * from './api.schema';
export * from './auth';
export * from './comment';
export * from './community';
export * from './post';
export * from './user';

import { ValidationError } from '@/api';
import { z } from 'zod';
import './error';

export const validateData = <T>(
    data: any,
    schema: z.ZodSchema<T>
): [null, ValidationError] | [T, null] => {
    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
        const error = ValidationError.fromZodError(parseResult.error);
        return [null, error];
    }

    return [parseResult.data, null];
};
