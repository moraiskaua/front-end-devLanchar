import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { canSSRGuest } from "@/helpers/canSSRGuest";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from 'react-toastify';

const Home = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.warning('Preencha todos os campos!');
    };

    setLoading(true);
    let data = { email, password }
    await signIn(data);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login - DevLanchar</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-red-500 font-bold text-6xl">
          <span className="text-white font-bold text-6xl">Dev</span>
          Lanchar
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-[90%] md:w-[500px] my-5">
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
            Entrar
          </Button>
        </form>
        <p className="text-white">Ainda não possui uma conta? <Link href='/signup' className="italic hover:underline hover:cursor-pointer">Cadastre-se.</Link></p>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});

export default Home;