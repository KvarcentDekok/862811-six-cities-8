import React from 'react';
import PlaceCard from '../place-card/place-card';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';

type PlacesListProps = {
  onPlaceHover: (id: number) => void,
  onPlaceLeave: () => void
}

const mapStateToProps = ({offers}: State) => ({
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlacesListProps;

function PlacesList({offers, onPlaceHover, onPlaceLeave}: ConnectedComponentProps): JSX.Element {
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

export {PlacesList};
export default connector(PlacesList);
