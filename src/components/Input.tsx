import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const Input = ({ ...rest }: InputProps) => {
    return (
        <input {...rest}
            className='p-2.5 focus:outline-none rounded-md bg-dark-900 border border-gray-500 text-white'
        />
    )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {

}

export const TextArea = ({ ...rest }: TextAreaProps) => {
    return (
        <textarea {...rest}
            className='p-2.5 min-h-[7rem] focus:outline-none rounded-md bg-dark-900 border border-gray-500 text-white resize-none'
        />
    );
};