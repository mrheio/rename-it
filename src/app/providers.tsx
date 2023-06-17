'use client';

import { AuthProvider } from '@/providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

type _ProvidersProps = {
    children: ReactNode;
};

const _Providers = ({ children }: _ProvidersProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    );
};

export default _Providers;
