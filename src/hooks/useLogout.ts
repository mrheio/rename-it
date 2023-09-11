import { myfetch } from '@/myfetch';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            await myfetch('/api/auth/logout').POST().run();
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
    });

    return mutation;
};

export default useLogout;
