import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import BookmarkButton from './bookmark-button';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();

describe('Component: BookmarkButton', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <BookmarkButton isFavorite id={1} className='place-card' />
        </Router>
      </Provider>,
    );

    expect(getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render correctly when favorite', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <BookmarkButton isFavorite id={1} className='place-card' />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.place-card__bookmark-button--active')).toBeInTheDocument();
  });

  it('should render correctly when not favorite', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <BookmarkButton isFavorite={false} id={1} className='place-card' />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('.place-card__bookmark-button--active')).not.toBeInTheDocument();
  });
});
