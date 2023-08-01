import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from 'react-toastify';

const SignUp = () => {
    const { signUp } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.warning('Preencha todos os campos!');
        };

        setLoading(true);
        let data = { name, email, password };
        await signUp(data);
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Sign Up - DevLanchar</title>
            </Head>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-red-500 font-bold text-6xl">
                    <span className="text-white font-bold text-6xl">Dev</span>
                    Lanchar</h1>
                <form onSubmit={handleSignUp} className="flex flex-col gap-2 w-[90%] md:w-[500px] my-5">
                    <Input
                        placeholder="Digite seu nome"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Digite seu email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Digite sua senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Cadastrar
                    </Button>
                </form>
                <p className="text-white">Já possui uma conta? <Link href='/' className="italic hover:underline hover:cursor-pointer">Faça login.</Link></p>
            </div>
        </>
    );
};

export default SignUp;