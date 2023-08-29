import { STATUS_CODES } from '@/api';
import AppResponse from '../AppResponse';

type AppErrorProps = {
    code?: number;
    message?: string;
    details?: unknown;
};

export default abstract class AppError extends AppResponse {
    details: unknown;

    constructor(props: AppErrorProps) {
        super({
            status: 'error',
            code: props.code ?? STATUS_CODES.BAD_REQUEST,
            message: props.message ?? '',
        });
        this.details = props.details ?? null;
    }

    static maybeThrow(e: unknown) {
        if (e instanceof AppError) {
            return e.toNextResponse();
        }

        throw e;
    }
}
