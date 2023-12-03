import React from "react";
import Term from "./Term";
import { ReactSortable } from "react-sortablejs";
import Class from './Class';
import '../utils/Program';
import { useInactive } from "./InactiveContext";
import { useUniData } from "./UniContext";
import { University } from "../utils/Program";
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
    const { universityData, setUniversityData } = useUniData();

    return (
        <React.Fragment>
            <div className="flex flex-col">
                <Button onClick={() => setInactive(!inactive)}>inactive : {inactive ? "true" : "false"}</Button>
                <Button onClick={() => {
                    localStorage.clear();
                    setUniversityData(new University());
                }}>Clear localStorage</Button>
                <Button onClick={() => {
                    const addButton = document.getElementById("addTermButton");
                    addButton.click();
                }}>Add term</Button>
                <Button onClick={() => window.location.reload()}>Reload</Button>
            </div>


            <ReactSortable
                className="grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800"
                list={universityData.semesters}
                setList={(newList) => {
                    setUniversityData({ ...universityData, semesters: newList });
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
                    }}>
                        <ReactSortable
                            list={term.lessons}
                            setList={(newList) => {
                                term.lessons = newList;
                                setUniversityData({ ...universityData, semesters: [...universityData.semesters] });
                            }}
                            {...sortableOptions}
                        >
                            {term.lessons.map((lesson) => (
                                <Class key={lesson.id} id={lesson.id} name={lesson.name} credit={lesson.credit}>
                                    {lesson.credit}
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