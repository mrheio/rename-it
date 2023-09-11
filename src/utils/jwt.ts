import { SignJWT, decodeJwt, jwtVerify } from 'jose';

export const signJwt = async (payload, options) => {
    const alg = 'HS256';
    const exp = options.exp;
    const secret = options.secret;
    const signature = new TextEncoder().encode(secret);

    const jwtCreator = new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(exp)
        .setIssuedAt();

    if (payload.sub) {
        jwtCreator.setSubject(payload.sub);
    }

    return jwtCreator.sign(signature);
};

export const verifyJwt = async (token: string, secret: string) => {
    return jwtVerify(token, new TextEncoder().encode(secret));
};

export const didTokenExpire = (token) => {
    const { exp } = decodeJwt(token);

    if (!exp) {
        return false;
    }

    const timeDiff = exp * 10 ** 3 - Date.now();
    return timeDiff < 10 * 10 ** 3;
};
