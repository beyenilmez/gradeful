import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Plus, ChevronRight, Trash } from 'react-feather';

function Term({ name, expand, children }) {
    const [isActive, setIsActive] = useState(expand ? true : false);
    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('300ms');
    const childrenRef = useRef(null);

    const toggleActive = () => {
        setIsActive((prevActive) => !prevActive);
    };

    useEffect(() => {
        if (isActive) {
            setContentTransitionDuration('300ms')
            setContentHeight(`${childrenRef.current.scrollHeight}px`);
        } else {
            setTimeout(() => {
                setContentHeight(`${childrenRef.current.scrollHeight}px`);
                setTimeout(() => {
                    setContentTransitionDuration('300ms');
                    setTimeout(() => {
                        setContentHeight('0');
                    }, 10);
                }, 10);
            }, 10);


        }
    }, [isActive]);

    const handleTransitionEnd = () => {
        if (isActive) {
            setContentHeight('100%');
            setContentTransitionDuration('0ms')
        }
    };

    return (
        <div className="draggable hover:cursor-pointer dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md h-fit">

            <div className="flex items-center justify-between py-1 px-2" onClick={toggleActive}>
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
                        className={`h-[2rem] mr-0.5 flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 transition-[width] duration-300 ${isActive ? 'w-[2rem]' : 'w-0'}`}
                        padding={"0"}
                    >
                        <Plus size="1.5rem" />
                    </Button>
                    <Button action={toggleActive}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 transition-[width] duration-300 ${isActive ? 'w-[2rem]' : 'w-0'}`}
                        padding={"0"}
                    >
                        <Trash size="1.2rem" />
                    </Button>
                </div>
            </div>

            <div
                className="overflow-hidden transition-all"
                style={{ maxHeight: contentHeight, transitionDuration: contentTransitionDuration }}
                onTransitionEnd={handleTransitionEnd}
            >
                <div ref={childrenRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Term;
