import Button from "./Button";
import { Plus } from 'react-feather';

function Term({ dataid, name, children }) {
    return (
        <div data-id={dataid}
            className="draggable hover:cursor-pointer dark:bg-slate-750 bg-slate-250 border dark:border-slate-550 border-slate-350 shadow-lg rounded-md pb-1">

            <div className="flex items-center py-1 px-5 mt-0.5">
                <div className="flex w-full h-full -ml-1">{name}</div>
                <div className="flex justify-end w-1/3">
                    <div className="flex justify-center mr-3 w-full">Avg</div>
                    <div className="flex justify-center mr-3 w-full">Ltr</div>
                    <Button extraClass={"dark:hover:bg-slate-700 hover:bg-slate-300 dark:active:bg-slate-650 active:bg-slate-400 p-0.5"}><Plus size="1.5rem" /></Button>
                </div>
            </div>

            {children}
        </div>
    );
}

export default Term;