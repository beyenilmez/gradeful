import React, { useState, useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { University, Course, Score } from '../utils/Program';
import { ChevronRight, Edit2, Menu, Plus, Trash, Save, X } from 'react-feather';
import { useUniData } from './UniContext';
import { useInactive } from './InactiveContext';
import Button from './Button';
import Checkbox from './Checkbox';

function CourseExport(props) {
    // Context
    const { universityData, setUniversityData, editJSON, setEditJSON, save } = useUniData();
    const { classInactive } = useInactive();

    // <--- States start --->

    const [contentHeight, setContentHeight] = useState('0');

    const [nameValue, setNameValue] = useState(props.name);
    const [creditValue, setCreditValue] = useState(props.credit);
    const [scoreValue, setScoreValue] = useState(props.score);
    const [gradeValue, setGradeValue] = useState(props.grade);
    const [autoCalcScoreValue, setAutoCalcScoreValue] = useState(props.autoCalcScore);
    const [autoCalcGradeValue, setAutoCalcGradeValue] = useState(props.autoCalcGrade);
    // eslint-disable-next-line no-unused-vars
    const [includeCalcValue, setIncludeCalcValue] = useState(props.includeCalc);

    const [expandedValue, setExpandedValue] = useState(props.expanded);

    const [editing, setEditing] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [initialData, setInitialData] = useState({});

    // <--- States end --->


    // <--- References start --->

    const idRef = useRef(props.id);
    const termIdRef = useRef(props.termId);

    const childrenRef = useRef(null);

    // <--- References end --->

    // Data
    const editData = editJSON[idRef.current];

    // <--- Functions start --->

    function addScore() {
        const uni = new University(universityData);
        const course = uni.getTermById(termIdRef.current).getCourseById(idRef.current);

        course.addScore(new Score());

        setEditJSON({ ...editJSON, [idRef.current]: course });

        setUniversityData(uni);
    }

    function deleteCourse() {
        const uni = new University(universityData);
        uni.getTermById(termIdRef.current).deleteCourseById(idRef.current);

        save();
        setUniversityData(uni);

        setEditJSON({ ...editJSON, [idRef.current]: undefined });
    }

    function startEdit() {
        const uni = new University(universityData);

        setEditJSON({ ...editJSON, [idRef.current]: uni.getTermById(termIdRef.current).getCourseById(idRef.current) });
    }

    function saveEdit() {
        if (editData !== undefined) {
            const uni = new University(universityData);
            uni.getTermById(termIdRef.current).getCourseById(idRef.current).load(new Course(editData));

            save();
            setUniversityData(uni);

            setEditJSON({ ...editJSON, [idRef.current]: undefined });
        }
    }

    function cancelEdit() {
        setEditJSON({ ...editJSON, [idRef.current]: undefined });

        const uni = new University(universityData);
        uni.getTermById(termIdRef.current).setCourseById(idRef.current, initialData);

        save();
        setUniversityData(uni);
    }

    function setExpanded(value) {
        setExpandedValue(value);

        const uni = new University(universityData);
        uni.getTermById(termIdRef.current).getCourseById(idRef.current).expanded = value;

        save();
        setUniversityData(uni);
    }

    function toggleExpanded() {
        if (classInactive !== termIdRef.current && editData === undefined) {
            setExpanded(!expandedValue);
        }
    }

    // <--- Functions end --->

    // <--- Effects start --->

    // Set content height
    useEffect(() => {
        if ((expandedValue || editing) && classInactive !== termIdRef.current) {
            setContentHeight(`${childrenRef.current.scrollHeight}px`);
        } else {
            setContentHeight('0');
        }
    }, [expandedValue, classInactive, childrenRef, editing, editData]);

    // Start-end editing
    useEffect(() => {
        if (editData !== undefined && !editing) {
            setInitialData(new Course(editData));
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
            const course = new Course(editData);

            course.name = nameValue;
            course.credit = creditValue;
            course.autoCalcGrade = autoCalcGradeValue;
            course.autoCalcScore = autoCalcScoreValue;

            setEditJSON({ ...editJSON, [idRef.current]: course });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameValue, creditValue, autoCalcGradeValue, autoCalcScoreValue]);

    // Update editable values
    useEffect(() => {
        setNameValue(props.name);
        setCreditValue(props.credit);
        setAutoCalcGradeValue(props.autoCalcGrade);
        setAutoCalcScoreValue(props.autoCalcScore);
    }, [editing, props.name, props.credit, props.autoCalcGrade, props.autoCalcScore])

    // <--- Effects end --->

    // Render
    return (
        <div className="draggable font-light dark:bg-slate-700 bg-slate-300 shadow border-t dark:border-slate-550 border-slate-350">

            <div className="flex items-center justify-between py-1 px-2 hover:cursor-pointer" onClick={toggleExpanded}>
                <div className='flex items-center'>
                    <Menu size="1.5rem" className={`shrink-0 handle mr-1 transform transition-transform duration-300 ${editJSON[termIdRef.current] === undefined ? 'hidden' : ''}`} />
                    <ChevronRight size="1.5rem" className={`shrink-0 mr-1 transform transition-transform duration-300 ${expandedValue || editData !== undefined ? 'rotate-90' : ''} ${editJSON[termIdRef.current] !== undefined ? 'hidden' : ''}`} />
                    <div className={`
                            ${editData !== undefined ? 'hidden' : ''}
                            flex h-full`
                    }>{props.name}</div>

                    <textarea rows="1"
                        className={`
                            ${editData !== undefined ? 'block' : 'hidden'}
                            whitespace-nowrap mr-2
                            no-scrollbar resize-none w-full h-7 pl-2 outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 dark:bg-slate-650 bg-slate-350 dark:placeholder-slate-500 placeholder-slate-450
                        `}
                        placeholder="Name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    ></textarea>

                    <textarea rows="1" inputMode="numeric"
                        className={`
                            ${editData !== undefined ? 'block' : 'hidden'}
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
                    <div className={`w-10 flex items-center justify-center mx-1 h-7 px-3 rounded-lg dark:bg-slate-650 bg-slate-350 ${editData !== undefined && !autoCalcScoreValue ? 'hidden' : 'block'}`}>
                        <div>
                            {props.score ? props.score : '-'}
                        </div>
                    </div>
                    <div className={`border dark:border-slate-400 border-slate-500 flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350 ${editData === undefined || autoCalcScoreValue ? 'hidden' : 'block'}`}>
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

                    <div className={`w-10 flex items-center justify-center mx-1 h-7 px-3 rounded-lg dark:bg-slate-650 bg-slate-350 ${editData !== undefined && !autoCalcGradeValue ? 'hidden' : 'block'}`}>
                        <div>
                            {props.grade}
                        </div>
                    </div>
                    <div className={`border dark:border-slate-400 border-slate-500 flex items-center h-7 px-1 mx-1 rounded-lg dark:bg-slate-650 bg-slate-350 ${editData === undefined || autoCalcGradeValue ? 'hidden' : 'block'}`}>
                        <textarea rows="1"
                            className={`
                            whitespace-nowrap w-10
                            no-scrollbar resize-none text-center outline-none dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450
                        `}
                            placeholder="Grade"
                            value={gradeValue ? gradeValue : '-'}
                            onChange={(e) => setGradeValue(e.target.value)}
                        ></textarea>
                    </div>
                    <Button
                        onMouseUp={addScore}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${editData !== undefined ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Plus size="1.25rem" />
                    </Button>
                    <Button
                        id={"edit-" + idRef.current}
                        onMouseUp={startEdit}
                        onClick={(event) => event.stopPropagation()}
                        className={`h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400 ${editData === undefined ? 'w-7' : 'w-0'}`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Edit2 size="1rem" />
                    </Button>

                    <Button
                        onMouseUp={saveEdit}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${editData !== undefined ? 'w-7' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Save size="1.2rem" />
                    </Button>

                    <Button
                        onMouseUp={cancelEdit}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${editData !== undefined ? 'w-7' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <X size="1.35rem" />
                    </Button>

                    <Button
                        onMouseUp={() => { setDeleteConfirmation(true); }}
                        onClick={(event) => event.stopPropagation()}
                        className={`
                        ${editData !== undefined && !deleteConfirmation ? 'w-7' : 'w-0'}
                        h-7 mr-0.5 flex items-center justify-center dark:hover:bg-slate-650 hover:bg-slate-350 dark:active:bg-slate-600 active:bg-slate-400`}
                        padding={"p-0"}
                        transition={"transition-[width] duration-300"}
                    >
                        <Trash size="1.2rem" />
                    </Button>

                    <Button
                        onMouseUp={deleteCourse}
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
                        onMouseUp={() => { setDeleteConfirmation(false); }}
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
                style={{ maxHeight: contentHeight, transitionDuration: '150ms' }}
            >
                <div ref={childrenRef}>
                    <div className='flex justify-between w-full'>
                        {props.children}
                        <div className={`flex-row text-xs whitespace-nowrap ${editData === undefined ? 'hidden' : ''}`}>
                            <Checkbox className={'flex'} size={'1rem'} value={autoCalcScoreValue} setValue={setAutoCalcScoreValue}>
                                Auto calculate score
                            </Checkbox>

                            <Checkbox className={'flex'} size={'1rem'} value={autoCalcGradeValue} setValue={setAutoCalcGradeValue}>
                                Auto calculate grade
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CourseExport.propTypes = {
    id: PropTypes.string,
    termId: PropTypes.string,
    name: PropTypes.string,
    credit: PropTypes.string,
    score: PropTypes.string,
    grade: PropTypes.string,
    autoCalcScore: PropTypes.bool,
    autoCalcGrade: PropTypes.bool,
    includeCalc: PropTypes.bool,
    expanded: PropTypes.bool,
    children: PropTypes.node
}

export default CourseExport;
