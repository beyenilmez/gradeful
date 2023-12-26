import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { Plus, ChevronRight, Trash, Move, Edit2, Save, X } from 'react-feather';
import { useInactive } from './InactiveContext';
import { useUniData } from './UniContext';
import { University, Course } from '../utils/Program';

function Term({ id, name, children, isActive, setActive }) {
    const { universityData, setUniversityData, editJSON, setEditJSON, save } = useUniData();
    const uni = new University();
    uni.load(universityData);

    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('300ms');
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [editing, setEditing] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [addedCourses, setAddedCourses] = useState([]);
    const childrenRef = useRef(null);

    const [nameValue, setNameValue] = useState(uni.getTermById(id).name);

    const { inactive } = useInactive();

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

    useEffect(() => {
        if (editJSON[id] !== undefined && !editing) {
            setNameValue(uni.getTermById(id).name);

            setEditing(true);
        } else if (editJSON[id] === undefined) {
            setDeleteConfirmation(false);
            setEditing(false);
        }
    }, [editJSON])

    function getTermName() {
        const uni = new University();
        uni.load(universityData);
        return uni.getTermById(id).name;
    }

    function addClass() {
        const uni = new University();
        uni.load(universityData);

        const newCourse = new Course();
        newCourse.setTermId(id);

        uni.getTermById(id).addCourse(newCourse);
        setUniversityData(uni);
        save();

        setAddedCourses([...addedCourses, uni.getTermById(id).getLastCourse().id]);

        setEditJSON({ ...editJSON, [uni.getTermById(id).getLastCourse().id]: uni.getTermById(id).getCourseById(uni.getTermById(id).getLastCourse().id) });
    }

    function removeAddedCourses(universityData) {
        const uni = new University();
        uni.load(universityData);
        addedCourses.forEach(course => {
            uni.getTermById(id).deleteCourseById(course);
        });
        setAddedCourses([]);
        return uni;
    }

    function deleteTerm() {
        const uni = new University();
        uni.load(universityData);
        uni.deleteTermById(id);
        setUniversityData(uni);
        save();

        setEditJSON({ ...editJSON, [id]: undefined })
    }

    return (
        <div className="draggable dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md h-fit overflow-hidden">
            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleActive}>
                <div className='flex items-center'>
                    <Move size="1.5rem" className={`handle mr-1 transform transition-transform duration-300 shrink-0`} />
                    <ChevronRight size="1.5rem" className={`mr-1 transform transition-transform duration-300 ${isActive && !inactive ? 'rotate-90' : ''}`} />
                    <div className={`flex h-full ${editing ? 'hidden' : 'block'}`}>{getTermName()}</div>

                    <textarea rows="1" onClick={(e) => e.stopPropagation()}
                        className={`
                            ${editing ? 'block' : 'hidden'}
                            whitespace-nowrap mr-2
                            no-scrollbar resize-none w-full h-full pl-2 outline-none rounded-lg border dark:text-slate-250 text-slate-750 dark:border-slate-450 border-slate-450 dark:bg-slate-700 bg-slate-300 dark:placeholder-slate-550 placeholder-slate-400
                        `}
                        placeholder="Name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    ></textarea>
                </div>

                <div className='flex items-center'>
                    <div className="flex items-center h-[2rem] px-1 mx-1 rounded-lg dark:bg-slate-700 bg-slate-300">
                        <div>
                            0.00
                        </div>
                    </div>

                    <Button onMouseUp={() => {
                        const uni = new University();
                        uni.load(universityData);
                        setEditJSON({ ...editJSON, [id]: uni.getTermById(id) });
                        setInitialData(uni.getTermById(id));
                    }} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive && editJSON[id] === undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Edit2 size="1rem" />
                    </Button>

                    <Button onMouseUp={() => {
                        addClass();
                        setContentHeight('100%');
                    }} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive && editJSON[id] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.5rem" />
                    </Button>

                    <Button onMouseUp={() => {
                        const uni = new University();
                        uni.load(universityData);

                        uni.getTermById(id).name = nameValue;

                        setUniversityData(uni);
                        save();

                        setAddedCourses([]);

                        setEditJSON({ ...editJSON, [id]: undefined });
                    }} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive && editJSON[id] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Save size="1.25rem" />
                    </Button>

                    <Button onMouseUp={() => {
                        if (editJSON[id] !== undefined) {
                            setEditJSON({ ...editJSON, [id]: undefined });

                            const uni = new University();
                            uni.load(universityData);

                            const initialOrder = [];
                            (initialData.courses).forEach(lesson => {
                                initialOrder.push(lesson['id']);
                            });

                            uni.getTermById(id).reorderCourses(initialOrder);

                            save();
                            setUniversityData(removeAddedCourses(uni));
                        }
                    }} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive && editJSON[id] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <X size="1.5rem" />
                    </Button>

                    <Button
                        onMouseUp={() => {
                            setDeleteConfirmation(true);
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${isActive && !deleteConfirmation && editJSON[id] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Trash size="1.2rem" />
                    </Button>

                    <Button
                        onMouseUp={() => {
                            deleteTerm();
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${deleteConfirmation ? 'w-16' : 'w-0'}
                        h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 overflow-hidden`}
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
                        h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 overflow-hidden`}
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

export default Term;
