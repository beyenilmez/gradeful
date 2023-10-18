import NavBar from "./components/NavBar";

document.querySelector('html').classList.add('dark');
document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800';

function App() {
  return (
    <NavBar />
  );
}

export default App;
