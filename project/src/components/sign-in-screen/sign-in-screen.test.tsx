import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import SignInScreen from './sign-in-screen';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Component: SignInScreen', () => {
  it('should render "SignInScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignInScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });
});
