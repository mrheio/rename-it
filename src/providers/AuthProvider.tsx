import { createContext, useContext, useState } from 'react';

type AuthProps = {
    accessToken: string;
    expiresAt: string;
};

type AuthContextProps = {
    auth: AuthProps | null;
    updateAuth: (auth: AuthProps) => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
    const x = useContext(AuthContext);

    if (x === null) {
        throw Error('useAuthContext must be used inside AuthProvider children');
    }

    return x;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<AuthProps | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
