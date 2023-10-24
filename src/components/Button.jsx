function Button({action, extraClass, children}) {
    return (
        <button onClick={action}
            className={`${extraClass} dark:stroke-slate-300 stroke-slate-700 p-1.5 dark:hover:bg-slate-600 hover:bg-slate-350 rounded-lg transition-colors duration-100`}>
        {children}
        </button>
    );
}

export default Button;