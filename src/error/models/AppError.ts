import { AppErrorProps } from '../types';

export default class AppError {
    type: string;
    code: string;
    message: string;
    details: unknown;

    constructor({
        code = 'unknown-error',
        message = 'An unknown error has occured.',
        details = null,
    }: AppErrorProps = {}) {
        this.type = this.constructor.name;
        this.code = code;
        this.message = message;
        this.details = details;
    }
}
