import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlaceCard from './place-card';
import { adaptToClientOffers } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: PlaceCard', () => {
  const store = mockStore({
    USER: {authorizationStatus: AuthorizationStatus.Auth},
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({})])[0];

    const {getByAltText, getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard offer={offer} onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} variant='cities' />
        </Router>
      </Provider>,
    );

    expect(getByAltText(/Place image/i)).toBeInTheDocument();
    expect(getByText(new RegExp(String(offer.price), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(offer.type, 'i'))).toBeInTheDocument();
  });

  it('should render correctly when premium', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({isPremium: true})])[0];

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard offer={offer} onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} variant='cities' />
        </Router>
      </Provider>,
    );

    expect(getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render correctly when not premium', () => {
    const history = createMemoryHistory();
    const offer = adaptToClientOffers([makeFakeOffer({isPremium: false})])[0];

    const {queryByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard offer={offer} onPlaceHover={jest.fn()} onPlaceLeave={jest.fn()} variant='cities' />
        </Router>
      </Provider>,
    );

    expect(queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
