import React, { useState, useRef, useEffect } from 'react';
import { University, Term, Course } from '../utils/Program';
import { Plus, ChevronRight, Trash, Move, Edit2, Save, X } from 'react-feather';
import { useUniData } from './UniContext';
import { useInactive } from './InactiveContext';
import Button from './Button';

function TermExport({ id, name, includeCalc, children, expanded }) {
    const { universityData, setUniversityData, editJSON, setEditJSON, save } = useUniData();

    // Context
    const { inactive } = useInactive();

    // <--- States start --->

    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('150');

    const [nameValue, setNameValue] = useState(name);
    // eslint-disable-next-line no-unused-vars
    const [includeCalcValue, setIncludeCalcValue] = useState(includeCalc);

    const [expandedValue, setExpandedValue] = useState(expanded);

    const [editing, setEditing] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [addedCourses, setAddedCourses] = useState([]);

    // <--- States end --->

    // <--- References start --->

    const idRef = useRef(id);
    const childrenRef = useRef(null);

    // <--- References end --->

    // Data
    const editData = editJSON[idRef.current];

    // <--- Functions start --->

    function addCourse() {
        const uni = new University(universityData);

        const newCourse = new Course();
        newCourse.setTermId(idRef.current);

        uni.getTermById(idRef.current).addCourse(newCourse);

        save();
        setUniversityData(uni);

        setAddedCourses([...addedCourses, newCourse.id]);
        setEditJSON({ ...editJSON, [newCourse.id]: newCourse });
    }

    function deleteTerm() {
        const uni = new University(universityData);

        uni.deleteTermById(idRef.current);

        save();
        setUniversityData(uni);

        setAddedCourses([]);
        setEditJSON({ ...editJSON, [idRef.current]: undefined })
    }

    function startEdit() {
        const uni = new University(universityData);
        setEditJSON({ ...editJSON, [idRef.current]: uni.getTermById(idRef.current) });
    }

    function saveEdit() {
        if (editData !== undefined) {
            const uni = new University(universityData);

            uni.getTermById(idRef.current).name = editData.name;

            save();
            setUniversityData(uni);

            setAddedCourses([]);
            setEditJSON({ ...editJSON, [idRef.current]: undefined });
        }
    }

    function cancelEdit() {
        if (editData !== undefined) {
            setEditJSON({ ...editJSON, [idRef.current]: undefined });

            const uni = new University(universityData);

            const initialOrder = [];
            (initialData.courses).forEach(course => {
                initialOrder.push(course['id']);
            });

            uni.getTermById(idRef.current).reorderCourses(initialOrder);

            addedCourses.forEach(course => {
                uni.getTermById(idRef.current).deleteCourseById(course);
            });
            setAddedCourses([]);

            save();
            setUniversityData(uni);
        }
    }


    function setExpanded(value) {
        setExpandedValue(value);

        const uni = new University(universityData);
        uni.getTermById(idRef.current).expanded = value;

        save();
        setUniversityData(uni);
    }

    function toggleExpanded() {
        if (!inactive && editData === undefined) {
            setExpanded(!expandedValue);
        }
    }

    function handleTransitionEnd() {
        if (expandedValue && !inactive) {
            setContentTransitionDuration('0');
            setContentHeight('100%');
        }
    }

    // <--- Functions end --->

    // <--- Effects start --->

    // Set content height
    useEffect(() => {
        if ((expandedValue || editing) && !inactive) {
            setContentHeight(`${childrenRef.current.scrollHeight}px`);
        } else {
            setContentHeight(`${childrenRef.current.scrollHeight}px`);

            setTimeout(() => {
                setContentTransitionDuration('150');
                setContentHeight('0');
            })
        }
    }, [expandedValue, inactive, childrenRef, editing, editData]);

    // Start-end editing
    useEffect(() => {
        if (editData !== undefined && !editing) {
            setInitialData(new Term(editData));
            setEditing(true);
        } else if (editData === undefined) {
            setDeleteConfirmation(false);
            setInitialData(undefined);
            setEditing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData])

    // Update edited JSON
    useEffect(() => {
        if (editData !== undefined) {
            const term = new Term(editData);

            term.name = nameValue;

            setEditJSON({ ...editJSON, [idRef.current]: term });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameValue]);

    // Update editable values
    useEffect(() => {
        setNameValue(name);
    }, [editing, name])

    // <--- Effects end --->

    // Render
    return (
        <div className="draggable dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md h-fit overflow-hidden">
            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleExpanded}>
                <div className='flex items-center'>
                    <Move size="1.5rem" className={`handle mr-1 transform transition-transform duration-300 shrink-0`} />
                    <ChevronRight size="1.5rem" className={`mr-1 transform transition-transform duration-300 ${expandedValue && !inactive ? 'rotate-90' : ''}`} />
                    <div className={`flex h-full ${editing ? 'hidden' : 'block'}`}>{name}</div>

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

                    <Button onMouseUp={startEdit} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${expandedValue && editJSON[idRef.current] === undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Edit2 size="1rem" />
                    </Button>

                    <Button onMouseUp={() => {
                        addCourse();
                        setContentHeight('100%');
                    }} onClick={(event) => {
                        event.stopPropagation();
                    }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${expandedValue && editJSON[idRef.current] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.5rem" />
                    </Button>

                    <Button onMouseUp={saveEdit} onClick={(event) => { event.stopPropagation() }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${expandedValue && editJSON[idRef.current] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Save size="1.25rem" />
                    </Button>

                    <Button onMouseUp={cancelEdit} onClick={(event) => { event.stopPropagation() }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${expandedValue && editJSON[idRef.current] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <X size="1.5rem" />
                    </Button>

                    <Button
                        onMouseUp={() => setDeleteConfirmation(true)}
                        onClick={(event) => { event.stopPropagation() }}
                        className={`h-[2rem] flex items-center justify-center dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 ${expandedValue && !deleteConfirmation && editJSON[idRef.current] !== undefined ? 'w-[2rem]' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Trash size="1.2rem" />
                    </Button>

                    <Button
                        onMouseUp={() => deleteTerm()}
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
                        onMouseUp={() => setDeleteConfirmation(false)}
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
                style={{ maxHeight: contentHeight, transitionDuration: contentTransitionDuration ? contentTransitionDuration + 'ms' : 150 }}
                onTransitionEnd={handleTransitionEnd}
            >
                <div ref={childrenRef}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default TermExport;
