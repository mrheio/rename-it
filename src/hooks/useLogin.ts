import { myfetch } from '@/myfetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogin = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            return myfetch('/api/auth/login').POST().json(data).data();
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
    });

    return mutation;
};

export default useLogin;
