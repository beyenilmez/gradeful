import { useEffect, useState } from "react";
import { useUniData } from "./UniContext";
import { University } from "../utils/Program";
import Button from "./Button";
import { decode } from "base64-compressor";
import { Plus, Minus } from 'react-feather';
import Window from "./Window";
import Selector from "./Selector";

import presets from '../presets/department';
import gradeScalePresets from '../presets/gradeScale';

function PageZero() {
    // Context
    const { editJSON, setEditJSON } = useUniData();

    // <--- States start --->
    const [uniNameValue, setUniNameValue] = useState("");
    const [departmentNameValue, setDepartmentNameValue] = useState("");
    const [sourceValue, setSourceValue] = useState("");
    // <--- States end --->

    // <--- Effects start --->
    useEffect(() => {
        if (editJSON["preset"]) {
            setEditJSON({ ...editJSON, "preset": { ...editJSON["preset"], name: `${uniNameValue}`, department: `${departmentNameValue}` } });
        }
    }, [uniNameValue, departmentNameValue]);
    // <--- Effects end --->
    
    // <--- Functions start --->
    async function decodeData(data) {
        try {
            const decoded = await decode(data);
            setEditJSON({ ...editJSON, "preset": decoded });

            setUniNameValue(decoded.name);
            setDepartmentNameValue(decoded.department);
        } catch (e) {
            console.log(e);
        }
    }

    function setPreset(preset) {
        decodeData(preset.data);
        setSourceValue(preset.source);
    }
    // <--- Functions end --->

    // Render
    return (
        <div className='min-h-[20rem]'>

            <div className='text-sm font-light p-1'>Select a preset (This will load the courses from the preset)</div>

            <Selector
                onSelect={setPreset}
                className='rounded-lg outline-none w-[75%]'
                bgColor={'dark:bg-slate-550 bg-slate-350'}
                hoverColor='dark:hover:bg-slate-600 hover:bg-slate-400'
                activeColor='dark:active:bg-slate-650 active:bg-slate-450'
                data={presets}
            >
                Presets
            </Selector>

            {sourceValue && (
                <a href={sourceValue} target="_blank" rel="noreferrer" className='dark:text-sky-300 text-sky-300 underline w-fit'>
                    Source
                </a>
            )}

            <div className="pt-2 flex justify-center">
                or
            </div>

            <div>
                <div className='text-sm font-light p-1'>University name</div>
                <input
                    type="text"
                    className={`w-full h-7 pl-3 text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-450 placeholder-slate-350`}
                    placeholder="University name"
                    value={uniNameValue}
                    onChange={(e) => setUniNameValue(e.target.value)}
                />
            </div>
            <div>
                <div className='text-sm font-light p-1'>Department</div>
                <input
                    type="text"
                    className={`w-full h-7 pl-3 text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-450 placeholder-slate-350`}
                    placeholder="Department"
                    value={departmentNameValue}
                    onChange={(e) => setDepartmentNameValue(e.target.value)}
                />
            </div>
        </div>
    )
}

