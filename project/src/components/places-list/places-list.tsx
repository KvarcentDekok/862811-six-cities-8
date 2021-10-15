import React from 'react';
import {useState} from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList({offers}: PlacesListProps): JSX.Element {
  const [, setActiveOfferId] = useState(0);

  function renderCards(): JSX.Element {
    return (
      <>
        {
          offers.map((offer) => (
            <PlaceCard key={offer.id} offer={offer} onPlaceHover={(id: number) => setActiveOfferId(id)}/>
          ))
        }
      </>
    );
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {renderCards()}
    </div>
  );
}

export default PlacesList;
