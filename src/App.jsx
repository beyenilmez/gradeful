import { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import ExportURLPopup from "./components/ExportURLPopup";
import LoadURLPopup from "./components/LoadURLPopup";
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800 slate';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showExportURLPopup, setShowExportURLPopup] = useState(false);

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} setShowExportURLPopup={setShowExportURLPopup}/>
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <ExportURLPopup showExportURLPopup={showExportURLPopup} setShowExportURLPopup={setShowExportURLPopup}/>
      <LoadURLPopup />
      <InactiveProvider>
        <Grid />
      </InactiveProvider>
    </div>
  );
}

export default App;