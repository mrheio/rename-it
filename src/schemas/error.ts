import { z } from 'zod';

const REQUIRED_FIELD_MSG = 'Required field';

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
