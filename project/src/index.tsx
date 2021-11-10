import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Router as BrowserRouter } from 'react-router-dom';
import { api } from './services/api';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { loadOffers } from './store/data/data';
import { checkAuth } from './store/user/user';
import browserHistory from './browser-history';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuth());
store.dispatch(loadOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
