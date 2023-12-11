function Button({ onClick, onMouseUp, className, children, padding, transition, rounded, hoverColor, activeColor, parentBgColorNumber }) {
    return (
        <button onClick={onClick} onMouseUp={onMouseUp} 
            className={`
            ${hoverColor ? `${hoverColor}` : `dark:hover:bg-slate-600 hover:bg-slate-350`}
            ${activeColor ? `${activeColor}` : `dark:active:bg-slate-550 active:bg-slate-400`}
            ${padding ? `${padding}` : 'p-1.5'}
            ${transition ? `${transition}` : 'transition-colors duration-100'}
            ${rounded ? `${rounded}` : 'rounded-lg'}
            ${className}`}>
            {children}
        </button>
    );
}

export default Button;