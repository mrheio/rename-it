class AltFetch {
    headers: object;
    body: object;

    constructor({ headers, body }) {
        this.headers = headers;
        this.body = body;
    }

    setHeader(header) {
        return new AltFetch({
            ...this,
            headers: { ...this.headers, ...header },
        });
    }

    setContentType(contentType) {
        return this.setHeader({ 'Content-Type': contentType });
    }

    setBearerToken(token) {
        return this.setHeader({ Authorization: `Bearer ${token}` });
    }

    setBody(body) {
        return new AltFetch({ ...this, body: body });
    }
}

export const altFetch: typeof fetch = (url, init) => {
    return fetch(url, init);
};
