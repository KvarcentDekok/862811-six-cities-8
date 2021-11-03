import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { adaptToClientReviews, api } from './services/api';
import { Provider } from 'react-redux';
import { reviews } from './mocks/reviews';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { loadOffers } from './store/data/data';
import { checkAuth } from './store/user/user';

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
      <App reviews={adaptToClientReviews(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
