import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
    const { signOut } = useContext(AuthContext);

    return (
        <header className="h-20">
            <div className="max-w-7xl h-20 mx-auto px-8 flex justify-between items-center">
                <button onClick={() => Router.push('/dashboard')}>
                    <h1 className="text-red-500 font-bold text-6xl">
                        <span className="text-white font-bold text-6xl">Dev</span>
                        Lanchar
                    </h1>
                </button>
                <nav className="flex items-center gap-4">
                    <Link
                        className="uppercase font-semibold text-white px-2 inline-block relative transition-colors hover:text-red-600"
                        href='/category'
                    >
                        Categorias
                    </Link>
                    <Link
                        className="uppercase font-semibold text-white px-2 inline-block relative transition-colors hover:text-red-600"
                        href='/product'
                    >
                        Cardápio
                    </Link>
                    <button
                        className="transition-transform hover:scale-125"
                        onClick={signOut}
                    >
                        <FiLogOut color='#FFF' size={26} />
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header;