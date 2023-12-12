import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";
import { useUniData } from "./components/UniContext";
import { University } from "./utils/Program";
import ColorSchemeDetector from "./utils/ColorSchemeDetector";

if(localStorage.getItem('colorScheme') === null) {
  localStorage.setItem('colorScheme', 'default');
}

if(localStorage.getItem('oldColorScheme') === null) {
  localStorage.setItem('oldColorScheme', 'default');
}

const colorScheme = localStorage.getItem('colorScheme');

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800 ' + colorScheme;

function App() {
  const { universityData, setUniversityData } = useUniData();
  const [showSettings, setShowSettings] = useState(false);

  function addTerm(termName) {
    const uni = new University();
    uni.load(universityData);
    uni.addSemester(termName);
    setUniversityData(uni);
  }

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} addTerm={(termName) => addTerm(termName)} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <InactiveProvider>
        <Grid />
      </InactiveProvider>
      <ColorSchemeDetector />
    </div>
  );
}

export default App;