import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800';

function App() {
  return (
    <div>
      <NavBar />
      <SettingsPopup />
    </div>
  );
}

export default App;
