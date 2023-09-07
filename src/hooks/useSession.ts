import { myky } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useSession = () => {
    const query = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const result = await myky.get('/api/auth/session').json();
            return result.payload;
        },
    });

    return query;
};

export default useSession;
