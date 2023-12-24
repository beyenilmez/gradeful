import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { ChevronRight, Edit2, Move, Plus, Trash, Save, X } from 'react-feather';
import { useUniData } from './UniContext';
import { University, Course } from '../utils/Program';
import { useInactive } from './InactiveContext';

function Class({ id, termId, name, children, isActive, setActive }) {
    const {universityData, setUniversityData, editJSON, setEditJSON } = useUniData();
    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('300ms');
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const childrenRef = useRef(null);

    const { classInactive } = useInactive();

    const toggleActive = () => {
        if (!classInactive && editJSON[id] === undefined) {
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

    function deleteCourse() {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).deleteCourse(id);
        setUniversityData(uni);

        setEditJSON({ ...editJSON, [id]: undefined });
    }

    return (
        <div className="draggable font-light dark:bg-slate-700 bg-slate-300 shadow border-t dark:border-slate-550 border-slate-350">

            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleActive}>
                <div className='flex items-center'>
                    <Move size="1.5rem" className={`handle mr-1 transform transition-transform duration-300`} />
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
                    <Button
                        onMouseUp={() => {
                            addGrade();
                            setContentHeight('100%');
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${isActive && editJSON[id] === undefined ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.25rem" />
                    </Button>
                    <Button
                        onMouseUp={() => {
                            const uni = new University();
                            uni.load(universityData);

                            setEditJSON({...editJSON, [id]: uni.getSemesterById(termId).getClassById(id)});
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${isActive && editJSON[id] === undefined ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Edit2 size="1rem" />
                    </Button>

                    <Button
                        onMouseUp={() => {
                            if (editJSON[id] !== undefined) {
                                const course = new Course();
                                course.load(editJSON[id]);

                                const uni = new University();
                                uni.load(universityData);
                                uni.getSemesterById(termId).getClassById(id).load(course);

                                setUniversityData(uni);

                                setEditJSON({ ...editJSON, [id]: undefined });
                            }
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${editJSON[id] !== undefined ? 'w-7' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Save size="1.2rem" />
                    </Button>

                    <Button
                        onMouseUp={() => {
                            if (editJSON[id] !== undefined) {
                                setEditJSON({ ...editJSON, [id]: undefined });

                                setDeleteConfirmation(false);
                            }
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${editJSON[id] !== undefined ? 'w-7' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <X size="1.35rem" />
                    </Button>

                    <Button
                        onMouseUp={() => {
                            setDeleteConfirmation(true);
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${editJSON[id] !== undefined && !deleteConfirmation ? 'w-7' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Trash size="1.2rem" />
                    </Button>

                    <Button
                        onMouseUp={() => {
                            deleteCourse();
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${deleteConfirmation ? 'w-16' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 overflow-hidden`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <div>Confirm</div>
                    </Button>
                    <Button
                        onMouseUp={() => {
                            setDeleteConfirmation(false);
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${deleteConfirmation ? 'w-16' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 overflow-hidden`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <div>Cancel</div>
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
