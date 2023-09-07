export * from './constants';
export * from './cookies';
export * from './jwt';
export * from './password';
export * from './time';

export const getRandomBoolean = () => {
    return Math.random() < 0.5;
};
