import React, { useState, useEffect } from 'react';

function Grade({ id, name }) {
    const [inputValue, setInputValue] = useState('');
    
    useEffect(() => {
        console.log(id + ": " + inputValue);
    }, [inputValue, id])

    return (
        <div className="max-w-[4.25rem] w-[1000%] mr-2 flex flex-col items-start">
            <div className="w-full h-full flex">
                <div className="w-full h-full mr-0.5 text-center text-xs font-light">
                    Type (00%)
                </div>
            </div>
            <div className="mt-1 w-full h-full flex items-end">
                <div className="w-full flex">
                    <textarea rows="1" inputMode="numeric"
                        className="no-scrollbar resize-none w-full h-7 text-center pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate2-300 text-slate2-700 dark:border-slate2-400 border-slate2-500 bg-transparent dark:placeholder-slate2-500 placeholder-slate2-450"
                        placeholder="Grade"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, '').substring(0, 3))}
                        maxLength={3}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default Grade;
