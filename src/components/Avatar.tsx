import { ComponentVariant } from '@/types';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type AvatarProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ComponentVariant;
    size?: 'normal' | 'small';
};

const Avatar = ({
    children,
    variant = 'primary',
    size = 'normal',
    className,
    ...rest
}: AvatarProps) => {
    return (
        <button
            className={clsx({
                'btn btn--circle': true,
                'btn--naked': variant === 'naked',
                'btn--primary': variant === 'primary',
                'btn--secondary': variant === 'secondary',
                'btn--circle-s': size === 'small',
            })}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
};

export default Avatar;
