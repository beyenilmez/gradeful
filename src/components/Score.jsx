import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { University, Course } from "../utils/Program";
import { Trash } from 'react-feather';
import { useUniData } from './UniContext';
import Button from './Button';

function ScoreExport(props) {
    // Context
    const { universityData, setUniversityData, editJSON, setEditJSON, save } = useUniData();

    // States
    const [scoreValue, setScoreValue] = useState(props.score);
    const [nameValue, setNameValue] = useState(props.name);
    const [percentageValue, setPercentageValue] = useState(props.percentage);

    const [visible, setVisible] = useState(true);
    const [editing, setEditing] = useState(false);

    // References
    const idRef = useRef(props.id);
    const courseIdRef = useRef(props.courseId);
    const termIdRef = useRef(props.termId);

    const editingRef = useRef(editing);

    // Data
    const editData = editJSON[courseIdRef.current];

    // Functions
    function deleteScore() {
        const course = new Course(editData);

        course.deleteScoreById(idRef.current);
        setEditJSON({ ...editJSON, [courseIdRef.current]: course });

        setVisible(false);
    }

    function updateScore() {
        if (editData === undefined) {
            const uni = new University();
            uni.load(universityData);
            uni.getTermById(termIdRef.current).getCourseById(courseIdRef.current).getScoreById(idRef.current).score = scoreValue;
            save();
            setUniversityData(uni);
        }
    }

    // Effects
    useEffect(() => {
        if (editData !== undefined && !editingRef.current) {
            setEditing(true);
        } else if (editData === undefined) {
            setEditing(false);
            setVisible(true);
        }
    }, [editData])

    useEffect(() => {
        updateScore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scoreValue])

    useEffect(() => {
        if (editData !== undefined) {
            const course = new Course(editData);

            course.getScoreById(idRef.current).name = nameValue;
            course.getScoreById(idRef.current).percentage = percentageValue;

            setEditJSON({ ...editJSON, [courseIdRef.current]: course });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameValue, percentageValue])

    useEffect(() => {
        setNameValue(props.name);
        setPercentageValue(props.percentage);
    }, [editing, props.name, props.percentage])

    // Render
    return (
        <div className={`max-w-[4.25rem] w-[1000%] mr-2 flex flex-col items-start p-1
        ${visible ? '' : 'hidden'}`}>
            <div className={`w-full h-full
            ${editData !== undefined ? 'hidden' : 'flex'}
            `}>
                <div className="mr-0.5 w-full h-full font-light text-center text-xs">
                    {props.name} ({props.percentage}%)
                </div>
            </div>
            <div className="flex items-end mt-1 w-full h-full">
                <div className="flex-row w-full">
                    <textarea rows="1" inputMode="numeric"
                        className={`
                        ${editData !== undefined ? 'hidden' : 'block'}
                        no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="Score"
                        value={scoreValue}
                        onChange={(e) => setScoreValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    />

                    <textarea rows="1"
                        className={`
                    ${editData !== undefined ? 'block' : 'hidden'}
                    whitespace-nowrap
                    no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="Type"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                    <textarea rows="1" inputMode="numeric"
                        className={`
                    ${editData !== undefined ? 'block' : 'hidden'}
                    whitespace-nowrap
                    no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="%"
                        value={percentageValue}
                        onChange={(e) => setPercentageValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    />
                    <Button
                        onClick={deleteScore}
                        hoverColor={"hover:dark:bg-slate-650 hover:bg-slate-350"}
                        activeColor={"active:dark:bg-slate-600 active:bg-slate-400"}
                        padding={'p-0'}
                        className={`w-full flex justify-center items-center overflow-hidden ${editData !== undefined ? 'h-[1.75rem]' : 'h-0'} transition-[height] duration-300`}
                    >
                        <Trash size={"1.25rem"} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

ScoreExport.propTypes = {
    id: PropTypes.string,
    courseId: PropTypes.string,
    termId: PropTypes.string,
    name: PropTypes.string,
    percentage: PropTypes.string,
    score: PropTypes.string
}

export default ScoreExport;
