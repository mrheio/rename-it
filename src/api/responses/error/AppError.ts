import { STATUS_CODES } from '@/utils';
import { AppErrorProps } from '../../types';
import AppResponse from '../AppResponse';

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

    static throwOrToNextResponse(e: unknown) {
        if (e instanceof AppError) {
            return e.toNextResponse();
        }

        throw e;
    }
}
