import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { University, Term } from "../utils/Program";
import { Settings, Moon, Sun, Monitor, PlusSquare, GitHub } from "react-feather";
import { useUniData } from "./UniContext";
import OutsideAlerter from "../utils/OutsideAlerter";
import { themeDark, themeLight, themeSystem } from "../utils/theme";
import Button from "./Button";
import ExportToFileWindow from "./ExportToFileWindow";
import ImportFromFileWindow from "./ImportFromFileWindow";

import { ReactComponent as Logo } from "../logo.svg"

function NavBar(props) {
    // Context
    const { universityData, setUniversityData, save } = useUniData();

    // <-- States start -->

    const [settingsDropdown, setSettingsDropdown] = useState(false);
    const [themeDropdown, setThemeDropdown] = useState(false);
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('theme'));

    const [showExportFilePopup, setShowExportFilePopup] = useState(false);
    const [showImportFilePopup, setShowImportFilePopup] = useState(false);

    // <-- States end -->

    // <-- Functions start -->

    function addTerm() {
        const uni = new University(universityData);
        uni.addTerm(new Term())

        save();
        setUniversityData(uni);
    }
    // <-- Functions end -->

    return (
        <nav className="top-0 z-30 sticky p-5 pt-0 pb-0">
            <ExportToFileWindow showExportFilePopup={showExportFilePopup} setShowExportFilePopup={setShowExportFilePopup} />
            <ImportFromFileWindow showImportFilePopup={showImportFilePopup} setShowImportFilePopup={setShowImportFilePopup} />
            <div
                className="flex items-center border-slate-400 dark:border-slate-550 bg-slate-300 dark:bg-slate-650 drop-shadow mt-5 p-5 border rounded-xl h-24">

                {/* Uni logo */}
                <Logo className="w-fit h-full shrink-0" />
                {/* Uni logo */}

                {/* Uni name and department */}
                <div className="md:flex hidden w-full text-slate-800 dark:text-slate-150">
                    <div className="ml-3 h-full">
                        <div className="min-w-[20rem] font-semibold text-lg">{universityData.name}</div>
                        <div className="text-xs">{universityData.department}</div>
                    </div>
                </div>
                {/* Uni name and department */}

                {/* GPA */}
                <div className="flex flex-row gap-1 mb-2.5 p-2.5">
                    <div>
                        <div className="font-light text-center text-sm">
                            GPA
                        </div>
                        <div
                            className="border-slate-450 dark:border-slate-450 bg-slate-200 dark:bg-slate-600 bg-opacity-50 p-2.5 border-none rounded-lg w-24 font-semibold text-center text-lg text-slate-800 dark:text-slate-150">
                            {universityData.gpa ? Math.round(universityData.gpa * 100) / 100 : ' - '}
                        </div>
                    </div>
                    <div className="md:block hidden">
                        <div className="font-light text-center text-sm">
                            Credit
                        </div>
                        <div
                            className="border-slate-450 dark:border-slate-450 bg-slate-200 dark:bg-slate-600 bg-opacity-50 p-2.5 border-none rounded-lg min-w-24 font-semibold text-center text-lg text-slate-800 dark:text-slate-150">
                            {(universityData.totalIncludedCredit ? universityData.totalIncludedCredit  : '0') + '/' + (universityData.realTotalCredit ? universityData.realTotalCredit : '0')}
                        </div>
                    </div>
                    <div className="md:block hidden">
                        <div className="font-light text-center text-sm">
                            ECTS
                        </div>
                        <div
                            className="border-slate-450 dark:border-slate-450 bg-slate-200 dark:bg-slate-600 bg-opacity-50 p-2.5 border-none rounded-lg min-w-24 font-semibold text-center text-lg text-slate-800 dark:text-slate-150">
                            {(universityData.totalTakenEcts ? universityData.totalTakenEcts : '0') + '/' + (universityData.totalEcts ? universityData.totalEcts : '0')}
                        </div>
                    </div>
                </div>
                {/* GPA */}

                <div className="flex justify-end space-x-1 w-full">

                    {/* Add term button */}
                    <Button id='addTermButton' onClick={addTerm} className={'flex font-semibold items-center pr-2'} >
                        <PlusSquare size={'1.75rem'} />
                        &nbsp;
                        Add term
                    </Button>
                    {/* Add term button */}

                    {/* Github button */}
                    <Button onClick={() => { window.open("https://github.com/beyenilmez/gradeful", "_blank"); }}>
                        <GitHub size="1.75rem" />
                    </Button>
                    {/* Github button */}

                    {/* Theme switch */}
                    <OutsideAlerter action={() => {
                        setThemeDropdown(false);
                    }}>
                        <React.Fragment>
                            <Button onClick={() => { setThemeDropdown(!themeDropdown); }}>
                                <div>
                                    <Moon size={"1.75rem"} className={"hidden dark:block"} />
                                    <Sun size={"1.75rem"} className={"dark:hidden block"} />
                                </div>
                            </Button>

                            {/* Theme dropdown */}
                            <div id="theme-dropdown"
                                className={`${themeDropdown ? "block" : "hidden"
                                    } mt-1 absolute w-fit py-2 dark:bg-slate-750 bg-slate-250 border dark:border-slate-700 rounded-lg shadow-lg z-10 dark:text-slate-150 text-slate-800`}>

                                <button id="theme-light-button"
                                    className={`px-1.5 items-center flex text-sm w-full py-1 ${activeTheme === "light" ? "dark:bg-slate-650 bg-slate-400" : ""
                                        } dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100`}
                                    onClick={() => { themeLight(); setActiveTheme("light"); }}>
                                    <Sun size="1rem" className="mr-1" /> Light
                                </button>
                                <button id="theme-dark-button"
                                    className={`px-1.5 items-center flex text-sm w-full py-1 ${activeTheme === "dark" ? "dark:bg-slate-650 bg-slate-400" : ""
                                        } dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100`}
                                    onClick={() => { themeDark(); setActiveTheme("dark"); }}>
                                    <Moon size="1rem" className="mr-1" /> Dark
                                </button>
                                <button id="theme-system-button"
                                    className={`px-1.5 items-center flex text-sm w-full py-1 ${activeTheme === "system" ? "dark:bg-slate-650 bg-slate-400" : ""
                                        } dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100`}
                                    onClick={() => { themeSystem(); setActiveTheme("system"); }}>
                                    <Monitor size="1rem" className="mr-1" /> System
                                </button>
                            </div>
                            {/* Theme dropdown */}
                        </React.Fragment>
                    </OutsideAlerter>
                    {/* Theme switch */}

                    {/* Settings */}
                    <OutsideAlerter action={() => {
                        setSettingsDropdown(false);
                    }}>

                        <React.Fragment>
                            {/* Settings button */}
                            <Button onClick={() => { setSettingsDropdown(!settingsDropdown); }} >
                                <Settings size={"1.75rem"} />
                            </Button>
                            {/* Settings button */}

                            {/* Settings dropdown */}
                            <div className={`${settingsDropdown ? "block" : "hidden"
                                } absolute mt-1 right-0 w-44 py-2 dark:bg-slate-750 bg-slate-250 border dark:border-slate-700 rounded-lg shadow-lg z-10 dark:text-slate-150 text-slate-800`}
                            >

                                <button onClick={() => { setSettingsDropdown(false); setShowImportFilePopup(true); }}
                                    className="dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 py-1 w-full transition-all duration-100">
                                    Import from file
                                </button>
                                <button onClick={() => { setSettingsDropdown(false); setShowExportFilePopup(true); }}
                                    className="dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 py-1 w-full transition-all duration-100">
                                    Export to file
                                </button>
                                <button onClick={() => { setSettingsDropdown(false); props.setShowExportURLPopup(true); }}
                                    className="border-slate-400 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 py-1 border-t w-full transition-all duration-100">
                                    Export as URL
                                </button>
                                <button onClick={() => { setSettingsDropdown(false); props.setShowSettings(true); }}
                                    className="border-slate-400 dark:border-slate-700 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 py-1 border-t w-full transition-all duration-100">
                                    Settings
                                </button>
                            </div>
                            {/* Settings dropdown */}
                        </React.Fragment>
                    </OutsideAlerter>
                    {/* Settings */}
                </div>
            </div >

        </nav >
    );
}

NavBar.propTypes = {
    setShowSettings: PropTypes.func,
    setShowExportURLPopup: PropTypes.func
}

export default NavBar;