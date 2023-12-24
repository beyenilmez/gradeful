import React from "react";
import Term from "./Term";
import { ReactSortable } from "react-sortablejs";
import Class from './Class';
import '../utils/Program';
import { useInactive } from "./InactiveContext";
import { useUniData } from "./UniContext";
import { University } from "../utils/Program";
import Button from "./Button";
import Grade from "./Grade";

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
    const { universityData, setUniversityData, editOccupied, setEditOccupied ,editJSON, save } = useUniData();

    return (
        <React.Fragment>
            <div className="flex flex-col">
                <Button onClick={() => setInactive(!inactive)}>inactive : {inactive ? "true" : "false"}</Button>
                <Button onClick={() => setClassInactive(!classInactive)}>classInactive : {classInactive ? "true" : "false"}</Button>
                <Button onClick={() => setEditOccupied(!editOccupied)}>editOccupied : {editOccupied ? "true" : "false"}</Button>

                <Button onClick={() => {
                    localStorage.clear();
                    setUniversityData(new University());
                    save();
                }}>Clear localStorage</Button>
                <Button onClick={() => {
                    const addButton = document.getElementById("addTermButton");
                    addButton.click();
                }}>Add term</Button>
                <Button onClick={() => window.location.reload()}>Reload</Button>
                <Button>{JSON.stringify(editJSON)}</Button>
            </div>


            <ReactSortable
                className="grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800"
                list={universityData.semesters}
                setList={(newList) => {
                    setUniversityData({ ...universityData, semesters: newList });
                    save();
                }}
                onStart={() => {
                    setInactive(true);
                }}
                onEnd={() => {
                    setInactive(false);
                }}
                {...sortableOptions}
            >
                {universityData.semesters.map((term, index) => (
                    <Term key={term.id} id={term.id} name={term.name} isActive={term.expanded} setActive={(value) => {
                        term.expanded = value;
                        setUniversityData({ ...universityData, semesters: [...universityData.semesters] });
                        save();
                    }}>
                        <ReactSortable
                            list={term.lessons}
                            setList={(newList) => {
                                term.lessons = newList;
                                setUniversityData({ ...universityData, semesters: [...universityData.semesters] });
                                save();
                            }}
                            onStart={() => {
                                setClassInactive(true);
                            }}
                            onEnd={() => {
                                setClassInactive(false);
                            }}
                            {...sortableOptions}
                        >
                            {term.lessons.map((lesson) => (
                                <Class key={lesson.id} id={lesson.id} termId={lesson.termId} name={lesson.name} credit={lesson.credit} isActive={lesson.expanded} setActive={(value) => {
                                    lesson.expanded = value;
                                    setUniversityData({ ...universityData, semesters: [...universityData.semesters] });
                                    save();
                                }}>
                                    <ReactSortable
                                        className="flex"
                                        list={lesson.grades}
                                        setList={(newList) => {
                                            lesson.grades = newList;
                                            setUniversityData({ ...universityData, semesters: [...universityData.semesters] });
                                            save();
                                        }}
                                        {...sortableOptions}
                                    >
                                        {lesson.grades.map((grade) => (
                                            <Grade key={grade.id} id={grade.id} courseId={lesson.id} termId={lesson.termId} name={grade.name} percentage={grade.percentage} value={grade.value} />
                                        ))}
                                    </ReactSortable>
                                </Class>
                            ))}
                        </ReactSortable>
                    </Term>
                ))}
            </ReactSortable>
        </React.Fragment>
    );
}

export default Grid;