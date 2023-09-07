export type AppResponseProps = {
    status: 'success' | 'error' | 'info';
    code: number;
    message: string;
};

export type AppErrorProps = {
    code?: number;
    message?: string;
    details?: unknown;
};

export type AppSuccessProps = {
    code?: number;
    message?: string;
    payload?: unknown;
};
