import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { adaptToClientOffers, adaptToClientReviews } from './api';
import { createStore } from 'redux';
import reducer from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { Provider } from 'react-redux';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={adaptToClientOffers(offers)} reviews={adaptToClientReviews(reviews)}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
