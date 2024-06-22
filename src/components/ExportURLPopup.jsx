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
        textAreaRef.current.value = window.location.href.split('?')[0] + "?data=" + encoded;
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
                <div className='pl-1 text-sm'>
                    Paste this link to your browser to import the data.
                </div>
                <div className='flex items-center space-x-3'>
                    <textarea ref={textAreaRef}
                        readOnly

                        rows="1"
                        className="border-slate-500 dark:border-slate-400 bg-transparent pt-[0.15rem] pl-3 border rounded-lg w-full h-7 text-slate-700 text-sm dark:text-slate-300 whitespace-nowrap no-scrollbar outline-none placeholder-slate-450 resize-none dark:placeholder-slate-500"
                        placeholder="Please wait..."
                    />
                    <Button
                        onClick={onCopy}
                        hoverColor={'dark:hover:bg-slate-450 hover:bg-slate-350'}
                        activeColor={'dark:active:bg-slate-400 active:bg-slate-400'}
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