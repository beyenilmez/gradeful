import { CheckSquare, Square } from 'react-feather';

function Checkbox({ value, setValue, size, id, className, children }) {
    return (
        <button
            id={id}
            className={className}
        >
            <Square size={size}
                className={`cursor-pointer
                ${value ? 'hidden' : ''}
                `}
                onClick={() => setValue(true)}
            />
            <CheckSquare size={size}
                className={`cursor-pointer 
                ${value ? '' : 'hidden'}
                `}
                onClick={() => setValue(false)}
            />
            {children}
        </button>
    );
}

export default Checkbox;