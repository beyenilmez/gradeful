import { useState } from 'react';
import PropTypes from 'prop-types';
import Window from './Window';
import Button from "./Button";
import { useUniData } from './UniContext';
import FileUpload from './UploadForm';
import { X } from 'react-feather/dist';
import { decode } from "base64-compressor"

import { ReactComponent as Logo } from "../logo.svg"

function ImportFromFileWindow(props) {
    // Context
    const { setUniversityData } = useUniData();

    // State
    const [selectedFile, setSelectedFile] = useState(null);
    const [decodedData, setDecodedData] = useState({});
    // <-- Functions start -->

    async function decodeFile(file) {
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            async () => {
                const text = await reader.result;

                try {
                    const decoded = await decode(text);
                    setDecodedData(decoded);
                } catch (e) {
                    console.log(e);
                }
            },
            false,
        );
        reader.readAsText(file);
    }

    function handleFileUpload(file) {
        if (file) {
            decodeFile(file);
        }
    }

    function handleImport() {
        if (Object.keys(decodedData).length !== 0) {
            setUniversityData(decodedData);
            setSelectedFile(null);
            props.setShowImportFilePopup(false);
        }
    }

    // <-- Functions end -->

    return (
        <Window
            title={'Import from file'}
            showWindow={props.showImportFilePopup} setShowWindow={props.setShowImportFilePopup}
        >
            <div className='flex flex-col items-center space-y-3 p-2'>
                {/* Uni logo and name */}
                {selectedFile && (
                    <div className="flex items-center border-slate-400 dark:border-slate-550 bg-slate-350 dark:bg-slate-650 border rounded-lg w-full"
                    >
                        {/* Uni logo */}
                        <Logo className="m-3 mr-4 w-10 shrink-0" />
                        {/* Uni logo */}

                        <div className="py-3 pr-4 shrink-0">
                            <div className="font-semibold text-md">
                                {decodedData.name ? decodedData.name : 'No university name'}
                            </div>
                            <div className="text-md">
                                {decodedData.department ? decodedData.department : 'No department name'}
                            </div>
                        </div>
                        <div className="flex justify-end py-3 w-full">
                            <div className="border-slate-450 dark:border-slate-450 bg-slate-200 dark:bg-slate-600 bg-opacity-50 p-2 border-none rounded-lg w-fit h-fit text-slate-800 dark:text-slate-150">
                                {decodedData.gpa ? Math.round(Number(decodedData.gpa) * 100) / 100 : ' - '}
                            </div>
                        </div>
                        <div className='relative h-[4.5rem]'>
                            <button onClick={() => {
                                setSelectedFile(null);
                                setDecodedData({});
                            }}
                                className='bg-rose-300 dark:bg-rose-500 rounded-full'>
                                <X size={'1rem'} />
                            </button>
                        </div>
                    </div>
                )}
                {/* Uni logo and name */}
                {!selectedFile && (
                    <div className={`flex space-x-2`}>
                        <FileUpload allowedTypes={['text/plain']} onFileUpload={handleFileUpload} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                    </div>
                )}
                <div className='flex space-x-2'>
                    <Button
                        disabled={!selectedFile || Object.keys(decodedData).length === 0}
                        onClick={handleImport}
                        padding='px-4 py-2'
                        className='bg-emerald-300 dark:disabled:hover:bg-emerald-500 disabled:hover:bg-emerald-300 dark:bg-emerald-500 disabled:opacity-50'
                        hoverColor='dark:hover:bg-emerald-600 hover:bg-emerald-400'
                        activeColor='active:opacity-80'
                    >
                        Load
                    </Button>

                    <Button
                        disabled={!selectedFile}
                        onClick={() => {
                            setSelectedFile(null);
                            setDecodedData({});
                            props.setShowImportFilePopup(false);
                        }}
                        padding='px-4 py-2'
                        className='bg-rose-300 dark:disabled:hover:bg-rose-500 disabled:hover:bg-rose-300 dark:bg-rose-500 disabled:opacity-50'
                        hoverColor='dark:hover:bg-rose-600 hover:bg-rose-400'
                        activeColor='active:opacity-80'
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Window>
    );
}

ImportFromFileWindow.propTypes = {
    showImportFilePopup: PropTypes.bool,
    setShowImportFilePopup: PropTypes.func
}

export default ImportFromFileWindow;