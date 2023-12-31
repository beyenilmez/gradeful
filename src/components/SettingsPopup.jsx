import { useState } from "react";
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import Button from './Button';

function InfoSettings(props) {
  return (
    <div className={`${props.className} h-full flex flex-col`}>
      <div className="w-full mr-2 flex flex-col items-start mb-3">
        <div className="w-full h-full flex">
          <div className="w-full h-full mr-0.5 text-xs">
            University name
          </div>
        </div>
        <div className="mt-1 w-full h-full flex items-end">
          <div className="w-full flex">
            <textarea rows="1" inputMode="numeric"
              className="no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450"
              placeholder="My university"></textarea>
          </div>
        </div>

      </div>

      <div className="w-full mr-2 flex flex-col items-start mb-3">
        <div className="w-full h-full flex">
          <div className="w-full h-full mr-0.5 text-xs">
            Department
          </div>
        </div>
        <div className="mt-1 w-full h-full flex items-end">
          <div className="w-full flex">
            <textarea rows="1" inputMode="numeric"
              className="no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450"
              placeholder="My department"></textarea>
          </div>
        </div>

      </div>

      <div className="w-full h-full flex items-end justify-end">
        <button disabled
          className="disabled:opacity-70 border p-1 px-2 h-fit rounded-lg dark:bg-rose-700 bg-rose-400 border-rose-500 dark:border-rose-400 enabled:dark:hover:bg-rose-600 enabled:hover:bg-rose-500 enabled:dark:active:bg-rose-500 enabled:active:bg-rose-600 transition-all duration-100 mr-2">Discard</button>
        <button disabled
          className="disabled:opacity-70 border p-1 px-2 h-fit rounded-lg dark:bg-emerald-700 bg-emerald-400 border-emerald-500 dark:border-emerald-400 enabled:dark:hover:bg-emerald-600 enabled:hover:bg-emerald-500 enabled:dark:active:bg-emerald-500 enabled:active:bg-emerald-600 transition-all duration-100">Save</button>
      </div>
    </div>
  );
}

InfoSettings.propTypes = {
  className: PropTypes.string
}

function GradeSettings(props) {
  return (
    <div className={`${props.className} h-full flex flex-col`}>

      <div className="w-full mr-2 flex flex-col items-start mb-3">
        <div className="w-full h-full flex">
          <div className="w-full h-full mr-0.5 text-xs">
            GPAs
          </div>
        </div>
        <div className="mt-1 w-full h-full flex items-end">
          <div className="w-full flex">
            <textarea rows="1" inputMode="numeric"
              className="no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450"
              placeholder="4.00, 3.50, 3.00, 2.50, 2.00, 1.50, 1.00, 0.50, 0.00"></textarea>
          </div>
        </div>

      </div>

      <div className="w-full mr-2 flex flex-col items-start mb-3">
        <div className="w-full h-full flex">
          <div className="w-full h-full mr-0.5 text-xs">
            Grades
          </div>
        </div>
        <div className="mt-1 w-full h-full flex items-end">
          <div className="w-full flex">
            <textarea rows="1" inputMode="numeric"
              className="uppercase no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450"
              placeholder="AA, BA, BB, CB, CC, DC, DD, FD, FF"></textarea>
          </div>
        </div>

      </div>

      <div className="w-full mr-2 flex flex-col items-start mb-3">
        <div className="w-full h-full flex">
          <div className="w-full h-full mr-0.5 text-xs">
            Scores
          </div>
        </div>
        <div className="mt-1 w-full h-full flex items-end">
          <div className="w-full flex">
            <textarea rows="1" inputMode="numeric"
              className="no-scrollbar resize-none w-full h-7 pl-3 pt-[0.15rem] text-sm outline-none rounded-lg border dark:text-slate-300 text-slate-700 dark:border-slate-400 border-slate-500 bg-transparent dark:placeholder-slate-500 placeholder-slate-450"
              placeholder="90, 85, 80, 75, 70, 65, 60, 50"></textarea>
          </div>
        </div>

      </div>

      <div className="w-full h-full flex items-end justify-end">
        <button disabled
          className="disabled:opacity-70 border p-1 px-2 h-fit rounded-lg dark:bg-rose-700 bg-rose-400 border-rose-500 dark:border-rose-400 enabled:dark:hover:bg-rose-600 enabled:hover:bg-rose-500 enabled:dark:active:bg-rose-500 enabled:active:bg-rose-600 transition-all duration-100 mr-2">Discard</button>
        <button disabled
          className="disabled:opacity-70 border p-1 px-2 h-fit rounded-lg dark:bg-emerald-700 bg-emerald-400 border-emerald-500 dark:border-emerald-400 enabled:dark:hover:bg-emerald-600 enabled:hover:bg-emerald-500 enabled:dark:active:bg-emerald-500 enabled:active:bg-emerald-600 transition-all duration-100">Save</button>
      </div>
    </div>
  );
}

GradeSettings.propTypes = {
  className: PropTypes.string
}

function SettingsPopup(props) {
  let [settingsTab, setSettingsTab] = useState("infoSettings");

  return (
    <div className={`${props.showSettings ? "flex" : "hidden"
      } w-full h-full absolute z-40 top-0 justify-center items-center bg-black/[.70] dark:text-slate-300 text-slate-750`}>
      <div
        className="absolute z-50 md:w-[40rem] w-[80%] rounded-lg flex flex-col dark:bg-slate-650 bg-slate-350 shadow-lg">
        <div className="dark:bg-slate-750 bg-slate-250 w-full h-fit p-1.5 flex items-center justify-between rounded-t-lg">
          <div className="pl-3 text-lg font-semibold">
            Settings
          </div>
          <Button onClick={() => props.setShowSettings(false)} className={"dark:active:bg-slate-650 active:bg-slate-400"}><X size="1.5rem" /></Button>
        </div>
        <div className="md:flex-row flex flex-col min-h-fit h-80">
          <div
            className="dark:bg-slate-700 md:rounded-bl-lg bg-slate-300 p-2 md:h-full h-fit w-full md:w-fit flex md:flex-col md:border-r md:border-b-0 border-b dark:border-slate-500 border-slate-400">
            <Button onClick={() => setSettingsTab("infoSettings")} className={`${settingsTab === "infoSettings" ? "dark:bg-slate-600 bg-slate-400" : ""
              } w-[80%] md:w-auto md:px-6 md:text-base text-sm truncate py-2 dark:hover:bg-slate-650 dark:active:bg-slate-600 hover:bg-slate-350 active:bg-slate-400`}>Information</Button>
            <Button onClick={() => setSettingsTab("gradeSettings")} className={`${settingsTab === "gradeSettings" ? "dark:bg-slate-600 bg-slate-400" : ""
              } w-[80%] md:w-auto md:px-6 md:text-base text-sm truncate py-2 dark:hover:bg-slate-650 dark:active:bg-slate-600 hover:bg-slate-350 active:bg-slate-400 mt-1`}>Grade Scale</Button>
          </div>
          <div className="w-full h-full p-5">
            <InfoSettings className={`${settingsTab === "infoSettings" ? "block" : "hidden"}`} />
            <GradeSettings className={`${settingsTab === "gradeSettings" ? "block" : "hidden"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

SettingsPopup.propTypes = {
  showSettings: PropTypes.bool,
  setShowSettings: PropTypes.func
}

export default SettingsPopup;
