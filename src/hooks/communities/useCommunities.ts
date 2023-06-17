import { getCommunities } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useCommunities = () => {
    const query = useQuery({
        queryKey: ['communities'],
        queryFn: getCommunities,
    });

    return query;
};

export default useCommunities;
