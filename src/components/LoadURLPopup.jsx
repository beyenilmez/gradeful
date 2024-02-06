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
                    <div className="
                        flex items-center rounded-lg p-3
                        border dark:border-slate-550 border-slate-400
                        dark:bg-slate-650 bg-slate-350"
                    >
                        {/* Uni logo */}
                        <Logo className="shrink-0 w-10 mr-4" />
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
                            <div className="dark:text-slate-150 text-slate-800 border-none dark:bg-slate-600 bg-slate-200 bg-opacity-50 dark:border-slate-450 border-slate-450 w-fit h-fit p-2 rounded-lg">
                                {gpa ? Math.round(Number(gpa) * 100) / 100 : ' - '}
                            </div>
                        </div>
                    </div>
                    {/* Uni logo and name */}

                    <div className='text-sm pl-1 pt-4 pb-2'>
                        This URL contains data. Are you sure you want to load it?
                        <br />
                        This will overwrite your current data.
                    </div>

                </div>

                <div className="flex w-full h-full p-5 pt-0 space-x-5">
                    <Button
                        disabled={Object.keys(data).length === 0}
                        onClick={loadURL}
                        className='dark:bg-emerald-500 bg-emerald-300
                        disabled:opacity-50
                        dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300
                    '
                        hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                        activeColor='active:opacity-80'
                    >
                        Load
                    </Button>
                    <Button onClick={closePopup}
                        className='dark:bg-rose-500 bg-rose-300
                        disabled:opacity-50
                        dark:disabled:hover:bg-rose-500 disabled:hover:bg-rose-300
                    '
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