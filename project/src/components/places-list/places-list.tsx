import React, { memo } from 'react';
import PlaceCard from '../place-card/place-card';
import { useSelector } from 'react-redux';
import { getOffersByCity, getOffersNearby } from '../../store/data/selectors';
import { PlaceCardVariant } from '../../const';

type PlacesListProps = {
  onPlaceHover?: (id: number) => void,
  onPlaceLeave?: () => void,
  variant: PlaceCardVariant,
}

function PlacesList({onPlaceHover, onPlaceLeave, variant}: PlacesListProps): JSX.Element {
  const offers = useSelector(variant === PlaceCardVariant.Cities ? getOffersByCity : getOffersNearby);

  let conatainerClassName: string;

  function renderCards() {
    return offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave} variant={variant}/>
    ));
  }

  switch (variant) {
    case PlaceCardVariant.Cities:
      conatainerClassName = 'cities__places-list';
      break;
    case PlaceCardVariant.NearPlaces:
      conatainerClassName = 'near-places__list';
  }

  return (
    <div className={`${conatainerClassName} places__list tabs__content`}>
      {renderCards()}
    </div>
  );
}

export default memo(PlacesList);
