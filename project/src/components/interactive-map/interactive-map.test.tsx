import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import InteractiveMap from './interactive-map';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CITIES } from '../../const';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const OFFERS_NUMBER = 4;

const mockStore = configureMockStore();

describe('Component: InteractiveMap', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offers = adaptToClientOffers(new Array(OFFERS_NUMBER).fill(makeFakeOffer({cityName: CITIES[0].name})));
    const store = mockStore({
      MAIN: {city: CITIES[0]},
      DATA: {allOffers: offers},
    });

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <InteractiveMap containerClassName='cities__map' activeOfferId={offers[0].id} />
        </Router>
      </Provider>,
    );

    expect(container.querySelectorAll('.leaflet-marker-icon').length).toBe(OFFERS_NUMBER);
    expect(container.querySelector('[src="/img/pin-active.svg"]')).toBeInTheDocument();
  });
});