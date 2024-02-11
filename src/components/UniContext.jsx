import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { University } from '../utils/Program';

const UniContext = createContext();

export const UniProvider = (props) => {
  const jsonData = localStorage.getItem('university');
  const [universityData, setUniversityData] = useState(jsonData ? JSON.parse(jsonData) : new University());

  const [editJSON, setEditJSON] = useState({"preset": new University()});

  const [saveNextChange, setSaveNextChange] = useState(false);
  const [reloadNextChange, setReloadNextChange] = useState(false);

  useEffect(() => {
    if (saveNextChange) {
      const uni = new University(universityData);
      uni.calc();
      setUniversityData(uni);
      localStorage.setItem('university', JSON.stringify(uni));
      setSaveNextChange(false);
      if(reloadNextChange){
        history.replaceState(null, null, window.location.href.split('?')[0]);
      }
    }
  }, [universityData, saveNextChange]);

  function save(reload = false) {
    if(reload){
      setReloadNextChange(true);
    }
    setSaveNextChange(true);
  }

  return (
    <UniContext.Provider value={{ universityData, setUniversityData, editJSON, setEditJSON, save }}>
      {props.children}
    </UniContext.Provider>
  );
};

UniProvider.propTypes = {
  children: PropTypes.node
}

export const useUniData = () => {
  return useContext(UniContext);
}