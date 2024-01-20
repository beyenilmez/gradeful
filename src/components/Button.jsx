import { PropTypes } from "prop-types";

function Button(props) {
    return (
        <button
            onClick={props.onClick}
            onMouseUp={props.onMouseUp}
            id={props.id}
            className={`
            ${props.hoverColor ? `${props.hoverColor}` : `dark:hover:bg-slate-600 hover:bg-slate-350`}
            ${props.activeColor ? `${props.activeColor}` : `dark:active:bg-slate-550 active:bg-slate-400`}
            ${props.padding ? `${props.padding}` : 'p-1.5'}
            ${props.transition ? `${props.transition}` : 'transition-colors duration-100'}
            ${props.rounded ? `${props.rounded}` : 'rounded-lg'}
            ${props.className}`}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    onMouseUp: PropTypes.func,
    id: PropTypes.string,
    hoverColor: PropTypes.string,
    activeColor: PropTypes.string,
    padding: PropTypes.string,
    transition: PropTypes.string,
    rounded: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool
}

export default Button;