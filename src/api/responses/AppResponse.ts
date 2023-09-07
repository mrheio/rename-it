import { NextResponse } from 'next/server';
import { AppResponseProps } from '../types';

export default abstract class AppResponse {
    name: string;
    status: string;
    code: number;
    message: string;

    constructor(props: AppResponseProps) {
        this.name = this.constructor.name;
        this.status = props.status;
        this.code = props.code;
        this.message = props.message;
    }

    toNextResponse(init?: ResponseInit) {
        return NextResponse.json(this, {
            ...init,
            status: this.code,
        });
    }
}
