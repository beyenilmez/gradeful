function Button({action, className, children, padding, transition}) {
    return (
        <button onClick={action}
            className={`dark:stroke-slate-300 stroke-slate-700 ${
                padding ? `p-${padding}` : 'p-1.5'
            } ${
                transition ? `${transition}` : 'transition-colors duration-100'
            }
              } dark:hover:bg-slate-600 hover:bg-slate-350 rounded-lg ${className}`}>
        {children}
        </button>
    );
}

export default Button;