import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';

const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            await ky.post('/api/auth/logout');
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
    });

    return mutation;
};

export default useLogout;
