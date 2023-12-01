import { createContext, useState, useContext } from 'react';

// Create a context
const InactiveContext = createContext();

// Create a provider component to wrap the parts of the app that need access to the theme
export const InactiveProvider = ({ children }) => {
  const [inactive, setInactive] = useState(false);

  return (
    <InactiveContext.Provider value={{ inactive, setInactive }}>
      {children}
    </InactiveContext.Provider>
  );
};

// A custom hook to access the theme context easily in any component
export const useInactive = () => {
  return useContext(InactiveContext);
};