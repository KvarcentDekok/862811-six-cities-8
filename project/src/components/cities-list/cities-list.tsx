import { memo, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { City } from '../../types/offer';
import { getCity } from '../../store/main/selectors';
import { changeCity } from '../../store/main/main';

type CitiesListProps = {
  cities: City[];
};

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const currentCity = useSelector(getCity);
  const dispatch = useDispatch();

  const onChangeCity = (evt: MouseEvent<HTMLAnchorElement>, city: City) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  };

  function renderCities() {
    return cities.map((city) => (
      <li key={city.name} className="locations__item">
        <a
          className={`locations__item-link tabs__item ${currentCity.name === city.name ? 'tabs__item--active': ''}`}
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
