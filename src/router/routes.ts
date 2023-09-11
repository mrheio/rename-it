export const ROUTES = {
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

const getObjectValues = (obj) => {
    const res = [];

    for (const entry of Object.values(obj)) {
        if (typeof entry === 'object') {
            res.push(...getObjectValues(entry));
        } else {
            if (typeof entry === 'string') {
                res.push(entry);
            }
        }
    }

    return res;
};

export const ROUTES_LIST = getObjectValues(ROUTES);
export const PUBLIC_ROUTES_LIST = getObjectValues(ROUTES.PUBLIC);
export const PROTECTED_ROUTES_LIST = getObjectValues(ROUTES.PROTECTED);
export const AUTH_ROUTES_LIST = [ROUTES.PUBLIC.LOGIN, ROUTES.PUBLIC.REGISTER];
