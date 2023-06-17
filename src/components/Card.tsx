import clsx from 'clsx';
import { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
    fluid?: boolean;
    highlightable?: boolean;
    prose?: boolean;
};

const Card = ({
    children,
    className,
    fluid = false,
    highlightable = false,
    prose = false,
    ...rest
}: CardProps) => {
    return (
        <div
            className={clsx(
                {
                    'rounded-md bg-surface-950 p-4': true,
                    'transition-all duration-300 ease-in-out hover:scale-[101%]':
                        highlightable,
                    'w-full': fluid,
                    'prose dark:prose-invert': prose,
                },
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Card;
