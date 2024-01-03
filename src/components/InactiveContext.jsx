import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const InactiveContext = createContext();

export const InactiveProvider = (props) => {
  const [inactive, setInactive] = useState(false);
  const [classInactive, setClassInactive] = useState('');

  return (
    <InactiveContext.Provider value={{ inactive, setInactive, classInactive, setClassInactive }}>
      {props.children}
    </InactiveContext.Provider>
  );
};


InactiveProvider.propTypes = {
  children: PropTypes.node
}

export const useInactive = () => {
  return useContext(InactiveContext);
};