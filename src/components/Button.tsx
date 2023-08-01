import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
}

const Button = ({ loading, children, ...rest }: ButtonProps) => {
    return (
        <button
            className="bg-red-600 p-2.5 flex justify-center items-center rounded-md transition-colors hover:bg-red-500"
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <FaSpinner color='#FFF' size={18} className='animate-spin' />
            ) : (
                <a className='text-white font-semibold'>{children}</a>
            )}
        </button >
    )
}

export default Button;