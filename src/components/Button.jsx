function Button({action, className, children, padding}) {
    return (
        <button onClick={action}
            className={`dark:stroke-slate-300 stroke-slate-700 ${
                padding ? `p-${padding}` : 'p-1.5'
              } dark:hover:bg-slate-600 hover:bg-slate-350 rounded-lg transition-colors duration-100 ${className}`}>
        {children}
        </button>
    );
}

export default Button;