import clsx from 'clsx';
import { createElement, ReactNode } from 'react';
import { Align } from '../types';

type AlignProp = {
    horizontal: Align;
    vertical: Align;
    content: Align | null;
};

type ContainerProps = {
    children: ReactNode;
    fluid?: boolean;
    as?: 'div' | 'section';
    outline?: boolean;
    align?: AlignProp;
    className?: string;
};

const Container = ({
    children,
    as = 'div',
    fluid = false,
    outline = false,
    align = { horizontal: 'center', vertical: 'center', content: null },
    className,
}: ContainerProps) => {
    if (!['div', 'section'].includes(as)) {
        throw Error("Container can be rendered as a 'div' or 'section'");
    }

    return createElement(
        as,
        {
            className: clsx(
                {
                    'w-full': fluid,
                    'border-2 border-cyan-500': outline,
                    'mx-auto': align.horizontal === 'center',
                    'flex items-center justify-center':
                        align.content === 'center',
                    container: true,
                },
                className
            ),
        },
        children
    );
};

export default Container;
