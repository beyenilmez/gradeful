import { useState } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';
import Button from "./Button";
import { useUniData } from './UniContext';
import { encode } from "base64-compressor"

function ExportToFileWindow(props) {
    // Context
    const { universityData } = useUniData();

    // State
    const [fileName, setFileName] = useState(universityData.name + '-' + universityData.department);

    // <-- Functions start -->
    async function downloadFile() {
        const encoded = await encode(universityData);
        var a = document.createElement("a");
        var file = new Blob([encoded], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = fileName + ".txt";
        a.click();
    }
    // <-- Functions end -->

    return (
        <Window
            title={'Export to file'}
            showWindow={props.showExportFilePopup} setShowWindow={props.setShowExportFilePopup}
        >
            <div className='p-2 space-y-1'>
                <div className='text-sm pl-1'>
                    File name
                </div>
                <div className='flex flex-col space-y-3'>
                    <div className='flex space-x-2'>
                        <textarea
                            rows="1"
                            className="whitespace-nowrap no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border
                    bg-transparent
                    dark:text-slate-300 text-slate-700
                    dark:border-slate-400 border-slate-500
                    dark:placeholder-slate-500 placeholder-slate-450"
                            placeholder="File name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <div>
                            .txt
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <Button
                            onClick={downloadFile}
                            padding='px-4 py-2'
                            className='dark:bg-emerald-500 bg-emerald-300
                        disabled:opacity-50
                        dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300
                    '
                            hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                            activeColor='active:opacity-80'
                        >
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </Window>
    );
}

ExportToFileWindow.propTypes = {
    showExportFilePopup: PropTypes.bool,
    setShowExportFilePopup: PropTypes.func
}

export default ExportToFileWindow;