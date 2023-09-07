import { compare, genSalt, hash } from 'bcrypt-ts';

export const hashPass = async (plainPassword: string) => {
    const salt = await genSalt();

    return hash(plainPassword, salt);
};

export const checkIsSamePass = (
    plainPassword: string,
    hashedPassword: string
) => {
    return compare(plainPassword, hashedPassword);
};
