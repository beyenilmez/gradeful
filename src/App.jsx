import { useEffect, useState, useMemo } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import './utils/Program';
import Grid from "./components/Grid";

function App() {
  //const jsonData = '{"name":"My University","faculty":"My Faculty","department":"My Department","semesters":[{"name":"Term 1","active":true,"expanded":false,"lessons":[{"name":"Mathematics","credit":3,"expanded":false,"grades":[{"name":"final","value":95,"percentage":40},{"name":"midterm","value":85,"percentage":30},{"name":"quiz","value":75,"percentage":30}]},{"name":"Physics","credit":4,"expanded":false,"grades":[{"name":"final","value":90,"percentage":50},{"name":"midterm","value":80,"percentage":25},{"name":"quiz","value":85,"percentage":25}]}]},{"name":"Term 2","active":true,"expanded":false,"lessons":[{"name":"Computer Science","credit":3,"expanded":false,"grades":[{"name":"final","value":85,"percentage":50},{"name":"midterm","value":75,"percentage":30},{"name":"quiz","value":80,"percentage":20}]},{"name":"History","credit":2,"expanded":false,"grades":[{"name":"final","value":80,"percentage":60},{"name":"midterm","value":70,"percentage":20},{"name":"quiz","value":75,"percentage":20}]}]},{"name":"Term 3","active":false,"lessons":[{"name":"Literature","credit":2,"expanded":false,"grades":[{"name":"final","value":85,"percentage":40},{"name":"midterm","value":80,"percentage":30},{"name":"quiz","value":75,"percentage":30}]},{"name":"Biology","credit":3,"expanded":false,"grades":[{"name":"final","value":90,"percentage":50},{"name":"midterm","value":85,"percentage":25},{"name":"quiz","value":80,"percentage":25}]}]}]}';
  //const [universityData, setUniversityData] = useState(JSON.parse(jsonData));
  const uni = useMemo(() => new window.University(), []);
  const [universityData, setUniversityData] = useState(localStorage.getItem('university') ? JSON.parse(localStorage.getItem('university')) : uni);

  let [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    console.log(universityData);
    //localStorage.setItem('university', JSON.stringify(universityData));
  }, [universityData, uni])

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <Grid universityData={universityData} setUniversityData={setUniversityData} />
    </div>
  );
}

export default App;