import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Router as BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadOffers } from './store/data/data';
import { checkAuth } from './store/user/user';
import browserHistory from './browser-history';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store';
import { ErrorMessage } from './const';

store.dispatch(checkAuth());
store.dispatch(loadOffers())
  .catch(() => toast.error(ErrorMessage.NoOffers));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
