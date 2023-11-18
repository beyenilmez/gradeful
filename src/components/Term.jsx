import React, { useState, useRef } from 'react';
import Button from './Button';
import { Plus, ChevronRight, Trash } from 'react-feather';

function Term({ name, children }) {
    const [isActive, setIsActive] = useState(false);
    const childrenRef = useRef(null);

    const toggleActive = () => {
        setIsActive((prevActive) => !prevActive);
    };

    const getHeight = () => {
        return isActive ? `${childrenRef.current.scrollHeight}px` : '0';
    };

    return (
        <div className="draggable hover:cursor-pointer dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md h-fit">

            <div className="flex items-center justify-between py-1 px-3" onClick={toggleActive}>
                <div className='flex items-center'>
                    <ChevronRight size="1.5rem" className={`mr-1 transform transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                    <div className="flex h-full">{name}</div>
                </div>

                <div className='flex items-center'>
                    <div className="flex items-center h-[2rem] px-1 mx-1 rounded-lg dark:bg-slate-700 bg-slate-300">
                        <div>
                            0.00
                        </div>
                    </div>
                    <Button action={toggleActive}
                        className={`h-[2rem] mr-0.5 flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 transition-[width] duration-300 ${isActive ? 'opacity-100 w-[2rem]' : 'opacity-0 w-0'}`}
                        padding={"0"}
                        style={{ transition: 'width 10s' }}
                        >
                        <Plus size="1.5rem" />
                    </Button>
                    <Button action={toggleActive}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 transition-[width] duration-300 ${isActive ? 'opacity-100 w-[2rem]' : 'opacity-0 w-0'}`}
                        padding={"0"}
                        >
                        <Trash size="1.2rem" />
                    </Button>
                </div>
            </div>

            <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: getHeight() }}
            >
                <div ref={childrenRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Term;
