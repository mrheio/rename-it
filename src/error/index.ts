import { apiSchemasManager } from '@/schemas';
import { INTERNAL_ERROR_CODES } from './codes';
import {
    AppError,
    CommentNotFound,
    CommunityNotFound,
    InvalidAuthRequest,
    PostNotFound,
    UserNotFound,
} from './models';

export const fromApiError = (apiError: unknown) => {
    const parseResult = apiSchemasManager.error.safeParse(apiError);

    if (!parseResult.success) {
        throw Error('Could not parse api error', { cause: apiError });
    }

    const { data } = parseResult;

    switch (data.code) {
        case INTERNAL_ERROR_CODES.AUTH.INVALID_REQUEST: {
            return new InvalidAuthRequest(data);
        }
        case INTERNAL_ERROR_CODES.COMMUNITY.NOT_FOUND: {
            return new CommunityNotFound(data);
        }
        case INTERNAL_ERROR_CODES.POST.NOT_FOUND: {
            return new PostNotFound(data);
        }
        case INTERNAL_ERROR_CODES.COMMENT.NOT_FOUND: {
            return new CommentNotFound(data);
        }
        case INTERNAL_ERROR_CODES.USER.NOT_FOUND: {
            return new UserNotFound(data);
        }
        default: {
            return new AppError({ details: apiError });
        }
    }
};
