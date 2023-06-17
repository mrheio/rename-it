import { AUTH_ERROR_CODES } from './auth.codes';
import { COMMENT_ERROR_CODES } from './comment.codes';
import { COMMUNITY_ERROR_CODES } from './community.codes';
import { POST_ERROR_CODES } from './post.codes';
import { USER_ERROR_CODES } from './user.codes';

export const INTERNAL_ERROR_CODES = {
    GENERIC: 'generic_error',
    GENERIC_VALIDATION: 'generic_validation_error',
    INTERNAL_SERVER: 'internal_server_error',
    HTTP: 'http_error',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    BAD_PAGINATION: 'bad_pagination',
    AUTH: AUTH_ERROR_CODES,
    COMMUNITY: COMMUNITY_ERROR_CODES,
    POST: POST_ERROR_CODES,
    COMMENT: COMMENT_ERROR_CODES,
    USER: USER_ERROR_CODES,
} as const;
