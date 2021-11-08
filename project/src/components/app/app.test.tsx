import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, CITIES } from '../../const';
import App from './app';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const NUMBER_OF_OFFERS = 4;

const mockStore = configureMockStore();
const offers = adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({cityName: CITIES[0].name})));

const store = mockStore({
  DATA: {allOffers: offers, offersNearby: offers},
  MAIN: {city: CITIES[0]},
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App reviews={[]} />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(new RegExp(`${NUMBER_OF_OFFERS} places to stay in ${CITIES[0].name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "SignInScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "RoomScreen" when user navigate to "/offer/:id"', () => {
    history.push(`/offer/${offers[0].id}`);
    render(fakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
