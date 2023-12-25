import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { ChevronRight, Edit2, Menu, Plus, Trash, Save, X, CheckSquare, Square } from 'react-feather';
import { useUniData } from './UniContext';
import { University, Course } from '../utils/Program';
import { useInactive } from './InactiveContext';

function Class({ id, termId, name, children, isActive, setActive }) {
    const { universityData, setUniversityData, editJSON, setEditJSON, save } = useUniData();
    const uni = new University();
    uni.load(universityData);

    const [contentHeight, setContentHeight] = useState('0');
    const [contentTransitionDuration, setContentTransitionDuration] = useState('300ms');
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const [nameValue, setNameValue] = useState(uni.getSemesterById(termId).getClassById(id).name);
    const [creditValue, setCreditValue] = useState(uni.getSemesterById(termId).getClassById(id).credit);
    const [editing, setEditing] = useState(false);
    const [initialData, setInitialData] = useState({ ...uni.getSemesterById(termId).getClassById(id) });

    const [autoCalcScore, setAutoCalcScore] = useState(uni.getSemesterById(termId).getClassById(id).autoCalcScore);
    const [autoCalcGrade, setAutoCalcGrade] = useState(uni.getSemesterById(termId).getClassById(id).autoCalcGrade);
    const [scoreValue, setScoreValue] = useState(uni.getSemesterById(termId).getClassById(id).score);
    const [gradeValue, setGradeValue] = useState(uni.getSemesterById(termId).getClassById(id).grade);

    const childrenRef = useRef(null);

    const { classInactive } = useInactive();

    const toggleActive = () => {
        if (classInactive !== termId) {
            setActive(!isActive);
        }
    };

    useEffect(() => {
        if ((isActive && classInactive !== termId)) {
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
        if (isActive && classInactive !== termId) {
            setContentHeight('100%');
            setContentTransitionDuration('0ms')
        }
    };

    useEffect(() => {
        if (editJSON[id] !== undefined && !editing) {
            const course = new Course();
            course.load(editJSON[id]);

            setNameValue(course.name);
            setCreditValue(course.credit);
            setAutoCalcGrade(course.autoCalcGrade);
            setAutoCalcScore(course.autoCalcScore);
            setScoreValue(course.score);
            setGradeValue(course.grade);

            setInitialData(course);

            setEditing(true);
        } else if (editJSON[id] === undefined) {
            setEditing(false);
        }
    }, [editJSON])

    useEffect(() => {
        if (editJSON[id] !== undefined) {
            const course = new Course();
            course.load(editJSON[id]);

            course.name = nameValue;
            course.credit = creditValue;
            course.autoCalcGrade = autoCalcGrade;
            course.autoCalcScore = autoCalcScore;
            course.score = scoreValue;
            course.grade = gradeValue;

            setEditJSON({ ...editJSON, [id]: course });
        }
    }, [nameValue, creditValue, autoCalcGrade, autoCalcScore, scoreValue, gradeValue]);

    function getScore(){
        const uni = new University();
        uni.load(universityData);
        if(uni.getSemesterById(termId).getClassById(id).score){
            return uni.getSemesterById(termId).getClassById(id).score;
        }else{
            return '-';
        }
    }

    function getGrade() {
        const uni = new University();
        uni.load(universityData);
        if (uni.getSemesterById(termId).getClassById(id).grade) {
            return uni.getSemesterById(termId).getClassById(id).grade;
        } else {
            return '-';
        }
    }

    function addGrade() {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).getClassById(id).addGrade();

        setEditJSON({ ...editJSON, [id]: uni.getSemesterById(termId).getClassById(id) });

        setUniversityData(uni);
    }

    function deleteCourse() {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).deleteCourse(id);
        setUniversityData(uni);
        save();

        setEditJSON({ ...editJSON, [id]: undefined });
    }

    return (
        <div className="draggable font-light dark:bg-slate-700 bg-slate-300 shadow border-t dark:border-slate-550 border-slate-350">

            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleActive}>
                <div className='flex items-center'>
                    <Menu size="1.5rem" className={`shrink-0 handle mr-1 transform transition-transform duration-300 ${editJSON[termId] === undefined ? 'hidden' : ''}`} />
                    <ChevronRight size="1.5rem" className={`shrink-0 mr-1 transform transition-transform duration-300 ${isActive || editJSON[id] !== undefined ? 'rotate-90' : ''} ${editJSON[termId] !== undefined ? 'hidden' : ''}`} />
                    <div className={`
                            ${editJSON[id] !== undefined ? 'hidden' : ''}
                            flex h-full`
                    }>{name}</div>

                    <textarea rows="1"
                        className={`
                            ${editJSON[id] !== undefined ? 'block' : 'hidden'}
                            whitespace-nowrap mr-2
                            no-scrollbar resize-none w-full h-7 pl-2 outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 dark:bg-slate-650 bg-slate-350 dark:placeholder-slate-500 placeholder-slate-450
                        `}
                        placeholder="Name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    ></textarea>

                    <textarea rows="1" inputMode="numeric"
                        className={`
                            ${editJSON[id] !== undefined ? 'block' : 'hidden'}
                            whitespace-nowrap
                            no-scrollbar resize-none min-w-[4rem] max-w-[4rem] w-full h-7 text-center outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 dark:bg-slate-650 bg-slate-350 dark:placeholder-slate-500 placeholder-slate-450
                        `}
                        placeholder="Credit"
                        value={creditValue}
                        onChange={(e) => setCreditValue(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={3}
                    ></textarea>
                </div>

                <div className='flex items-center'>
                    <div className={`flex items-center h-7 px-3 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350 ${editJSON[id] !== undefined && !autoCalcScore ? 'hidden' : 'block'}`}>
                        <div>
                            {getScore()}
                        </div>
                    </div>
                    <div className={`border dark:border-slate-400 border-slate-500 flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350 ${editJSON[id] === undefined || autoCalcScore ? 'hidden' : 'block'}`}>
                        <textarea rows="1" inputMode="numeric"
                            className={`
                            whitespace-nowrap w-10
                            no-scrollbar resize-none text-center outline-none dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450
                        `}
                            placeholder="Score"
                            value={scoreValue}
                            onChange={(e) => setScoreValue(e.target.value.replace(/[^0-9]/g, ''))}
                            maxLength={3}
                        ></textarea>
                    </div>

                    <div className={`flex items-center h-7 px-3 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350 ${editJSON[id] !== undefined && !autoCalcGrade ? 'hidden' : 'block'}`}>
                        <div>
                            {getGrade()}
                        </div>
                    </div>
                    <div className={`border dark:border-slate-400 border-slate-500 flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350 ${editJSON[id] === undefined || autoCalcGrade ? 'hidden' : 'block'}`}>
                        <textarea rows="1"
                            className={`
                            whitespace-nowrap w-10
                            no-scrollbar resize-none text-center outline-none dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450
                        `}
                            placeholder="Grade"
                            value={gradeValue}
                            onChange={(e) => setGradeValue(e.target.value)}
                        ></textarea>
                    </div>
                    <Button
                        onMouseUp={() => {
                            addGrade();
                            setContentHeight('100%');
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${isActive && editJSON[id] !== undefined ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.25rem" />
                    </Button>
                    <Button
                        id={"edit-" + id}
                        onMouseUp={() => {
                            const uni = new University();
                            uni.load(universityData);

                            setEditJSON({ ...editJSON, [id]: uni.getSemesterById(termId).getClassById(id) });
                            setActive(true);
                        }}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${editJSON[id] === undefined ? 'w-7' : 'w-0'}`}
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
                                save();

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

                                const uni = new University();
                                uni.load(universityData);

                                uni.getSemesterById(termId).setCourseById(id, initialData);

                                setUniversityData(uni);
                                save();

                                setDeleteConfirmation(false);

                                if(!uni.getSemesterById(termId).getClassById(id).expanded){
                                    setActive(false);
                                }
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
                    <div className='flex justify-between w-full'>
                        {children}
                        <div className={`flex-row text-xs whitespace-nowrap ${editJSON[id] === undefined ? 'hidden' : ''}`}>
                            <div className='flex'>
                                <Square size="1rem"
                                    className={`cursor-pointer
                                ${autoCalcScore ? 'hidden' : ''}
                                `}
                                    onClick={() => setAutoCalcScore(true)}
                                />
                                <CheckSquare size="1rem"
                                    className={`cursor-pointer
                                    ${autoCalcScore ? '' : 'hidden'}
                                    `}
                                    onClick={() => setAutoCalcScore(false)}
                                />
                                Auto calculate score
                            </div>

                            <div className='flex'>
                                <Square size="1rem"
                                    className={`cursor-pointer
                                ${autoCalcGrade ? 'hidden' : ''}
                                `}
                                    onClick={() => setAutoCalcGrade(true)}
                                />
                                <CheckSquare size="1rem"
                                    className={`cursor-pointer
                                    ${autoCalcGrade ? '' : 'hidden'}
                                    `}
                                    onClick={() => setAutoCalcGrade(false)}
                                />
                                Auto calculate grade
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Class;
