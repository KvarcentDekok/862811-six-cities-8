import React from 'react';
import { Offer } from '../../types/offer';
import LocationFavorite from '../location-favorite/location-favorite';
import PlaceCardFavorite from '../place-card-favorite/place-card-favorite';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favoriteOffers: Offer[] = offers.filter((offer: Offer) => offer.isFavorite);
  const uniqueCities = Array.from(new Set(favoriteOffers.map((offer: Offer) => offer.city.name)));

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqueCities.map((cityName: string) => (
                <LocationFavorite key={cityName} cityName={cityName}>
                  <>
                    {
                      offers.map((offer: Offer) => {
                        if (offer.city.name === cityName) {
                          return (
                            <PlaceCardFavorite key={offer.id} offer={offer}/>
                          );
                        }

                        return false;
                      })
                    }
                  </>

                </LocationFavorite>
              ))}
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
