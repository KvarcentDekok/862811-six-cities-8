import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import FavoritesScreen from './favorites-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { adaptToClientOffers, api } from '../../services/api';
import { makeFakeOffer } from '../../utils/mocks';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const NUMBER_OF_OFFERS = 4;

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offers = adaptToClientOffers(new Array(NUMBER_OF_OFFERS).fill(makeFakeOffer({})));
    const store = mockStore({
      DATA: {allOffers: offers, favoriteOffers: offers},
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>,
    );

    expect(getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
