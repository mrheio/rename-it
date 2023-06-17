import clsx from 'clsx';
import { AdvancedInputProps } from './types';

const AdvancedInput = ({
    decoration,
    filled = false,
    variant = 'primary',
    fluid = false,
    type = 'text',
    className,
    ...rest
}: AdvancedInputProps) => {
    return (
        <div
            className={clsx({
                'flex min-w-0 gap-1': true,
                input: true,
                'input--filled': filled,
                'input--naked': variant === 'naked',
                'input--primary': variant === 'primary',
                'input--secondary': variant === 'secondary',
            })}
        >
            {decoration?.start && (
                <span className="flex items-center">{decoration.start}</span>
            )}

            <input
                className={clsx({
                    'w-full': fluid,
                    input: true,
                    'input--with-icon': true,
                })}
                type={type}
                {...rest}
            />

            {decoration?.end && (
                <span className="flex items-center">{decoration.end}</span>
            )}
        </div>
    );
};

export default AdvancedInput;
