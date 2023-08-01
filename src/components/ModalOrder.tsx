import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { OrderItemProps } from '@/pages/dashboard';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    handleFinishOrder: (id: string) => void;
    order: OrderItemProps[];
}

const ModalOrder = ({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) => {

    const customStyles = {
        content: {
            left: '50%',
            top: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1D1D2E',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
            >
                <FiX color="#EF4444" size={45} />
            </button>
            <div className='w-[380px] md:w-[620px] text-white'>
                <h2 className='text-xl font-semibold my-4'>Detalhes do pedido</h2>
                <span className='text-xl text-green-600'>Mesa: <strong>{order[0].order.table}</strong></span>
                {order.map(item => (
                    <section key={item.id}
                        className='flex flex-col my-3'
                    >
                        <span>{item.amount} - <strong className='text-yellow-600'>{item.product.name}</strong></span>
                        <span className='break-all'>{item.product.description}</span>
                    </section>
                ))}
                <button
                    className='bg-dark-900 p-2 rounded-md transition-colors text-green-600 border border-green-600 hover:bg-green-600 hover:text-white'
                    onClick={() => handleFinishOrder(order[0].order_id)}
                >
                    Concluir pedido
                </button>
            </div>
        </Modal>
    );
};

export default ModalOrder;