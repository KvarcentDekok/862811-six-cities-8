import { memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fillOffers } from '../../store/action';
import { getOffersByCity } from '../../offers';
import { City } from '../../types/offer';
import { getCity } from '../../store/main/selectors';
import { getAllOffers } from '../../store/data/selectors';

type CitiesListProps = {
  cities: City[];
};

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const currentCity = useSelector(getCity);
  const allOffers = useSelector(getAllOffers);
  const dispatch = useDispatch();

  const onChangeCity = (evt: MouseEvent<HTMLAnchorElement>, city: City) => {
    evt.preventDefault();
    dispatch(changeCity(city));
    dispatch(fillOffers(getOffersByCity(city, allOffers)));
  };

  function renderCities() {
    return cities.map((city) => (
      <li key={city.name} className="locations__item">
        <a
          className={`locations__item-link tabs__item ${currentCity.name === city.name && 'tabs__item--active'}`}
          href="#"
          onClick={(evt) => onChangeCity(evt, city)}
        >
          <span>{city.name}</span>
        </a>
      </li>
    ));
  }

  return <ul className="locations__list tabs__list">{renderCities()}</ul>;
}

export default memo(CitiesList);
