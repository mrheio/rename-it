'use client';

import { AppLink, Button, Input, Title } from '@/components';
import { ROUTES } from '@/router';
import { ChangeEventHandler, useState } from 'react';

const Login = () => {
    const [fields, setFields] = useState({ username: '', password: '' });

    const handleFormInputChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setFields((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <main className="flex min-h-screen items-center pt-navbar">
            <form
                className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-8"
                action={ROUTES.PUBLIC.LOGIN}
                method="POST"
            >
                <Title weight="bold">Enter your account</Title>
                <div className="grid gap-2">
                    <label htmlFor="username">Username</label>
                    <Input
                        id="username"
                        name="username"
                        value={fields.username}
                        onChange={handleFormInputChange}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={fields.password}
                        onChange={handleFormInputChange}
                    />
                </div>
                <Button type="submit">Enter</Button>
                <AppLink
                    className="text-center"
                    href={ROUTES.PUBLIC.REGISTER}
                    weight="bold"
                >
                    No account? Create one here
                </AppLink>
            </form>
        </main>
    );
};

export default Login;
