export const STATUS_CODES = {
    SUCCESS: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
    },
    ERROR: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        SERVER: {
            INTERNAL_ERROR: 500,
            NOT_IMPLEMENTED: 501,
            BAD_GATEWAY: 502,
        },
    },
} as const;
