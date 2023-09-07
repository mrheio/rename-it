const ROUTES = {
    PUBLIC: {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
        DOCS: {
            COMPONENTS: '/docs/components',
        },
        POSTS: '/posts',
        POST: (id: string | number) => `/posts/${id}`,
    },
    PROTECTED: {
        PROFILE: '/profile',
    },
};

export default ROUTES;
