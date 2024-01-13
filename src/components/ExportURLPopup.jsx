import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Copy } from "react-feather";
import Window from './Window';
import Button from "./Button";
import { useUniData } from './UniContext';
import { encode } from "base64-compressor"

function ExportURLPopup(props) {
    // Context
    const { universityData } = useUniData();

    // Ref
    const textAreaRef = useRef(null);

    // Effect
    useEffect(() => {
        if (props.showExportURLPopup) {
            generateURL();
        }
    }, [props.showExportURLPopup]);

    // <-- Functions start -->
    async function generateURL() {
        const encoded = await encode(universityData);
        textAreaRef.current.value = location + "?data=" + encoded;
    }

    function onCopy() {
        navigator.clipboard.writeText(textAreaRef.current.value);
        props.setShowExportURLPopup(false);
    }
    // <-- Functions end -->

    return (
        <Window
            title={'Export as URL'}
            showWindow={props.showExportURLPopup} setShowWindow={props.setShowExportURLPopup}
        >
            <div className='p-2'>
                <div className='text-sm pl-1'>
                    Paste this link to your browser to import the data.
                </div>
                <div className='flex items-center space-x-3'>
                    <textarea ref={textAreaRef}
                        readOnly

                        rows="1"
                        className="whitespace-nowrap no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border
                    bg-transparent
                    dark:text-slate-300 text-slate-700
                    dark:border-slate-400 border-slate-500
                    dark:placeholder-slate-500 placeholder-slate-450"
                        placeholder="Please wait..."
                    />
                    <Button
                        onClick={onCopy}
                        hoverColor={'dark:hover:bg-slate-450 hover:bg-slate-550'}
                        activeColor={'dark:active:bg-slate-400 active:bg-slate-600'}
                    >
                        <Copy size="1.5rem" />
                    </Button>
                </div>
            </div>
        </Window>
    );
}

ExportURLPopup.propTypes = {
    showExportURLPopup: PropTypes.bool,
    setShowExportURLPopup: PropTypes.func
}

export default ExportURLPopup;