import React, { memo } from 'react';
import PlaceCard from '../place-card/place-card';
import { useSelector } from 'react-redux';
import { getOffersByCity, getOffersNearby } from '../../store/data/selectors';
import { ComponentName } from '../../const';

type PlacesListProps = {
  onPlaceHover?: (id: number) => void,
  onPlaceLeave?: () => void,
  parent: ComponentName,
}

function PlacesList({onPlaceHover, onPlaceLeave, parent}: PlacesListProps): JSX.Element {
  const offers = useSelector(parent === ComponentName.MainScreen ? getOffersByCity : getOffersNearby);

  let conatainerClassName: string;

  function renderCards() {
    return offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} onPlaceHover={onPlaceHover} onPlaceLeave={onPlaceLeave} parent={parent}/>
    ));
  }

  switch (parent) {
    case ComponentName.MainScreen:
      conatainerClassName = 'cities__places-list';
      break;
    case ComponentName.RoomScreen:
      conatainerClassName = 'near-places__list';
  }

  return (
    <div className={`${conatainerClassName} places__list tabs__content`}>
      {renderCards()}
    </div>
  );
}

export default memo(PlacesList);
