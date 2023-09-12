import { myfetch } from '@/myfetch';
import { useQuery } from '@tanstack/react-query';
import useSession from './useSession';

const useGroups = () => {
    const { data: session } = useSession();
    const userId = session?.id;

    const query = useQuery({
        queryKey: ['groups', userId],
        queryFn: async ({ queryKey }) => {
            const uid = queryKey[1];
            const data = await myfetch(`/api/users/${uid}/groups`).GET().data();
            return data?.payload?.items ?? [];
        },
        enabled: !!userId,
    });

    return query;
};

export default useGroups;
