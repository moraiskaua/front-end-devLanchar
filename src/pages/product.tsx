import Header from "@/components/Header";
import { Input, TextArea } from "@/components/Input";
import { canSSRAuth } from "@/helpers/canSSRAuth";
import { setupAPICliente } from "@/services/api";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from 'react-toastify';

interface ItemProps {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

const Product = ({ categoryList }: CategoryProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
    const [categories, setCategories] = useState(categoryList || []);
    const [selectedCategory, setSelectedCategory] = useState(0);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files[0];

        if (!image) {
            return;
        };

        if (image.type === 'image/png' || image.type === 'image/jpeg') {
            setImageAvatar(image);
            setImageUrl(URL.createObjectURL(image));
        };
    };

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const data = new FormData();

            if (!name || !price || !description || !imageAvatar) {
                toast.error('Preencha todos os campos!');
                return;
            };

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[selectedCategory].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPICliente();
            await apiClient.post('/product', data);
            toast.success('Produto cadastrado com sucesso!');
        } catch {
            toast.error('Erro ao tentar cadastrar produto.');
        };

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setImageUrl('');
    };

    return (
        <>
            <Head>
                <title>Novo produto - DevLanchar</title>
            </Head>
            <div>
                <Header />
                <main className="max-w-3xl my-16 mx-auto px-8 flex flex-col justify-between">
                    <h1 className="text-white font-semibold text-3xl">Novo produto</h1>
                    <form className="flex flex-col my-4 gap-3" onSubmit={handleRegister}>

                        <label className="h-64 rounded-md bg-dark-900 border border-gray-500 flex justify-center items-center hover:cursor-pointer">
                            <span className="z-50 absolute opacity-75 transition-transform hover:opacity-100 hover:scale-110">
                                <FiUpload color="#FFF" size={32} />
                            </span>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleFile}
                            />
                            {imageUrl &&
                                <img
                                    className="w-full h-full object-cover overflow-hidden"
                                    src={imageUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            };
                        </label>

                        <select
                            value={selectedCategory}
                            onChange={handleChangeCategory}
                            className="p-2.5 focus:outline-none rounded-md bg-dark-900 border border-gray-500 text-white"
                        >
                            {categories.map((item, index) => {
                                return <option key={item.id} value={index}>{item.name}</option>
                            })};
                        </select>
                        <Input
                            type="text"
                            placeholder="Digite o nome do produto"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Digite o preço do produto"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <TextArea
                            placeholder="Descreva o produto..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <button className="bg-green-600 p-1.5 flex justify-center items-center rounded-md transition-colors hover:bg-green-500 text-[#1D1D2E] text-lg">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPICliente(ctx);
    const response = await apiClient.get('/category');

    return {
        props: {
            categoryList: response.data,
        },
    };
});

export default Product;