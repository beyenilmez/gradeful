import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { University } from '../utils/Program'; // Import the University class from the appropriate file

// Create a context
const UniContext = createContext();

// Create a provider component to wrap the parts of the app that need access to the University instance
export const UniProvider = ({ children }) => {
  const uni = useMemo(() => new University(), []);
  const [universityData, setUniversityData] = useState(uni);

  useEffect(() => {
    uni.load(universityData);
  }, [universityData, uni])

  return (
    <UniContext.Provider value={{ uni, universityData, setUniversityData }}>
      {children}
    </UniContext.Provider>
  );
};

// A custom hook to access the University instance context easily in any component
export const useUni = () => {
  const { uni } = useContext(UniContext);
  return uni;
};

export const useUniData = () => {
  return useContext(UniContext);
}