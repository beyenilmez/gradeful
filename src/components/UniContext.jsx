import { createContext, useContext, useState, useEffect } from 'react';
import { University } from '../utils/Program'; // Import the University class from the appropriate file

// Create a context
const UniContext = createContext();

// Create a provider component to wrap the parts of the app that need access to the University instance
export const UniProvider = ({ children }) => {
  const jsonData = localStorage.getItem('university');
  const [universityData, setUniversityData] = useState(jsonData ? JSON.parse(jsonData) : new University());

  useEffect(() => {
    localStorage.setItem('university', JSON.stringify(universityData));
    console.log(universityData);
  }, [universityData])

  return (
    <UniContext.Provider value={{ universityData, setUniversityData }}>
      {children}
    </UniContext.Provider>
  );
};

export const useUniData = () => {
  return useContext(UniContext);
}