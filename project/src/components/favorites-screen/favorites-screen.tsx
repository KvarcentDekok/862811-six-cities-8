import React from 'react';
import { Offer } from '../../types/offer';
import LocationFavorite from '../location-favorite/location-favorite';
import PlaceCard from '../place-card/place-card';
import Header from '../header/header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavoriteOffers } from '../../store/data/data';
import { getFavoriteOffers } from '../../store/data/selectors';
import { AppDispatch } from '../../store/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AppRoute, ErrorMesssage } from '../../const';
import { Link } from 'react-router-dom';

function FavoritesScreen(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadFavoriteOffers())
      .then(unwrapResult)
      .catch(() => toast.error(ErrorMesssage.NoFavoriteOffers));
  }, [dispatch]);

  const favoriteOffers = useSelector(getFavoriteOffers);
  const uniqueCities = Array.from(
    new Set(favoriteOffers.map((offer: Offer) => offer.city.name)),
  );

  function renderLocations() {
    return uniqueCities.map((cityName: string) => (
      <LocationFavorite key={cityName} cityName={cityName}>
        <>
          {favoriteOffers
            .filter((offer: Offer) => offer.city.name === cityName)
            .map((offer: Offer) => (
              <PlaceCard key={offer.id} offer={offer} variant='favorites' />
            ))}
        </>
      </LocationFavorite>
    ));
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffers.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">{renderLocations()}</ul>
            </section>
            :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
