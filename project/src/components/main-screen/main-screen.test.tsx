import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import MainScreen from './main-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CITIES, AuthorizationStatus } from '../../const';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const NUMBER_OF_OFFERS = 4;

const mockStore = configureMockStore();

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {allOffers: adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({cityName: CITIES[0].name})))},
      MAIN: {city: CITIES[0]},
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(getByText(new RegExp(`${NUMBER_OF_OFFERS} places to stay in ${CITIES[0].name}`, 'i'))).toBeInTheDocument();
  });
});
