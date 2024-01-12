import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { University, Term } from "../utils/Program";
import { Settings, Moon, Sun, Monitor, PlusSquare } from "react-feather";
import { useUniData } from "./UniContext";
import OutsideAlerter from "../utils/OutsideAlerter";
import { themeDark, themeLight, themeSystem } from "../utils/theme";
import Button from "./Button";

function NavBar(props) {
    // Context
    const { universityData, setUniversityData, save } = useUniData();

    // <-- States start -->

    const [settingsDropdown, setSettingsDropdown] = useState(false);
    const [themeDropdown, setThemeDropdown] = useState(false);
    const [activeTheme, setActiveTheme] = useState(localStorage.getItem('theme'));

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
        <nav className="sticky top-0 z-30 p-5 pb-0 pt-0">
            <div
                className="rounded-xl p-5 mt-5 dark:bg-slate-650 bg-slate-300 border dark:border-slate-550 border-slate-400 drop-shadow flex items-center h-24">

                {/* Uni logo */}
                <div className="w-fit">
                    <svg className="w-10 dark:fill-slate-300 fill-slate-700" xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1" viewBox="0 0 24 24">
                        <path
                            d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z">
                        </path>
                    </svg>
                </div>
                {/* Uni logo */}

                {/* Uni name and department */}
                <div className="w-full hidden md:flex dark:text-slate-150 text-slate-800">
                    <div className="h-full ml-3">
                        <div className="font-semibold text-lg min-w-[20rem]">Dokuz Eylül Üniversitesi</div>
                        <div className="text-xs">Bilgisayar Mühendisliği</div>
                    </div>
                </div>
                {/* Uni name and department */}

                {/* GPA */}
                <div
                    className="font-semibold text-center text-lg ml-4 dark:text-slate-150 text-slate-800 border-none dark:bg-slate-600 bg-slate-200 bg-opacity-50 dark:border-slate-450 border-slate-450 rounded-lg p-2.5 max-w-[6rem] w-full">
                    {universityData.gpa ? universityData.gpa : ' - '}
                </div>
                {/* GPA */}

                <div className="w-full flex justify-end space-x-1">

                    {/* Add term button */}
                    <Button id='addTermButton' onClick={addTerm} className={'flex font-semibold items-center pr-2'} >
                        <PlusSquare size={'1.75rem'} />
                        &nbsp;
                        Add term
                    </Button>
                    {/* Add term button */}

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

                                <button onClick={() => { setSettingsDropdown(false); }}
                                    className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100">
                                    Import
                                </button>
                                <button onClick={() => { setSettingsDropdown(false); }}
                                    className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100">
                                    Export
                                </button>
                                <button onClick={() => { setSettingsDropdown(false); props.setShowExportURLPopup(true); }}
                                    className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100">
                                    Export as URL
                                </button>
                                <button onClick={() => { setSettingsDropdown(false); props.setShowSettings(true); }}
                                    className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100 border-t dark:border-slate-700 border-slate-400">
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