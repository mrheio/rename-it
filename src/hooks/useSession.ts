import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

const useSession = () => {
    const query = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const result = await ky.get('/api/auth/session').json();
            return result.payload;
        },
    });

    return query;
};

export default useSession;
