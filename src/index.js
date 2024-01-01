import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UniProvider } from './components/UniContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <UniProvider>
    <App />
  </UniProvider>
  //</React.StrictMode>
);
