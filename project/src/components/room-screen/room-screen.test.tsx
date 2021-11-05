import {render} from '@testing-library/react';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import RoomScreen from './room-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';

const mockStore = configureMockStore();

describe('Component: RoomScreen', () => {
  it('should render correctly', () => {
    const offers = adaptToClientOffers([makeFakeOffer({})]);
    const mockOfferId = String(offers[0].id);
    const history = createMemoryHistory({ initialEntries: [`/offer/${mockOfferId}`] });
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    history.push(`/offer/${mockOfferId}`);

    const {getByAltText, getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path='/offer/:id'>
            <RoomScreen offers={offers} reviews={[]} />
          </Route>
        </Router>
      </Provider>,
    );

    expect(getByAltText(/Host avatar/i)).toBeInTheDocument();
    expect(getByText(new RegExp(String(offers[0].price), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offers[0].title, 'i'))).toBeInTheDocument();
    expect(getByText(/Reviews/i)).toBeInTheDocument();
    expect(getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly when premium', () => {
    const offers = adaptToClientOffers([makeFakeOffer({isPremium: true})]);
    const mockOfferId = String(offers[0].id);
    const history = createMemoryHistory({ initialEntries: [`/offer/${mockOfferId}`] });
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    history.push(`/offer/${mockOfferId}`);

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path='/offer/:id'>
            <RoomScreen offers={offers} reviews={[]} />
          </Route>
        </Router>
      </Provider>,
    );

    expect(getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render correctly when not premium', () => {
    const offers = adaptToClientOffers([makeFakeOffer({isPremium: false})]);
    const mockOfferId = String(offers[0].id);
    const history = createMemoryHistory({ initialEntries: [`/offer/${mockOfferId}`] });
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    history.push(`/offer/${mockOfferId}`);

    const {queryByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path='/offer/:id'>
            <RoomScreen offers={offers} reviews={[]} />
          </Route>
        </Router>
      </Provider>,
    );

    expect(queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
