const getEnvironmentVariable = (environmentVariable: string): string => {
    const unvalidatedEnvironmentVariable = process.env[environmentVariable];

    if (!unvalidatedEnvironmentVariable) {
        throw new Error(
            `Couldn't find environment variable: ${environmentVariable}`
        );
    } else {
        return unvalidatedEnvironmentVariable;
    }
};

export const CONFIG = {
    JWT_SECRET: getEnvironmentVariable('JWT_SECRET'),
    JWT_EXPIRES_IN: getEnvironmentVariable('JWT_EXPIRES_IN'),
};
