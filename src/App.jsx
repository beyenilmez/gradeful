import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import './utils/Program';
import Grid from "./components/Grid";
import { InactiveProvider } from "./components/InactiveContext";
import { useUni } from "./components/UniContext";

function App() {
  //const jsonData = '{"name":"My University","faculty":"My Faculty","department":"My Department","semesters":[{"name":"Term 1","active":true,"expanded":false,"lessons":[{"name":"Physics","credit":4,"expanded":false,"grades":[{"name":"final","value":90,"percentage":50},{"name":"midterm","value":80,"percentage":25},{"name":"quiz","value":85,"percentage":25}]}]},{"name":"Term 2","active":true,"expanded":false,"lessons":[{"name":"Computer Science","credit":3,"expanded":false,"grades":[{"name":"final","value":85,"percentage":50},{"name":"midterm","value":75,"percentage":30},{"name":"quiz","value":80,"percentage":20}]},{"name":"History","credit":2,"expanded":false,"grades":[{"name":"final","value":80,"percentage":60},{"name":"midterm","value":70,"percentage":20},{"name":"quiz","value":75,"percentage":20}]}]},{"name":"Term 3","active":false,"expanded":false,"lessons":[{"name":"Literature","credit":2,"expanded":false,"grades":[{"name":"final","value":85,"percentage":40},{"name":"midterm","value":80,"percentage":30},{"name":"quiz","value":75,"percentage":30}]},{"name":"Biology","credit":3,"expanded":false,"grades":[{"name":"final","value":90,"percentage":50},{"name":"midterm","value":85,"percentage":25},{"name":"quiz","value":80,"percentage":25}]}]}]}';
  //const [universityData, setUniversityData] = useState(JSON.parse(jsonData));
  const uni = useUni();
  if (localStorage.getItem('university')) {
    uni.load(JSON.parse(localStorage.getItem('university')));
  }
  const [universityData, setUniversityData] = useState(uni);

  let [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    //localStorage.setItem('university', JSON.stringify(universityData));
  }, [universityData])

  function addTerm(termName) {
    uni.addSemester(termName);
    setUniversityData(uni);
  }

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} addTerm={() => addTerm("Term " + (uni.semesters.length + 1))} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <InactiveProvider>
        <Grid universityData={universityData} setUniversityData={setUniversityData} />
      </InactiveProvider>
    </div>
  );
}

export default App;