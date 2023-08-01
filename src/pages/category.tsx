import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { canSSRAuth } from "@/helpers/canSSRAuth";
import { setupAPICliente } from "@/services/api";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify';

const Category = () => {
    const [name, setName] = useState('');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (!name) {
            return;
        }

        const apiClient = setupAPICliente();
        await apiClient.post('/category', {
            name
        });

        toast.success('Categoria cadastrada com sucesso!');
        setName('');
    };

    return (
        <>
            <Head>
                <title>Nova categoria - DevLanchar</title>
            </Head>
            <div>
                <Header />
                <main className="max-w-3xl my-16 mx-auto px-8 flex flex-col justify-between">
                    <h1 className="text-white font-semibold text-3xl">Cadastrar categoria</h1>
                    <form className="flex flex-col my-4 gap-3" onSubmit={handleRegister}>
                        <Input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <button className="bg-green-600 p-1.5 flex justify-center items-center rounded-md transition-colors hover:bg-green-500 text-[#1D1D2E] text-lg">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    };
});

export default Category;