function GradeScaleSettings() {
    // Context
    const { editJSON, setEditJSON } = useUniData();

    // <--- States start --->
    const [scoreTable, setScoreTable] = useState(editJSON["preset"].scoreTable);
    const [gradeTable, setGradeTable] = useState(editJSON["preset"].gradeTable);
    const [multiplierTable, setMultiplierTable] = useState(editJSON["preset"].multiplierTable);

    const [saveActive, setSaveActive] = useState(false);
    const [discardActive, setDiscardActive] = useState(false);

    // <--- States end --->

    // <--- Effects start --->

    useEffect(() => {
        let equals = true;

        scoreTable.forEach((score, i) => {
            if (score != editJSON["preset"].scoreTable[i]) {
                equals = false;
            }
        })

        gradeTable.forEach((grade, i) => {
            if (grade != editJSON["preset"].gradeTable[i]) {
                equals = false;
            }
        })

        multiplierTable.forEach((multiplier, i) => {
            if (multiplier != editJSON["preset"].multiplierTable[i]) {
                equals = false;
            }
        })

        if (scoreTable.length !== editJSON["preset"].scoreTable.length || gradeTable.length !== editJSON["preset"].gradeTable.length || multiplierTable.length !== editJSON["preset"].multiplierTable.length) {
            equals = false;
        }

        if (equals) {
            setSaveActive(false);
            setDiscardActive(false);
            return;
        } else {
            setSaveActive(true);
            setDiscardActive(true);
        }

        scoreTable.forEach((score) => {
            if (score.length === 0 || (score !== '0' && score !== 0 && score !== '.' && Number(score) === 0)) {
                setSaveActive(false);
            }
        })

        gradeTable.forEach((grade) => {
            if (grade.length === 0) {
                setSaveActive(false);
            }
        })

        multiplierTable.forEach((multiplier) => {
            if (multiplier.length === 0 || multiplier === '.' || (multiplier !== '0' && multiplier !== 0 && multiplier !== '.' && Number(multiplier) === 0)) {
                setSaveActive(false);
            }
        })
    }, [scoreTable, gradeTable, multiplierTable])

    // <--- Effects end --->

    // <--- Functions start --->

    function deleteRow(i) {
        if (gradeTable.length === 1) {
            return;
        }

        const newScoreTable = scoreTable.filter((_, index) => index !== (i === scoreTable.length ? i - 1 : i));
        const newGradeTable = gradeTable.filter((_, index) => index !== i);
        const newMultiplierTable = multiplierTable.filter((_, index) => index !== i);

        setGradeScale({ scoreTable: newScoreTable, gradeTable: newGradeTable, multiplierTable: newMultiplierTable });
    }

    function addRow(i) {
        const newScoreTable = [...scoreTable.slice(0, i), '', ...scoreTable.slice(i)];
        const newGradeTable = [...gradeTable.slice(0, i), '', ...gradeTable.slice(i)];
        const newMultiplierTable = [...multiplierTable.slice(0, i), '', ...multiplierTable.slice(i)];

        setGradeScale({ scoreTable: newScoreTable, gradeTable: newGradeTable, multiplierTable: newMultiplierTable });
    }

    function discardChanges() {
        setScoreTable(editJSON["preset"].scoreTable);
        setGradeTable(editJSON["preset"].gradeTable);
        setMultiplierTable(editJSON["preset"].multiplierTable);

        setSaveActive(false);
        setDiscardActive(false);
    }

    function saveChanges() {
        const uni = new University(editJSON["preset"]);

        uni.setGradeTable(gradeTable);
        uni.setScoreTable(scoreTable);
        uni.setMultiplierTable(multiplierTable);

        setEditJSON({ ...editJSON, preset: uni });

        setSaveActive(false);
        setDiscardActive(false);
    }

    function setGradeScale(item) {
        const newScoreTable = item.scoreTable;
        const newGradeTable = item.gradeTable;
        const newMultiplierTable = item.multiplierTable;

        setScoreTable(newScoreTable);
        setGradeTable(newGradeTable);
        setMultiplierTable(newMultiplierTable);
    }
    // <--- Functions end --->

    // Render
    return (
        <div className='min-h-[20rem] flex flex-col justify-between'>
            <div className="pb-1.5">
                You can customize your grade scale here.
            </div>
            <div className='flex space-x-1'>
                <div>
                    <div className='w-full pb-1 text-center text-sm border-b border-slate-400 mb-1.5'>
                        Percentage
                    </div>
                    <div className='flex'>
                        <div className='space-y-1'>
                            <div className='flex'>
                                <input disabled
                                    type="text"
                                    className={`w-14 h-7 text-sm outline-none rounded-lg border
                        dark:text-slate-400 text-slate-600 
                        dark:border-slate-400 border-slate-500 
                          bg-transparent 
                          text-center
                          opacity-80
                            `}
                                    value={'100'}
                                />

                                <div className='px-1'>
                                    -
                                </div>
                            </div>

                            {scoreTable.map((score, index) => (
                                <div key={index} className='flex'>
                                    <input
                                        type="number"
                                        className={`w-14 h-7 text-sm outline-none rounded-lg border
                              dark:text-slate-300 text-slate-700 
                              dark:border-slate-400 border-slate-500 
                                bg-transparent 
                              dark:placeholder-slate-500 placeholder-slate-450
                                text-center
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    `}

                                        value={score}
                                        onChange={(e) => {
                                            const newScoreTable = [...scoreTable];
                                            newScoreTable[index] = e.target.value;
                                            setScoreTable(newScoreTable);
                                        }}
                                    />
                                    <div className='px-1'>
                                        -
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='w-14 space-y-1'>
                            {scoreTable.map((score, index) => (
                                <input key={index}
                                    type="number"
                                    className={`w-full h-7 text-sm outline-none rounded-lg border
                              dark:text-slate-300 text-slate-700 
                              dark:border-slate-400 border-slate-500 
                                bg-transparent 
                              dark:placeholder-slate-500 placeholder-slate-450
                                text-center
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    `}

                                    value={score}
                                    onChange={(e) => {
                                        const newScoreTable = [...scoreTable];
                                        newScoreTable[index] = e.target.value;
                                        setScoreTable(newScoreTable);
                                    }}
                                />
                            ))}

                            <input disabled
                                type="text"
                                className={`w-full h-7 text-sm outline-none rounded-lg border
                        dark:text-slate-400 text-slate-600 
                        dark:border-slate-400 border-slate-500 
                          bg-transparent 
                          text-center
                          opacity-80
                            `}
                                value={'0'}
                            />
                        </div>
                    </div>
                </div>

                <div className='w-0 border-r border-slate-400' />

                <div>
                    <div className='w-full pb-1 text-center text-sm border-b border-slate-400 mb-1.5'>
                        Grade
                    </div>
                    <div className='w-16 space-y-1'>
                        {gradeTable.map((grade, index) => (
                            <input key={index}
                                type="text"
                                className={`w-full h-7 text-sm outline-none rounded-lg border uppercase
                          dark:text-slate-300 text-slate-700 
                          dark:border-slate-400 border-slate-500 
                            bg-transparent 
                          dark:placeholder-slate-500 placeholder-slate-450
                            text-center
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                `}

                                value={grade}
                                onChange={(e) => {
                                    const newGradeTable = [...gradeTable];
                                    newGradeTable[index] = e.target.value.toUpperCase();
                                    setGradeTable(newGradeTable);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className='w-0 border-r border-slate-400' />

                <div>
                    <div className='w-full pb-1 text-center text-sm border-b border-slate-400 mb-1.5'>
                        GPA
                    </div>
                    <div className='w-16 space-y-1'>
                        {multiplierTable.map((multiplier, index) => (
                            <input key={index}
                                type="text"
                                className={`w-full h-7 text-sm outline-none rounded-lg border uppercase
                          dark:text-slate-300 text-slate-700 
                          dark:border-slate-400 border-slate-500 
                            bg-transparent 
                          dark:placeholder-slate-500 placeholder-slate-450
                            text-center
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                `}

                                value={multiplier}
                                onChange={(e) => {
                                    const newMultiplierTable = [...multiplierTable];
                                    newMultiplierTable[index] = e.target.value.replace(/\.\./g, '.').replace(/[^0-9.]/g, '');
                                    setMultiplierTable(newMultiplierTable);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className='w-0 border-r border-slate-400' />

                <div>
                    <div className='w-full pb-1 text-center text-sm mb-1.5'>
                        &nbsp;
                    </div>
                    <div className='space-y-1'>
                        {gradeTable.map((grade, index) => (
                            <div key={index} className='flex items-center h-7'>
                                <Button
                                    onClick={() => {
                                        addRow(index + 1);
                                    }}
                                    hoverColor='dark:hover:bg-slate-550 hover:bg-slate-350'
                                    activeColor='dark:active:bg-slate-600 active:bg-slate-400'
                                >
                                    <Plus size="1.25rem" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        deleteRow(index);
                                    }}
                                    hoverColor='dark:hover:bg-slate-550 hover:bg-slate-350'
                                    activeColor='dark:active:bg-slate-600 active:bg-slate-400'
                                >
                                    <Minus size="1.25rem" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className="py-1.5">{"Please save your changes by clicking the \"Save\" button."}</div>

                <div className='flex w-full justify-between pb-2'>
                    <Selector
                        onSelect={setGradeScale}
                        className='rounded-lg outline-none'
                        bgColor={'dark:bg-slate-550 bg-slate-350'}
                        hoverColor='dark:hover:bg-slate-600 hover:bg-slate-400'
                        activeColor='dark:active:bg-slate-650 active:bg-slate-450'
                        data={gradeScalePresets}
                    >
                        Presets
                    </Selector>
                    <div className='flex space-x-2'>
                        <Button disabled={!discardActive}
                            onClick={discardChanges}
                            className='dark:bg-rose-500 bg-rose-300
                    disabled:opacity-50
                    dark:disabled:hover:bg-rose-500 disabled:hover:bg-rose-300
                    '
                            hoverColor='dark:hover:bg-rose-600 hover:bg-rose-400'
                            activeColor='active:opacity-80'
                        >
                            Discard
                        </Button>
                        <Button disabled={!saveActive}
                            onClick={saveChanges}
                            className='dark:bg-emerald-500 bg-emerald-300
                        disabled:opacity-50
                        dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300
                    '
                            hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                            activeColor='active:opacity-80'
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuickStartWindow() {
    // Context
    const { editJSON, setUniversityData, save } = useUniData();

    // <--- States start --->
    const [page, setPage] = useState(1);
    const [showQuickStart, setShowQuickStart] = useState(false);
    // <--- States end --->

    // <-- Effects start -->
    useEffect(() => {
        const firstVisit = localStorage.getItem("visited");

        if (firstVisit !== "visited") {
            setShowQuickStart(true);
        }
    }, [])
    // <-- Effects end -->

    // Render
    return (
        <Window title="Quick start" showWindow={showQuickStart} setShowWindow={setShowQuickStart} onClose={() => localStorage.setItem("visited", "visited")}>
            <div className='flex md:flex-row flex-col'>
                <div className='w-full p-4'>
                    <div className="pb-2 border-b dark:border-b-slate-400 border-b-slate-400">
                        Step {page}/2 - {page === 1 ? "Information" : "Grade scale"}
                    </div>
                    <div className="mt-2">
                        <div className={`${page === 1 ? "" : "hidden"}`}>
                            <PageZero />
                        </div>
                        <div className={`${page === 2 ? "" : "hidden"}`}>
                            <GradeScaleSettings />
                        </div>
                    </div>
                    <div className="flex space-x-1 border-t dark:border-t-slate-400 border-t-slate-400 pt-2">
                        <Button
                            onClick={() => setPage(1)}
                            hoverColor='dark:hover:bg-slate-600 hover:bg-slate-400'
                            activeColor='dark:active:bg-slate-650 active:bg-slate-450'
                            className={`dark:bg-slate-550 bg-slate-350 disabled:opacity-50 disabled:dark:hover:bg-slate-550 disabled:hover:bg-slate-350`}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => {
                                if (page === 2) {
                                    setUniversityData(editJSON["preset"]);
                                    save();
                                    localStorage.setItem("visited", "visited");
                                    setShowQuickStart(false);
                                } else {
                                    setPage(2);
                                }
                            }}
                            hoverColor='dark:hover:bg-slate-600 hover:bg-slate-400'
                            activeColor='dark:active:bg-slate-650 active:bg-slate-450'
                            className={`dark:bg-slate-550 bg-slate-350 disabled:opacity-50 disabled:dark:hover:bg-slate-550 disabled:hover:bg-slate-350`}
                        >
                            {page === 2 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </div>
            </div>
        </Window>
    );
}

export default QuickStartWindow;