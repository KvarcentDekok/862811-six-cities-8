import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, CITIES, APIRoute } from '../../const';
import App from './app';
import { adaptToClientOffers, adaptToClientReviews, api } from '../../services/api';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../../types/state';
import {Action} from 'redux';

const NUMBER_OF_OFFERS = 4;

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const offers = adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({cityName: CITIES[0].name})));
const reviews = adaptToClientReviews(new Array(2).fill(makeFakeReview()));

const defaultStore = mockStore({
  DATA: {allOffers: offers, offersNearby: offers, reviews: reviews, favoriteOffers: offers},
  MAIN: {city: CITIES[0]},
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

const mockAPI = new MockAdapter(api);

const history = createMemoryHistory();

const defaultFakeApp = (
  <Provider store={defaultStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(defaultFakeApp);

    expect(screen.getByText(new RegExp(`${NUMBER_OF_OFFERS} places to stay in ${CITIES[0].name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "SignInScreen" when user navigate to "/login"', () => {
    const store = mockStore({
      DATA: {allOffers: offers, offersNearby: offers, reviews: reviews, favoriteOffers: offers},
      MAIN: {city: CITIES[0]},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    const fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(defaultFakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "RoomScreen" when user navigate to "/offer/:id"', () => {
    mockAPI
      .onGet(APIRoute.OffersNearby.replace(':hotel_id', String(offers[0].id)))
      .reply(200, offers);

    history.push(`/offer/${offers[0].id}`);
    render(defaultFakeApp);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(defaultFakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
