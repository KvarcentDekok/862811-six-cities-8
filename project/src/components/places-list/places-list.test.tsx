import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlacesList from './places-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, CITIES } from '../../const';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const NUMBER_OF_OFFERS = 4;

const mockStore = configureMockStore();

describe('Component: PlacesList', () => {
  it('should render as many PlaceCard components as offers', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {allOffers: adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({cityName: CITIES[0].name})))},
      MAIN: {city: CITIES[0]},
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    const {queryAllByAltText} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlacesList onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} variant={'cities'} />
        </Router>
      </Provider>,
    );

    expect(queryAllByAltText(/Place image/i).length).toBe(NUMBER_OF_OFFERS);
  });
});
