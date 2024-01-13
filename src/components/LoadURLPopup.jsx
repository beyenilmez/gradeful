import { useEffect, useState, useRef } from "react";
import { X } from "react-feather";
import { useUniData } from "./UniContext";
import Button from "./Button";
import { decode } from "base64-compressor";

function LoadURLPopup() {
    // Context
    const { setUniversityData, save } = useUniData();

    // State
    const [data, setData] = useState();
    const [uniName, setUniName] = useState();
    const [departmentName, setDepartmentName] = useState();
    const [gpa, setGpa] = useState();

    // Ref
    const popupRef = useRef();

    // Effects
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            decodeURL();
            popupRef.current.classList.remove('hidden');
        }
    }, [])

    // Functions
    function closePopup() {
        popupRef.current.classList.add('hidden');
    }

    async function decodeURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            const decoded = await decode(data);
            setData(decoded);
            setUniName(decoded.name);
            setDepartmentName(decoded.department);
            setGpa(decoded.gpa);
        }
    }

    function loadURL() {
        save(true);
        setUniversityData(data);
        closePopup();
    }

    return (
        <div ref={popupRef} className={`hidden w-full h-full absolute z-40 top-0 justify-center items-center bg-black/[.70] dark:text-slate-300 text-slate-750`}>
            <div className="flex h-[75%] w-full justify-center items-center">
                <div
                    className="absolute z-50 md:w-[40rem] w-[80%] rounded-lg flex flex-col dark:bg-slate-650 bg-slate-350 shadow-lg">
                    <div className="dark:bg-slate-750 bg-slate-250 w-full h-fit p-1.5 flex items-center justify-between rounded-t-lg">
                        <div className="pl-3 text-lg font-semibold">
                            Load data confirmation
                        </div>
                        <Button onClick={closePopup} className={"dark:active:bg-slate-650 active:bg-slate-400"}><X size="1.5rem" /></Button>
                    </div>

                    <div className="p-4">
                        <div className="flex items-center border border-slate-450 dark:bg-slate-750 bg-slate-550 rounded-lg p-3">
                            {/* Uni logo */}
                            <div className="w-fit mr-4">
                                <svg className="w-10 dark:fill-slate-300 fill-slate-700" xmlns="http://www.w3.org/2000/svg"
                                    data-name="Layer 1" viewBox="0 0 24 24">
                                    <path
                                        d="M21,10a.99974.99974,0,0,0,1-1V6a.9989.9989,0,0,0-.68359-.94824l-9-3a1.002,1.002,0,0,0-.63282,0l-9,3A.9989.9989,0,0,0,2,6V9a.99974.99974,0,0,0,1,1H4v7.18427A2.99507,2.99507,0,0,0,2,20v2a.99974.99974,0,0,0,1,1H21a.99974.99974,0,0,0,1-1V20a2.99507,2.99507,0,0,0-2-2.81573V10ZM20,21H4V20a1.001,1.001,0,0,1,1-1H19a1.001,1.001,0,0,1,1,1ZM6,17V10H8v7Zm4,0V10h4v7Zm6,0V10h2v7ZM4,8V6.7207l8-2.667,8,2.667V8Z">
                                    </path>
                                </svg>
                            </div>
                            {/* Uni logo */}
                            <div className="pr-4 shrink-0">
                                <div className="text-md font-semibold">
                                    {uniName ? uniName : 'No university name'}
                                </div>
                                <div className="text-md">
                                    {departmentName ? departmentName : 'No department name'}
                                </div>
                            </div>
                            <div className="w-full flex justify-end">
                                <div className="dark:bg-slate-700 bg-slate-600 w-fit h-fit p-2 rounded-lg">
                                    {gpa ? gpa : ' - '}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full h-full p-5 pt-0 space-x-5">
                        <Button
                            onClick={loadURL}
                            className={'dark:bg-slate-600 bg-slate-700'}
                            hoverColor={'dark:hover:bg-slate-550 hover:bg-slate-750'}
                            activeColor={'dark:active:bg-slate-500 active:bg-slate-800'}
                        >
                            Load
                        </Button>
                        <Button onClick={closePopup}
                            className={'dark:bg-slate-600 bg-slate-700'}
                            hoverColor={'dark:hover:bg-slate-550 hover:bg-slate-750'}
                            activeColor={'dark:active:bg-slate-500 active:bg-slate-800'}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadURLPopup;