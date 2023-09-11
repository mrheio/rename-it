import { myfetch } from '@/myfetch';
import { useQuery } from '@tanstack/react-query';

const useSession = () => {
    const query = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const response = await myfetch('/api/auth/session').GET().run();

            if (response.ok) {
                const data = await response.json();
                return data.payload;
            }

            return null;
        },
    });

    return query;
};

export default useSession;
