import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsWindow from "./components/SettingsWindow";
import ExportURLPopup from "./components/ExportURLPopup";
import LoadURLPopup from "./components/LoadURLPopup";
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800 slate';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showExportURLPopup, setShowExportURLPopup] = useState(false);

  return (
    <React.Fragment>
      <NavBar setShowSettings={setShowSettings} setShowExportURLPopup={setShowExportURLPopup} />
      <InactiveProvider>
        <Grid />
      </InactiveProvider>
      <SettingsWindow showSettingsPopup={showSettings} setShowSettingsPopup={setShowSettings} />
      <ExportURLPopup showExportURLPopup={showExportURLPopup} setShowExportURLPopup={setShowExportURLPopup} />
      <LoadURLPopup />
    </React.Fragment>
  );
}

export default App;