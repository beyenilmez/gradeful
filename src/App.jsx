import { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800 slate';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <InactiveProvider>
        <Grid />
      </InactiveProvider>
    </div>
  );
}

export default App;