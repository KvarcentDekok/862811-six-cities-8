import React from 'react';
import { Offer } from '../../types/offer';
import LocationFavorite from '../location-favorite/location-favorite';
import PlaceCardFavorite from '../place-card-favorite/place-card-favorite';
import Header from '../header/header';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favoriteOffers: Offer[] = offers.filter((offer: Offer) => offer.isFavorite);
  const uniqueCities = Array.from(new Set(favoriteOffers.map((offer: Offer) => offer.city.name)));

  function renderLocations(): JSX.Element {
    return (
      <>
        {
          uniqueCities.map((cityName: string) => (
            <LocationFavorite key={cityName} cityName={cityName}>
              <>
                {
                  offers.filter((offer: Offer) => offer.city.name === cityName).map((offer: Offer) => (
                    <PlaceCardFavorite key={offer.id} offer={offer}/>
                  ))
                }
              </>
            </LocationFavorite>
          ))
        }
      </>
    );
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {renderLocations()}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
