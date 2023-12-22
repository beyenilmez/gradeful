import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Plus, ChevronRight, Trash, Move } from 'react-feather';
import { useInactive } from './InactiveContext';
import { useUniData } from './UniContext';
import { University } from '../utils/Program';

function Term({ id, name, children, isActive, setActive }) {
    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('300ms');
    const childrenRef = useRef(null);

    const { inactive } = useInactive();

    const { universityData, setUniversityData } = useUniData();

    const toggleActive = () => {
        if (!inactive) {
            setActive(!isActive);
        }
    };

    useEffect(() => {
        if (isActive && !inactive) {
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
    }, [isActive, inactive]);

    const handleTransitionEnd = () => {
        if (isActive && !inactive) {
            setContentHeight('100%');
            setContentTransitionDuration('0ms')
        }
    };

    function addClass() {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(id).addLesson(id, null);
        setUniversityData(uni);
    }


    function deleteTerm() {
        const uni = new University();
        uni.load(universityData);
        uni.deleteTerm(id);
        setUniversityData(uni);
    }

    return (
        <div className="draggable dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md h-fit overflow-hidden">
            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleActive}>
                <div className='flex items-center'>
                    <Move size="1.5rem" className={`handle mr-1 transform transition-transform duration-300`} />
                    <ChevronRight size="1.5rem" className={`mr-1 transform transition-transform duration-300 ${isActive && !inactive ? 'rotate-90' : ''}`} />
                    <div className="flex h-full">{name}</div>
                </div>

                <div className='flex items-center'>
                    <div className="flex items-center h-[2rem] px-1 mx-1 rounded-lg dark:bg-slate-700 bg-slate-300">
                        <div>
                            0.00
                        </div>
                    </div>
                    <Button onMouseUp={() => {
                        addClass();
                        setContentHeight('100%');
                    }} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.5rem" />
                    </Button>
                    <Button
                        onMouseUp={() => {
                            deleteTerm();
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
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
