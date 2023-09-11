import { ValidationError } from '@/api';
import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.too_small) {
        if (issue.minimum === 1) {
            if (issue.type === 'string') {
            }
        }
    }

    return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

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

export * from './auth.schema';
export * from './forms.schema';
