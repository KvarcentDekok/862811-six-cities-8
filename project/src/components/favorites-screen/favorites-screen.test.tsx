import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FavoritesScreen from './favorites-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const NUMBER_OF_OFFERS = 4;

const mockStore = configureMockStore();

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {allOffers: adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({})))},
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });

    const offers = adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({})));

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen offers={offers} />
        </Router>
      </Provider>,
    );

    expect(getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
