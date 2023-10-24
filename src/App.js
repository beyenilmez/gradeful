import { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import Term from "./components/Term";
import "./utils/drag.js";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800';

function App() {
  let [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <div id="terms" class="drop_container grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800">
        <Term dataid={"1"} name={"Term 1"} ></Term>
        <Term dataid={"2"} name={"Term 2"} ></Term>
        <Term dataid={"3"} name={"Term 3"} ></Term>
      </div>
    </div>
  );
}

export default App;
