import React from 'react';
import PropTypes from 'prop-types';
import { File } from 'react-feather/dist';

const FileUpload = (props) => {
    const handleFileChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleFiles = (files) => {
        const file = files[0];

        // Check if the selected file is allowed
        if (file && props.allowedTypes.includes(file.type)) {
            // Update selected file state
            props.setSelectedFile(file);

            // Callback to parent component with the selected file
            props.onFileUpload(file);
        } else {
            // Clear selected file if not allowed
            props.setSelectedFile(null);
            props.onFileUpload(null);
        }
    };

    return (
        <div>
            <label>
                <input
                    type="file"
                    accept={props.allowedTypes.join(',')}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </label>

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className='border-2 rounded-lg border-dashed w-64 h-32 flex justify-center items-center'
            >
                <button onClick={() => document.querySelector('input[type="file"]').click()}
                    className='flex flex-col items-center space-y-2'
                >
                    <File size={'2rem'} className={`${props.selectedFile ? 'hidden' : ''}`} />
                    <div>
                        {props.selectedFile ? props.selectedFile.name : 'Pick a file'}
                    </div>
                </button>
            </div>
        </div>
    );
};

FileUpload.propTypes = {
    allowedTypes: PropTypes.arrayOf(PropTypes.string),
    onFileUpload: PropTypes.func,
    selectedFile: PropTypes.any,
    setSelectedFile: PropTypes.func
};

export default FileUpload;
