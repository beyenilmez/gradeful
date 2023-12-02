import React from "react";
import Term from "./Term";
import { ReactSortable } from "react-sortablejs";
import Class from './Class';
import '../utils/Program';
import { useInactive } from "./InactiveContext";

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

function Grid({ universityData, setUniversityData }) {
    const { inactive, setInactive } = useInactive();

    return (
        <React.Fragment>
            <button onClick={() => setInactive(!inactive)}>inactive : {inactive ? "true" : "false"}</button>

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
                    <Term key={term.key} name={term.name} isActive={term.expanded} setActive={(value) => {
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
                                <Class key={lesson.name} name={lesson.name} credit={lesson.credit}>
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