export const COMMENT_ERROR_CODES = {
    NOT_FOUND: 'comments:not_found',
    NOT_SAVED: 'comments:not_saved',
    INVALID: 'comments:invalid',
    VALIDATION: {
        CONTENT: {
            INVALID: 'comments.content:invalid',
            REQUIRED: 'comments.content:required',
            TOO_SHORT: 'comments.content:too_short',
            TOO_LONG: 'comments.content:too_long',
        },
        USER: {
            INVALID: 'comments.user:invalid',
            REQUIRED: 'comments.user:required',
        },
        POST: {
            INVALID: 'comments.post:invalid',
            REQUIRED: 'comments.post:required',
        },
        VOTE: {
            INVALID_UPVOTE: 'comments.upvote:invalid',
            INVALID_DOWNVOTE: 'comments.downvote:invalid',
        },
    },
} as const;
