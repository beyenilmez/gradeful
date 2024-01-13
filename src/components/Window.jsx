import PropTypes from 'prop-types';
import { X } from 'react-feather';
import Button from './Button';

function Window(props) {
    return (
        <div className={`
        ${props.showWindow ? "" : "hidden"}
        fixed z-40
        w-full h-full
        top-0 left-0
        bg-black/60
        `}>
            <div className='
                flex justify-center items-center
                w-full h-2/3
            '>
                <div className='
                md:w-[40rem] w-[80%]
            '>
                    <div className='
                    flex justify-between items-center
                    w-full
                    rounded-t-lg py-1.5 pl-4 pr-2
                    dark:bg-slate-550 bg-slate-250
                    dark:text-slate-250 text-slate-550
                '>
                        {props.title}
                        <Button
                            onClick={() => props.setShowWindow(false)}
                            className={"outline-slate-400"}
                            hoverColor={"dark:hover:bg-slate-500 hover:bg-slate-300"}
                            activeColor={"dark:active:bg-slate-450 active:bg-slate-350"}
                        >
                            <X size="1.5rem" />
                        </Button>
                    </div>
                    <div className={`
                    ${props.height ? props.height : ""}
                    w-full
                    rounded-b-lg
                    dark:bg-slate-500 bg-slate-300
                `}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

Window.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    showWindow: PropTypes.bool,
    setShowWindow: PropTypes.func,
    height: PropTypes.string
}

export default Window;