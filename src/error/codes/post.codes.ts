export const POST_ERROR_CODES = {
    NOT_FOUND: 'posts:not_found',
    NOT_SAVED: 'posts:not_saved',
    ALREADY_EXISTS: 'posts:exists',
    INVALID: 'posts:invalid',
    VALIDATION: {
        TITLE: {
            INVALID: 'posts.title:invalid',
            REQUIRED: 'posts.title:required',
            TOO_SHORT: 'posts.title:too_short',
            TOO_LONG: 'posts.title:too_long',
        },
        CONTENT: {
            INVALID: 'posts.content:invalid',
            REQUIRED: 'posts.content:required',
            TOO_SHORT: 'posts.content:too_short',
            TOO_LONG: 'posts.content:too_long',
        },
        SLUG: {
            INVALID: 'posts.slug:invalid',
            TOO_LONG: 'posts.slug:too_long',
        },
        COMMUNITY: {
            INVALID: 'posts.community:invalid',
            REQUIRED: 'posts.community:required',
        },
        USER: {
            INVALID: 'posts.user:invalid',
            REQUIRED: 'posts.user:required',
        },
        VOTE: {
            INVALID_UPVOTE: 'posts.upvote:invalid',
            INVALID_DOWNVOTE: 'posts.downvote:invalid',
        },
    },
} as const;
