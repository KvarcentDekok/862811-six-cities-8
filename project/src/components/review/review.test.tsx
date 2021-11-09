import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import Review from './review';
import { adaptToClientReviews } from '../../services/api';
import { makeFakeReview } from '../../utils/mocks';
import { formatDate } from '../../utils/utils';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const review = adaptToClientReviews([makeFakeReview()])[0];

    const {getByAltText, getByText} = render(
      <Router history={history}>
        <Review review={review} />
      </Router>,
    );

    expect(getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(getByText(new RegExp(String(review.user.name), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(String(review.comment), 'i'))).toBeInTheDocument();
    expect(getByText(new RegExp(String(formatDate(review.date)), 'i'))).toBeInTheDocument();
  });
});
