'use client';

import { AppLink, Button, Input, Title } from '@/components';
import { useRegister } from '@/hooks';
import { ROUTES } from '@/router';
import { registerFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const router = useRouter();
    const {
        mutate: registerUser,
        isLoading: isRegisterRunning,
        isSuccess: isRegisterSuccess,
    } = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '', username: '', password: '' },
        resolver: zodResolver(registerFormSchema),
    });

    const handleRegister = handleSubmit((data) => {
        registerUser(data);
    });

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
                    <Input id="email" label="email" register={register} />
                    <div className="min-h-[1.5rem] text-error-500">
                        {errors.email?.message}
                    </div>
                </div>
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

                <Button type="submit" loading={isRegisterRunning}>
                    Create account
                </Button>
                <AppLink className="text-center" href={ROUTES.PUBLIC.LOGIN}>
                    Already have an account? <strong>Sign in here</strong>
                </AppLink>
            </form>
        </main>
    );
};

export default Register;
