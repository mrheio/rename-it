import { myfetch } from '@/myfetch';
import { useQuery } from '@tanstack/react-query';

const useSession = () => {
    const query = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const data = await myfetch('/api/auth/session').GET().data();
            return data.payload;
        },
    });

    return query;
};

export default useSession;
