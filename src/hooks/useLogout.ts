import { myky } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            await myky.post('/api/auth/logout');
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
    });

    return mutation;
};

export default useLogout;
