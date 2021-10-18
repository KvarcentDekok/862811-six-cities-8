import React from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[],
  onPlaceHover: (id: number) => void,
  onPlaceLeave: () => void
}

function PlacesList({offers, onPlaceHover, onPlaceLeave}: PlacesListProps): JSX.Element {
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

export default PlacesList;
