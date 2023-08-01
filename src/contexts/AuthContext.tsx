import { api } from "@/services/apiClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signUp: (credentials: SignUpProps) => Promise<void>;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
};

interface SignInProps {
    email: string;
    password: string;
};

interface SignUpProps {
    name: string;
    email: string;
    password: string;
};

interface AuthProviderProps {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        toast.error('Algo deu errado ao tentar sair.');
    };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email,
                });

            }).catch(() => {
                signOut();
            });
        };
    }, []);

    const signIn = async ({ email, password }: SignInProps) => {
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { id, name, token } = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });

            setUser({
                id,
                name,
                email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success('Logado com sucesso!');
            Router.push('/dashboard');
        } catch {
            toast.error('Algo deu errado.');
        };
    };

    const signUp = async ({ name, email, password }: SignUpProps) => {
        try {
            const response = await api.post('users/', {
                name,
                email,
                password,
            });

            toast.success('Conta criada com sucesso!');
            Router.push('/');
        } catch {
            toast.error('Algo deu errado.');
        };
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signUp,
            signIn,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
};