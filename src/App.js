import { useState } from "react";
import NavBar from "./components/NavBar";
import SettingsPopup from "./components/SettingsPopup";
import Term from "./components/Term";
import { ReactSortable } from "react-sortablejs";
//import './css/drag.css';
//import Accordion from "./components/Accordion";
import Class from './components/Class';
//import { University } from './utils/Program';

const universityData = {
  "name": "My University",
  "faculty": "My Faculty",
  "department": "My Department",
  "semesters": [
    {
      "name": "Term 1",
      "active": true,
      "lessons": [
        {
          "name": "Mathematics",
          "credit": 3,
          "grades": [
            { "name": "final", "value": 95, "percentage": 40 },
            { "name": "midterm", "value": 85, "percentage": 30 },
            { "name": "quiz", "value": 75, "percentage": 30 }
          ]
        },
        {
          "name": "Physics",
          "credit": 4,
          "grades": [
            { "name": "final", "value": 90, "percentage": 50 },
            { "name": "midterm", "value": 80, "percentage": 25 },
            { "name": "quiz", "value": 85, "percentage": 25 }
          ]
        }
      ]
    },
    {
      "name": "Term 2",
      "active": true,
      "lessons": [
        {
          "name": "Computer Science",
          "credit": 3,
          "grades": [
            { "name": "final", "value": 85, "percentage": 50 },
            { "name": "midterm", "value": 75, "percentage": 30 },
            { "name": "quiz", "value": 80, "percentage": 20 }
          ]
        },
        {
          "name": "History",
          "credit": 2,
          "grades": [
            { "name": "final", "value": 80, "percentage": 60 },
            { "name": "midterm", "value": 70, "percentage": 20 },
            { "name": "quiz", "value": 75, "percentage": 20 }
          ]
        }
      ]
    },
    {
      "name": "Term 3",
      "active": false,
      "lessons": [
        {
          "name": "Literature",
          "credit": 2,
          "grades": [
            { "name": "final", "value": 85, "percentage": 40 },
            { "name": "midterm", "value": 80, "percentage": 30 },
            { "name": "quiz", "value": 75, "percentage": 30 }
          ]
        },
        {
          "name": "Biology",
          "credit": 3,
          "grades": [
            { "name": "final", "value": 90, "percentage": 50 },
            { "name": "midterm", "value": 85, "percentage": 25 },
            { "name": "quiz", "value": 80, "percentage": 25 }
          ]
        }
      ]
    }
  ]
};



document.body.className = 'bg-slate-250 dark:bg-slate-750 dark:text-slate-200 text-slate-800';

function App() {
  let [showSettings, setShowSettings] = useState(false);
  const [draggableTermList, setDraggableTermList] = useState(universityData.semesters);
  const [classList, setClassList] = useState();

  return (
    <div>
      <NavBar setShowSettings={setShowSettings} />
      <SettingsPopup showSettings={showSettings} setShowSettings={setShowSettings} />
      <ReactSortable
        //Dragging mobile problem
        draggable=".draggable"
        chosenClass="sortable-chosen"
        className="grid gap-7 grid-cols-1 md:grid-cols-2 m-8 dark:text-slate-200 text-slate-800"
        dragClass="sortable-drag"
        ghostClass="sortable-ghost"
        list={draggableTermList}
        setList={setDraggableTermList}
        animation="300"
        delay="115"
        easing="ease-out"
        onEnd={(evt) => {
          setDraggableTermList(prevList => {
            const updatedList = [...prevList];
            console.log(updatedList); // log the updated list
            return updatedList;
          });
        }}
      >
        {draggableTermList.map((term) => (
          <Term name={term.name} key={term.name}>
            <ReactSortable
              //Dragging mobile problem
              draggable=".draggable"
              chosenClass="sortable-chosen"
              className="grid gap-1 mx-2 pb-1.5 grid-cols-1"
              dragClass="sortable-drag"
              ghostClass="sortable-ghost"
              list={term.lessons}
              setList={setClassList}
              animation="300"
              delay="115"
              easing="ease-out"
              onEnd={(evt) => {
                setClassList(prevList => {
                  const updatedList = [...prevList];
                  console.log(updatedList); // log the updated list
                  // update the termlist 
                  term.lessons = updatedList;
                  return updatedList;
                });
              }}
            >
              {term.lessons.map((item) => (
                <Class name={item.name} key={item.name}>
                  {item.credit} credit
                </Class>
              ))}
            </ReactSortable>
            
          </Term>
        ))}
      </ReactSortable>
    </div>
  );
}

export default App;
