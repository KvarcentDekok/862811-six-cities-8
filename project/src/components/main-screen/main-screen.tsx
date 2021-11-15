import React, { useCallback, useState } from 'react';
import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import InteractiveMap from '../interactive-map/interactive-map';
import CitiesList from '../cities-list/cities-list';
import { CITIES } from '../../const';
import { useSelector } from 'react-redux';
import { getOffersByCity } from '../../store/data/selectors';
import { getCity } from '../../store/main/selectors';
import PlacesSorting from '../places-sorting/places-sorting';
import CitiesContainerEmpty from '../cities-container-empty/cities-container-empty';

function MainScreen(): JSX.Element {
  const offers = useSelector(getOffersByCity);
  const currentCity = useSelector(getCity);
  const [activeOfferId, setActiveOfferId] = useState(0);

  const onPlaceHover = useCallback(
    (id: number) => setActiveOfferId(id),
    [],
  );

  const onPlaceLeave = useCallback(
    () => setActiveOfferId(0),
    [],
  );

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES}/>
          </section>
        </div>
        <div className="cities">
          {offers.length ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
                <PlacesSorting/>
                <PlacesList onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave} variant='cities'/>
              </section>
              <div className="cities__right-section">
                <InteractiveMap containerClassName='cities__map' activeOfferId={activeOfferId}/>
              </div>
            </div>
            :
            <CitiesContainerEmpty/>}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
