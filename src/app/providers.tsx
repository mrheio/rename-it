'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Initializer from './initializer';

const _Providers = (props) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Initializer>{props.children}</Initializer>
        </QueryClientProvider>
    );
};

export default _Providers;
