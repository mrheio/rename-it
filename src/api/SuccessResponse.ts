import ApiResponse from './ApiResponse';

type SuccessResponseProps = {
    message?: string;
    payload?: unknown | null;
};

export default class SuccessResponse extends ApiResponse {
    constructor(props: SuccessResponseProps) {
        super({ status: 'success', ...props });
    }
}
