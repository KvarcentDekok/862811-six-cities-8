import React, { ReactNode } from 'react';

type LocationFavoriteProps = {
  cityName: string;
  children: ReactNode
}

function LocationFavorite(props: LocationFavoriteProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{props.cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {props.children}
      </div>
    </li>
  );
}

export default LocationFavorite;
