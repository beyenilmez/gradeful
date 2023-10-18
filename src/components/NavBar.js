import { Settings } from "react-feather";
import Button from "./Button";

function NavBar() {
    return (
        <nav className="sticky top-0 z-30 p-5 pb-0 pt-0">
            <div
                className="rounded-xl p-5 mt-5 dark:bg-slate-650 bg-slate-300 border dark:border-slate-550 border-slate-400 drop-shadow flex items-center h-24">
                <div className="w-fit">
                    <svg className="w-10 dark:fill-slate-300 fill-slate-700" xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1" viewBox="0 0 24 24">
                        <path
                            d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z">
                        </path>
                    </svg>
                </div>

                <div className="w-full hidden md:flex dark:text-slate-150 text-slate-800">
                    <div className="h-full ml-3">
                        <div className="font-semibold text-lg min-w-[20rem]">Dokuz Eylül Üniversitesi</div>
                        <div className="text-xs">Bilgisayar Mühendisliği</div>
                    </div>
                </div>

                <div
                    className="font-semibold text-center text-lg ml-4 dark:text-slate-150 text-slate-800 border-none dark:bg-slate-600 bg-slate-200 bg-opacity-50 dark:border-slate-450 border-slate-450 rounded-lg p-2.5 max-w-[6rem] w-full">
                    3.62
                </div>

                <div className="w-full flex justify-end">
                    <div>
                        <button
                            className="dark:flex hidden items-center justify-center w-10 h-10 text-slate-300 hover:bg-slate-600 rounded-lg transition-all duration-100">
                            <svg className="w-6 h-6 fill-slate-300 border-slate-800" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 18 20">
                                <path
                                    d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="dark:hidden flex items-center justify-center w-10 h-10 text-slate-700 hover:bg-slate-350 rounded-lg transition-all duration-100">
                            <svg className="w-6 h-6 fill-slate-700" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z">
                                </path>
                            </svg>
                        </button>

                        <div
                            className="mt-32 absolute w-16 py-2 dark:bg-slate-750 bg-slate-250 border dark:border-slate-700 rounded-lg shadow-lg z-10 dark:text-slate-150 text-slate-800">

                            <button
                                className="text-sm w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100"
                                onclick="themeLight()">
                                Light
                            </button>
                            <button
                                className="text-sm w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100"
                                onclick="themeDark()">
                                Dark
                            </button>
                            <button
                                className="text-sm w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100"
                                onclick="themeSystem()">
                                System
                            </button>
                        </div>
                    </div>

                    <button
                        className="ml-2.5 w-10 dark:stroke-slate-300 stroke-slate-700 p-1.5 dark:hover:bg-slate-600 hover:bg-slate-350 rounded-lg transition-all duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                            </path>
                        </svg>
                    </button>

                    <Button content={<Settings color="" size={"1.75rem"} />}
                        action={() => { console.log("Settings"); }}
                    />

                    <div
                        className="absolute mt-64 right-0 w-44 py-2 dark:bg-slate-750 bg-slate-250 border dark:border-slate-700 rounded-lg shadow-lg z-10 dark:text-slate-150 text-slate-800">

                        <button
                            className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100">
                            Add Semester
                        </button>
                        <button
                            className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100 border-t dark:border-slate-700 border-slate-400">
                            Export
                        </button>
                        <button
                            className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100">
                            Import
                        </button>
                        <button
                            className="w-full py-1 dark:hover:bg-slate-700 hover:bg-slate-350 dark:active:bg-slate-650 active:bg-slate-400 transition-all duration-100 border-t dark:border-slate-700 border-slate-400">
                            Settings
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default NavBar;