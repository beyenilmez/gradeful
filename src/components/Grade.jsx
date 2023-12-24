import React, { useState, useEffect } from 'react';
import { useUniData } from './UniContext';
import { University, Course } from "../utils/Program";
import Button from './Button';
import { Trash } from 'react-feather';

function Grade({ termId, courseId, id, name }) {
    const { universityData, setUniversityData, editJSON, setEditJSON} = useUniData();
    const uni = new University();
    uni.load(universityData);

    const [scoreValue, setScoreValue] = useState(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).value);
    const [typeValue, setTypeValue] = useState(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).name);
    const [percentageValue, setPercentageValue] = useState(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).percentage);
    const [visible, setVisible] = useState(true);
    const [editing, setEditing] = useState(false);


    useEffect(() => {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).value = scoreValue;
        setUniversityData(uni);
    }, [scoreValue])

    useEffect(() => {
        if (editJSON[courseId] !== undefined && !editing) {
            const course = new Course();
            course.load(editJSON[courseId]);

            setTypeValue(course.getScoreById(id).name);
            setPercentageValue(course.getScoreById(id).percentage);

            setEditing(true);
        }else if(editJSON[courseId] === undefined){
            setEditing(false);
            setVisible(true);
        }
    }, [editJSON])

    useEffect(() => {
        if (editJSON[courseId] !== undefined) {
            const course = new Course();
            course.load(editJSON[courseId]);
            console.log(course.getScoreById(id));

            course.getScoreById(id).name = typeValue;
            course.getScoreById(id).percentage = percentageValue;

            setEditJSON({ ...editJSON, [courseId]: course });
        }
    }, [typeValue, percentageValue])

    function getScoreName() {
        const uni = new University();
        uni.load(universityData);
        return uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).name;
    }

    function getScorePercentage() {
        const uni = new University();
        uni.load(universityData);
        return uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).percentage;
    }

    function deleteScore() {
        const course = new Course();
        course.load(editJSON[courseId]);

        course.deleteScore(id);
        setEditJSON({ ...editJSON, [courseId]: course });
        
        setVisible(false);
    }

    return (
        <div className={`max-w-[4.25rem] w-[1000%] mr-2 flex flex-col items-start
        ${visible ? 'block' : 'hidden'}`}>
            <div className={`w-full h-full
            ${editJSON[courseId] !== undefined ? 'hidden' : 'flex'}
            `}>
                <div className="w-full h-full mr-0.5 text-center text-xs font-light">
                    {getScoreName()} ({getScorePercentage()}%)
                </div>
            </div>
            <div className="mt-1 w-full h-full flex items-end">
                <div className="w-full flex-row">
                    <textarea rows="1" inputMode="numeric"
                        className={`
                        ${editJSON[courseId] !== undefined ? 'hidden' : 'block'}
                        no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="Score"
                        value={scoreValue}
                        onChange={(e) => setScoreValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    ></textarea>

                    <textarea rows="1"
                        className={`
                    ${editJSON[courseId] !== undefined ? 'block' : 'hidden'}
                    no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="Type"
                        value={typeValue}
                        onChange={(e) => setTypeValue(e.target.value)}
                    ></textarea>
                    <textarea rows="1" inputMode="numeric"
                        className={`
                    ${editJSON[courseId] !== undefined ? 'block' : 'hidden'}
                    no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="%"
                        value={percentageValue}
                        onChange={(e) => setPercentageValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    ></textarea>
                    <Button
                        onClick={() => {
                            deleteScore();

                        }}
                        hoverColor={"hover:dark:bg-slate-650 hover:bg-slate-350"}
                        activeColor={"active:dark:bg-slate-600 active:bg-slate-400"}
                        className={`w-full flex justify-center overflow-hidden`}
                        padding={'p-0'}
                    >
                        <Trash size={"1.25rem"}
                            className={`${editJSON[courseId] !== undefined ? 'h-[1.75rem]' : 'h-0'} transition-[height] duration-300`} /></Button>
                </div>
            </div>
        </div>
    );
}

export default Grade;
