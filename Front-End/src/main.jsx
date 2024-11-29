import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação para React 18
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usando createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
