const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DOCS: {
        COMPONENTS: '/docs/components',
    },
    POSTS: '/posts',
    POST: (id: string | number) => `/posts/${id}`,
} as const;

export default ROUTES;
