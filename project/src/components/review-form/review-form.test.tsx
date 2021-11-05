import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ReviewForm from './review-form';
import { ratingValues } from '../../utils/utils';

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {getByLabelText, getByTitle} = render(
      <Router history={history}>
        <ReviewForm onReview={jest.fn} />
      </Router>,
    );

    for (let i = 0; i < ratingValues.length; i++) {
      expect(getByTitle(new RegExp(ratingValues[i].name, 'i'))).toBeInTheDocument();
    }

    expect(getByLabelText('Your review')).toBeInTheDocument();
  });
});
