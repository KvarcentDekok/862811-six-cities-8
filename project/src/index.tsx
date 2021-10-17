import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { adaptToClientOffers, adaptToClientReviews } from './api';

ReactDOM.render(
  <React.StrictMode>
    <App offers={adaptToClientOffers(offers) } reviews={adaptToClientReviews(reviews)}/>
  </React.StrictMode>,
  document.getElementById('root'));
