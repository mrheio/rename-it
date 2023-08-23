type ApiResponseProps = {
    status?: string;
    message?: string;
    payload?: unknown | null;
};

export default abstract class ApiResponse {
    status: string;
    message: string;
    payload: unknown;

    constructor(props: ApiResponseProps) {
        this.status = props.status ?? 'info';
        this.message = props.message ?? '';
        this.payload = props.payload ?? null;
    }
}
