import React, { memo } from 'react';
import PlaceCard from '../place-card/place-card';
import { useSelector } from 'react-redux';
import { getOffersByCity, getOffersNearby } from '../../store/data/selectors';

type PlacesListProps = {
  onPlaceHover?: (id: number) => void,
  onPlaceLeave?: () => void,
  variant: 'cities' | 'near-places',
}

function PlacesList({onPlaceHover, onPlaceLeave, variant}: PlacesListProps): JSX.Element {
  const offers = useSelector(variant === 'cities' ? getOffersByCity : getOffersNearby);

  let containerClassName: string;

  function renderCards() {
    return offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave} variant={variant}/>
    ));
  }

  switch (variant) {
    case 'cities':
      containerClassName = 'cities__places-list';
      break;
    case 'near-places':
      containerClassName = 'near-places__list';
  }

  return (
    <div className={`${containerClassName} places__list tabs__content`}>
      {renderCards()}
    </div>
  );
}

export default memo(PlacesList);
