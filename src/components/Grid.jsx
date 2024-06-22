import React from "react";
import Term from "./Term";
import Course from './Course';
import Score from "./Score";
import { useUniData } from "./UniContext";
import { useInactive } from "./InactiveContext";
import { ReactSortable } from "react-sortablejs";

import '../css/drag.css';

const sortableOptions = {
    animation: "150",
    //delay: "50",
    easing: 'ease-out',
    draggable: ".draggable",
    handle: ".handle",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ghostClass: "sortable-ghost"
}

function Grid() {
    const { setInactive } = useInactive();
    const { setClassInactive } = useInactive();
    const { universityData, setUniversityData, save, editJSON } = useUniData();

    return (
        <ReactSortable
            className="gap-7 grid grid-cols-1 md:grid-cols-2 m-8 text-slate-800 dark:text-slate-200"
            list={universityData.terms}
            setList={(newList) => {
                save();
                setUniversityData({ ...universityData, terms: newList });
            }}
            onStart={() => {
                setInactive(true);
            }}
            onEnd={() => {
                setInactive(false);
            }}
            {...sortableOptions}
        >
            {universityData.terms.map((term) => (
                <Term key={term.id} id={term.id} name={term.name} totalCredit={String(term.totalCredit)} totalEcts={String(term.totalEcts)} expanded={term.expanded} includeCalc={term.includeCalc} autoCalc={term.autoCalc} gpa={String(term.gpa)}>
                    <ReactSortable
                        list={term.courses}
                        setList={(newList) => {
                            term.courses = newList;
                            save();
                            setUniversityData({ ...universityData, terms: [...universityData.terms] });
                        }}
                        onStart={() => {
                            setClassInactive(term.id);
                        }}
                        onEnd={() => {
                            setClassInactive('');
                        }}
                        {...sortableOptions}
                    >
                        {term.courses.map((course) => (
                            <Course key={course.id}
                                id={course.id} termId={course.termId} name={course.name}
                                credit={course.credit} ects={course.ects} score={String(course.score)} grade={course.grade}
                                autoCalcScore={course.autoCalcScore} autoCalcGrade={course.autoCalcGrade} includeCalc={course.includeCalc}
                                expanded={course.expanded}>
                                <ReactSortable
                                    className="flex"
                                    list={course.scores}
                                    setList={(newList) => {
                                        course.scores = newList;
                                        save();
                                        setUniversityData({ ...universityData, terms: [...universityData.terms] });
                                    }}
                                    {...sortableOptions}
                                >
                                    <React.Fragment>
                                        {editJSON[course.id] === undefined && course.scores.map((score) => (
                                            <Score key={score.id} id={score.id} courseId={course.id} termId={course.termId} name={score.name} percentage={score.percentage} score={score.score} />
                                        ))}
                                        {editJSON[course.id] !== undefined && editJSON[course.id].scores && editJSON[course.id].scores.map((score) => (
                                            <Score key={score.id} id={score.id} courseId={course.id} termId={course.termId} name={score.name} percentage={score.percentage} />
                                        ))}
                                    </React.Fragment>
                                </ReactSortable>
                            </Course>
                        ))}
                    </ReactSortable>
                </Term>
            ))}
        </ReactSortable>
    );
}

export default Grid;