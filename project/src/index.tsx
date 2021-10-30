import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createAPI, adaptToClientReviews } from './services/api';
import { Provider } from 'react-redux';
import { checkAuth, fetchOffers } from './store/action';
import { reviews } from './mocks/reviews';
import { fetchMiddleware } from './store/middlewares/fetch-middleware';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(fetchMiddleware(api)),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={adaptToClientReviews(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
