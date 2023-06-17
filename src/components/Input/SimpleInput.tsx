import clsx from 'clsx';
import { SimpleInputProps } from './types';

const SimpleInput = ({
    fluid = false,
    filled = false,
    variant = 'primary',
    type = 'text',
    className,
    ...rest
}: SimpleInputProps) => {
    return (
        <input
            className={clsx({
                'w-full': fluid,
                input: true,
                'input--filled': filled,
                'input--naked': variant === 'naked',
                'input--primary': variant === 'primary',
                'input--secondary': variant === 'secondary',
            })}
            type={type}
            {...rest}
        />
    );
};

export default SimpleInput;
