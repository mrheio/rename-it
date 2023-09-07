import { SignJWT, errors, jwtVerify } from 'jose';
import { CONFIG } from '../../config';

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

export const verifyJwt = async (
    token: string,
    secret: string = CONFIG.JWT_SECRET
) => {
    return jwtVerify(token, new TextEncoder().encode(secret));
};

export const didTokenExpire = async (token, secret) => {
    try {
        const decoded = await verifyJwt(token, secret);
        const payload = decoded.payload;

        if (!payload.exp) {
            return false;
        }

        const timeDiff = payload.exp - Date.now();

        return timeDiff < 10 * 1000;
    } catch (e) {
        if (e instanceof errors.JWTExpired) {
            return true;
        }

        throw e;
    }
};
