import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Reviews from './reviews';
import { reviews } from '../../mocks/reviews';
import { adaptToClientReviews } from '../../services/api';
import { makeFakeReview } from '../../utils/mocks';

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {getByText, getAllByText} = render(
      <Router history={history}>
        <Reviews reviews={adaptToClientReviews([makeFakeReview()])} />
      </Router>,
    );

    expect(getByText(/Reviews/i)).toBeInTheDocument();
    expect(getAllByText(new RegExp(String(reviews.length), 'i'))[0]).toBeInTheDocument();
  });
});
