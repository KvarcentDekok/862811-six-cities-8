import {render} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import RoomScreen from './room-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, CITIES } from '../../const';
import { adaptToClientOffers, adaptToClientReviews, api } from '../../services/api';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('Component: RoomScreen', () => {
  const reviews = adaptToClientReviews([makeFakeReview()]);

  it('should render correctly', () => {
    const offers = adaptToClientOffers([makeFakeOffer({})]);
    const mockOfferId = String(offers[0].id);
    const history = createMemoryHistory({ initialEntries: [`/offer/${mockOfferId}`] });
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {allOffers: offers, reviews: reviews, offersNearby: offers},
      MAIN: {city: CITIES[0]},
    });

    history.push(`/offer/${mockOfferId}`);

    const {getByAltText, getByText, getAllByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path='/offer/:id'>
            <RoomScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(getByAltText(/Host avatar/i)).toBeInTheDocument();
    expect(getAllByText(new RegExp(String(offers[0].price), 'i'))[0]).toBeInTheDocument();
    expect(getAllByText(new RegExp(offers[0].title, 'i'))[0]).toBeInTheDocument();
    expect(getByText(/Reviews/i)).toBeInTheDocument();
    expect(getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly when premium', () => {
    const offers = adaptToClientOffers([makeFakeOffer({isPremium: true})]);
    const mockOfferId = String(offers[0].id);
    const history = createMemoryHistory({ initialEntries: [`/offer/${mockOfferId}`] });
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {allOffers: offers, reviews: reviews, offersNearby: offers},
      MAIN: {city: CITIES[0]},
    });

    history.push(`/offer/${mockOfferId}`);

    const {getAllByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path='/offer/:id'>
            <RoomScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(getAllByText(/Premium/i)[0]).toBeInTheDocument();
  });

  it('should render correctly when not premium', () => {
    const offers = adaptToClientOffers([makeFakeOffer({isPremium: false})]);
    const mockOfferId = String(offers[0].id);
    const history = createMemoryHistory({ initialEntries: [`/offer/${mockOfferId}`] });
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {allOffers: offers, reviews: reviews, offersNearby: offers},
      MAIN: {city: CITIES[0]},
    });

    history.push(`/offer/${mockOfferId}`);

    const {queryByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path='/offer/:id'>
            <RoomScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
