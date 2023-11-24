import React from "react";
import Term from "./Term";
import { ReactSortable } from "react-sortablejs";
import Class from './Class';
import '../utils/Program';

const sortableOptions = {
    animation: "300",
    delay: "115",
    easing: 'ease-out',
    draggable: ".draggable",
    //chosenClass: "sortable-chosen",
    //dragClass: "sortable-drag",
    //ghostClass: "sortable-ghost"
}

function Grid({ universityData, setUniversityData }) {
    return (
        <React.Fragment>
            <ReactSortable
                className="grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800"
                list={universityData.semesters}
                setList={(newList) => {
                    setUniversityData({ ...universityData, semesters: newList });
                }}
                {...sortableOptions}
            >
                {universityData.semesters.map((term, index) => (
                    <Term key={term.index} name={term.name}>
                        <ReactSortable
                            list={term.lessons}
                            setList={(newList) => {
                                term.lessons = newList;
                                setUniversityData({ ...universityData, semesters: [...universityData.semesters] });
                            }}
                            {...sortableOptions}
                        >
                            {term.lessons.map((lesson) => (
                                <Class name={lesson.name} credit={lesson.credit}/>
                            ))}
                        </ReactSortable>
                    </Term>
                ))}
            </ReactSortable>
        </React.Fragment>
    );
}

export default Grid;