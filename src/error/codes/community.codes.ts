export const COMMUNITY_ERROR_CODES = {
    NOT_FOUND: 'communities:not_found',
    ALREADY_EXISTS: 'communities:exists',
    VALIDATION: {
        NAME: {
            INVALID: 'communities.name:invalid',
            REQUIRED: 'communities.name:required',
            TOO_SHORT: 'communities.name:too_short',
            TOO_LONG: 'communities.name:too_long',
        },
        SLUG: {
            INVALID: 'communities.slug:invalid',
            REQUIRED: 'communities.slug:required',
            TOO_SHORT: 'communities.slug:too_short',
            TOO_LONG: 'communities.slug:too_long',
            CANNOT_CHANGE: 'communities.slug:cannot_change',
        },
        ICON_URL: {
            INVALID: 'communities.icon_url:invalid',
            REQUIRED: 'communities.icon_url:required',
        },
        COVER_URL: {
            INVALID: 'communities.cover_url:invalid',
            REQUIRED: 'communities.cover_url:required',
        },
        DESCRIPTION: {
            INVALID: 'communities.description:invalid',
            REQUIRED: 'communities.description:required',
            TOO_SHORT: 'communities.description:too_short',
            TOO_LONG: 'communities.description:too_long',
        },
        RULES: {
            INVALID: 'communities.rules:invalid',
            REQUIRED: 'communities.rules:required',
            TOO_SHORT: 'communities.rules:too_short',
            TOO_LONG: 'communities.rules:too_long',
        },
        WIKI: {
            INVALID: 'communities.wiki:invalid',
            REQUIRED: 'communities.wiki:required',
            TOO_SHORT: 'communities.wiki:too_short',
            TOO_LONG: 'communities.wiki:too_long',
        },
        USER: {
            INVALID: 'communities.user:invalid',
            REQUIRED: 'communities.user:required',
        },
    },
} as const;
