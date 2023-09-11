import { z } from 'zod';

export const loginFormSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().trim().min(1),
});

export const registerFormSchema = z.object({
    email: z.string().trim().min(1).email(),
    username: z.string().trim().min(1),
    password: z.string().trim().min(1),
});

export type LoginForm = z.infer<typeof loginFormSchema>;
export type RegisterForm = z.infer<typeof registerFormSchema>;
