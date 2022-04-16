import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth } from './components/context/Auth';

ReactDOM.render(
  <React.StrictMode>
    <Auth>
        <App />
    </Auth>
  </React.StrictMode>,
  document.getElementById('root')
);
