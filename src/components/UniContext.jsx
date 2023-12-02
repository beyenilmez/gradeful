import { createContext, useContext } from 'react';
import '../utils/Program'; // Import the University class from the appropriate file

// Create a context
const UniContext = createContext();

// Create a provider component to wrap the parts of the app that need access to the University instance
export const UniProvider = ({ children }) => {
  const uni = new window.University(); // Create an instance of the University class

  return (
    <UniContext.Provider value={{ uni }}>
      {children}
    </UniContext.Provider>
  );
};

// A custom hook to access the University instance context easily in any component
export const useUni = () => {
  const { uni } = useContext(UniContext);
  return uni;
};