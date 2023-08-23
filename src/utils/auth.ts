import bcrypt from 'bcrypt';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

export const hashPass = (plainPassword: string) => {
    const salt = bcrypt.genSaltSync();

    return bcrypt.hash(plainPassword, salt);
};

export const checkIsSamePass = (
    plainPassword: string,
    hashedPassword: string
) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

export const signJwt = async (
    payload: JWTPayload,
    options: { exp: string | number; secret: string }
) => {
    const secret = new TextEncoder().encode(options.secret);
    const alg = 'HS256';

    const jwtCreator = new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(options.exp)
        .setIssuedAt();

    if (payload.sub) {
        jwtCreator.setSubject(payload.sub);
    }

    return jwtCreator.sign(secret);
};

export const verifyJwt = async (token: string, secret: string) => {
    return jwtVerify(token, new TextEncoder().encode(secret));
};
