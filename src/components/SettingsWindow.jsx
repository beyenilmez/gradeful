import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useUniData } from "./UniContext";
import Button from "./Button";
import Window from "./Window";
import { Plus, Minus } from 'react-feather';
import { University } from '../utils/Program';
import Selector from './Selector';

import gradeScalePresets from '../presets/gradeScale';

function InformationSettings() {
    // Context
    const { universityData, setUniversityData, save } = useUniData();

    // <--- States start --->

    const [uniNameValue, setUniNameValue] = useState(universityData.name);
    const [departmentNameValue, setDepartmentNameValue] = useState(universityData.department);

    // <--- States end --->

    // <--- Functions start --->

    function saveChanges() {
        universityData.name = uniNameValue;
        universityData.department = departmentNameValue;

        save();
        setUniversityData(universityData);
    }

    function discardChanges() {
        setUniNameValue(universityData.name);
        setDepartmentNameValue(universityData.department);
    }

    // <--- Functions end --->

    return (
        <div className='flex flex-col justify-between min-h-[25rem]'>
            <div className='space-y-2 px-5 py-3'>
                <div>
                    <div className='p-1 font-light text-sm'>University name</div>
                    <input
                        type="text"
                        className={`w-full h-7 pl-3 text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="University name"
                        value={uniNameValue}
                        onChange={(e) => setUniNameValue(e.target.value)}
                    />
                </div>
                <div>
                    <div className='p-1 font-light text-sm'>Department</div>
                    <input
                        type="text"
                        className={`w-full h-7 pl-3 text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450`}
                        placeholder="University name"
                        value={departmentNameValue}
                        onChange={(e) => setDepartmentNameValue(e.target.value)}
                    />
                </div>
            </div>
            <div className='flex justify-end space-x-2 p-2 pr-5 w-full'>
                <Button
                    disabled={uniNameValue === universityData.name && departmentNameValue === universityData.department}
                    onClick={discardChanges}
                    className='bg-rose-300 dark:disabled:hover:bg-rose-500 disabled:hover:bg-rose-300 dark:bg-rose-500 disabled:opacity-50'
                    hoverColor='dark:hover:bg-rose-600 hover:bg-rose-400'
                    activeColor='active:opacity-80'
                >
                    Discard
                </Button>
                <Button
                    disabled={uniNameValue === universityData.name && departmentNameValue === universityData.department}
                    onClick={saveChanges}
                    className='bg-emerald-300 dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300 dark:bg-emerald-500 disabled:opacity-50'
                    hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                    activeColor='active:opacity-80'
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

function GradeScaleSettings() {
    // Context
    const { universityData, setUniversityData, save } = useUniData();

    // <--- States start --->
    const [scoreTable, setScoreTable] = useState(universityData.scoreTable);
    const [gradeTable, setGradeTable] = useState(universityData.gradeTable);
    const [multiplierTable, setMultiplierTable] = useState(universityData.multiplierTable);

    const [saveActive, setSaveActive] = useState(false);
    const [discardActive, setDiscardActive] = useState(false);

    // <--- States end --->

    // <--- Effects start --->

    useEffect(() => {
        let equals = true;

        scoreTable.forEach((score, i) => {
            if (score != universityData.scoreTable[i]) {
                equals = false;
            }
        })

        gradeTable.forEach((grade, i) => {
            if (grade != universityData.gradeTable[i]) {
                equals = false;
            }
        })

        multiplierTable.forEach((multiplier, i) => {
            if (multiplier != universityData.multiplierTable[i]) {
                equals = false;
            }
        })

        if (scoreTable.length !== universityData.scoreTable.length || gradeTable.length !== universityData.gradeTable.length || multiplierTable.length !== universityData.multiplierTable.length) {
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
        setScoreTable(universityData.scoreTable);
        setGradeTable(universityData.gradeTable);
        setMultiplierTable(universityData.multiplierTable);

        setSaveActive(false);
        setDiscardActive(false);
    }

    function saveChanges() {
        const uni = new University(universityData);

        uni.setGradeTable(gradeTable);
        uni.setScoreTable(scoreTable);
        uni.setMultiplierTable(multiplierTable);

        save();
        setUniversityData(uni);

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
        <div className='flex flex-col justify-between min-h-[25rem]'>
            <div className='flex space-x-1 px-5 py-3'>
                <div>
                    <div className='border-slate-400 mb-1.5 pb-1 border-b w-full text-center text-sm'>
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

                        <div className='space-y-1 w-14'>
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

                <div className='border-slate-400 border-r w-0' />

                <div>
                    <div className='border-slate-400 mb-1.5 pb-1 border-b w-full text-center text-sm'>
                        Grade
                    </div>
                    <div className='space-y-1 w-16'>
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

                <div className='border-slate-400 border-r w-0' />

                <div>
                    <div className='border-slate-400 mb-1.5 pb-1 border-b w-full text-center text-sm'>
                        GPA
                    </div>
                    <div className='space-y-1 w-16'>
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

                <div className='border-slate-400 border-r w-0' />

                <div>
                    <div className='mb-1.5 pb-1 w-full text-center text-sm'>
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

            <div className='flex justify-between px-5 p-2 w-full'>
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
                        className='bg-rose-300 dark:disabled:hover:bg-rose-500 disabled:hover:bg-rose-300 dark:bg-rose-500 disabled:opacity-50'
                        hoverColor='dark:hover:bg-rose-600 hover:bg-rose-400'
                        activeColor='active:opacity-80'
                    >
                        Discard
                    </Button>
                    <Button disabled={!saveActive}
                        onClick={saveChanges}
                        className='bg-emerald-300 dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300 dark:bg-emerald-500 disabled:opacity-50'
                        hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                        activeColor='active:opacity-80'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

function About() {
    return (
        <div className='min-h-[25rem]'>
            <div className='flex flex-col space-y-2 px-5 py-3'>
                <div className='w-fit'>
                    v-{"1.2.2"}
                </div>
                <a className='w-fit text-sky-300 dark:text-sky-300 underline cursor-pointer' onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }} target="_blank">
                    Delete all data
                </a>
                <a
                    className='w-fit text-sky-300 dark:text-sky-300 underline'
                    href='./licenses.json' target="_blank">
                    View Licenses
                </a>
                <a
                    className='w-fit text-sky-300 dark:text-sky-300 underline'
                    href='https://github.com/beyenilmez/gradeful' target="_blank" rel="noreferrer">
                    Github
                </a>
            </div>
        </div>
    )
}
function SettingsWindow(props) {

    const [settingsTab, setSettingsTab] = useState("information");

    return (
        <Window title="Settings" showWindow={props.showSettingsPopup} setShowWindow={props.setShowSettingsPopup}>
            <div className='flex md:flex-row flex-col'>
                <div className='flex flex-row md:flex-col border-slate-350 dark:border-slate-450 border-r border-b'>
                    <Button
                        onClick={() => setSettingsTab("information")}
                        rounded='rounded-none'
                        hoverColor='dark:hover:bg-slate-550 hover:bg-slate-350'
                        activeColor='dark:active:bg-slate-600 active:bg-slate-400'
                        padding='p-2 px-6'
                        className={`
                        ${settingsTab === "information" ? "dark:bg-slate-600 bg-slate-400" : ""}
                        w-full
                        border-b border-r dark:border-slate-450 border-slate-350
                        `}
                    >
                        Information
                    </Button>
                    <Button
                        onClick={() => setSettingsTab("grade-scale")}
                        rounded='rounded-none'
                        hoverColor='dark:hover:bg-slate-550 hover:bg-slate-350'
                        activeColor='dark:active:bg-slate-600 active:bg-slate-400'
                        className={`
                        ${settingsTab === "grade-scale" ? "dark:bg-slate-600 bg-slate-400" : ""}
                        w-full
                        border-b border-r dark:border-slate-450 border-slate-350
                        `}
                    >
                        Grade scale
                    </Button>
                    <Button
                        onClick={() => setSettingsTab("about")}
                        rounded='rounded-none'
                        hoverColor='dark:hover:bg-slate-550 hover:bg-slate-350'
                        activeColor='dark:active:bg-slate-600 active:bg-slate-400'
                        className={`
                        ${settingsTab === "about" ? "dark:bg-slate-600 bg-slate-400" : ""}
                        w-full
                        border-b border-r dark:border-slate-450 border-slate-350
                        `}
                    >
                        About
                    </Button>
                </div>
                <div className='w-full'>
                    <div className={`${settingsTab === "information" ? "" : "hidden"}`}>
                        <InformationSettings />
                    </div>
                    <div className={`${settingsTab === "grade-scale" ? "" : "hidden"}`}>
                        <GradeScaleSettings />
                    </div>
                    <div className={`${settingsTab === "about" ? "" : "hidden"}`}>
                        <About />
                    </div>
                </div>
            </div>
        </Window>
    );
}

SettingsWindow.propTypes = {
    showSettingsPopup: PropTypes.bool,
    setShowSettingsPopup: PropTypes.func
};

export default SettingsWindow;