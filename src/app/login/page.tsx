'use client';

import { AppLink, Button, Input, Title } from '@/components';
import { useLogin } from '@/hooks';
import { ROUTES } from '@/router';
import { loginFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const router = useRouter();
    const {
        mutate: login,
        isLoading: isLoginRunning,
        isSuccess: isLoginSuccess,
    } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { username: '', password: '' },
        resolver: zodResolver(loginFormSchema),
    });

    const handleLogin = handleSubmit((data) => {
        console.log(data);

        login(data);
    });

    useEffect(() => {
        if (isLoginSuccess) {
            router.replace(ROUTES.PUBLIC.HOME);
        }
    }, [isLoginSuccess]);

    return (
        <main className="flex min-h-screen items-center pt-navbar">
            <form
                className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-8"
                action={ROUTES.PUBLIC.LOGIN}
                onSubmit={handleLogin}
            >
                <Title weight="bold">Enter your account</Title>
                <div className="grid gap-2">
                    <label htmlFor="username">Username</label>
                    <Input id="username" label="username" register={register} />
                    <div className="min-h-[1.5rem] text-error-500">
                        {errors.username?.message}
                    </div>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        label="password"
                        type="password"
                        register={register}
                    />
                    <div className="min-h-[1.5rem] text-error-500">
                        {errors.password?.message}
                    </div>
                </div>
                <Button type="submit" loading={isLoginRunning}>
                    Enter
                </Button>
                <AppLink className="text-center" href={ROUTES.PUBLIC.REGISTER}>
                    No account? <strong>Create one here</strong>
                </AppLink>
            </form>
        </main>
    );
};

export default Login;
