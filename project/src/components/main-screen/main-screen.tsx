import React, { useCallback, useState } from 'react';
import PlacesList from '../places-list/places-list';
import Header from '../header/header';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import { CITIES, MapContainerClassName, ComponentName } from '../../const';
import { useSelector } from 'react-redux';
import { getOffersByCity } from '../../store/data/selectors';
import { getCity } from '../../store/main/selectors';

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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlacesList onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave} parent={ComponentName.MainScreen}/>
            </section>
            <div className="cities__right-section">
              <Map containerClassName={MapContainerClassName.Cities} activeOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
