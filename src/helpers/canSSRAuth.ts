import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";

// Páginas que só são acessadas por usuários logados.
export const canSSRAuth = <P>(fn: GetServerSideProps<P>) => {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        };

        try {
            return await fn(ctx);
        } catch {
            new Error('Algo deu errado.');
            destroyCookie(ctx, '@nextauth.token');

            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        };
    };
};
