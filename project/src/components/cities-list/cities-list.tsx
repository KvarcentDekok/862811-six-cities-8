import { Dispatch, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { changeCity, fillOffers } from '../../store/action';
import { getOffersByCity } from '../../offers';
import { City } from '../../types/offer';

type CitiesListProps = {
  cities: City[];
};

const mapStateToProps = ({city}: State) => ({
  currentCity: city,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeCity(evt: MouseEvent<HTMLAnchorElement>, city: City) {
    evt.preventDefault();
    dispatch(changeCity(city));
    dispatch(fillOffers(getOffersByCity(city)));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & CitiesListProps;

function CitiesList({ cities, currentCity, onChangeCity }: ConnectedComponentProps): JSX.Element {
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

export {CitiesList};
export default connector(CitiesList);
