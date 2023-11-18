import { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import Term from "./components/Term";
import { ReactSortable } from "react-sortablejs";
import './css/drag.css';

const termList = [
  {
    termName: "Term 1",
    termId: "1"
  },
  {
    termName: "Term 2",
    termId: "2"
  },
  {
    termName: "Term 3",
    termId: "3"
  },
];

document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800';

function App() {
  let [showSettings, setShowSettings] = useState(false);
  const [draggableTermList, setDraggableTermList] = useState(termList);


  return (
    <div>
      <NavBar setShowSettings={setShowSettings} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <ReactSortable
      //Dragging mobile problem
        chosenClass="sortable-chosen"
        className="drop_container grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800"
        dragClass="sortable-drag"
        ghostClass="sortable-ghost"
        list={draggableTermList}
        setList={setDraggableTermList}
        animation="300"
        delay="115"
        easing="ease-out"
      >
        {draggableTermList.map(item => (
          <Term dataid={item.termId} name={item.termName} ></Term>
        ))}
      </ReactSortable>
    </div>
  );
}

export default App;
