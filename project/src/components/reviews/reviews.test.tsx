import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Reviews from './reviews';
import { adaptToClientReviews } from '../../services/api';
import { makeFakeReview } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const reviews = adaptToClientReviews(new Array(2).fill(makeFakeReview()));
    const store = mockStore({
      DATA: {reviews: reviews},
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    const {getByText, getAllByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <Reviews offerId='1' />
        </Router>
      </Provider>,
    );

    expect(getByText(/Reviews/i)).toBeInTheDocument();
    expect(getAllByText(new RegExp(String(reviews.length), 'i'))[0]).toBeInTheDocument();
  });
});
