'use client';

import { AppLink, Button, Input, Title } from '@/components';
import { useRegister } from '@/hooks';
import { ROUTES } from '@/router';
import { useRouter } from 'next/navigation';
import {
    ChangeEventHandler,
    FormEventHandler,
    useEffect,
    useState,
} from 'react';

const Register = () => {
    const router = useRouter();
    const {
        mutate: register,
        isLoading: isRegisterRunning,
        isSuccess: isRegisterSuccess,
    } = useRegister();
    const [fields, setFields] = useState({
        email: '',
        username: '',
        password: '',
    });

    const handleFormInputChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setFields((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleRegister: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        register(fields);
    };

    useEffect(() => {
        if (isRegisterSuccess) {
            router.replace(ROUTES.PUBLIC.HOME);
        }
    }, [isRegisterSuccess]);

    return (
        <main className="flex min-h-screen items-center pt-navbar">
            <form
                className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-8"
                onSubmit={handleRegister}
            >
                <Title weight="bold">Create your account</Title>
                <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        name="email"
                        value={fields.email}
                        onChange={handleFormInputChange}
                    />
                </div>
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
                <Button type="submit" loading={isRegisterRunning}>
                    Create account
                </Button>
                <AppLink
                    className="text-center"
                    href={ROUTES.PUBLIC.LOGIN}
                    weight="bold"
                >
                    Already have an account? Sign in here
                </AppLink>
            </form>
        </main>
    );
};

export default Register;
