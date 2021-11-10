import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ReviewForm from './review-form';
import { ratingValues } from '../../utils/utils';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {isCommentSending: false},
    });

    const {getByLabelText, getByTitle} = render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm offerId='1' />
        </Router>
      </Provider>,
    );

    for (let i = 0; i < ratingValues.length; i++) {
      expect(getByTitle(new RegExp(ratingValues[i].name, 'i'))).toBeInTheDocument();
    }

    expect(getByLabelText('Your review')).toBeInTheDocument();
  });
});
