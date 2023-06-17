export const URL = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:8000';
export const API_URL = `${URL}/api/v1`;

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const ACCESS_TOKEN_EXPIRES_AT_KEY = 'expires_at';

export const customHeaders = { Authorization: 'Bearer impersonate/mamata' };

export const getAccessTokenTimeLeft = (expiresAt: string) => {
    const expiresAtDate = new Date(expiresAt).getTime();
    const now = Date.now();

    return (expiresAtDate - now) / 1000;
};

export const isAccessTokenExpiringSoon = (expiresAt: string, timeLeft = 15) => {
    return getAccessTokenTimeLeft(expiresAt) < timeLeft;
};
