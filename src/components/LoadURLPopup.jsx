import React, { useEffect, useState } from "react";
import { useUniData } from "./UniContext";
import Button from "./Button";
import { decode } from "base64-compressor";
import Window from "./Window";

import {ReactComponent as Logo} from "../logo.svg"

function LoadURLPopup() {
    // Context
    const { setUniversityData, save } = useUniData();

    // States
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState({});
    const [uniName, setUniName] = useState();
    const [departmentName, setDepartmentName] = useState();
    const [gpa, setGpa] = useState();

    // Effects
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            localStorage.setItem('visited', 'visited');
            decodeURL();
            setShowPopup(true);
        }
    }, [])

    // <-- Functions start -->

    function closePopup() {
        setShowPopup(false);
    }

    async function decodeURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            try {
                const decoded = await decode(data);
                setData(decoded);
                setUniName(decoded.name);
                setDepartmentName(decoded.department);
                setGpa(decoded.gpa);
            } catch (e) {
                console.log(e);
            }
        }
    }

    function loadURL() {
        save(true);
        setUniversityData(data);
        closePopup();
    }

    // <-- Functions end -->

    return (
        <Window
            showWindow={showPopup} setShowWindow={setShowPopup}
            title={'Load data confirmation'}>
            <React.Fragment>
                <div className="p-4 pb-0">
                    {/* Uni logo and name */}
                    <div className="flex items-center border-slate-400 dark:border-slate-550 bg-slate-350 dark:bg-slate-650 p-3 border rounded-lg"
                    >
                        {/* Uni logo */}
                        <Logo className="mr-4 w-10 shrink-0" />
                        {/* Uni logo */}

                        <div className="pr-4 shrink-0">
                            <div className="font-semibold text-md">
                                {uniName ? uniName : 'No university name'}
                            </div>
                            <div className="text-md">
                                {departmentName ? departmentName : 'No department name'}
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <div className="border-slate-450 dark:border-slate-450 bg-slate-200 dark:bg-slate-600 bg-opacity-50 p-2 border-none rounded-lg w-fit h-fit text-slate-800 dark:text-slate-150">
                                {gpa ? Math.round(Number(gpa) * 100) / 100 : ' - '}
                            </div>
                        </div>
                    </div>
                    {/* Uni logo and name */}

                    <div className='pt-4 pb-2 pl-1 text-sm'>
                        This URL contains data. Are you sure you want to load it?
                        <br />
                        This will overwrite your current data.
                    </div>

                </div>

                <div className="flex space-x-5 p-5 pt-0 w-full h-full">
                    <Button
                        disabled={Object.keys(data).length === 0}
                        onClick={loadURL}
                        className='bg-emerald-300 dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300 dark:bg-emerald-500 disabled:opacity-50'
                        hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                        activeColor='active:opacity-80'
                    >
                        Load
                    </Button>
                    <Button onClick={closePopup}
                        className='bg-rose-300 dark:disabled:hover:bg-rose-500 disabled:hover:bg-rose-300 dark:bg-rose-500 disabled:opacity-50'
                        hoverColor='dark:hover:bg-rose-600 hover:bg-rose-400'
                        activeColor='active:opacity-80'
                    >
                        Cancel
                    </Button>
                </div>
            </React.Fragment>
        </Window>
    );
}

export default LoadURLPopup;