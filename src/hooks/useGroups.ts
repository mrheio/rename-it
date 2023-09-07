import { useQuery } from '@tanstack/react-query';

const useGroups = () => {
    const query = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const result = await fetch(
                '/api/users/919d86b0-55c1-4b74-a37c-8ddf04d853dd/groups'
            );

            const body = await result.json();

            const { items } = body.payload;

            return items;
        },
    });

    return query;
};

export default useGroups;
