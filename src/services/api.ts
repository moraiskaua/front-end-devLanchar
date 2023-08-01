import { signOut } from '@/contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

export const setupAPICliente = (ctx = undefined) => {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response.status === 401) {
            if (typeof window !== undefined) {
                signOut();
            } else {
                return Promise.reject(new Error('Algo deu errado.'))
            }
        }

        return Promise.reject(error);
    });

    return api;
}