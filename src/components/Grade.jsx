import React, { useState, useEffect } from 'react';
import { useUniData } from './UniContext';
import { University } from "../utils/Program";
import Button from './Button';
import { Trash } from 'react-feather';

function Grade({ termId, courseId, id, name }) {
    const { editId, universityData, setUniversityData, pendingUniversityData, setPendingUniversityData } = useUniData();
    const uni = new University();
    uni.load(universityData);

    const [scoreValue, setScoreValue] = useState(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).value);
    const [typeValue, setTypeValue] = useState(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).name);
    const [percentageValue, setPercentageValue] = useState(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).percentage);


    useEffect(() => {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).value = scoreValue;
        setUniversityData(uni);
    }, [scoreValue, id])

    useEffect(() => {
        if (editId === courseId) {
            const uni = new University();
            uni.load(universityData);

            setPendingUniversityData(uni);
            setTypeValue(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).name);
            setPercentageValue(uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).percentage);
        }
    }, [editId])

    useEffect(() => {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).name = typeValue;
        uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).percentage = percentageValue;
        setPendingUniversityData(uni);
    }, [typeValue, percentageValue])

    function getScoreName(){
        const uni = new University();
        uni.load(universityData);
        return uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).name;
    }

    function getScorePercentage(){
        const uni = new University();
        uni.load(universityData);
        return uni.getSemesterById(termId).getClassById(courseId).getScoreById(id).percentage;
    }

    function deleteGrade() {
        const uni = new University();
        uni.load(universityData);
        uni.getSemesterById(termId).getClassById(courseId).deleteScore(id);
        setUniversityData(uni);
    }

    return (
        <div className="max-w-[4.25rem] w-[1000%] mr-2 flex flex-col items-start">
            <div className={`w-full h-full
            ${editId === courseId ? 'hidden' : 'flex'}
            `}>
                <div className="w-full h-full mr-0.5 text-center text-xs font-light">
                    {getScoreName()} ({getScorePercentage()}%)
                </div>
            </div>
            <div className="mt-1 w-full h-full flex items-end">
                <div className="w-full flex-row">
                    <textarea rows="1" inputMode="numeric"
                        className={`
                        ${editId === courseId ? 'hidden' : 'block'}
                        no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="Score"
                        value={scoreValue}
                        onChange={(e) => setScoreValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    ></textarea>

                    <textarea rows="1"
                        className={`
                    ${editId === courseId ? 'block' : 'hidden'}
                    no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="Type"
                        value={typeValue}
                        onChange={(e) => setTypeValue(e.target.value)}
                    ></textarea>
                    <textarea rows="1" inputMode="numeric"
                        className={`
                    ${editId === courseId ? 'block' : 'hidden'}
                    no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="%"
                        value={percentageValue}
                        onChange={(e) => setPercentageValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    ></textarea>
                    <Button 
                    onClick={deleteGrade}
                    hoverColor={"hover:dark:bg-slate-650 hover:bg-slate-350"} 
                    activeColor={"active:dark:bg-slate-600 active:bg-slate-400"}
                    className={`w-full flex justify-center overflow-hidden`}
                    padding={'p-0'}
                    >
                        <Trash size={"1.25rem"}
                        className={`${editId === courseId ? 'h-[1.75rem]' : 'h-0'} transition-[height] duration-300`}/></Button>
                </div>
            </div>
        </div>
    );
}

export default Grade;
