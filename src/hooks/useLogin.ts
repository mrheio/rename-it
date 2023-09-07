import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';

const useLogin = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data) => {
            return ky.post('/api/auth/login', { json: data });
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
    });

    return mutation;
};

export default useLogin;
