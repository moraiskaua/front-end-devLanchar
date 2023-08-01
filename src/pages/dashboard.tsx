import Header from "@/components/Header";
import ModalOrder from "@/components/ModalOrder";
import { canSSRAuth } from "@/helpers/canSSRAuth";
import { setupAPICliente } from "@/services/api";
import Head from "next/head";
import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Modal from 'react-modal';

interface OrderProps {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface DashboardProps {
    orders: OrderProps[];
}

export interface OrderItemProps {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    };
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

const Dashboard = ({ orders }: DashboardProps) => {
    const [orderList, setOrderList] = useState(orders || []);
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = async (id: string) => {
        const apiClient = setupAPICliente();
        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            },
        });

        setModalItem(response.data);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleFinishItem = async (id: string) => {
        const apiClient = setupAPICliente();
        await apiClient.put('/order/finish', {
            order_id: id,
        });

        const response = await apiClient.get('/orders');
        setOrderList(response.data);
        setModalVisible(false);
    };

    const handleRefreshOrders = async () => {
        const apiClient = setupAPICliente();
        const response = await apiClient.get('/orders');
        setOrderList(response.data);
    };

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Painel - DevLanchar</title>
            </Head>
            <div>
                <Header />
                <main className="max-w-3xl my-16 mx-auto px-8 flex flex-col justify-between">
                    <div className="flex gap-3">
                        <h1 className="text-white font-semibold text-3xl">Últimos pedidos</h1>
                        <button onClick={handleRefreshOrders}><FiRefreshCcw color="16A34A" size={25} /></button>
                    </div>
                    <article className="flex flex-col my-4 gap-3">
                        {orderList.map(item => (
                            <section key={item.id} className="flex bg-dark-900 items-center rounded-md">
                                <button
                                    onClick={() => handleOpenModal(item.id)}
                                    className="w-full text-lg text-white h-14 flex items-center"
                                >
                                    <div className="w-2 bg-green-600 h-full rounded-tl-md rounded-bl-md mr-4"></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}
                    </article>
                </main>
                {modalVisible &&
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        handleFinishOrder={handleFinishItem}
                        order={modalItem}
                    />
                }
            </div>
        </>
    );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPICliente(ctx);
    const response = await apiClient.get('/orders');

    return {
        props: {
            orders: response.data,
        },
    };
});

export default Dashboard;