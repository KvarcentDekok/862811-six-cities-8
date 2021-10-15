import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { offersJSON } from './mocks/offers';
import { reviewsJSON } from './mocks/reviews';
import { adaptToClientOffers, adaptToClientReviews } from './api';

ReactDOM.render(
  <React.StrictMode>
    <App offers={adaptToClientOffers(JSON.parse(offersJSON)) } reviews={adaptToClientReviews(JSON.parse(reviewsJSON))}/>
  </React.StrictMode>,
  document.getElementById('root'));
