import { createContext, useContext, useState, useEffect } from 'react';
import { University } from '../utils/Program';

const UniContext = createContext();

export const UniProvider = ({ children }) => {
  const jsonData = localStorage.getItem('university');
  const [universityData, setUniversityData] = useState(jsonData ? JSON.parse(jsonData) : new University());

  const [editJSON, setEditJSON] = useState({});

  const [saveNextChange, setSaveNextChange] = useState(false);

  useEffect(() => {
    if (saveNextChange) {
      localStorage.setItem('university', JSON.stringify(universityData));
      setSaveNextChange(false);
    }
  }, [universityData, saveNextChange]);

  function save() {
    setSaveNextChange(true);
  }

  return (
    <UniContext.Provider value={{ universityData, setUniversityData, editJSON, setEditJSON, save }}>
      {children}
    </UniContext.Provider>
  );
};

export const useUniData = () => {
  return useContext(UniContext);
}