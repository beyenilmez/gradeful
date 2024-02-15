import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsWindow from "./components/SettingsWindow";
import ExportURLPopup from "./components/ExportURLPopup";
import LoadURLPopup from "./components/LoadURLPopup";
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";
import QucikStartWindow from "./components/QuickStartWindow";
import { useUniData } from "./components/UniContext";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800 slate';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [showExportURLPopup, setShowExportURLPopup] = useState(false);

  const {refresh} = useUniData();

  return (
    <React.Fragment>
      <NavBar setShowSettings={setShowSettings} setShowExportURLPopup={setShowExportURLPopup} />
      <InactiveProvider>
        <Grid key={refresh} />
      </InactiveProvider>
      <SettingsWindow showSettingsPopup={showSettings} setShowSettingsPopup={setShowSettings} />
      <ExportURLPopup showExportURLPopup={showExportURLPopup} setShowExportURLPopup={setShowExportURLPopup} />
      <LoadURLPopup />
      <QucikStartWindow />
    </React.Fragment>
  );
}

export default App;