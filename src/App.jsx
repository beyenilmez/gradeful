import { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";
import { useUniData } from "./components/UniContext";
import { University, Term } from "./utils/Program";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800 slate';

function App() {
  const { universityData, setUniversityData, save } = useUniData();
  const [showSettings, setShowSettings] = useState(false);

  function addTerm() {
    const uni = new University();
    uni.load(universityData);
    uni.addTerm(new Term())
    setUniversityData(uni);
    save();
  }

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} addTerm={() => addTerm()} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <InactiveProvider>
        <Grid />
      </InactiveProvider>
    </div>
  );
}

export default App;