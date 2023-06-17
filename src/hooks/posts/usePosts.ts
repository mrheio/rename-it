import { getPosts } from '@/api';
import { useQuery } from '@tanstack/react-query';

const usePosts = () => {
    const query = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });

    return query;
};

export default usePosts;
