export const USER_ERROR_CODES = {
    NOT_FOUND: 'users:not_found',
    NOT_SAVED: 'users:not_saved',
    ALREADY_EXISTS: 'users:exists',
    INVALID: 'users:invalid',
    VALIDATION: {
        SLUG: {
            INVALID: 'users.slug:invalid',
            REQUIRED: 'users.slug:required',
            TOO_SHORT: 'users.slug:too_short',
            TOO_LONG: 'users.slug:too_long',
            CANNOT_CHANGE: 'users.slug:cannot_change',
        },
        NAME: {
            INVALID: 'users.name:invalid',
            REQUIRED: 'users.name:required',
            TOO_SHORT: 'users.name:too_short',
            TOO_LONG: 'users.name:too_long',
        },
        PASSWORD: {
            INVALID: 'users.password:invalid',
            REQUIRED: 'users.password:required',
            MISMATCHED: 'users.password:mismatched',
            TOO_SHORT: 'users.password:too_short',
            TOO_LONG: 'users.password:too_long',
        },
        TWO_FA: {
            INVALID: 'users.two_factor:invalid',
            REQUIRED: 'users.two_factor:required',
        },
        EMAIL: {
            INVALID: 'users.email:invalid',
            REQUIRED: 'users.email:required',
            UNTRUSTED: 'users.email:untrusted',
            CANNOT_CHANGE: 'users.email:cannot_change',
        },
    },
} as const;
