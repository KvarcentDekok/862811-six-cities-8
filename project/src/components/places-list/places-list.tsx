import React, { memo } from 'react';
import PlaceCard from '../place-card/place-card';
import { useSelector } from 'react-redux';
import { getOffers } from '../../store/data/selectors';

type PlacesListProps = {
  onPlaceHover: (id: number) => void,
  onPlaceLeave: () => void
}

function PlacesList({onPlaceHover, onPlaceLeave}: PlacesListProps): JSX.Element {
  const offers = useSelector(getOffers);

  function renderCards() {
    return offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave}/>
    ));
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {renderCards()}
    </div>
  );
}

export default memo(PlacesList);
