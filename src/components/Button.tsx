import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import Loading from './Loading';
import { ComponentVariant } from './types';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ComponentVariant;
    outlined?: boolean;
    fluid?: boolean;
    loading?: boolean;
};

const Button = ({
    children,
    variant = 'primary',
    outlined = false,
    fluid = false,
    type = 'button',
    loading = false,
    className,
    disabled,
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
                'btn--loading': loading,
            })}
            type={type}
            disabled={loading || disabled}
            {...rest}
        >
            {loading && <Loading loading={loading} />}
            {children}
        </button>
    );
};

export default Button;
