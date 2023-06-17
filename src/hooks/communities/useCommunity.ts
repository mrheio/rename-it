import { getCommunity } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useCommunity = (cid: string) => {
    const query = useQuery({
        queryKey: ['communities', cid],
        queryFn: () => getCommunity(cid),
    });

    return query;
};

export default useCommunity;
