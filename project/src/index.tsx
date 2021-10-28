import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createAPI, adaptToClientReviews } from './services/api';
import reducer from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { checkAuth, fetchOffers } from './store/action';
import { ThunkAppDispatch } from './types/action';
import { reviews } from './mocks/reviews';
import { fetchMiddleware } from './store/middlewares/fetch-middleware';

const api = createAPI();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(fetchMiddleware(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuth());
(store.dispatch as ThunkAppDispatch)(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={adaptToClientReviews(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
