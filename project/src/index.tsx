import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createAPI, adaptToClientReviews } from './services/api';
import reducer from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { requireAuthorization, checkAuthAction } from './store/action';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/action';
import { fetchOffersAction } from './store/action';
import { reviews } from './mocks/reviews';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={adaptToClientReviews(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
