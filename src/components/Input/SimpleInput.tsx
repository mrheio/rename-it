import clsx from 'clsx';
import { SimpleInputProps } from './types';

const SimpleInput = (props: SimpleInputProps) => {
    const {
        register,
        fluid = false,
        filled = false,
        variant = 'primary',
        type = 'text',
        label,
    } = props;

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
            {...register?.(label)}
        />
    );
};

export default SimpleInput;
