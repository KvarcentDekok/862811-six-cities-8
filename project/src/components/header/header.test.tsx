import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Header from './header';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';

const EMAIL = 'example@example.com';

const mockStore = configureMockStore();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });

    const {getByAltText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should render correctly when authorization status is "auth"', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: {email: EMAIL},
      },
    });

    const {getByAltText, getByText, queryByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(getByAltText(/User avatar/i)).toBeInTheDocument();
    expect(getByText(new RegExp(EMAIL, 'i'))).toBeInTheDocument();
    expect(getByText(/Sign out/i)).toBeInTheDocument();
    expect(queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly when authorization status is "noAuth"', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    const {getByText, queryByAltText, queryByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(getByText(/Sign in/i)).toBeInTheDocument();
    expect(queryByAltText(/User avatar/i)).not.toBeInTheDocument();
    expect(queryByText(new RegExp(EMAIL, 'i'))).not.toBeInTheDocument();
    expect(queryByText(/Sign out/i)).not.toBeInTheDocument();
  });
});
