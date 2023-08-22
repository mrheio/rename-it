import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ComponentVariant } from './types';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ComponentVariant;
    outlined?: boolean;
    fluid?: boolean;
};

const Button = ({
    children,
    variant = 'primary',
    outlined = false,
    fluid = false,
    type = 'button',
    className,
    ...rest
}: ButtonProps) => {
    return (
        <button
            className={clsx({
                'w-full': fluid,
                btn: true,
                'btn--naked': variant === 'naked',
                'btn--primary': !outlined && variant === 'primary',
                'btn--secondary': !outlined && variant === 'secondary',
                'btn--outlined': outlined,
                'btn--outlined-primary': outlined && variant === 'primary',
                'btn--outlined-secondary': outlined && variant === 'secondary',
            })}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
