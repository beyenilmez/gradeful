import PropTypes from 'prop-types';
import { CheckSquare, Square } from 'react-feather';

function Checkbox(props) {
    return (
        <button
            id={props.id}
            className={props.className}
        >
            <Square size={props.size}
                className={`cursor-pointer
                ${props.value ? 'hidden' : ''}
                `}
                onClick={() => props.setValue(true)}
            />
            <CheckSquare size={props.size}
                className={`cursor-pointer 
                ${props.value ? '' : 'hidden'}
                `}
                onClick={() => props.setValue(false)}
            />
            {props.children}
        </button>
    );
}

Checkbox.propTypes = {
    value: PropTypes.bool,
    setValue: PropTypes.func,
    size: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}

export default Checkbox;