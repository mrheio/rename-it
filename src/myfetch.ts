class FetchBuilder {
    input: RequestInfo | URL;
    options?: RequestInit;

    constructor(input: RequestInfo | URL, init?: RequestInit) {
        this.input = input;
        this.options = init;
    }

    GET() {
        return new FetchBuilder(this.input, { ...this.options, method: 'GET' });
    }

    POST() {
        return new FetchBuilder(this.input, {
            ...this.options,
            method: 'POST',
        });
    }

    json(data: unknown) {
        const headers = {
            ...this.options?.headers,
            'Content-Type': 'application/json',
        };
        const stringified = JSON.stringify(data);

        return new FetchBuilder(this.input, {
            ...this.options,
            headers,
            body: stringified,
        });
    }

    server() {
        if (typeof window !== 'undefined') {
            throw new Error('Must be called inside a Server Component.');
        }

        const { cookies } = require('next/headers');
        const headers = {
            ...this.options?.headers,
            cookie: cookies().toString(),
        };

        return new FetchBuilder(this.input, { ...this.options, headers });
    }

    async run() {
        const response = await fetch(this.input, this.options);

        if (response.ok) {
            return response;
        }

        const error = await response.json();
        throw error;
    }

    async data() {
        const response = await this.run();
        const data = await response.json();
        return data;
    }
}

export const myfetch = (input: RequestInfo | URL, init?: RequestInit) =>
    new FetchBuilder(input, init);
