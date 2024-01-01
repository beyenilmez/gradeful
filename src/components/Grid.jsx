import React from "react";
import { University } from "../utils/Program";
import Term from "./Term";
import Course from './Course';
import Score from "./Score";
import { useUniData } from "./UniContext";
import { useInactive } from "./InactiveContext";
import { ReactSortable } from "react-sortablejs";
import Button from "./Button";

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
    const { inactive, setInactive } = useInactive();
    const { classInactive, setClassInactive } = useInactive();
    const { universityData, setUniversityData, save } = useUniData();

    return (
        <React.Fragment>
            <div className="flex flex-col">
                <Button onClick={() => setInactive(!inactive)}>inactive : {inactive ? "true" : "false"}</Button>
                <Button>classInactive : {classInactive}</Button>

                <Button onClick={() => {
                    localStorage.clear();
                    save();
                    setUniversityData(new University());
                }}>Clear localStorage</Button>
                <Button onClick={() => {
                    const addButton = document.getElementById("addTermButton");
                    addButton.click();
                }}>Add term</Button>
                <Button onClick={() => window.location.reload()}>Reload</Button>

                <Button onClick={() => {
                    const uni = new University(universityData);
                    uni.calc();
                    save();
                    setUniversityData(uni);
                    console.log(uni);
                }}>Calc</Button>

            </div>


            <ReactSortable
                className="grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800"
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
                {universityData.terms.map((term, index) => (
                    <Term key={term.id} id={term.id} name={term.name} expanded={term.expanded} includeCalc={term.includeCalc}>
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
                                    credit={course.credit} score={course.score} grade={course.grade}
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
                                        {course.scores.map((score) => (
                                            <Score key={score.id} id={score.id} courseId={course.id} termId={course.termId} name={score.name} percentage={score.percentage} score={score.score} />
                                        ))}
                                    </ReactSortable>
                                </Course>
                            ))}
                        </ReactSortable>
                    </Term>
                ))}
            </ReactSortable>
        </React.Fragment>
    );
}

export default Grid;