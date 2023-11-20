import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { ChevronRight, Edit2 } from 'react-feather';

function Class({ name, children }) {
    const [isActive, setIsActive] = useState(false);
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
        <div className="draggable font-light hover:cursor-pointer dark:bg-slate-700 bg-slate-300 shadow rounded-md">

            <div className="flex items-center justify-between py-1 px-2" onClick={toggleActive}>
                <div className='flex items-center'>
                    <ChevronRight size="1.5rem" className={`mr-1 transform transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                    <div className="flex h-full">{name}</div>
                </div>

                <div className='flex items-center'>
                    <div className="flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350">
                        <div>
                            0.00
                        </div>
                    </div>
                    <div className="flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350">
                        <div>
                            XX
                        </div>
                    </div>
                    <Button action={toggleActive}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${isActive ? 'w-7' : 'w-0'}`}
                        padding={"0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Edit2 size="1rem" />
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

export default Class;
