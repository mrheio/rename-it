import { ComponentVariant } from '@/types';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

type AppLinkProps = LinkProps & {
    children: ReactNode;
    underline?: boolean;
    variant?: ComponentVariant;
    weight?: 'normal' | 'semibold' | 'bold';
};

const AppLink = ({
    children,
    underline = false,
    variant = 'primary',
    weight = 'normal',
    className,
    ...rest
}: AppLinkProps) => {
    return (
        <Link
            className={clsx(
                {
                    underline: underline,
                    'font-semibold': weight === 'semibold',
                    'font-bold': weight === 'bold',
                    link: true,
                    'link--primary': variant === 'primary',
                    'link--secondary': variant === 'secondary',
                },
                className
            )}
            {...rest}
        >
            {children}
        </Link>
    );
};

export default AppLink;
