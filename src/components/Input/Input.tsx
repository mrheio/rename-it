import AdvancedInput from './AdvancedInput';
import SimpleInput from './SimpleInput';
import { InputProps } from './types';

const Input = (props: InputProps) => {
    const { decoration } = props;

    if (decoration) {
        return <AdvancedInput {...props} />;
    }

    return <SimpleInput {...props} />;
};

export default Input;
