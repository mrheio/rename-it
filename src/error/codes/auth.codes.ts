export const AUTH_ERROR_CODES = {
    INVALID_REQUEST: 'auth:invalid_request',
    UNAUTHORIZED_CLIENT: 'auth:unauthorized_client',
    ACCESS_DENIED: 'auth:access_denied',
    UNSUPPORTED_RESPONSE_TYPE: 'auth:unsupported_response_type',
    INVALID_SCOPE: 'auth:invalid_scope',
    SERVER_ERROR: 'auth:server_error',
    TEMPORARILY_UNAVAILABLE: 'auth:temporarily_unavailable',
} as const;
