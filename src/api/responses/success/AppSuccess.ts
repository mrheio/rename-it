import { STATUS_CODES } from '@/utils';
import { AppSuccessProps } from '../../types';
import AppResponse from '../AppResponse';

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
