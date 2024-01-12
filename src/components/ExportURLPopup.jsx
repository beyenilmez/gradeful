import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X, Copy } from "react-feather";
import { useUniData } from './UniContext';
import Button from "./Button";
import { encode } from "base64-compressor"

function ExportURLPopup(props) {
    const { universityData } = useUniData();

    const textAreaRef = useRef(null);

    async function generateURL() {
        const encoded = await encode(universityData);
        textAreaRef.current.value = location.origin + "/?data=" + encoded;
    }

    useEffect(() => {
        if (props.showExportURLPopup) {
            generateURL();
        }
    }, [props.showExportURLPopup]);


    return (
        <div className={`${props.showExportURLPopup ? "flex" : "hidden"
            } w-full h-full absolute z-40 top-0 justify-center items-center bg-black/[.70] dark:text-slate-300 text-slate-750`}>
            <div
                className="absolute z-50 md:w-[40rem] w-[80%] rounded-lg flex flex-col dark:bg-slate-650 bg-slate-350 shadow-lg">
                <div className="dark:bg-slate-750 bg-slate-250 w-full h-fit p-1.5 flex items-center justify-between rounded-t-lg">
                    <div className="pl-3 text-lg font-semibold">
                        {"Paste this to your browser's address bar"}
                    </div>
                    <Button onClick={() => props.setShowExportURLPopup(false)} className={"dark:active:bg-slate-650 active:bg-slate-400"}><X size="1.5rem" /></Button>
                </div>

                <div className="w-full h-full p-5 flex space-x-2 items-center">
                    <textarea ref={textAreaRef}
                        readOnly

                        rows="1"
                        className="whitespace-nowrap no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450"
                        placeholder="Please wait..."></textarea>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(textAreaRef.current.value);
                        props.setShowExportURLPopup(false);
                    }}
                        hoverColor={'dark:hover:bg-slate-600 hover:bg-slate-700'}
                        activeColor={'dark:active:bg-slate-550 active:bg-slate-750'}
                    >
                        <Copy size="1.5rem" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

ExportURLPopup.propTypes = {
    showExportURLPopup: PropTypes.bool,
    setShowExportURLPopup: PropTypes.func
}

export default ExportURLPopup;