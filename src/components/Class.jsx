import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { ChevronRight, Edit2, Move, Plus } from 'react-feather';
import { useUniData } from './UniContext';
import { University } from '../utils/Program';
import { useInactive } from './InactiveContext';

function Class({ id, termId, name, children, isActive, setActive }) {
    const {universityData, setUniversityData} = useUniData();
    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('300ms');
    const childrenRef = useRef(null);

    const {classInactive} = useInactive();

    const toggleActive = () => {
        if (!classInactive) {
            setActive(!isActive);
        }
    };

    useEffect(() => {
        if (isActive && !classInactive) {
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
    }, [isActive, classInactive]);

    const handleTransitionEnd = () => {
        if (isActive && !classInactive) {
            setContentHeight('100%');
            setContentTransitionDuration('0ms')
        }
    };

    

    function addGrade() {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).getClassById(id).addGrade();
        setUniversityData(uni);
      }

    return (
        <div className="draggable font-light dark:bg-slate2-700 bg-slate2-300 shadow border-t dark:border-slate2-550 border-slate2-350">

            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleActive}>
                <div className='flex items-center'>
                    <Move size="1.5rem" className={`handle mr-1 transform transition-transform duration-300`} />
                    <ChevronRight size="1.5rem" className={`mr-1 transform transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                    <div className="flex h-full">{name}</div>
                </div>

                <div className='flex items-center'>
                    <div className="flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate2-650 bg-slate2-350">
                        <div>
                            0.00
                        </div>
                    </div>
                    <div className="flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate2-650 bg-slate2-350">
                        <div>
                            XX
                        </div>
                    </div>
                    <Button
                        onMouseUp={() => {
                            addGrade();
                            setContentHeight('100%');
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate2-650 hover:bg-slate2-350 dark:active:bg-slate2-600 active:bg-slate2-400 ${isActive ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.25rem" />
                    </Button>
                    <Button
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate2-650 hover:bg-slate2-350 dark:active:bg-slate2-600 active:bg-slate2-400 ${isActive ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
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
