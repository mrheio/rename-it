import clsx from 'clsx';
import { createElement, ReactNode } from 'react';

type TitleProps = {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h3' | 'h4' | 'span';
    size?: 'l' | 'm' | 's' | 'xs';
    weight?: 'normal' | 'semibold' | 'bold';
    variant?: 'naked' | 'primary' | 'secondary';
    className?: string;
};

const Title = ({
    children,
    as = 'h1',
    size = 'l',
    weight = 'normal',
    variant = 'naked',
    className,
}: TitleProps) => {
    return createElement(
        as,
        {
            className: clsx(
                {
                    'font-semibold': weight === 'semibold',
                    'font-bold': weight === 'bold',
                    title: true,
                    'title--l': size === 'l',
                    'title--m': size === 'm',
                    'title--s': size === 's',
                    'title--xs': size === 'xs',
                    'title--primary': variant === 'primary',
                    'title--secondary': variant === 'secondary',
                },
                className
            ),
        },
        children
    );
};

export default Title;
