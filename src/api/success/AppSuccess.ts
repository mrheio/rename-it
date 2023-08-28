import { STATUS_CODES } from '@/api';
import AppResponse from '../AppResponse';

type AppSuccessProps = {
    code?: number;
    message?: string;
    payload?: unknown;
};

export default class AppSuccess extends AppResponse {
    payload: unknown;

    constructor(props: AppSuccessProps) {
        super({
            status: 'success',
            code: props.code ?? STATUS_CODES.OK,
            message: props.message ?? '',
        });
        this.payload = props.payload ?? null;
    }
}
