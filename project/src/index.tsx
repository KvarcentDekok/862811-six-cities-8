import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

ReactDOM.render(
  <React.StrictMode>
    <App offersNumber={5} />
  </React.StrictMode>,
  document.getElementById('root'));
